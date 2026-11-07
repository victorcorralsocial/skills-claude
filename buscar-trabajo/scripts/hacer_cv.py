#!/usr/bin/env python3
"""Crea el CV en Word (.docx) a partir de cv.json y avisa de lo que no esté en el CV original.

Uso: python3 hacer_cv.py cv.json salida.docx [--origen origen.txt]

Una columna, títulos reales y sin tablas, para que lo lean bien las personas y los filtros automáticos. Solo usa la
biblioteca estándar de Python. Con --origen compara cifras, fechas, siglas, aptitudes y empresas con el CV original y
las respuestas de la persona: lo que no aparezca es un aviso (salida 3) y hay que quitarlo o preguntarlo.
"""
import json, re, sys, unicodedata, zipfile
from xml.sax.saxutils import escape

NEGRO, GRIS, ACENTO = "1F1F1D", "5E5D59", "B4532F"


def p(texto, estilo=None, extra=""):
    pr = (f'<w:pStyle w:val="{estilo}"/>' if estilo else "") + extra
    return f'<w:p><w:pPr>{pr}</w:pPr>{runs(texto)}</w:p>'


def runs(texto):
    return f'<w:r><w:t xml:space="preserve">{escape(texto)}</w:t></w:r>'


def puesto(e):
    linea = f'{e["puesto"]} · {e["empresa"]}' + (f', {e["lugar"]}' if e.get("lugar") else "")
    fechas = f'<w:r><w:rPr><w:b w:val="0"/><w:color w:val="{GRIS}"/></w:rPr><w:t xml:space="preserve"> · {escape(e.get("fechas", ""))}</w:t></w:r>' if e.get("fechas") else ""
    return f'<w:p><w:pPr><w:pStyle w:val="Puesto"/></w:pPr>{runs(linea)}{fechas}</w:p>'


def lista(texto):
    return p(texto, "Lista", '<w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr>')


def cuerpo(d):
    x = [p(d["nombre"], "Nombre")]
    if d.get("titular"):
        x.append(p(d["titular"], "Titular"))
    if d.get("contacto"):
        x.append(p("  ·  ".join(d["contacto"]), "Contacto"))
    if d.get("resumen"):
        x += [p("Perfil", "Heading1"), p(d["resumen"])]
    if d.get("experiencia"):
        x.append(p("Experiencia", "Heading1"))
        for e in d["experiencia"]:
            x.append(puesto(e))
            x += [lista(l) for l in e.get("logros", [])]
    if d.get("anterior"):
        x.append(p("Trayectoria anterior", "Heading1"))
        x += [p(l) for l in d["anterior"]]
    if d.get("formacion"):
        x.append(p("Formación", "Heading1"))
        for f in d["formacion"]:
            x.append(p(" · ".join(t for t in (f.get("titulo"), f.get("centro"), f.get("fechas")) if t)))
    for clave, titulo in (("aptitudes", "Aptitudes"), ("idiomas", "Idiomas"), ("otros", "Otros datos")):
        if d.get(clave):
            x += [p(titulo, "Heading1"), p(", ".join(d[clave]))]
    return "".join(x)


