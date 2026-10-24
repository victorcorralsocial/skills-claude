#!/usr/bin/env python3
"""Comprueba los datos del libro antes de montar la app.

Uso:
    python3 scripts/comprobar.py libro.json      # los datos sueltos
    python3 scripts/comprobar.py app.jsx         # la app ya montada (lee el bloque ▼ DATOS ▼)

Errores (❌): rompen la app o la dejan mal; hay que arreglarlos.
Avisos (⚠️): conviene mirarlos, pero la app funciona.
Sale con código 1 si hay errores.
"""
import json
import re
import sys

MODULOS = {"herramienta", "habitos", "diario", "chat"}
TIPOS_HERRAMIENTA = {"puntuacion", "escalas", "matriz", "pasos", "propia"}
TIPOS_FUENTE = {"autor", "resumen", "lectores"}


def leer(ruta):
    texto = open(ruta, encoding="utf-8").read()
    if ruta.endswith((".jsx", ".js")):
        m = re.search(r"/\*\s*▼ DATOS ▼\s*\*/(.*?)/\*\s*▲ FIN DE LOS DATOS ▲\s*\*/", texto, re.S)
        if not m:
            sys.exit("❌ No encuentro el bloque /* ▼ DATOS ▼ */ … /* ▲ FIN DE LOS DATOS ▲ */ en la app.")
        texto = m.group(1)
    try:
        return json.loads(texto)
    except json.JSONDecodeError as e:
        sys.exit(f"❌ Los datos no son JSON válido (línea {e.lineno}, columna {e.colno}): {e.msg}. "
                 "Revisa comillas, comas finales y que no haya comentarios dentro.")


def luminancia(hexa):
    r, g, b = (int(hexa[i:i + 2], 16) / 255 for i in (1, 3, 5))
    canal = lambda c: c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b)


