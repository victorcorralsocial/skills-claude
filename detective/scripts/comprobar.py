#!/usr/bin/env python3
"""Comprobaciones automáticas de una tienda online (para la skill «detective»).

Uso:
  python3 comprobar.py <dominio o enlace> [--cif B12345678]
  python3 comprobar.py --cif B12345678          (solo el CIF/NIF, sin internet)

Qué hace (todo con fuentes públicas y gratuitas, sin claves):
  · CIF / NIF / NIE: si el número es válido (dígito de control). No necesita internet.
  · Edad del dominio: fecha de registro (RDAP), primera copia en el Internet Archive y primer certificado
    (crt.sh). Se dan las tres porque cada una falla a veces.
  · Otras webs en los mismos certificados (crt.sh): las tiendas falsas suelen salir en serie.
  · Servidores de correo y de nombres (DNS de Google).
Si no hay internet (o una fuente no responde), lo dice y sigue: la skill completa esa parte buscando en la web.
Escribe un resumen en texto. No entra en la tienda, no rellena nada y no descarga nada de ella.
"""
import json
import re
import sys
import urllib.parse
import urllib.request
from datetime import datetime, timezone

UA = {"User-Agent": "Mozilla/5.0 (detective-compras; comprobación pública)"}


def pedir(url, timeout=15):
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=timeout) as r:
            return r.read().decode("utf-8", "replace")
    except Exception as e:  # sin internet, bloqueado o caído
        return None


# ——— CIF / NIF / NIE ———
LETRAS_DNI = "TRWAGMYFPDXBNJZSQVHLCKE"


def validar_identificador(x):
    """Devuelve (tipo, válido, explicación)."""
    s = re.sub(r"[\s.\-]", "", x.upper())
    if s.startswith("ES") and len(s) > 9:
        s = s[2:]
    if re.fullmatch(r"\d{8}[A-Z]", s):
        ok = LETRAS_DNI[int(s[:8]) % 23] == s[8]
        return "NIF de persona (autónomo)", ok, "la letra no cuadra con el número" if not ok else "letra correcta"
    if re.fullmatch(r"[XYZ]\d{7}[A-Z]", s):
        n = int("XYZ".index(s[0]).__str__() + s[1:8])
        ok = LETRAS_DNI[n % 23] == s[8]
        return "NIE (persona extranjera)", ok, "la letra no cuadra con el número" if not ok else "letra correcta"
    if re.fullmatch(r"[ABCDEFGHJNPQRSUVW]\d{7}[0-9A-J]", s):
        d = s[1:8]
        pares = sum(int(d[i]) for i in (1, 3, 5))
        impares = sum(sum(divmod(int(d[i]) * 2, 10)) for i in (0, 2, 4, 6))
        c = (10 - (pares + impares) % 10) % 10
        letra_c = "JABCDEFGHI"[c]
        ctrl = s[8]
        if s[0] in "PQRSNW":
            ok = ctrl == letra_c
        elif s[0] in "ABEH":
            ok = ctrl == str(c)
        else:
            ok = ctrl in (str(c), letra_c)
        tipos = {"A": "sociedad anónima", "B": "sociedad limitada", "J": "sociedad civil", "E": "comunidad de bienes",
                 "F": "cooperativa", "G": "asociación o fundación", "N": "entidad extranjera", "W": "establecimiento permanente de entidad no residente"}
        return f"CIF de empresa ({tipos.get(s[0], 'otra entidad')})", ok, f"el dígito de control debería ser {c} o {letra_c}" if not ok else "dígito de control correcto"
    return "formato desconocido", False, "no tiene la forma de un CIF, NIF ni NIE español"


# ——— Dominio ———
def dominio_de(texto):
    t = texto.strip()
    if "://" not in t:
        t = "http://" + t
    host = urllib.parse.urlparse(t).hostname or ""
    host = host.lower().removeprefix("www.")
    return host


def fecha(s):
    try:
        return datetime.fromisoformat(s.replace("Z", "+00:00"))
    except Exception:
        return None


def edad_txt(d):
    if not d:
        return "—"
    dias = (datetime.now(timezone.utc) - (d if d.tzinfo else d.replace(tzinfo=timezone.utc))).days
    if dias < 60:
        return f"{d:%d-%m-%Y} (hace {dias} días)"
    if dias < 730:
        return f"{d:%d-%m-%Y} (hace {dias // 30} meses)"
    return f"{d:%d-%m-%Y} (hace {dias // 365} años)"