ESTILOS = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:color w:val="{NEGRO}"/><w:sz w:val="20"/><w:lang w:val="es-ES"/></w:rPr></w:rPrDefault>
<w:pPrDefault><w:pPr><w:spacing w:after="70" w:line="264" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>
<w:style w:type="paragraph" w:styleId="Nombre"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="10"/></w:pPr><w:rPr><w:b/><w:sz w:val="40"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Titular"><w:name w:val="Subtitle"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="30"/></w:pPr><w:rPr><w:color w:val="{ACENTO}"/><w:sz w:val="25"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Contacto"><w:name w:val="Contacto"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="120"/></w:pPr><w:rPr><w:color w:val="{GRIS}"/><w:sz w:val="19"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:pPr><w:keepNext/><w:pBdr><w:bottom w:val="single" w:sz="6" w:space="2" w:color="{ACENTO}"/></w:pBdr><w:spacing w:before="200" w:after="80"/><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:b/><w:color w:val="{ACENTO}"/><w:sz w:val="24"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Puesto"><w:name w:val="Puesto"/><w:basedOn w:val="Normal"/><w:pPr><w:keepNext/><w:spacing w:before="90" w:after="30"/></w:pPr><w:rPr><w:b/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Lista"><w:name w:val="List Bullet"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="40"/></w:pPr></w:style>
</w:styles>'''
NUMERACION = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:abstractNum w:abstractNumId="0"><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="•"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="284" w:hanging="227"/></w:pPr></w:lvl></w:abstractNum><w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num></w:numbering>'''
TIPOS = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/></Types>'''
RELS = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'''
DOC_RELS = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/></Relationships>'''


def crear(d, salida):
    documento = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>{cuerpo(d)}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1000" w:right="1134" w:bottom="1000" w:left="1134" w:header="500" w:footer="500" w:gutter="0"/></w:sectPr></w:body></w:document>'''
    with zipfile.ZipFile(salida, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", TIPOS)
        z.writestr("_rels/.rels", RELS)
        z.writestr("word/document.xml", documento)
        z.writestr("word/styles.xml", ESTILOS)
        z.writestr("word/numbering.xml", NUMERACION)
        z.writestr("word/_rels/document.xml.rels", DOC_RELS)


def plano(t):
    t = unicodedata.normalize("NFD", t.lower())
    return "".join(c for c in t if unicodedata.category(c) != "Mn")


def cifra(t):
    return re.sub(r"[.,\s]", "", t)


def comprobar(d, origen):
    """Devuelve (avisos que hay que resolver, líneas muy distintas del original que hay que leer)."""
    base = plano(origen)
    avisos, distintas = [], []
    for q in d.get("equivalencias", []):
        if plano(q.get("origen", "")) in base and q.get("origen"):
            base += " " + plano(q.get("oferta", ""))
        else:
            avisos.append(f"Equivalencia: «{q.get('origen')}» no está en el origen, así que «{q.get('oferta')}» no se puede dar por hecho")
    todo = plano(json.dumps(d, ensure_ascii=False).split('"equivalencias"')[0].split('"no_tiene"')[0])
    for n in d.get("no_tiene", []):
        if plano(n) in todo:
            avisos.append(f"«{n}» está en el CV, pero la persona ha dicho que no lo tiene")
    raices = {w[:5] for w in re.findall(r"[a-z\u00f1]{5,}", base)}
    cifras = {cifra(c) for c in re.findall(r"\d[\d.,]*\d|\d", base)}
    anios = sorted({int(a) for a in re.findall(r"\b(?:19|20)\d\d\b", base)})
    cifras |= {str(y - x) for x in anios for y in anios if y > x}  # «22 años» sale de 2004 - 2026: es una cuenta, no un invento

    def mira_cifras(t, donde):
        for c in re.findall(r"\d[\d.,]*\d|\d", plano(t)):
            if cifra(c) not in cifras:
                avisos.append(f"{donde}: la cifra o fecha «{c}» no está en el origen → «{t[:70]}»")

    def mira_siglas(t, donde):
        for s in re.findall(r"\b[A-ZÁÉÍÓÚÑ]{2,}[A-Za-z0-9+#/-]*\b|\b[A-Z][a-z]+[A-Z][A-Za-z]*\b", t):
            if plano(s) not in base:
                avisos.append(f"{donde}: «{s}» no está en el origen → «{t[:70]}»")

    def mira_entera(t, donde):
        palabras = [w for w in re.findall(r"[\wáéíóúñü+#/-]{3,}", plano(t))]
        faltan = [w for w in palabras if w not in base]
        if faltan and len(faltan) >= max(1, len(palabras) // 2):
            avisos.append(f"{donde}: «{t[:70]}» no está en el origen (faltan: {', '.join(faltan[:4])})")

    for t, donde in ((d.get("resumen", ""), "Perfil"), (d.get("titular", ""), "Titular")):
        mira_cifras(t, donde); mira_siglas(t, donde)
    for e in d.get("experiencia", []):
        for campo in ("empresa",):
            mira_entera(e.get(campo, ""), "Empresa")
        mira_cifras(e.get("fechas", ""), "Fechas")
        for l in e.get("logros", []):
            mira_cifras(l, "Logro"); mira_siglas(l, "Logro")
            pal = re.findall(r"[a-z\u00f1]{5,}", plano(l))
            if pal and sum(w[:5] not in raices for w in pal) / len(pal) > 0.5:
                distintas.append(l)
    for l in d.get("anterior", []):
        mira_cifras(l, "Trayectoria"); mira_entera(l, "Trayectoria")
    for f in d.get("formacion", []):
        for k in ("titulo", "centro"):
            if f.get(k):
                mira_entera(f[k], "Formación")
        if f.get("fechas"):
            mira_cifras(f["fechas"], "Formación")
    for clave, donde in (("aptitudes", "Aptitud"), ("idiomas", "Idioma"), ("otros", "Otros")):
        for t in d.get(clave, []):
            mira_cifras(t, donde); mira_entera(t, donde)
    return avisos, distintas


def main():
    a = sys.argv[1:]
    if len(a) < 2:
        sys.exit(__doc__)
    d = json.load(open(a[0], encoding="utf-8"))
    for c in ("nombre", "experiencia"):
        if not d.get(c):
            sys.exit(f"Falta «{c}» en {a[0]}")
    crear(d, a[1])
    print(f"✔ CV creado: {a[1]}")
    if "--origen" in a:
        avisos, distintas = comprobar(d, open(a[a.index("--origen") + 1], encoding="utf-8").read())
        if distintas:
            print("👀 Líneas muy distintas del original. Comprueba que las ha hecho de verdad:")
            for x in distintas:
                print("  -", x)
        if avisos:
            print(f"⚠️  {len(avisos)} dato(s) que no están en el CV original ni en las respuestas. Quítalos o pregúntalos:")
            for x in avisos:
                print("  -", x)
            sys.exit(3)
        print("✔ Todo lo comprobado está en el origen.")
    else:
        print("⚠️  Sin --origen: no se ha comprobado que no haya nada inventado.")


if __name__ == "__main__":
    main()
