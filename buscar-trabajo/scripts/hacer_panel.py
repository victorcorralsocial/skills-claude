#!/usr/bin/env python3
"""Calcula la nota de cada oferta y crea el panel de resultados (una página HTML sin dependencias).

Uso: python3 hacer_panel.py resultado.json panel.html

La nota la calcula este script (references/nota.md). Imprime una línea por oferta: esas son las notas que valen.
"""
import html, json, sys

PESOS = {"imprescindible": 3, "importante": 2, "deseable": 1}
CUMPLE = {"si": 1, "parcial": 0.5, "sin_dato": 0.25, "no": 0}
CONDICION = {"encaja", "duda", "no"}
ESTADOS = {"tienes": "Lo tienes", "no_lo_cuentas": "No lo cuentas", "te_falta": "Te falta", "por_aclarar": "Por aclarar"}
VEREDICTOS = {"apuntate": "Apúntate", "depende": "Depende", "no": "No te apuntes", "fraude": "Ni te acerques"}
ICONO = {"si": "✓", "parcial": "≈", "sin_dato": "?", "no": "✕"}
TEXTO_CUMPLE = {"si": "Lo tienes", "parcial": "A medias", "sin_dato": "Tu CV no lo dice", "no": "No lo tienes"}


def puntuar(o):
    """Devuelve (nota, veredicto, motivos del tope)."""
    reqs = o.get("requisitos") or []
    if any(a.get("tipo") == "fraude" for a in o.get("alertas") or []):
        return 1.0, "fraude", []
    if not reqs:
        sys.exit(f"La oferta «{o.get('puesto')}» no tiene requisitos: léela entera antes de puntuarla.")
    for r in reqs:
        if r.get("peso") not in PESOS or r.get("cumple") not in CUMPLE:
            sys.exit(f"Requisito mal escrito en «{o.get('puesto')}»: {r}")
    maximo = sum(PESOS[r["peso"]] for r in reqs)
    logrado = sum(PESOS[r["peso"]] * CUMPLE[r["cumple"]] for r in reqs)
    nota, tope, motivos = 1 + 4 * logrado / maximo, 5.0, []
    for r in reqs:
        if r["peso"] == "imprescindible" and r["cumple"] == "no":
            tope = min(tope, 2.5); motivos.append(f"Imprescindible que no tienes: {r['texto']}")
        elif r["peso"] == "imprescindible" and r["cumple"] == "sin_dato":
            tope = min(tope, 3.5); motivos.append(f"Hay que aclarar: {r['texto']}")
    for k, v in (o.get("condiciones") or {}).items():
        if v not in CONDICION:
            sys.exit(f"Condición mal escrita en «{o.get('puesto')}»: {k}={v}")
        if v == "no":
            tope = min(tope, 2.5); motivos.append(f"No te encaja: {k}")
    central = [r for r in reqs if r["peso"] != "deseable"]
    peso_central = sum(PESOS[r["peso"]] for r in central)
    if peso_central and sum(PESOS[r["peso"]] for r in central if r["cumple"] == "no") / peso_central >= 0.5:
        tope = min(tope, 2.9); motivos.append("Te falta el centro del puesto")
    if len(reqs) < 3:
        tope = min(tope, 3.9); motivos.append("El anuncio dice muy poco")
    nota = round(min(nota, tope), 1)
    return nota, ("apuntate" if nota >= 4 else "depende" if nota >= 3 else "no"), motivos


def e(t):
    return html.escape(str(t if t is not None else ""), quote=True)


def num(n):
    return f"{n:.1f}".replace(".", ",")