def rdap(dom):
    raw = pedir(f"https://rdap.org/domain/{dom}")
    if not raw:
        return None, "RDAP no responde para este dominio (los .es no tienen RDAP público: usa las otras dos fechas)"
    try:
        j = json.loads(raw)
        for ev in j.get("events", []):
            if ev.get("eventAction") == "registration":
                return fecha(ev.get("eventDate", "")), "registro (RDAP)"
        return None, "RDAP sin fecha de registro"
    except Exception:
        return None, "RDAP devolvió algo que no se entiende"


def archivo(dom):
    raw = pedir(f"https://web.archive.org/cdx/search/cdx?url={dom}&output=json&limit=1&fl=timestamp", timeout=25) \
        or pedir(f"https://web.archive.org/cdx/search/cdx?url={dom}&output=json&limit=1&fl=timestamp", timeout=25)
    if not raw:
        return None, "el Internet Archive no responde"
    try:
        filas = json.loads(raw)
        if len(filas) < 2:
            return None, "el Internet Archive no tiene ninguna copia (web muy nueva o poco visitada)"
        return datetime.strptime(filas[1][0][:8], "%Y%m%d").replace(tzinfo=timezone.utc), "primera copia (Internet Archive)"
    except Exception:
        return None, "respuesta rara del Internet Archive"


def certificados(dom):
    raw = pedir(f"https://crt.sh/?q={urllib.parse.quote(dom)}&output=json&deduplicate=Y", timeout=40)
    if not raw:
        return None, [], "crt.sh no responde (va lento a menudo: se puede reintentar)"
    try:
        certs = json.loads(raw)
    except Exception:
        return None, [], "crt.sh devolvió algo que no se entiende"
    if not certs:
        return None, [], "sin certificados registrados"
    primero = min((fecha(c.get("not_before", "") + "+00:00") for c in certs if c.get("not_before")), default=None)
    otros = set()
    for c in certs:
        for n in (c.get("name_value") or "").split("\n"):
            n = n.strip().lower().removeprefix("*.").removeprefix("www.")
            if n and n != dom and not n.endswith("." + dom):
                otros.add(n)
    return primero, sorted(otros)[:25], "primer certificado (crt.sh)"


def dns(dom, tipo):
    raw = pedir(f"https://dns.google/resolve?name={dom}&type={tipo}")
    try:
        return [a["data"] for a in json.loads(raw).get("Answer", [])] if raw else None
    except Exception:
        return None


def main():
    sys.stdout.reconfigure(line_buffering=True)
    args = sys.argv[1:]
    cif = None
    if "--cif" in args:
        i = args.index("--cif")
        cif = args[i + 1]
        del args[i:i + 2]
    if cif:
        tipo, ok, por = validar_identificador(cif)
        print(f"Identificador fiscal {cif}: {tipo} · {'VÁLIDO' if ok else 'NO VÁLIDO'} ({por}).")
        if ok:
            print("  Válido solo significa que el número está bien formado: hay que buscar a quién pertenece.")
        else:
            print("  Un CIF o NIF mal formado en una tienda es una señal crítica: o es falso o está mal copiado.")
    if not args:
        return
    dom = dominio_de(args[0])
    print(f"\nDominio: {dom}")
    fechas = []
    for f in (rdap, archivo):
        d, fuente = f(dom)
        print(f"  · {fuente}: {edad_txt(d)}" if d else f"  · {fuente}")
        if d:
            fechas.append(d)
    d, otros, fuente = certificados(dom)
    print(f"  · {fuente}: {edad_txt(d)}" if d else f"  · {fuente}")
    if d:
        fechas.append(d)
    if fechas:
        print(f"  → La fecha más antigua que he encontrado: {edad_txt(min(fechas))}")
    else:
        print("  → No he podido saber la edad: búscala a mano (whois, Internet Archive).")
    if otros:
        print(f"  · Otras webs en los mismos certificados ({len(otros)}): {', '.join(otros)}")
        print("    Si son otras tiendas con nombres parecidos o de otras marcas, puede ser una red de tiendas falsas.")
    ns, mx = dns(dom, "NS"), dns(dom, "MX")
    if ns is not None:
        print(f"  · Servidores de nombres: {', '.join(ns) or 'ninguno'}")
    if mx is not None:
        print(f"  · Correo del dominio: {', '.join(mx) if mx else 'no tiene (no puede recibir correos con su propio nombre)'}")
    if ns is None and mx is None:
        print("  · DNS: sin respuesta (sin internet o bloqueado)")


if __name__ == "__main__":
    main()
