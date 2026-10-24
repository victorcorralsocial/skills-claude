#!/usr/bin/env python3
"""Monta la app: mete los datos del libro en la plantilla probada, sin reescribir nada a mano.

Uso:
    python3 scripts/montar.py libro.json [salida.jsx]

Por defecto escribe /mnt/user-data/outputs/<titulo>.jsx (o ./<titulo>.jsx si esa carpeta no existe).
Antes de montar, pasa el comprobador: si hay errores (❌), no monta.
"""
import json
import os
import re
import sys
import unicodedata

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, AQUI)
from comprobar import comprobar, leer  # noqa: E402

PLANTILLA = os.path.join(AQUI, "..", "assets", "app.jsx")
MARCAS = re.compile(r"(/\*\s*▼ DATOS ▼\s*\*/).*?(/\*\s*▲ FIN DE LOS DATOS ▲\s*\*/)", re.S)


def slug(texto):
    t = unicodedata.normalize("NFD", texto.lower())
    t = "".join(c for c in t if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9]+", "-", t).strip("-") or "app"


def main():
    if len(sys.argv) not in (2, 3):
        sys.exit(__doc__)
    datos = leer(sys.argv[1])
    errores, avisos = comprobar(datos)
    for w in avisos:
        print("⚠️ ", w)
    if errores:
        for e in errores:
            print("❌", e)
        sys.exit("No monto la app hasta que se arreglen los ❌.")

    plantilla = open(PLANTILLA, encoding="utf-8").read()
    if len(MARCAS.findall(plantilla)) != 1:
        sys.exit("❌ La plantilla no tiene el bloque de datos (▼ DATOS ▼ … ▲ FIN DE LOS DATOS ▲).")
    bloque = json.dumps(datos, ensure_ascii=False, indent=2)
    app = MARCAS.sub(lambda m: f"{m.group(1)} {bloque} {m.group(2)}", plantilla)

    if len(sys.argv) == 3:
        salida = sys.argv[2]
    else:
        carpeta = "/mnt/user-data/outputs" if os.path.isdir("/mnt/user-data/outputs") else "."
        salida = os.path.join(carpeta, slug(datos["titulo"]) + ".jsx")
    with open(salida, "w", encoding="utf-8") as f:
        f.write(app)

    # Comprobación final: lo montado tiene que leerse igual que los datos.
    if leer(salida) != datos:
        sys.exit("❌ Lo montado no coincide con los datos. No lo entregues.")
    print(f"✅ App montada en {salida} ({len(app) // 1024} KB).")


if __name__ == "__main__":
    main()