def tarjeta(o, i):
    datos = " · ".join(e(o[k]) for k in ("lugar", "modalidad", "contrato", "salario") if o.get(k))
    filas = "".join(
        f'<li class="req {e(r["cumple"])}"><span class="ico" aria-hidden="true">{ICONO[r["cumple"]]}</span><div><b>{e(r["texto"])}</b> <span class="peso">{e(r["peso"])}</span>'
        f'<small><span class="estado">{TEXTO_CUMPLE[r["cumple"]]}.</span> {e(r.get("evidencia"))}</small>'
        + (f'<small class="cita">«{e(r["cita"])}»</small>' if r.get("cita") else "") + "</div></li>"
        for r in sorted(o.get("requisitos") or [], key=lambda r: (CUMPLE[r["cumple"]], -PESOS[r["peso"]]))
    )
    alertas = "".join(f'<p class="alerta {e(a.get("tipo"))}">{"⛔" if a.get("tipo") == "fraude" else "⚠️"} {e(a.get("texto"))}</p>' for a in o.get("alertas") or [])
    tope = "".join(f"<li>{e(m)}</li>" for m in o["_motivos"])
    enlace = f'<a class="ver" href="{e(o["enlace"])}" target="_blank" rel="noopener noreferrer">Ver la oferta ↗</a>' if str(o.get("enlace", "")).startswith("http") and o["_v"] != "fraude" else ""
    pie = " · ".join(t for t in (e(o.get("fuente")), f'publicada: {e(o["publicada"])}' if o.get("publicada") else "") if t)
    return f'''<article class="oferta {o["_v"]}" data-v="{o["_v"]}">
  <div class="nota"><strong>{num(o["_nota"])}</strong><span>de 5</span></div>
  <div class="cuerpo">
    <span class="veredicto">{VEREDICTOS[o["_v"]]}</span>
    <h3>{e(o.get("puesto"))}</h3>
    <p class="empresa">{e(o.get("empresa"))}</p>
    <p class="datos">{datos}</p>
    <p class="motivo">{e(o.get("motivo"))}</p>
    {f'<p class="hacer"><b>Qué hacer:</b> {e(o["que_hacer"])}</p>' if o.get("que_hacer") else ""}
    {alertas}
    {f'<ul class="topes">{tope}</ul>' if tope else ""}
    {f'<details id="d{i}"><summary>Requisito por requisito</summary><ul class="reqs">{filas}</ul></details>' if filas else ""}
    <p class="pie">{enlace}<span>{pie}</span></p>
  </div>
</article>'''