def comprobar(L):
    errores, avisos = [], []
    E, W = errores.append, avisos.append

    for campo in ["titulo", "autor", "anio", "acento", "ideaCentral", "enTreintaSegundos", "ideas", "fuentes", "bienvenida", "acciones", "modulos"]:
        if campo not in L:
            E(f"Falta el campo «{campo}».")
    if errores:
        return errores, avisos

    # Color
    if not re.fullmatch(r"#[0-9A-Fa-f]{6}", str(L["acento"])):
        E("«acento» tiene que ser un color hexadecimal de 6 cifras, p. ej. #8C4A0B.")
    else:
        contraste = 1.05 / (luminancia(L["acento"]) + 0.05)
        if contraste < 4.5:
            E(f"«acento» {L['acento']} es demasiado claro: el texto blanco encima tiene contraste {contraste:.1f} y hace falta 4,5. Oscurécelo.")

    # Fuentes
    fuentes = L["fuentes"]
    for i, f in enumerate(fuentes):
        if f.get("tipo") not in TIPOS_FUENTE:
            E(f"fuentes[{i}]: «tipo» tiene que ser autor, resumen o lectores.")
        if not str(f.get("url", "")).startswith("http"):
            E(f"fuentes[{i}]: falta una URL que empiece por http.")
    tipos = {f.get("tipo") for f in fuentes}
    if "autor" not in tipos:
        W("No hay ninguna fuente del autor. Si existe (web, entrevistas), búscala: es la más fiable.")
    if "lectores" not in tipos:
        W("No hay fuentes de lectores (Reddit, Goodreads): de ahí salen los errores típicos.")

    # Ideas
    ideas = L["ideas"]
    ids = [i.get("id") for i in ideas]
    if not 5 <= len(ideas) <= 9:
        W(f"Hay {len(ideas)} ideas; lo recomendable son entre 5 y 7.")
    if len(set(ids)) != len(ids):
        E("Hay ideas con el mismo «id».")
    for it in ideas:
        n = it.get("id", "?")
        for campo in ["nombre", "dice", "hoy"]:
            if not str(it.get(campo, "")).strip():
                E(f"Idea {n}: falta «{campo}».")
        if len(str(it.get("nombre", "")).split()) > 4:
            W(f"Idea {n}: el nombre «{it.get('nombre')}» es largo; en el mapa se lee mejor con 1 a 4 palabras.")
        if it.get("confianza") not in (2, 3):
            E(f"Idea {n}: «confianza» tiene que ser 2 o 3.")
        fs = it.get("fuentes", [])
        if len(set(fs)) < 2:
            E(f"Idea {n}: necesita al menos 2 fuentes distintas (es la regla del cruce).")
        for f in fs:
            if not isinstance(f, int) or not 0 <= f < len(fuentes):
                E(f"Idea {n}: la fuente {f} no existe en «fuentes».")
        for c in it.get("conecta", []):
            if c not in ids:
                E(f"Idea {n}: «conecta» apunta a {c}, que no existe.")
    if ideas and not any(it.get("conecta") for it in ideas):
        W("Ninguna idea tiene «conecta»: el mapa del libro saldrá sin líneas.")

    # Bienvenida
    b = L["bienvenida"]
    opciones = b.get("cambiar", [])
    if not 4 <= len(opciones) <= 6:
        W(f"«bienvenida.cambiar» tiene {len(opciones)} opciones; lo ideal son entre 4 y 6.")
    for i, o in enumerate(opciones):
        if not o.get("texto") or not o.get("compromiso"):
            E(f"bienvenida.cambiar[{i}]: faltan «texto» o «compromiso».")
        for x in o.get("ideas", []):
            if x not in ids:
                E(f"bienvenida.cambiar[{i}]: la idea {x} no existe.")
    escala = b.get("escala", {})
    for campo in ["pregunta", "bajo", "alto"]:
        if not escala.get(campo):
            E(f"Falta «bienvenida.escala.{campo}».")

    # Acciones
    acciones = L["acciones"]
    if len(acciones) != 14:
        W(f"Hay {len(acciones)} acciones; la app está pensada para 14 (dos semanas, de fácil a exigente).")
    for i, a in enumerate(acciones):
        if a.get("idea") not in ids:
            E(f"acciones[{i}]: la idea {a.get('idea')} no existe.")
        if not str(a.get("corta", "")).strip() or not str(a.get("larga", "")).strip():
            E(f"acciones[{i}]: faltan «corta» o «larga».")
        if re.match(r"\s*(reflexiona|piensa en|considera)\b", str(a.get("larga", "")), re.I):
            W(f"acciones[{i}]: «{a.get('larga')[:40]}…» es vaga; mejor algo que se sepa cuándo está hecho (escribe, pon, elige…).")

    # Módulos
    modulos = L["modulos"]
    if not set(modulos) <= MODULOS:
        E(f"«modulos» solo admite {sorted(MODULOS)}.")
    if not 1 <= len(modulos) <= 3:
        W(f"Hay {len(modulos)} módulos; lo recomendable son 2 o 3.")

    if "herramienta" in modulos:
        h = L.get("herramienta") or {}
        tipo = h.get("tipo")
        for campo in ["nombre", "corto", "explicacion", "tipo"]:
            if not h.get(campo):
                E(f"Falta «herramienta.{campo}».")
        if len(str(h.get("corto", ""))) > 12:
            E(f"«herramienta.corto» («{h.get('corto')}») pasa de 12 caracteres y no cabe en la barra del móvil.")
        if tipo not in TIPOS_HERRAMIENTA:
            E(f"«herramienta.tipo» tiene que ser uno de {sorted(TIPOS_HERRAMIENTA)}.")
        if tipo == "puntuacion" and (not h.get("instruccion") or len(h.get("valores", [])) != 3):
            E("Herramienta «puntuacion»: hacen falta «instruccion» y exactamente 3 «valores».")
        if tipo == "escalas":
            dims = h.get("dimensiones", [])
            if not 3 <= len(dims) <= 8 or not all(d.get("nombre") and d.get("bajo") and d.get("alto") for d in dims):
                E("Herramienta «escalas»: hacen falta de 4 a 7 «dimensiones» con nombre, bajo y alto.")
        if tipo == "matriz":
            if len(h.get("cuadrantes", [])) != 4 or not all(h.get(k, {}).get(x) for k in ("ejeX", "ejeY") for x in ("nombre", "si", "no")):
                E("Herramienta «matriz»: hacen falta «ejeX» y «ejeY» (nombre, si, no) y 4 «cuadrantes».")
        if tipo == "pasos":
            if not h.get("pasos") or not all(p.get("pregunta") for p in h["pasos"]):
                E("Herramienta «pasos»: hacen falta «pasos» con su «pregunta».")
            if not (h.get("resultado") or {}).get("titulo") or not (h.get("resultado") or {}).get("instruccion"):
                E("Herramienta «pasos»: falta «resultado» con «titulo» e «instruccion».")
        if tipo == "propia":
            W("Herramienta «propia»: acuérdate de escribir HerramientaPropia en la app.")

    if "habitos" in modulos:
        tecnicas = L.get("tecnicas", [])
        if len(tecnicas) < 3:
            W("Con el módulo de hábitos conviene tener de 3 a 6 «tecnicas» del libro.")
        for i, t in enumerate(tecnicas):
            if not t.get("nombre") or not t.get("como"):
                E(f"tecnicas[{i}]: faltan «nombre» o «como».")
            if t.get("plantilla") and (not t.get("pregunta") or "{respuesta}" not in t["plantilla"]):
                E(f"tecnicas[{i}]: si hay «plantilla», necesita «pregunta» y el hueco {{respuesta}}.")

    if "diario" in modulos and len(L.get("diario", [])) < 10:
        W("Con el diario conviene tener 14 preguntas (dos semanas sin repetir).")
    if "chat" in modulos and len(L.get("chatEjemplos", [])) < 3:
        W("Con el chat conviene tener 3 «chatEjemplos».")

    return errores, avisos


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    errores, avisos = comprobar(leer(sys.argv[1]))
    for e in errores:
        print("❌", e)
    for w in avisos:
        print("⚠️ ", w)
    if not errores:
        print("✅ Datos listos para montar la app." + (f" ({len(avisos)} avisos)" if avisos else ""))
    sys.exit(1 if errores else 0)


if __name__ == "__main__":
    main()