CSS = """
:root{--papel:#FAF9F5;--papel2:#F0EEE6;--tinta:#191917;--suave:#62615C;--linea:#DEDBD0;--acento:#C6613F;--si:#3F7D4E;--medio:#A9791C;--no:#B8433B;--tarjeta:#FFFFFF;--sobre-nota:#FFFFFF;--f-t:Georgia,"Times New Roman",serif;--f-c:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--papel:#1B1A18;--papel2:#262521;--tinta:#EFEDE5;--suave:#A9A69C;--linea:#3A3833;--acento:#E08A6D;--si:#7FC08E;--medio:#DDB25C;--no:#E8867E;--tarjeta:#232220;--sobre-nota:#141413;color-scheme:dark}}
:root[data-theme="dark"]{--papel:#1B1A18;--papel2:#262521;--tinta:#EFEDE5;--suave:#A9A69C;--linea:#3A3833;--acento:#E08A6D;--si:#7FC08E;--medio:#DDB25C;--no:#E8867E;--tarjeta:#232220;--sobre-nota:#141413;color-scheme:dark}
*{box-sizing:border-box}body{margin:0;background:var(--papel);color:var(--tinta);font:16px/1.5 var(--f-c);padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:0 56px}
.hoja{max-width:760px;margin:0 auto;display:flex;flex-direction:column;gap:30px}header{padding-top:34px;display:flex;flex-direction:column;gap:6px}h1,h2,h3{font-family:var(--f-t);font-weight:500;margin:0;text-wrap:balance;line-height:1.2}h1{font-size:clamp(30px,7vw,44px)}h1 em{color:var(--acento)}h2{font-size:25px}h3{font-size:21px}p{margin:0}.sub{color:var(--suave);font-size:15px}
.cifras{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.cifra{border:0;background:var(--tarjeta);box-shadow:0 0 0 1px var(--linea);border-radius:12px;padding:12px 14px;text-align:left;color:inherit;font:inherit;cursor:pointer;display:flex;flex-direction:column;min-width:0}.cifra strong{font:500 34px/1.1 var(--f-t)}.cifra span{font-size:13.5px;color:var(--suave)}.cifra.apuntate strong{color:var(--si)}.cifra.depende strong{color:var(--medio)}.cifra.no strong{color:var(--no)}.cifra[aria-pressed="true"]{box-shadow:0 0 0 2px var(--acento)}.cifra:focus-visible,summary:focus-visible,a:focus-visible{outline:2px solid var(--acento);outline-offset:2px}
section{display:flex;flex-direction:column;gap:12px}.lista{display:flex;flex-direction:column;gap:10px}
.oferta{display:grid;grid-template-columns:76px minmax(0,1fr);gap:14px;background:var(--tarjeta);border-radius:14px;box-shadow:0 0 0 1px var(--linea);padding:16px}.oferta[hidden]{display:none}.nota{display:flex;flex-direction:column;align-items:center;justify-content:center;align-self:start;height:76px;border-radius:12px;color:var(--sobre-nota)}.nota strong{font:500 30px/1 var(--f-t)}.nota span{font-size:11.5px;opacity:.9}.apuntate .nota{background:var(--si)}.depende .nota{background:var(--medio)}.no .nota{background:var(--no)}.fraude .nota{background:var(--tinta);color:var(--papel)}
.cuerpo{display:flex;flex-direction:column;gap:5px;min-width:0}.veredicto{font-size:12px;font-weight:700;letter-spacing:.07em;text-transform:uppercase}.apuntate .veredicto{color:var(--si)}.depende .veredicto{color:var(--medio)}.no .veredicto{color:var(--no)}.empresa{font-weight:600}.datos,.pie span{color:var(--suave);font-size:14px}.motivo{margin-top:4px}.hacer{font-size:15px}.alerta{font-size:14.5px;background:var(--papel2);border-radius:8px;padding:6px 10px}.topes{margin:0;padding-left:18px;font-size:14px;color:var(--no)}
details{margin-top:4px}summary{cursor:pointer;font-size:14px;font-weight:600;color:var(--acento)}.reqs{list-style:none;margin:8px 0 0;padding:0;display:flex;flex-direction:column;gap:9px}.req{display:grid;grid-template-columns:24px minmax(0,1fr);gap:8px;font-size:14.5px}.ico{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--sobre-nota);font-size:12px;font-weight:700;background:var(--medio)}.req.si .ico{background:var(--si)}.req.no .ico{background:var(--no)}.req.sin_dato .ico{background:var(--suave)}.peso{font-size:11.5px;color:var(--suave)}.req small{display:block;font-size:13.5px;color:var(--suave)}.req .estado{color:var(--tinta);font-weight:600}.cita{font-style:italic}
.pie{display:flex;flex-wrap:wrap;gap:6px 14px;align-items:center;margin-top:6px}.ver{font-weight:600;color:var(--acento);text-underline-offset:3px}
.titulos{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}.titulos b{font-weight:600}.titulos span{color:var(--suave);font-size:14.5px}
.modelo{background:var(--papel2);border-radius:14px;padding:18px;display:flex;flex-direction:column;gap:8px}.modelo .eti{font-size:12px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--suave)}.modelo h3{font-size:22px}.modelo ul{margin:0;padding-left:20px;display:flex;flex-direction:column;gap:4px}
.piden{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px}.pide{display:flex;flex-direction:column;gap:4px}.pide-c{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}.pide-c b{font-weight:600}.etq{font-size:12.5px;font-weight:600}.tienes .etq{color:var(--si)}.no_lo_cuentas .etq{color:var(--medio)}.te_falta .etq{color:var(--no)}.por_aclarar .etq{color:var(--suave)}.barra{height:8px;border-radius:4px;background:var(--papel2);overflow:hidden}.barra i{display:block;height:100%;background:var(--si)}.no_lo_cuentas .barra i{background:var(--medio)}.te_falta .barra i{background:var(--no)}.por_aclarar .barra i{background:var(--suave)}.pide small{color:var(--suave);font-size:13.5px}
.cv{background:var(--tarjeta);box-shadow:0 0 0 1px var(--linea);border-radius:14px;padding:16px;display:flex;flex-direction:column;gap:8px}.cv ul{margin:0;padding-left:20px}footer{color:var(--suave);font-size:13.5px}
"""
JS = """document.querySelectorAll('.cifra').forEach(function(b){b.addEventListener('click',function(){var on=b.getAttribute('aria-pressed')==='true';document.querySelectorAll('.cifra').forEach(function(x){x.setAttribute('aria-pressed','false')});if(!on)b.setAttribute('aria-pressed','true');var v=on?null:b.dataset.v;document.querySelectorAll('.oferta').forEach(function(o){o.hidden=v&&!(o.dataset.v===v||(v==='no'&&o.dataset.v==='fraude'))})})});"""


def pagina(d, ofertas):
    total = sum(o["_v"] != "fraude" for o in ofertas)
    cuenta = {k: sum(o["_v"] == k for o in ofertas) for k in VEREDICTOS}
    cifras = "".join(
        f'<button class="cifra {k}" data-v="{k}" aria-pressed="false" type="button"><strong>{n}</strong><span>{t}</span></button>'
        for k, n, t in (("apuntate", cuenta["apuntate"], "Apúntate"), ("depende", cuenta["depende"], "Depende"), ("no", cuenta["no"] + cuenta["fraude"], "No te apuntes"))
    )
    titulos = "".join(f'<li><b>{e(t.get("titulo"))}</b><br><span>{e(t.get("por_que"))}</span></li>' for t in d.get("titulos") or [])
    sec_tit = f'<section><h2>Puestos a los que puedes optar</h2><ul class="titulos">{titulos}</ul></section>' if titulos else ""
    ideal = d.get("cv_ideal") or {}
    piden = "".join(
        f'<li class="pide {e(p.get("estado"))}"><div class="pide-c"><b>{e(p.get("que"))}</b><span class="etq">{ESTADOS.get(p.get("estado"), "")} · en {e(p.get("n"))} de {total}</span></div>'
        f'<div class="barra"><i style="width:{min(100, round(100 * int(p.get("n", 0)) / max(total, 1)))}%"></i></div>'
        + (f'<small>{e(p["nota"])}</small>' if p.get("nota") else "") + "</li>"
        for p in sorted(ideal.get("piden") or [], key=lambda p: -int(p.get("n", 0)))
    )
    logros = "".join(f"<li>{e(l)}</li>" for l in ideal.get("logros") or [])
    sec_ideal = f'''<section><h2>El CV ideal para este puesto</h2><p class="sub">Sacado de las {total} ofertas válidas que he leído. Es un modelo: no es el CV de nadie.</p>
    <ul class="piden">{piden}</ul>
    <div class="modelo"><span class="eti">Modelo</span><h3>{e(ideal.get("titular"))}</h3><p>{e(ideal.get("resumen"))}</p>{f"<ul>{logros}</ul>" if logros else ""}</div></section>''' if ideal else ""
    cv = d.get("cv_adaptado") or {}
    sec_cv = ""
    if cv:
        cambios = "".join(f"<li>{e(c)}</li>" for c in cv.get("cambios") or [])
        revisar = "".join(f"<li>{e(c)}</li>" for c in cv.get("revisar") or [])
        sec_cv = f'''<section><h2>Tu CV, adaptado</h2><div class="cv"><p>Para <b>{e(cv.get("oferta"))}</b>{f": <b>{e(cv['archivo'])}</b>" if cv.get("archivo") else ""}</p>
        {f"<p><b>Qué ha cambiado</b></p><ul>{cambios}</ul>" if cambios else ""}{f"<p><b>Revísalo antes de enviar</b></p><ul>{revisar}</ul>" if revisar else ""}</div></section>'''
    fuentes = ", ".join(e(f) for f in d.get("fuentes") or [])
    return f'''<title>Tus ofertas de trabajo</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="viewport" content="width=device-width,initial-scale=1"><style>{CSS}</style>
<div class="hoja">
<header><p class="sub">{e(d.get("persona"))}{" · " if d.get("persona") else ""}{e(d.get("fecha"))}</p><h1>{e(d.get("objetivo") or "Tus ofertas")}: <em>{len(ofertas)} ofertas leídas</em></h1><p class="sub">De dónde salen: {fuentes or "las indicadas"}. Puntuadas requisito por requisito frente a tu CV.</p></header>
<div class="cifras">{cifras}</div>
{sec_tit}
<section><h2>Las ofertas, de mejor a peor</h2><div class="lista">{"".join(tarjeta(o, i) for i, o in enumerate(ofertas))}</div></section>
{sec_ideal}
{sec_cv}
<footer>La nota mide cómo encaja lo que dice tu CV con lo que dice la oferta. No predice si te van a llamar. Antes de enviar, abre el enlace y comprueba que la oferta sigue abierta.</footer>
</div>
<script>{JS}</script>'''


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    d = json.load(open(sys.argv[1], encoding="utf-8"))
    ofertas = d.get("ofertas") or []
    if not ofertas:
        sys.exit("No hay ofertas en el archivo.")
    for o in ofertas:
        o["_nota"], o["_v"], o["_motivos"] = puntuar(o)
    ofertas.sort(key=lambda o: -o["_nota"])
    open(sys.argv[2], "w", encoding="utf-8").write(pagina(d, ofertas))
    for o in ofertas:
        print(f'{num(o["_nota"])}  {VEREDICTOS[o["_v"]]:<15} {o.get("puesto")} · {o.get("empresa")}' + (f'  [{"; ".join(o["_motivos"])}]' if o["_motivos"] else ""))
    print(f"✔ Panel creado: {sys.argv[2]}")


if __name__ == "__main__":
    main()
