import React, { useState, useEffect, useRef } from "react";
/* Sin más dependencias: los iconos y los gráficos van dentro, para que la app no dependa
   de las versiones de las librerías del entorno de los artifacts. */

/* ════════════════════════════════════════════════════════════════════════
   DATOS DEL LIBRO: lo único que se cambia (JSON válido, sin comentarios dentro).
   Guía de cada campo: references/contenido.md · Herramientas: references/herramientas.md
   herramienta.tipo:
     "puntuacion" → instruccion, valores: [3 textos]
     "escalas"    → dimensiones: [{ nombre, bajo, alto }] (4 a 7)
     "matriz"     → ejeX: { nombre, si, no }, ejeY: { nombre, si, no }, cuadrantes: 4 × { nombre, consejo }
                    en este orden: (X sí, Y sí), (X no, Y sí), (X sí, Y no), (X no, Y no)
     "pasos"      → pasos: [{ pregunta, ayuda }], resultado: { titulo, instruccion }
     "propia"     → escribe HerramientaPropia (abajo)
   ════════════════════════════════════════════════════════════════════════ */
const LIBRO = /* ▼ DATOS ▼ */ {
  "titulo": "Título del libro (EJEMPLO)",
  "autor": "Nombre del autor",
  "anio": 2020,
  "acento": "#1F4E79",
  "ideaCentral": "La idea central del libro en una frase que entendería un niño de 12 años.",
  "enTreintaSegundos": ["Primera frase del libro en 30 segundos.", "Segunda frase.", "Tercera frase."],
  "ideas": [
    { "id": "i1", "nombre": "Nombre corto", "dice": "Qué dice la idea, en dos frases como mucho.", "hoy": "Cómo aplicarla hoy en menos de 5 minutos.", "confianza": 3, "fuentes": [0, 1], "conecta": ["i2"] },
    { "id": "i2", "nombre": "Otra idea", "dice": "Qué dice esta otra idea.", "hoy": "Cómo aplicarla hoy.", "confianza": 2, "fuentes": [1, 2], "conecta": [] }
  ],
  "fuentes": [
    { "tipo": "autor", "titulo": "Web del autor", "url": "https://example.com" },
    { "tipo": "resumen", "titulo": "Resumen en un sitio serio", "url": "https://example.com" },
    { "tipo": "lectores", "titulo": "Hilo de Reddit", "url": "https://example.com" }
  ],
  "bienvenida": {
    "cambiar": [
      { "texto": "Una cosa que se puede querer cambiar con este libro", "compromiso": "Soy una persona que…", "ideas": ["i1"] },
      { "texto": "Otra", "compromiso": "Soy una persona que…", "ideas": ["i2"] }
    ],
    "escala": { "pregunta": "¿Cómo de bien se te da hoy esto?", "bajo": "Cómo está quien empieza", "alto": "Cómo está quien ya lo domina" }
  },
  "acciones": [
    { "idea": "i1", "corta": "Acción concreta de 2 minutos.", "larga": "Acción concreta de 5 a 10 minutos." },
    { "idea": "i2", "corta": "Otra acción de 2 minutos.", "larga": "Otra acción de 5 a 10 minutos." }
  ],
  "modulos": ["herramienta", "habitos"],
  "herramienta": {
    "nombre": "Nombre de la herramienta del libro",
    "corto": "Herramienta",
    "explicacion": "Para qué sirve, tal como la plantea el autor, en dos frases.",
    "tipo": "puntuacion",
    "instruccion": "Apunta lo que haces en un día normal y valóralo.",
    "valores": ["Me ayuda", "Neutro", "Me frena"]
  },
  "tecnicas": [
    { "nombre": "Técnica del libro", "como": "Cómo se aplica a un hábito, en una frase.", "pregunta": "¿Después de qué lo harás?", "plantilla": "Después de {respuesta}, {habito}." }
  ],
  "diario": ["Pregunta del diario inspirada en el libro", "Otra pregunta"],
  "chatEjemplos": ["Situación de ejemplo 1", "Situación de ejemplo 2", "Situación de ejemplo 3"]
} /* ▲ FIN DE LOS DATOS ▲ */;

/* Solo si herramienta.tipo === "propia": la herramienta hecha a medida con las mismas piezas
   (Panel, Rotulo, Boton, Campo, colores C y A). Guarda con guarda({ ... }). */
function HerramientaPropia({ datos, guarda, hoy }) {
  return null;
}

/* ─── Estilo fijo: papel blanco, tinta, y el libro como lomo de color ─── */
const C = { fondo: "#F3F4F6", papel: "#FFFFFF", tinta: "#14161B", suave: "#5D6371", linea: "#E2E4E9", bien: "#157F3D", mal: "#B42318" };
const A = LIBRO.acento;
const alfa = (hex, a) => hex + Math.round(a * 255).toString(16).padStart(2, "0");
const QUIETO = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ─── Fechas y datos ─── */
const CLAVE = "libro-app:" + LIBRO.titulo.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-");
const fechaISO = (d = new Date()) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const sumarDias = (iso, n) => { const d = new Date(iso + "T12:00:00"); d.setDate(d.getDate() + n); return fechaISO(d); };
const diasEntre = (a, b) => Math.round((new Date(b + "T12:00:00") - new Date(a + "T12:00:00")) / 86400000);
const fechaLarga = (iso, o = { weekday: "long", day: "numeric", month: "long" }) => { const t = new Date(iso + "T12:00:00").toLocaleDateString("es-ES", o); return t.charAt(0).toUpperCase() + t.slice(1); };
const idea = (id) => LIBRO.ideas.find((i) => i.id === id);
const tiene = (m) => LIBRO.modulos.includes(m);
const VACIO = { perfil: null, hechos: {}, habitos: [], diario: {}, herramienta: {}, chat: [], hitos: [], escalas: [], ultimaVisita: null, visitaAnterior: null };
const esObjeto = (x) => x && typeof x === "object" && !Array.isArray(x);
/* Lo guardado puede venir de otra versión o estar a medias: se limpia antes de usarlo. */
function normalizar(d) {
  if (!esObjeto(d)) return { ...VACIO };
  const p = esObjeto(d.perfil) && typeof d.perfil.nombre === "string" ? d.perfil : null;
  const perfil = p && {
    nombre: p.nombre, cambiar: Array.isArray(p.cambiar) ? p.cambiar.filter((i) => Number.isInteger(i) && i >= 0 && i < LIBRO.bienvenida.cambiar.length) : [],
    otra: typeof p.otra === "string" ? p.otra : "", motivo: typeof p.motivo === "string" ? p.motivo : "",
    escala: Number(p.escala) || 5, tiempo: [2, 5, 15].includes(p.tiempo) ? p.tiempo : 5,
    momento: ["mañana", "tarde", "noche"].includes(p.momento) ? p.momento : "mañana", inicio: typeof p.inicio === "string" ? p.inicio : fechaISO(),
  };
  const hechos = {};
  if (esObjeto(d.hechos)) Object.keys(d.hechos).forEach((f) => { const i = d.hechos[f]; if (Number.isInteger(i) && i >= 0 && i < LIBRO.acciones.length) hechos[f] = i; });
  return {
    ...VACIO, perfil, hechos,
    habitos: Array.isArray(d.habitos) ? d.habitos.filter((h) => esObjeto(h) && typeof h.nombre === "string").map((h) => ({ ...h, tecnica: Number.isInteger(h.tecnica) && h.tecnica < LIBRO.tecnicas.length ? h.tecnica : 0, dias: esObjeto(h.dias) ? h.dias : {} })) : [],
    diario: esObjeto(d.diario) ? d.diario : {}, herramienta: esObjeto(d.herramienta) ? d.herramienta : {},
    chat: Array.isArray(d.chat) ? d.chat.filter((m) => esObjeto(m) && typeof m.texto === "string") : [],
    hitos: Array.isArray(d.hitos) ? d.hitos : [], escalas: Array.isArray(d.escalas) ? d.escalas.filter((x) => esObjeto(x) && x.fecha && Number(x.valor)) : [],
    ultimaVisita: typeof d.ultimaVisita === "string" ? d.ultimaVisita : null,
  };
}

function cumplidos(e) {
  const dias = {};
  Object.keys(e.hechos).forEach((d) => { dias[d] = true; });
  e.habitos.forEach((h) => Object.keys(h.dias || {}).forEach((d) => { if (h.dias[d]) dias[d] = true; }));
  return dias;
}
function racha(dias, hoy) {
  let d = dias[hoy] ? hoy : sumarDias(hoy, -1), n = 0;
  while (dias[d]) { n++; d = sumarDias(d, -1); }
  return n;
}
function record(dias) {
  let mejor = 0, actual = 0, previo = null;
  for (const d of Object.keys(dias).filter((x) => dias[x]).sort()) { actual = previo && sumarDias(previo, 1) === d ? actual + 1 : 1; mejor = Math.max(mejor, actual); previo = d; }
  return mejor;
}
function practicadas(e) {
  const n = {};
  Object.values(e.hechos).forEach((i) => { const a = LIBRO.acciones[i]; if (a) n[a.idea] = (n[a.idea] || 0) + 1; });
  return n;
}
const planHabito = (hb) => {
  const t = LIBRO.tecnicas[hb.tecnica];
  if (!t || !t.plantilla || !hb.respuesta) return null;
  const x = t.plantilla.replace("{respuesta}", hb.respuesta).replace("{habito}", hb.nombre.toLowerCase());
  return x.charAt(0).toUpperCase() + x.slice(1);
};

/* Almacenamiento persistente del artifact (personal). Sin publicar no guarda: la app sigue y avisa. */
const almacen = {
  async leer() {
    try { if (!window.storage) return null; const r = await window.storage.get(CLAVE); return r && r.value ? JSON.parse(r.value) : null; } catch { return null; }
  },
  async guardar(datos) {
    try { if (!window.storage) return false; await window.storage.set(CLAVE, JSON.stringify(datos)); return true; } catch { return false; }
  },
  async funciona() {
    try {
      if (!window.storage) return false;
      const v = String(Date.now());
      await window.storage.set(CLAVE + ":prueba", v);
      const r = await window.storage.get(CLAVE + ":prueba");
      return !!r && r.value === v;
    } catch { return false; }
  },
};
async function preguntarIA(prompt) {
  if (!window.claude || !window.claude.complete) throw new Error("sin IA");
  return (await window.claude.complete(prompt)).trim();
}

/* ─── Iconos (trazos de Lucide, licencia ISC) ─── */
const ICONOS = {"sol":[["circle",{"cx":"12","cy":"12","r":"4"}],["path",{"d":"M12 2v2"}],["path",{"d":"M12 20v2"}],["path",{"d":"m4.93 4.93 1.41 1.41"}],["path",{"d":"m17.66 17.66 1.41 1.41"}],["path",{"d":"M2 12h2"}],["path",{"d":"M20 12h2"}],["path",{"d":"m6.34 17.66-1.41 1.41"}],["path",{"d":"m19.07 4.93-1.41 1.41"}]],"libro":[["path",{"d":"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"}],["path",{"d":"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"}]],"barras":[["line",{"x1":"18","x2":"18","y1":"20","y2":"10"}],["line",{"x1":"12","x2":"12","y1":"20","y2":"4"}],["line",{"x1":"6","x2":"6","y1":"20","y2":"14"}]],"menu":[["line",{"x1":"4","x2":"20","y1":"12","y2":"12"}],["line",{"x1":"4","x2":"20","y1":"6","y2":"6"}],["line",{"x1":"4","x2":"20","y1":"18","y2":"18"}]],"check":[["polyline",{"points":"20 6 9 17 4 12"}]],"llama":[["path",{"d":"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"}]],"ajustes":[["path",{"d":"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"}],["circle",{"cx":"12","cy":"12","r":"3"}]],"enlaceExterno":[["path",{"d":"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}],["polyline",{"points":"15 3 21 3 21 9"}],["line",{"x1":"10","x2":"21","y1":"14","y2":"3"}]],"chat":[["path",{"d":"m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"}]],"lapiz":[["path",{"d":"M12 20h9"}],["path",{"d":"M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"}]],"diana":[["circle",{"cx":"12","cy":"12","r":"10"}],["circle",{"cx":"12","cy":"12","r":"6"}],["circle",{"cx":"12","cy":"12","r":"2"}]],"mas":[["path",{"d":"M5 12h14"}],["path",{"d":"M12 5v14"}]],"papelera":[["path",{"d":"M3 6h18"}],["path",{"d":"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{"d":"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],["line",{"x1":"10","x2":"10","y1":"11","y2":"17"}],["line",{"x1":"14","x2":"14","y1":"11","y2":"17"}]],"enviar":[["path",{"d":"m22 2-7 20-4-9-9-4Z"}],["path",{"d":"M22 2 11 13"}]],"atras":[["path",{"d":"m15 18-6-6 6-6"}]],"cerrar":[["path",{"d":"M18 6 6 18"}],["path",{"d":"m6 6 12 12"}]],"llave":[["path",{"d":"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"}]],"chispas":[["path",{"d":"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"}],["path",{"d":"M5 3v4"}],["path",{"d":"M19 17v4"}],["path",{"d":"M3 5h4"}],["path",{"d":"M17 19h4"}]],"enlace":[["path",{"d":"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}],["path",{"d":"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]]};
function Icono({ n, size = 24, color = "currentColor", strokeWidth = 2, className = "", style }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      {(ICONOS[n] || []).map(([Tag, attrs], i) => <Tag key={i} {...attrs} />)}
    </svg>
  );
}
const icono = (n) => (props) => <Icono n={n} {...props} />;
const Sun = icono("sol"), BookOpen = icono("libro"), BarChart2 = icono("barras"), Menu = icono("menu"), Check = icono("check"),
  Flame = icono("llama"), Settings = icono("ajustes"), ExternalLink = icono("enlaceExterno"), MessageCircle = icono("chat"),
  Edit3 = icono("lapiz"), Target = icono("diana"), Plus = icono("mas"), Trash2 = icono("papelera"), Send = icono("enviar"),
  ChevronLeft = icono("atras"), X = icono("cerrar"), Wrench = icono("llave"), Sparkles = icono("chispas"), Link = icono("enlace");

/* ─── Gráficos en SVG ─── */
function GraficoBarras({ datos, max, alto = 220 }) {
  const W = 400, H = alto, abajo = 24, ancho = W / datos.length;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Días cumplidos por semana">
      {datos.map((d, i) => {
        const h = max ? ((H - abajo - 18) * d.valor) / max : 0;
        return (
          <g key={i}>
            <rect x={i * ancho + ancho * 0.18} y={H - abajo - h} width={ancho * 0.64} height={Math.max(h, 0)} rx="7" fill={A} />
            {d.valor > 0 && <text x={i * ancho + ancho / 2} y={H - abajo - h - 6} textAnchor="middle" fontSize="12" fontWeight="700" fill={C.tinta}>{d.valor}</text>}
            <text x={i * ancho + ancho / 2} y={H - 6} textAnchor="middle" fontSize="12" fill={C.suave}>{d.etiqueta}</text>
          </g>
        );
      })}
      <line x1="0" y1={H - abajo} x2={W} y2={H - abajo} stroke={C.linea} />
    </svg>
  );
}
function GraficoLinea({ datos, min, max, alto = 200 }) {
  const W = 400, H = alto, m = 28, n = datos.length;
  const x = (i) => (n === 1 ? W / 2 : m + ((W - 2 * m) * i) / (n - 1));
  const y = (v) => H - m - ((H - 2 * m) * (v - min)) / (max - min);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Evolución semanal">
      <line x1={m} y1={H - m} x2={W - m} y2={H - m} stroke={C.linea} />
      <polyline points={datos.map((d, i) => `${x(i)},${y(d.valor)}`).join(" ")} fill="none" stroke={A} strokeWidth="3" strokeLinejoin="round" />
      {datos.map((d, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(d.valor)} r="5" fill={A} />
          <text x={x(i)} y={y(d.valor) - 10} textAnchor="middle" fontSize="12" fontWeight="700" fill={C.tinta}>{d.valor}</text>
          <text x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill={C.suave}>{d.etiqueta}</text>
        </g>
      ))}
    </svg>
  );
}
function GraficoRadar({ ejes, series, max = 10 }) {
  const W = 360, H = 320, cx = W / 2, cy = H / 2 + 6, r = 105, n = ejes.length;
  const punto = (i, v) => { const a = -Math.PI / 2 + (2 * Math.PI * i) / n; return [cx + r * (v / max) * Math.cos(a), cy + r * (v / max) * Math.sin(a)]; };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Tu resultado por dimensiones">
      {[0.25, 0.5, 0.75, 1].map((k) => <polygon key={k} points={ejes.map((_, i) => punto(i, max * k).join(",")).join(" ")} fill="none" stroke={C.linea} />)}
      {ejes.map((e, i) => {
        const [x, y] = punto(i, max), [tx, ty] = punto(i, max * 1.2);
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={C.linea} />
            <text x={tx} y={ty + 4} textAnchor={Math.abs(tx - cx) < 8 ? "middle" : tx > cx ? "start" : "end"} fontSize="12" fill={C.suave}>{e}</text>
          </g>
        );
      })}
      {series.map((s, k) => (
        <polygon key={k} points={s.valores.map((v, i) => punto(i, v).join(",")).join(" ")} fill={s.color} fillOpacity={s.opacidad} stroke={s.color} strokeWidth="2" />
      ))}
    </svg>
  );
}

/* ─── Piezas ─── */
const Estilos = () => (
  <style>{`
    :focus-visible { outline: 3px solid ${A}; outline-offset: 2px; }
    @keyframes chispa { 0% { transform: translate(0,0) scale(1); opacity: 1 } 100% { transform: translate(var(--x), var(--y)) scale(.3); opacity: 0 } }
    @keyframes entra { 0% { transform: scale(.6) } 60% { transform: scale(1.12) } 100% { transform: scale(1) } }
    @keyframes sube { from { transform: translateY(8px); opacity: 0 } to { transform: none; opacity: 1 } }
    @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important } }
    /* El Tailwind de los artifacts no trae todas las clases md:. Estas son las que usa la app, por si faltan. */
    @media (min-width: 768px) {
      .md\\:flex { display: flex } .md\\:hidden { display: none } .md\\:flex-col { flex-direction: column }
      .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) } .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) }
      .md\\:grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)) } .md\\:grid-cols-10 { grid-template-columns: repeat(10, minmax(0, 1fr)) }
      .md\\:col-span-2 { grid-column: span 2 / span 2 } .md\\:col-span-3 { grid-column: span 3 / span 3 }
      .md\\:p-8 { padding: 2rem } .md\\:p-10 { padding: 2.5rem } .md\\:py-3 { padding-top: .75rem; padding-bottom: .75rem }
      .md\\:pb-12 { padding-bottom: 3rem } .md\\:pl-8 { padding-left: 2rem } .md\\:mb-9 { margin-bottom: 2.25rem } .md\\:bottom-6 { bottom: 1.5rem }
      .md\\:w-24 { width: 6rem } .md\\:h-24 { height: 6rem } .lb-check-grande { width: 40px; height: 40px }
      .md\\:text-lg { font-size: 1.125rem } .md\\:text-3xl { font-size: 1.875rem } .md\\:text-4xl { font-size: 2.25rem }
      .md\\:text-5xl { font-size: 3rem } .md\\:text-6xl { font-size: 3.75rem }
    }
  `}</style>
);
const Panel = ({ children, className = "", style = {}, onClick }) => (
  <div onClick={onClick} className={"rounded-3xl p-6 md:p-8 " + className} style={{ background: C.papel, boxShadow: "0 1px 2px rgba(20,22,27,.06), 0 4px 16px rgba(20,22,27,.04)", ...style }}>{children}</div>
);
const Rotulo = ({ children, className = "" }) => <p className={"text-sm font-semibold mb-2 " + className} style={{ color: A }}>{children}</p>;
const Titulo = ({ children, sub }) => (
  <div className="mb-7 md:mb-9">
    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">{children}</h1>
    {sub && <p className="mt-2 text-base md:text-lg max-w-2xl" style={{ color: C.suave }}>{sub}</p>}
  </div>
);
const Boton = ({ children, onClick, secundario, disabled, className = "", type, etiqueta }) => (
  <button type={type || "button"} aria-label={etiqueta} onClick={onClick} disabled={disabled} className={"rounded-full px-5 py-3 font-semibold transition active:scale-95 disabled:opacity-40 inline-flex items-center justify-center gap-2 " + className}
    style={secundario ? { background: alfa(A, 0.1), color: A } : { background: A, color: "#fff" }}>{children}</button>
);
const Confianza = ({ n }) => (
  <span title={n === 3 ? "Confirmada por el autor y otras fuentes" : "Confirmada por 2 fuentes"} aria-label={n === 3 ? "Confianza alta" : "Confianza media"} style={{ color: A, letterSpacing: 2, fontSize: 11 }}>{n === 3 ? "●●●" : "●●○"}</span>
);
const Campo = (props) => <input {...props} className={"w-full rounded-2xl border px-4 py-3 outline-none " + (props.className || "")} style={{ borderColor: C.linea, background: "#fff" }} />;
const Texto = (props) => <textarea {...props} className="w-full rounded-2xl border px-4 py-3 outline-none" style={{ borderColor: C.linea, background: "#fff" }} />;
const Marca = ({ hecho, onClick, etiqueta, grande }) => (
  <button onClick={onClick} aria-label={etiqueta} aria-pressed={hecho}
    className={(grande ? "w-14 h-14 md:w-24 md:h-24" : "w-9 h-9") + " shrink-0 rounded-full flex items-center justify-center transition active:scale-90"}
    style={hecho ? { background: A, animation: grande ? "entra .45s ease-out" : undefined } : { border: `${grande ? 3 : 2}px solid ${A}`, background: "#fff" }}>
    <Check size={grande ? 34 : 18} color={hecho ? "#fff" : alfa(A, 0.35)} strokeWidth={3} className={grande ? "lb-check-grande" : ""} />
  </button>
);
function Celebracion() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
      {Array.from({ length: 16 }, (_, i) => {
        const a = (2 * Math.PI * i) / 16, r = 70 + (i % 3) * 22;
        return <span key={i} className="absolute w-2.5 h-2.5 rounded-full" style={{ background: i % 2 ? A : alfa(A, 0.45), "--x": `${Math.cos(a) * r}px`, "--y": `${Math.sin(a) * r}px`, animation: "chispa .8s ease-out forwards" }} />;
      })}
    </div>
  );
}

/* ─── Bienvenida: portada, preguntas (cada una dice para qué es) y tu plan ─── */
function Bienvenida({ inicial, onTerminar, onCancelar }) {
  const B = LIBRO.bienvenida;
  const [paso, setPaso] = useState(inicial ? 0 : -1);
  const [r, setR] = useState(inicial || { nombre: "", cambiar: [], otra: "", motivo: "", escala: 5, tiempo: 5, momento: "mañana", habito: "", tecnica: 0, respuesta: "" });
  const pon = (k, v) => setR((p) => ({ ...p, [k]: v }));
  const Opcion = ({ on, onClick, children }) => (
    <button onClick={onClick} aria-pressed={on} className="w-full text-left rounded-2xl border px-4 py-3 flex items-center gap-3 transition"
      style={{ borderColor: on ? A : C.linea, background: on ? alfa(A, 0.07) : "#fff" }}>{children}</button>
  );
  const t = LIBRO.tecnicas[r.tecnica];
  const pasos = [
    { t: "¿Cómo te llamas?", por: "Para hablarte a ti. Se queda en tu app: nadie más lo ve.", ok: r.nombre.trim(),
      c: <Campo autoFocus value={r.nombre} onChange={(e) => pon("nombre", e.target.value)} placeholder="Tu nombre" /> },
    { t: "¿Qué quieres cambiar con este libro?", por: "Con esto elijo las ideas y las acciones que más te sirven. Puedes marcar varias.", ok: r.cambiar.length || r.otra.trim(),
      c: (
        <div className="space-y-2">
          {B.cambiar.map((o, i) => {
            const on = r.cambiar.includes(i);
            return (
              <Opcion key={i} on={on} onClick={() => pon("cambiar", on ? r.cambiar.filter((x) => x !== i) : [...r.cambiar, i])}>
                <span className="w-5 h-5 rounded-md border flex items-center justify-center shrink-0" style={{ borderColor: on ? A : C.linea, background: on ? A : "transparent" }}>{on && <Check size={14} color="#fff" />}</span>
                {o.texto}
              </Opcion>
            );
          })}
          <Campo value={r.otra} onChange={(e) => pon("otra", e.target.value)} placeholder="Otra cosa (opcional)" />
        </div>
      ) },
    { t: "¿Por qué te importa?", por: "Cuando flojees, la app te lo recordará. Lo que te mueve funciona mejor que cualquier truco.", ok: r.motivo.trim(),
      c: <Texto autoFocus value={r.motivo} onChange={(e) => pon("motivo", e.target.value)} rows={3} placeholder="Porque…" /> },
    { t: B.escala.pregunta || "¿Desde dónde partes?", por: "Es tu punto de partida. Cada semana te lo volveré a preguntar para que veas cuánto avanzas.", ok: true,
      c: (
        <div>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <button key={n} onClick={() => pon("escala", n)} aria-pressed={r.escala === n} className="rounded-2xl border py-3 font-bold transition"
                style={{ borderColor: r.escala === n ? A : C.linea, background: r.escala === n ? A : "#fff", color: r.escala === n ? "#fff" : C.tinta }}>{n}</button>
            ))}
          </div>
          <div className="flex justify-between text-sm mt-3 gap-6" style={{ color: C.suave }}><span>1: {B.escala.bajo}</span><span className="text-right">10: {B.escala.alto}</span></div>
        </div>
      ) },
    { t: "¿Cuánto tiempo tienes al día?", por: "Cada día tendrás una acción corta para aplicar el libro. Con 2 minutos te doy la versión mini; con más, la completa.", ok: true,
      c: <div className="grid grid-cols-3 gap-2">{[2, 5, 15].map((m) => <Opcion key={m} on={r.tiempo === m} onClick={() => pon("tiempo", m)}><span className="w-full text-center font-bold">{m} min</span></Opcion>)}</div> },
    { t: "¿Cuándo te viene mejor?", por: "Lo que tiene su momento se cumple más. Cuando abras la app a esa hora, te avisará de que es tu momento.", ok: true,
      c: <div className="grid grid-cols-3 gap-2">{["mañana", "tarde", "noche"].map((m) => <Opcion key={m} on={r.momento === m} onClick={() => pon("momento", m)}><span className="w-full text-center font-bold">Por la {m}</span></Opcion>)}</div> },
  ];
  if (tiene("habitos")) pasos.push({
    t: "¿Qué hábito quieres empezar?", por: "Lo marcarás cada día junto a tu acción. Mejor uno pequeño que cumples que cinco que no. Puedes dejarlo para luego.", ok: true,
    c: (
      <div className="space-y-3">
        <Campo value={r.habito} onChange={(e) => pon("habito", e.target.value)} placeholder="Por ejemplo: leer 10 páginas" />
        {r.habito.trim() && LIBRO.tecnicas.length > 0 && (
          <div className="rounded-2xl p-4" style={{ background: alfa(A, 0.06) }}>
            <p className="text-sm font-semibold mb-2" style={{ color: A }}>Hazlo más fácil con el libro</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {LIBRO.tecnicas.map((x, i) => (
                <button key={i} onClick={() => pon("tecnica", i)} aria-pressed={r.tecnica === i} className="rounded-full px-3 py-1.5 text-sm font-semibold"
                  style={r.tecnica === i ? { background: A, color: "#fff" } : { background: "#fff", color: A }}>{x.nombre}</button>
              ))}
            </div>
            {t && <p className="text-sm mb-2">{t.como}</p>}
            {t && t.pregunta && <Campo value={r.respuesta} onChange={(e) => pon("respuesta", e.target.value)} placeholder={t.pregunta} />}
          </div>
        )}
      </div>
    ),
  });

  const elegidas = r.cambiar.map((i) => B.cambiar[i]).filter(Boolean);
  const compromisos = [...new Set(elegidas.map((o) => o.compromiso))];
  const ids = [...new Set(elegidas.flatMap((o) => o.ideas || []))];
  const top = (ids.length ? ids : LIBRO.ideas.map((i) => i.id)).map(idea).filter(Boolean).slice(0, 3);
  const plan = paso === pasos.length;
  const P = pasos[paso];
  const terminar = () => onTerminar(r);
  const primerHabito = r.habito.trim() ? planHabito({ nombre: r.habito.trim(), tecnica: r.tecnica, respuesta: r.respuesta.trim() }) || r.habito.trim() : null;

  return (
    <div className="min-h-screen flex items-center justify-center p-5" style={{ background: C.fondo, color: C.tinta }}>
      <Estilos />
      <div className="w-full max-w-xl">
        {paso === -1 ? (
          <div className="rounded-3xl p-8 md:p-10 text-white" style={{ background: A, animation: "sube .5s ease-out" }}>
            <p className="text-white/70">Tu app de</p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mt-1">{LIBRO.titulo}</h1>
            <p className="text-white/70 mt-2 text-lg">{LIBRO.autor}</p>
            <p className="mt-8 text-xl font-semibold leading-snug">{LIBRO.ideaCentral}</p>
            <ul className="mt-8 space-y-3">
              {["Una acción al día, de 2 a 10 minutos, para aplicar el libro", "Las ideas del libro, comprobadas en varias fuentes",
                tiene("habitos") && "Tus hábitos con las técnicas del libro", tiene("herramienta") && LIBRO.herramienta.nombre,
                tiene("diario") && "Un diario con preguntas del libro", tiene("chat") && "Un chat para preguntarle al libro"].filter(Boolean).map((x) => (
                <li key={x} className="flex gap-3"><Check size={20} className="shrink-0 mt-0.5" />{x}</li>
              ))}
            </ul>
            <button onClick={() => setPaso(0)} className="mt-10 w-full rounded-full py-4 font-bold text-lg bg-white transition active:scale-95" style={{ color: A }}>Hacerla mía (1 minuto)</button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <p className="font-bold">{LIBRO.titulo}</p>
              {onCancelar && <button onClick={onCancelar} aria-label="Cerrar" style={{ color: C.suave }}><X size={22} /></button>}
            </div>
            <div className="h-1.5 rounded-full mb-7" style={{ background: C.linea }}>
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${(Math.min(paso, pasos.length) / pasos.length) * 100}%`, background: A }} />
            </div>
            {!plan ? (
              <Panel key={paso} style={{ animation: "sube .3s ease-out" }}>
                <p className="text-sm mb-1" style={{ color: C.suave }}>{paso + 1} de {pasos.length}</p>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">{P.t}</h2>
                <p className="mb-6" style={{ color: C.suave }}>{P.por}</p>
                {P.c}
                <div className="flex justify-between items-center mt-8">
                  <button onClick={() => setPaso(paso - 1)} aria-label="Atrás" className={paso === 0 ? "invisible" : ""} style={{ color: C.suave }}><ChevronLeft size={24} /></button>
                  <Boton disabled={!P.ok} onClick={() => setPaso(paso + 1)}>{paso === pasos.length - 1 && !r.habito.trim() && tiene("habitos") ? "Ahora no" : "Siguiente"}</Boton>
                </div>
              </Panel>
            ) : (
              <Panel style={{ animation: "sube .4s ease-out" }}>
                <Rotulo>Tu plan, {r.nombre.trim()}</Rotulo>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">{compromisos[0] || (r.otra.trim() ? `Voy a ${r.otra.trim().toLowerCase()}` : LIBRO.ideaCentral)}</h2>
                {compromisos.slice(1).map((c) => <p key={c} className="text-lg font-semibold mt-2" style={{ color: C.suave }}>{c}</p>)}
                <p className="font-bold mt-7 mb-2">Las ideas que más te sirven</p>
                <div className="space-y-2">{top.map((i) => <p key={i.id} className="rounded-2xl px-4 py-3" style={{ background: alfa(A, 0.06) }}><b>{i.nombre}.</b> {i.dice}</p>)}</div>
                <p className="font-bold mt-7 mb-1">Tu primera acción</p>
                <p>{r.tiempo === 2 ? LIBRO.acciones[0].corta : LIBRO.acciones[0].larga}</p>
                {primerHabito && <><p className="font-bold mt-5 mb-1">Tu primer hábito</p><p>{primerHabito}</p></>}
                <Boton className="w-full mt-9 py-4 text-lg" onClick={terminar}>Ir a mi día <Sparkles size={18} /></Boton>
              </Panel>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Hoy: tu acción, tus hábitos y tu racha en una sola pantalla ─── */
function FilaHabito({ hb, hoy, actualizar }) {
  const hecho = !!(hb.dias || {})[hoy];
  const plan = planHabito(hb);
  const alternar = () => actualizar((s) => ({ ...s, habitos: s.habitos.map((y) => (y.id === hb.id ? { ...y, dias: { ...y.dias, [hoy]: !hecho } } : y)) }));
  return (
    <div className="flex items-center gap-4 py-3">
      <Marca hecho={hecho} onClick={alternar} etiqueta={(hecho ? "Desmarcar " : "Marcar ") + hb.nombre} />
      <div className="flex-1 min-w-0">
        <p className="font-semibold" style={hecho ? { color: C.suave, textDecoration: "line-through" } : {}}>{hb.nombre}</p>
        {plan && <p className="text-sm truncate" style={{ color: C.suave }}>{plan}</p>}
      </div>
      <span className="text-sm flex items-center gap-1 shrink-0" style={{ color: C.suave }}><Flame size={14} style={{ color: A }} />{racha(hb.dias || {}, hoy)}</span>
    </div>
  );
}

function Hoy({ e, actualizar, hoy, irA }) {
  const p = e.perfil;
  const hechaHoy = e.hechos[hoy] !== undefined;
  const idx = hechaHoy ? e.hechos[hoy] : Object.keys(e.hechos).length % LIBRO.acciones.length;
  const ac = LIBRO.acciones[idx] || LIBRO.acciones[0];
  const de = idea(ac.idea);
  const [fiesta, setFiesta] = useState(false);
  const h = new Date().getHours();
  const saludo = h < 14 ? "Buenos días" : h < 21 ? "Buenas tardes" : "Buenas noches";
  const franja = h >= 5 && h < 13 ? "mañana" : h >= 13 && h < 20 ? "tarde" : "noche";
  const vuelve = e.visitaAnterior && diasEntre(e.visitaAnterior, hoy) >= 2;
  const dias = cumplidos(e);
  const r = racha(dias, hoy);
  const lunes = sumarDias(hoy, -((new Date(hoy + "T12:00:00").getDay() + 6) % 7));
  const semana = ["L", "M", "X", "J", "V", "S", "D"].map((l, i) => ({ l, f: sumarDias(lunes, i) }));
  const ideaDia = LIBRO.ideas[Math.max(0, diasEntre(p.inicio, hoy)) % LIBRO.ideas.length];
  const ultima = e.escalas[e.escalas.length - 1];
  const tocaEscala = ultima && diasEntre(ultima.fecha, hoy) >= 7;
  const compromiso = p.cambiar.map((i) => LIBRO.bienvenida.cambiar[i] && LIBRO.bienvenida.cambiar[i].compromiso).filter(Boolean)[0] || p.otra || LIBRO.ideaCentral;
  const marcar = () => {
    if (hechaHoy) { actualizar((s) => { const x = { ...s.hechos }; delete x[hoy]; return { ...s, hechos: x }; }); return; }
    setFiesta(true); setTimeout(() => setFiesta(false), 900);
    actualizar((s) => ({ ...s, hechos: { ...s.hechos, [hoy]: idx } }));
  };
  return (
    <div>
      <Titulo sub={fechaLarga(hoy) + (p.momento === franja && !hechaHoy ? ". Es tu momento del día." : ".")}>{saludo}, {p.nombre}</Titulo>
      {vuelve && (
        <div className="rounded-3xl px-6 py-5 mb-6" style={{ background: alfa(A, 0.08) }}>
          <p className="font-bold">Qué bien que vuelvas.</p>
          <p style={{ color: C.suave }}>Te lo dijiste tú: «{p.motivo}». Hoy basta con tu acción.</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Panel className="relative overflow-hidden">
            <Rotulo>Tu acción de hoy ({p.tiempo === 2 ? "2 min" : "5-10 min"})</Rotulo>
            <div className="flex items-start gap-5">
              <div className="flex-1">
                <p className="text-xl md:text-3xl font-bold leading-snug tracking-tight">{p.tiempo === 2 ? ac.corta : ac.larga}</p>
                {de && <p className="mt-3" style={{ color: C.suave }}>Sale de «{de.nombre}»: {de.dice}</p>}
              </div>
              <Marca grande hecho={hechaHoy} onClick={marcar} etiqueta={hechaHoy ? "Marcar como no hecha" : "Marcar como hecha"} />
            </div>
            {hechaHoy && <p className="mt-5 font-bold" style={{ color: A, animation: "sube .4s ease-out" }}>Hecho. Mañana, la siguiente.</p>}
            {fiesta && !QUIETO && <Celebracion />}
          </Panel>
          {tiene("habitos") && (
            <Panel>
              <div className="flex items-baseline justify-between">
                <p className="font-bold text-lg">Tus hábitos de hoy</p>
                <button onClick={() => irA("habitos")} className="text-sm font-semibold" style={{ color: A }}>{e.habitos.length ? "Gestionar" : "Crear uno"}</button>
              </div>
              {e.habitos.length ? (
                <div className="divide-y" style={{ borderColor: C.linea }}>{e.habitos.map((hb) => <FilaHabito key={hb.id} hb={hb} hoy={hoy} actualizar={actualizar} />)}</div>
              ) : <p className="mt-2" style={{ color: C.suave }}>Aún no tienes hábitos. Empieza por uno pequeño.</p>}
            </Panel>
          )}
          {tocaEscala && (
        <Panel>
          <p className="font-bold text-lg">¿Dónde estás esta semana?</p>
          <p className="text-sm mb-4" style={{ color: C.suave }}>{LIBRO.bienvenida.escala.pregunta} La última vez dijiste {ultima.valor}.</p>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <button key={n} onClick={() => actualizar((s) => ({ ...s, escalas: [...s.escalas, { fecha: hoy, valor: n }] }))} className="rounded-2xl border py-2.5 font-bold" style={{ borderColor: C.linea }}>{n}</button>
            ))}
          </div>
        </Panel>
          )}
        </div>
        <div className="space-y-7">
          <div>
            <p style={{ color: C.suave }}>Racha</p>
            <p className="text-6xl font-extrabold tracking-tight flex items-end gap-2">{r}<span className="text-lg font-semibold mb-2" style={{ color: C.suave }}>{r === 1 ? "día" : "días"}</span></p>
            <div className="flex gap-1.5 mt-3">
              {semana.map((d) => (
                <div key={d.f} className="flex-1 text-center">
                  <div className="h-2 rounded-full" style={{ background: dias[d.f] ? A : d.f === hoy ? alfa(A, 0.25) : C.linea }} />
                  <span className="text-xs" style={{ color: d.f === hoy ? A : C.suave, fontWeight: d.f === hoy ? 700 : 400 }}>{d.l}</span>
                </div>
              ))}
            </div>
            <p className="text-sm mt-2" style={{ color: C.suave }}>Un día cuenta si haces tu acción o algún hábito.</p>
          </div>
          <div className="border-t pt-6" style={{ borderColor: C.linea }}>
            <p style={{ color: C.suave }}>Tu compromiso</p>
            <p className="text-lg font-bold leading-snug mt-1">{compromiso}</p>
            <p className="mt-2" style={{ color: C.suave }}>«{p.motivo}»</p>
          </div>
          <button onClick={() => irA("ideas")} className="block text-left border-t pt-6 w-full" style={{ borderColor: C.linea }}>
            <p style={{ color: C.suave }}>Idea del día</p>
            <p className="font-bold mt-1">{ideaDia.nombre}</p>
            <p className="text-sm" style={{ color: C.suave }}>{ideaDia.dice}</p>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Ideas y mapa del libro ─── */
function Mapa({ elegida, onElegir }) {
  const W = 640, H = 440, n = LIBRO.ideas.length;
  const pos = Object.fromEntries(LIBRO.ideas.map((it, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return [it.id, { x: W / 2 + 235 * Math.cos(a), y: H / 2 + 160 * Math.sin(a) }];
  }));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Mapa de las ideas del libro">
      {LIBRO.ideas.flatMap((it) => (it.conecta || []).filter((c) => pos[c]).map((c) => (
        <line key={it.id + c} x1={pos[it.id].x} y1={pos[it.id].y} x2={pos[c].x} y2={pos[c].y} stroke={alfa(A, elegida === it.id || elegida === c ? 0.9 : 0.25)} strokeWidth={elegida === it.id || elegida === c ? 3 : 2} />
      )))}
      <text x={W / 2} y={H / 2 + 6} textAnchor="middle" fontSize="19" fontWeight="800" fill={alfa(C.tinta, 0.35)}>{LIBRO.titulo}</text>
      {LIBRO.ideas.map((it, i) => {
        const p = pos[it.id], on = elegida === it.id, abajo = p.y > H / 2;
        return (
          <g key={it.id} onClick={() => onElegir(it.id)} style={{ cursor: "pointer" }}>
            <circle cx={p.x} cy={p.y} r={on ? 28 : 22} fill={on ? A : "#fff"} stroke={A} strokeWidth="2.5" style={{ transition: "all .3s" }} />
            <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill={on ? "#fff" : A}>{i + 1}</text>
            <text x={p.x} y={p.y + (abajo ? 46 : -34)} textAnchor="middle" fontSize="13" fontWeight="700" fill={C.tinta}>{it.nombre}</text>
          </g>
        );
      })}
    </svg>
  );
}

function Ideas({ e, preguntar }) {
  const [abierta, setAbierta] = useState(null);
  const [mapa, setMapa] = useState(false);
  const veces = practicadas(e);
  const Detalle = ({ it }) => (
    <div className="mt-3 space-y-3" style={{ animation: "sube .25s ease-out" }}>
      <p><b>Aplícalo hoy:</b> {it.hoy}</p>
      <p className="text-sm" style={{ color: C.suave }}>Fuentes: {it.fuentes.map((f) => LIBRO.fuentes[f] && LIBRO.fuentes[f].titulo).filter(Boolean).join(", ")}</p>
      {tiene("chat") && <Boton secundario onClick={() => preguntar(`¿Cómo aplico «${it.nombre}» en mi caso?`)}><MessageCircle size={16} /> Pregúntale al libro</Boton>}
    </div>
  );
  return (
    <div>
      <Titulo sub={`${LIBRO.autor}, ${LIBRO.anio}`}>{LIBRO.titulo}</Titulo>
      <Panel className="mb-6">
        <Rotulo>La idea central</Rotulo>
        <p className="text-2xl md:text-3xl font-bold tracking-tight leading-snug">{LIBRO.ideaCentral}</p>
        <p className="mt-5 text-lg max-w-3xl" style={{ color: C.suave }}>{LIBRO.enTreintaSegundos.join(" ")}</p>
      </Panel>
      <div className="inline-flex rounded-full p-1 mb-6" style={{ background: C.papel }}>
        {[["Las ideas", false], ["Mapa del libro", true]].map(([t, v]) => (
          <button key={t} onClick={() => setMapa(v)} className="rounded-full px-5 py-2 font-semibold transition" style={mapa === v ? { background: A, color: "#fff" } : { color: C.suave }}>{t}</button>
        ))}
      </div>
      {mapa ? (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Panel className="md:col-span-3"><Mapa elegida={abierta} onElegir={setAbierta} /></Panel>
          <div className="md:col-span-2">
            {abierta && idea(abierta) ? (
              <Panel>
                <div className="flex justify-between gap-3"><p className="font-bold text-lg">{idea(abierta).nombre}</p><Confianza n={idea(abierta).confianza} /></div>
                <p className="mt-1" style={{ color: C.suave }}>{idea(abierta).dice}</p>
                <Detalle it={idea(abierta)} />
              </Panel>
            ) : <p className="pt-2" style={{ color: C.suave }}>Toca una idea del mapa para abrirla. Las líneas unen cada idea con las que lleva.</p>}
          </div>
        </div>
      ) : (
        <Panel className="py-2 md:py-3">
          <div className="divide-y" style={{ borderColor: C.linea }}>
            {LIBRO.ideas.map((it, i) => {
              const on = abierta === it.id;
              return (
                <div key={it.id} className="py-4">
                  <button onClick={() => setAbierta(on ? null : it.id)} aria-expanded={on} className="w-full text-left flex gap-4">
                    <span className="text-2xl font-extrabold w-8 shrink-0" style={{ color: A }}>{i + 1}</span>
                    <span className="flex-1">
                      <span className="flex flex-wrap items-center gap-x-3 gap-y-1"><span className="font-bold text-lg">{it.nombre}</span><Confianza n={it.confianza} />
                        {veces[it.id] > 0 && <span className="text-xs font-semibold rounded-full px-2 py-0.5" style={{ background: alfa(A, 0.1), color: A }}>Practicada {veces[it.id]} {veces[it.id] === 1 ? "vez" : "veces"}</span>}</span>
                      <span className="block mt-1" style={{ color: C.suave }}>{it.dice}</span>
                    </span>
                  </button>
                  {on && <div className="pl-12"><Detalle it={it} /></div>}
                </div>
              );
            })}
          </div>
        </Panel>
      )}
    </div>
  );
}

/* ─── Progreso ─── */
function Progreso({ e, hoy }) {
  const dias = cumplidos(e);
  const r = racha(dias, hoy), mejor = record(dias), total = Object.keys(dias).filter((d) => dias[d]).length;
  const veces = practicadas(e);
  const maxVeces = Math.max(1, ...Object.values(veces));
  const semanas = Array.from({ length: 8 }, (_, k) => {
    const fin = sumarDias(hoy, -7 * (7 - k));
    let n = 0;
    for (let j = 0; j < 7; j++) if (dias[sumarDias(fin, -j)]) n++;
    return { s: k === 7 ? "Esta" : `-${7 - k}`, dias: n };
  });
  const d0 = new Date(hoy.slice(0, 7) + "-01T12:00:00");
  const hueco = (d0.getDay() + 6) % 7;
  const diasMes = new Date(d0.getFullYear(), d0.getMonth() + 1, 0).getDate();
  const celdas = [...Array(hueco).fill(null), ...Array.from({ length: diasMes }, (_, i) => hoy.slice(0, 7) + "-" + String(i + 1).padStart(2, "0"))];
  const escalas = e.escalas.map((x) => ({ f: fechaLarga(x.fecha, { day: "numeric", month: "short" }), valor: x.valor }));
  return (
    <div>
      <Titulo sub="Cada día que haces algo cuenta.">Tu progreso</Titulo>
      <div className="grid grid-cols-3 mb-8 divide-x" style={{ borderColor: C.linea }}>
        {[["Racha", r], ["Récord", mejor], ["Días cumplidos", total]].map(([t, v], i) => (
          <div key={t} className={i ? "pl-4 md:pl-8" : ""}>
            <p style={{ color: C.suave }}>{t}</p>
            <p className="text-4xl md:text-6xl font-extrabold tracking-tight" style={i === 0 ? { color: A } : {}}>{v}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Panel>
          <p className="font-bold mb-4">{fechaLarga(hoy, { month: "long", year: "numeric" })}</p>
          <div className="grid grid-cols-7 gap-1.5 text-center text-xs mb-1.5" style={{ color: C.suave }}>{["L", "M", "X", "J", "V", "S", "D"].map((d) => <span key={d}>{d}</span>)}</div>
          <div className="grid grid-cols-7 gap-1.5">
            {celdas.map((d, i) => d === null ? <span key={"h" + i} /> : (
              <span key={d} className="aspect-square rounded-xl flex items-center justify-center text-sm"
                style={{ background: dias[d] ? A : d === hoy ? alfa(A, 0.12) : C.fondo, color: dias[d] ? "#fff" : C.tinta, fontWeight: d === hoy ? 800 : 500 }}>{Number(d.slice(8))}</span>
            ))}
          </div>
        </Panel>
        <Panel>
          <p className="font-bold mb-4">Días cumplidos por semana</p>
          <GraficoBarras datos={semanas.map((x) => ({ etiqueta: x.s, valor: x.dias }))} max={7} />
        </Panel>
        {escalas.length > 1 && (
          <Panel>
            <p className="font-bold">Cómo te ves cada semana</p>
            <p className="text-sm mb-4" style={{ color: C.suave }}>{LIBRO.bienvenida.escala.pregunta}</p>
            <GraficoLinea datos={escalas.map((x) => ({ etiqueta: x.f, valor: x.valor }))} min={1} max={10} />
          </Panel>
        )}
        <Panel>
          <p className="font-bold mb-4">Ideas que has practicado</p>
          <div className="space-y-3">
            {LIBRO.ideas.map((it) => (
              <div key={it.id}>
                <div className="flex justify-between text-sm mb-1"><span>{it.nombre}</span><b>{veces[it.id] || 0}</b></div>
                <div className="h-2 rounded-full" style={{ background: C.fondo }}><div className="h-2 rounded-full transition-all duration-700" style={{ width: `${((veces[it.id] || 0) / maxVeces) * 100}%`, background: A }} /></div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <div className="flex flex-wrap gap-2 mt-6">
        {[3, 7, 21, 30].map((x) => (
          <span key={x} className="rounded-full px-4 py-2 text-sm font-bold" style={e.hitos.includes(x) ? { background: A, color: "#fff" } : { background: C.papel, color: C.suave }}>{e.hitos.includes(x) ? "✓ " : ""}{x} días seguidos</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Módulo: la herramienta del libro ─── */
function Herramienta({ e, actualizar, hoy }) {
  const H = LIBRO.herramienta, d = e.herramienta || {};
  const guarda = (x) => actualizar((s) => ({ ...s, herramienta: { ...s.herramienta, ...x } }));
  const [texto, setTexto] = useState("");
  const [borrador, setBorrador] = useState(d.respuestas || (H.pasos || []).map(() => ""));
  const [creando, setCreando] = useState(false);
  const items = d.items || [];
  let cuerpo = null;

  if (H.tipo === "puntuacion") {
    const colores = [C.bien, C.suave, C.mal];
    const cuenta = H.valores.map((_, v) => items.filter((it) => it.v === v).length);
    cuerpo = (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Panel className="md:col-span-2">
          <p className="mb-4" style={{ color: C.suave }}>{H.instruccion}</p>
          <div className="flex gap-2 mb-2">
            <Campo value={texto} onChange={(ev) => setTexto(ev.target.value)} placeholder="Escribe y pulsa +" onKeyDown={(ev) => { if (ev.key === "Enter" && !ev.nativeEvent.isComposing) { ev.preventDefault(); (() => { if (texto.trim()) { guarda({ items: [...items, { texto: texto.trim(), v: 1 }] }); setTexto(""); } })(); } }} />
            <Boton etiqueta="Añadir" onClick={() => { if (texto.trim()) { guarda({ items: [...items, { texto: texto.trim(), v: 1 }] }); setTexto(""); } }}><Plus size={18} /></Boton>
          </div>
          <div className="divide-y" style={{ borderColor: C.linea }}>
            {items.map((it, i) => (
              <div key={i} className="flex flex-wrap items-center gap-2 py-3">
                <span className="flex-1 min-w-0 font-semibold">{it.texto}</span>
                {H.valores.map((val, v) => (
                  <button key={v} onClick={() => guarda({ items: items.map((x, j) => (j === i ? { ...x, v } : x)) })} aria-pressed={it.v === v} className="rounded-full px-3 py-1 text-xs font-bold"
                    style={it.v === v ? { background: colores[v], color: "#fff" } : { background: C.fondo, color: C.suave }}>{val}</button>
                ))}
                <button onClick={() => guarda({ items: items.filter((_, j) => j !== i) })} aria-label={"Quitar " + it.texto} style={{ color: C.suave }}><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
          {!items.length && <p className="text-sm mt-2" style={{ color: C.suave }}>Aún no hay nada. Empieza por lo primero que haces al despertarte.</p>}
        </Panel>
        <Panel>
          <p className="font-bold mb-4">Tu resultado</p>
          {H.valores.map((val, v) => (
            <div key={v} className="mb-4">
              <div className="flex justify-between text-sm mb-1"><span>{val}</span><b>{cuenta[v]}</b></div>
              <div className="h-2.5 rounded-full" style={{ background: C.fondo }}><div className="h-2.5 rounded-full transition-all duration-500" style={{ width: `${items.length ? (cuenta[v] / items.length) * 100 : 0}%`, background: colores[v] }} /></div>
            </div>
          ))}
        </Panel>
      </div>
    );
  }

  if (H.tipo === "escalas") {
    const actual = d.actual || H.dimensiones.map(() => 5);
    const historial = d.historial || [];
    const anterior = historial.filter((x) => x.fecha !== hoy).slice(-1)[0];
    cuerpo = (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Panel>
          {H.dimensiones.map((dim, i) => (
            <div key={i} className="mb-5">
              <div className="flex justify-between mb-1"><b>{dim.nombre}</b><span style={{ color: A }} className="font-bold">{actual[i]}</span></div>
              <input type="range" min="1" max="10" value={actual[i]} aria-label={dim.nombre} onChange={(ev) => guarda({ actual: actual.map((x, j) => (j === i ? Number(ev.target.value) : x)) })} className="w-full" style={{ accentColor: A }} />
              <div className="flex justify-between text-xs" style={{ color: C.suave }}><span>{dim.bajo}</span><span>{dim.alto}</span></div>
            </div>
          ))}
          <Boton onClick={() => guarda({ historial: [...historial.filter((x) => x.fecha !== hoy), { fecha: hoy, valores: actual }] })}>Guardar el resultado de hoy</Boton>
        </Panel>
        <Panel>
          <p className="font-bold">{anterior ? `Hoy frente al ${fechaLarga(anterior.fecha, { day: "numeric", month: "short" })}` : "Tu foto de hoy"}</p>
          <GraficoRadar ejes={H.dimensiones.map((x) => x.nombre)}
            series={[...(anterior ? [{ valores: anterior.valores, color: C.suave, opacidad: 0.12 }] : []), { valores: actual, color: A, opacidad: 0.3 }]} />
        </Panel>
      </div>
    );
  }

  if (H.tipo === "matriz") {
    const cuadrante = (it) => (it.x ? 0 : 1) + (it.y ? 0 : 2);
    const mueve = (i, k) => guarda({ items: items.map((x, j) => (j === i ? { ...x, [k]: !x[k] } : x)) });
    cuerpo = (
      <div>
        <Panel className="mb-6">
          <div className="flex gap-2">
            <Campo value={texto} onChange={(ev) => setTexto(ev.target.value)} placeholder="Escribe una tarea o un asunto y pulsa +" onKeyDown={(ev) => { if (ev.key === "Enter" && !ev.nativeEvent.isComposing) { ev.preventDefault(); (() => { if (texto.trim()) { guarda({ items: [...items, { texto: texto.trim(), x: true, y: true }] }); setTexto(""); } })(); } }} />
            <Boton etiqueta="Añadir" onClick={() => { if (texto.trim()) { guarda({ items: [...items, { texto: texto.trim(), x: true, y: true }] }); setTexto(""); } }}><Plus size={18} /></Boton>
          </div>
          <p className="text-sm mt-3" style={{ color: C.suave }}>Toca las etiquetas de cada elemento para cambiarlo de casilla.</p>
        </Panel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {H.cuadrantes.map((q, k) => (
            <Panel key={k} style={k === 0 ? { boxShadow: `inset 0 0 0 2px ${A}` } : {}}>
              <p className="font-bold text-lg">{q.nombre}</p>
              <p className="text-sm mb-3" style={{ color: C.suave }}>{q.consejo}</p>
              <div className="space-y-2">
                {items.map((it, i) => cuadrante(it) !== k ? null : (
                  <div key={i} className="rounded-2xl px-3 py-2 text-sm" style={{ background: C.fondo }}>
                    <p className="font-semibold mb-1.5">{it.texto}</p>
                    <div className="flex flex-wrap gap-1.5">
                      <button onClick={() => mueve(i, "x")} className="rounded-full px-2.5 py-0.5 text-xs font-semibold" style={{ background: "#fff", color: A }}>{it.x ? H.ejeX.si : H.ejeX.no}</button>
                      <button onClick={() => mueve(i, "y")} className="rounded-full px-2.5 py-0.5 text-xs font-semibold" style={{ background: "#fff", color: A }}>{it.y ? H.ejeY.si : H.ejeY.no}</button>
                      <button onClick={() => guarda({ items: items.filter((_, j) => j !== i) })} aria-label={"Quitar " + it.texto} style={{ color: C.suave }}><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          ))}
        </div>
      </div>
    );
  }

  if (H.tipo === "pasos") {
    const listo = borrador.every((x) => x.trim());
    const crear = async () => {
      guarda({ respuestas: borrador });
      setCreando(true);
      const resumen = H.pasos.map((p, i) => `${p.pregunta}\n${borrador[i]}`).join("\n\n");
      let resultado;
      try {
        resultado = await preguntarIA(`${H.resultado.instruccion}\nBasado en el libro «${LIBRO.titulo}», de ${LIBRO.autor}. En español, de tú, breve y concreto.\n\nRespuestas de la persona:\n${resumen}`);
      } catch {
        resultado = H.pasos.map((p, i) => `${p.pregunta} ${borrador[i]}`).join("\n");
      }
      guarda({ respuestas: borrador, resultado, fecha: hoy });
      setCreando(false);
    };
    cuerpo = (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Panel className="md:col-span-3">
          {H.pasos.map((p, i) => (
            <div key={i} className="mb-6">
              <p className="text-sm font-semibold" style={{ color: A }}>Paso {i + 1} de {H.pasos.length}</p>
              <p className="text-lg font-bold mt-1">{p.pregunta}</p>
              {p.ayuda && <p className="text-sm mb-2" style={{ color: C.suave }}>{p.ayuda}</p>}
              <Texto rows={2} value={borrador[i] || ""} onChange={(ev) => setBorrador(borrador.map((x, j) => (j === i ? ev.target.value : x)))} onBlur={() => guarda({ respuestas: borrador })} />
            </div>
          ))}
          <Boton disabled={!listo || creando} onClick={crear}><Sparkles size={18} /> {creando ? "Creando…" : `Crear ${H.resultado.titulo.toLowerCase()}`}</Boton>
        </Panel>
        <div className="md:col-span-2">
          {d.resultado ? (
            <Panel style={{ boxShadow: `inset 4px 0 0 ${A}` }}>
              <p className="font-bold text-lg">{H.resultado.titulo}</p>
              <p className="text-sm mb-3" style={{ color: C.suave }}>{fechaLarga(d.fecha)}</p>
              <p className="whitespace-pre-wrap leading-relaxed">{d.resultado}</p>
            </Panel>
          ) : <p className="pt-2" style={{ color: C.suave }}>Responde los pasos y aquí aparecerá {H.resultado.titulo.toLowerCase()}.</p>}
        </div>
      </div>
    );
  }

  if (H.tipo === "propia") cuerpo = <HerramientaPropia datos={d} guarda={guarda} hoy={hoy} />;

  return (
    <div>
      <Titulo sub={H.explicacion}>{H.nombre}</Titulo>
      {cuerpo}
    </div>
  );
}

/* ─── Módulo: mis hábitos ─── */
function Habitos({ e, actualizar, hoy }) {
  const [nuevo, setNuevo] = useState("");
  const pon = (habitos) => actualizar((s) => ({ ...s, habitos }));
  const ultimos = Array.from({ length: 21 }, (_, i) => sumarDias(hoy, i - 20));
  return (
    <div>
      <Titulo sub="Crea tus hábitos y hazlos más fáciles con las técnicas del libro. Los marcas cada día en Hoy.">Mis hábitos</Titulo>
      <Panel className="mb-6">
        <div className="flex gap-2">
          <Campo value={nuevo} onChange={(ev) => setNuevo(ev.target.value)} placeholder="Un hábito nuevo, por ejemplo: leer 10 páginas" onKeyDown={(ev) => { if (ev.key === "Enter" && !ev.nativeEvent.isComposing) { ev.preventDefault(); (() => { if (nuevo.trim()) { pon([...e.habitos, { id: Date.now(), nombre: nuevo.trim(), tecnica: 0, respuesta: "", dias: {} }]); setNuevo(""); } })(); } }} />
          <Boton etiqueta="Añadir hábito" onClick={() => { if (nuevo.trim()) { pon([...e.habitos, { id: Date.now(), nombre: nuevo.trim(), tecnica: 0, respuesta: "", dias: {} }]); setNuevo(""); } }}><Plus size={18} /></Boton>
        </div>
      </Panel>
      {!e.habitos.length && <p style={{ color: C.suave }}>Aún no tienes hábitos. Empieza por uno pequeño: mejor uno que cumples que cinco que no.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {e.habitos.map((hb) => {
          const hecho = !!(hb.dias || {})[hoy];
          const t = LIBRO.tecnicas[hb.tecnica];
          const cambia = (x) => pon(e.habitos.map((y) => (y.id === hb.id ? { ...y, ...x } : y)));
          return (
            <Panel key={hb.id}>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <p className="font-bold text-lg">{hb.nombre}</p>
                  <p className="text-sm flex items-center gap-1" style={{ color: C.suave }}><Flame size={14} style={{ color: A }} /> {racha(hb.dias || {}, hoy)} {racha(hb.dias || {}, hoy) === 1 ? "día seguido" : "días seguidos"}</p>
                </div>
                <Marca hecho={hecho} onClick={() => cambia({ dias: { ...hb.dias, [hoy]: !hecho } })} etiqueta={(hecho ? "Desmarcar " : "Marcar ") + hb.nombre} />
              </div>
              <div className="flex gap-1 mb-5" aria-label="Últimos 21 días">{ultimos.map((d) => <span key={d} className="flex-1 h-2 rounded-full" style={{ background: (hb.dias || {})[d] ? A : C.fondo }} />)}</div>
              {LIBRO.tecnicas.length > 0 && (
                <div className="rounded-2xl p-4" style={{ background: alfa(A, 0.06) }}>
                  <select value={hb.tecnica} onChange={(ev) => cambia({ tecnica: Number(ev.target.value) })} aria-label="Técnica del libro" className="w-full bg-transparent font-bold text-sm mb-1 outline-none" style={{ color: A }}>
                    {LIBRO.tecnicas.map((x, i) => <option key={i} value={i}>{x.nombre}</option>)}
                  </select>
                  {t && <p className="text-sm">{t.como}</p>}
                  {t && t.pregunta && <input value={hb.respuesta || ""} onChange={(ev) => cambia({ respuesta: ev.target.value })} placeholder={t.pregunta} className="mt-2 w-full rounded-xl px-3 py-2 text-sm outline-none" style={{ background: "#fff" }} />}
                  {planHabito(hb) && <p className="text-sm font-bold mt-2">{planHabito(hb)}</p>}
                </div>
              )}
              <button onClick={() => pon(e.habitos.filter((y) => y.id !== hb.id))} className="text-xs mt-4 flex items-center gap-1" style={{ color: C.suave }}><Trash2 size={12} /> Quitar hábito</button>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Módulo: diario guiado ─── */
function Diario({ e, actualizar, hoy }) {
  const n = Math.max(0, diasEntre(e.perfil.inicio, hoy));
  const preguntas = [LIBRO.diario[(n * 2) % LIBRO.diario.length], LIBRO.diario[(n * 2 + 1) % LIBRO.diario.length]].filter((x, i, a) => x && a.indexOf(x) === i);
  const guardado = e.diario[hoy];
  const [resp, setResp] = useState(guardado ? guardado.respuestas : preguntas.map(() => ""));
  const [ok, setOk] = useState(false);
  const pasadas = Object.keys(e.diario).filter((d) => d !== hoy).sort().reverse();
  return (
    <div>
      <Titulo sub="Dos preguntas al día, distintas cada día. Escribe lo primero que te salga.">Diario</Titulo>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Panel className="md:col-span-3">
          {preguntas.map((q, i) => (
            <div key={i} className="mb-6">
              <p className="text-xl font-bold tracking-tight mb-2">{q}</p>
              <Texto value={resp[i] || ""} onChange={(ev) => { setOk(false); setResp(resp.map((x, j) => (j === i ? ev.target.value : x))); }} rows={3} />
            </div>
          ))}
          <Boton onClick={() => { actualizar((s) => ({ ...s, diario: { ...s.diario, [hoy]: { preguntas, respuestas: resp } } })); setOk(true); }}>{ok ? <><Check size={18} /> Guardado</> : "Guardar"}</Boton>
        </Panel>
        <div className="md:col-span-2">
          <p className="font-bold mb-3">Días anteriores</p>
          {!pasadas.length && <p style={{ color: C.suave }}>Aquí irán tus respuestas de otros días.</p>}
          <div className="divide-y" style={{ borderColor: C.linea }}>
            {pasadas.map((d) => (
              <div key={d} className="py-4">
                <p className="text-sm font-bold mb-2" style={{ color: A }}>{fechaLarga(d)}</p>
                {e.diario[d].preguntas.map((q, i) => <p key={i} className="text-sm mb-1"><span style={{ color: C.suave }}>{q}</span> {e.diario[d].respuestas[i]}</p>)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Módulo: pregúntale al libro (Claude dentro del artifact) ─── */
function Chat({ e, actualizar, inicial, limpiarInicial }) {
  const [texto, setTexto] = useState(inicial || "");
  const [pensando, setPensando] = useState(false);
  const fin = useRef(null);
  useEffect(() => { if (inicial) { setTexto(inicial); limpiarInicial(); } }, [inicial]);
  useEffect(() => { fin.current && fin.current.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, [e.chat.length, pensando]);
  const p = e.perfil;
  const enviar = async (pregunta) => {
    if (!pregunta.trim() || pensando) return;
    const historial = [...e.chat, { de: "yo", texto: pregunta.trim() }];
    actualizar((s) => ({ ...s, chat: historial }));
    setTexto(""); setPensando(true);
    const ideas = LIBRO.ideas.map((i) => `- ${i.nombre}: ${i.dice} Cómo aplicarla: ${i.hoy}`).join("\n");
    const quiere = [...p.cambiar.map((i) => LIBRO.bienvenida.cambiar[i] && LIBRO.bienvenida.cambiar[i].texto), p.otra].filter(Boolean).join("; ");
    const habitos = e.habitos.map((h) => h.nombre).join(", ") || "ninguno todavía";
    const conversacion = historial.slice(-8).map((m) => (m.de === "yo" ? "Persona: " : "Asistente: ") + m.texto).join("\n");
    const prompt = `Eres «Pregúntale al libro», el asistente de una app sobre «${LIBRO.titulo}», de ${LIBRO.autor}. Responde en español, de tú, cercano y práctico, en 3 a 6 frases. Termina con un paso concreto que pueda hacer hoy.
Usa SOLO estas ideas del libro, sin inventar nada del libro:
${ideas}
Sobre la persona: se llama ${p.nombre}; quiere: ${quiere}; su motivo: ${p.motivo}; sus hábitos: ${habitos}.
Al final, entre corchetes, la idea que usas, por ejemplo [Idea: ${LIBRO.ideas[0].nombre}]. Si lo que pregunta no sale del libro, dilo claro y da solo un consejo general prudente.

${conversacion}
Asistente:`;
    let respuesta;
    try { respuesta = await preguntarIA(prompt); }
    catch { respuesta = "Ahora mismo no puedo responder. Prueba otra vez en un momento; el resto de la app sigue funcionando."; }
    actualizar((s) => ({ ...s, chat: [...historial, { de: "libro", texto: respuesta }] }));
    setPensando(false);
  };
  return (
    <div className="max-w-3xl">
      <Titulo sub="Cuéntale tu situación y te responde con las ideas del libro.">Pregúntale al libro</Titulo>
      <div className="space-y-3 mb-6">
        {!e.chat.length && LIBRO.chatEjemplos.map((q) => (
          <button key={q} onClick={() => enviar(q)} className="w-full text-left rounded-2xl px-5 py-4 font-semibold transition" style={{ background: C.papel }}>{q}</button>
        ))}
        {e.chat.map((m, i) => (
          <div key={i} className={"flex " + (m.de === "yo" ? "justify-end" : "justify-start")} style={{ animation: "sube .25s ease-out" }}>
            <div className="rounded-3xl px-5 py-3 max-w-xl whitespace-pre-wrap leading-relaxed" style={m.de === "yo" ? { background: A, color: "#fff" } : { background: C.papel }}>{m.texto}</div>
          </div>
        ))}
        {pensando && <p className="text-sm" style={{ color: C.suave }}>Pensando con el libro…</p>}
        <div ref={fin} />
      </div>
      <div className="flex gap-2 sticky bottom-24 md:bottom-6">
        <Campo value={texto} onChange={(ev) => setTexto(ev.target.value)} placeholder="Escribe tu situación o tu duda" onKeyDown={(ev) => { if (ev.key === "Enter" && !ev.nativeEvent.isComposing) { ev.preventDefault(); (() => { enviar(texto); })(); } }} />
        <Boton etiqueta="Enviar" disabled={pensando} onClick={() => { enviar(texto); }}><Send size={18} /></Boton>
      </div>
      {!!e.chat.length && <button onClick={() => actualizar((s) => ({ ...s, chat: [] }))} className="text-sm mt-3" style={{ color: C.suave }}>Empezar una conversación nueva</button>}
    </div>
  );
}

/* ─── Fuentes y ajustes ─── */
function Fuentes() {
  const nombres = { autor: "Del autor", resumen: "Resúmenes", lectores: "Lectores" };
  return (
    <div>
      <Titulo sub="Cada idea de esta app la confirman al menos dos de estas fuentes. Nada sale de una sola.">Fuentes</Titulo>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {["autor", "resumen", "lectores"].map((t) => (
          <div key={t}>
            <p className="font-bold mb-2">{nombres[t]}</p>
            <div className="divide-y" style={{ borderColor: C.linea }}>
              {LIBRO.fuentes.map((f, i) => f.tipo !== t ? null : (
                <div key={i} className="py-3">
                  <a href={f.url} target="_blank" rel="noreferrer" className="font-semibold flex items-start gap-2 hover:underline"><Link size={16} className="mt-1 shrink-0" style={{ color: A }} />{f.titulo}</a>
                  <p className="text-sm mt-1" style={{ color: C.suave }}>Confirma: {LIBRO.ideas.filter((x) => x.fuentes.includes(i)).map((x) => x.nombre).join(", ") || "el contexto general"}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Ajustes({ e, actualizar, editar }) {
  const [seguro, setSeguro] = useState(false);
  return (
    <div className="max-w-2xl">
      <Titulo>Ajustes</Titulo>
      <Panel className="mb-6">
        <p className="font-bold mb-2">Tus respuestas</p>
        <p><b>{e.perfil.nombre}</b>, {e.perfil.tiempo} min al día, por la {e.perfil.momento}</p>
        <p className="mb-5" style={{ color: C.suave }}>«{e.perfil.motivo}»</p>
        <Boton secundario onClick={editar}><Edit3 size={16} /> Cambiar mis respuestas</Boton>
      </Panel>
      <Panel>
        <p className="font-bold mb-2">Tus datos</p>
        <p className="mb-5" style={{ color: C.suave }}>Se guardan solo para ti. Borrarlos no se puede deshacer.</p>
        {!seguro ? <Boton secundario onClick={() => setSeguro(true)}><Trash2 size={16} /> Borrar mis datos</Boton> : (
          <div className="flex flex-wrap gap-2">
            <button onClick={() => actualizar(() => ({ ...VACIO }))} className="rounded-full px-5 py-3 font-semibold text-white" style={{ background: C.mal }}>Sí, borrar todo</button>
            <Boton secundario onClick={() => setSeguro(false)}>Cancelar</Boton>
          </div>
        )}
      </Panel>
    </div>
  );
}

/* ─── La app ─── */
const MODULOS = {
  herramienta: { id: "herramienta", nombre: LIBRO.herramienta ? LIBRO.herramienta.nombre : "Herramienta", corto: LIBRO.herramienta ? LIBRO.herramienta.corto : "Herramienta", icono: Wrench, C: Herramienta },
  habitos: { id: "habitos", nombre: "Mis hábitos", corto: "Hábitos", icono: Target, C: Habitos },
  diario: { id: "diario", nombre: "Diario", corto: "Diario", icono: Edit3, C: Diario },
  chat: { id: "chat", nombre: "Pregúntale al libro", corto: "Pregunta", icono: MessageCircle, C: Chat },
};

/* Si algo falla, la app lo dice en vez de quedarse en blanco. */
class Protector extends React.Component {
  constructor(props) { super(props); this.state = { error: null, intento: 0 }; }
  static getDerivedStateFromError(error) { return { error }; }
  reintentar() { this.setState((s) => ({ error: null, intento: s.intento + 1 })); }
  render() {
    if (!this.state.error) return <React.Fragment key={this.state.intento}>{this.props.children}</React.Fragment>;
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: C.fondo, color: C.tinta }}>
        <div className="max-w-lg rounded-3xl p-8" style={{ background: C.papel }}>
          <p className="text-2xl font-extrabold mb-2">Algo ha fallado</p>
          <p className="mb-4" style={{ color: C.suave }}>Copia este mensaje y pégaselo a Claude para que lo arregle:</p>
          <pre className="text-sm rounded-2xl p-4 mb-6 whitespace-pre-wrap" style={{ background: C.fondo }}>{String(this.state.error && (this.state.error.stack || this.state.error.message || this.state.error)).slice(0, 600)}</pre>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => this.reintentar()} className="rounded-full px-5 py-3 font-semibold text-white" style={{ background: A }}>Volver a intentarlo</button>
            <button onClick={() => { almacen.guardar({ ...VACIO }).finally(() => this.reintentar()); }} className="rounded-full px-5 py-3 font-semibold" style={{ background: alfa(A, 0.1), color: A }}>Empezar de cero</button>
          </div>
        </div>
      </div>
    );
  }
}

export default function App() {
  return <Protector><AppInterna /></Protector>;
}

function AppInterna() {
  const [e, setE] = useState(null);
  const [guarda, setGuarda] = useState(true);
  const [tab, setTab] = useState("hoy");
  const [mas, setMas] = useState(false);
  const [editando, setEditando] = useState(false);
  const [aviso, setAviso] = useState(null);
  const [pregunta, setPregunta] = useState(null);
  const hoy = fechaISO();

  useEffect(() => {
    (async () => {
      const d = await almacen.leer();
      const base = normalizar(d);
      setE({ ...base, visitaAnterior: base.ultimaVisita, ultimaVisita: hoy });
      setGuarda(await almacen.funciona());
    })();
  }, []);

  const actualizar = (f) => setE((prev) => {
    const n = typeof f === "function" ? f(prev) : { ...prev, ...f };
    almacen.guardar(n).then((ok) => { if (!ok) setGuarda(false); });
    return n;
  });

  const dias = e ? cumplidos(e) : {};
  const r = e ? racha(dias, hoy) : 0;
  useEffect(() => {
    if (!e || !e.perfil) return;
    const nuevos = [3, 7, 21, 30].filter((x) => r >= x && !e.hitos.includes(x));
    if (nuevos.length) {
      setAviso(`${Math.max(...nuevos)} días seguidos. Así se construye.`);
      setTimeout(() => setAviso(null), 3500);
      actualizar((s) => ({ ...s, hitos: [...s.hitos, ...nuevos] }));
    }
  }, [r]);

  if (!e) return <div className="min-h-screen flex items-center justify-center" style={{ background: C.fondo, color: C.suave }}>Abriendo tu libro…</div>;

  if (!e.perfil || editando) {
    return (
      <Bienvenida
        inicial={editando ? e.perfil : null}
        onCancelar={editando ? () => setEditando(false) : null}
        onTerminar={(res) => {
          actualizar((s) => {
            const nuevo = !s.perfil;
            const habitos = nuevo && res.habito && res.habito.trim() ? [...s.habitos, { id: Date.now(), nombre: res.habito.trim(), tecnica: res.tecnica, respuesta: (res.respuesta || "").trim(), dias: {} }] : s.habitos;
            const escalas = nuevo ? [{ fecha: hoy, valor: res.escala }] : s.escalas;
            return { ...s, perfil: { ...res, inicio: (s.perfil && s.perfil.inicio) || hoy }, habitos, escalas };
          });
          setEditando(false); setTab("hoy");
        }}
      />
    );
  }

  const modulos = LIBRO.modulos.map((m) => MODULOS[m]).filter(Boolean);
  const secciones = [
    { id: "hoy", nombre: "Hoy", corto: "Hoy", icono: Sun },
    { id: "ideas", nombre: "Ideas del libro", corto: "Ideas", icono: BookOpen },
    ...modulos,
    { id: "progreso", nombre: "Progreso", corto: "Progreso", icono: BarChart2 },
    { id: "fuentes", nombre: "Fuentes", corto: "Fuentes", icono: ExternalLink },
    { id: "ajustes", nombre: "Ajustes", corto: "Ajustes", icono: Settings },
  ];
  const abajo = ["hoy", "ideas", modulos[0] && modulos[0].id, "progreso"].filter(Boolean);
  const irA = (id) => { setTab(id); setMas(false); if (window.scrollTo) window.scrollTo(0, 0); };
  const preguntar = (q) => { setPregunta(q); irA("chat"); };
  const props = { e, actualizar, hoy, irA };
  const M = modulos.find((m) => m.id === tab);

  return (
    <div className="min-h-screen md:flex" style={{ background: C.fondo, color: C.tinta }}>
      <Estilos />
      <aside className="hidden md:flex md:flex-col w-72 shrink-0 p-7 sticky top-0 h-screen text-white" style={{ background: A }}>
        <p className="text-white/70">Tu app de</p>
        <p className="text-2xl font-extrabold tracking-tight leading-tight mt-1">{LIBRO.titulo}</p>
        <p className="text-white/70 mt-1">{LIBRO.autor}</p>
        <nav className="mt-10 space-y-1 flex-1" aria-label="Secciones">
          {secciones.map((s) => (
            <button key={s.id} onClick={() => irA(s.id)} aria-current={tab === s.id ? "page" : undefined} className="w-full flex items-center gap-3 rounded-full px-4 py-2.5 text-left font-semibold transition"
              style={tab === s.id ? { background: "#fff", color: A } : { color: "rgba(255,255,255,.85)" }}>
              <s.icono size={18} className="shrink-0" /> {s.nombre}
            </button>
          ))}
        </nav>
        <div className="rounded-3xl p-5" style={{ background: "rgba(255,255,255,.12)" }}>
          <p className="text-4xl font-extrabold flex items-center gap-2"><Flame size={30} /> {r}</p>
          <p className="text-white/70">{r === 1 ? "día seguido" : "días seguidos"}</p>
        </div>
      </aside>

      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between px-5 py-3 text-white" style={{ background: A }}>
        <p className="font-extrabold truncate pr-4">{LIBRO.titulo}</p>
        <p className="flex items-center gap-1 font-bold shrink-0"><Flame size={18} /> {r}</p>
      </div>

      <main className="flex-1 min-w-0 pb-28 md:pb-12">
        {!guarda && (
          <div className="text-center text-sm px-4 py-2 font-semibold" style={{ background: alfa(A, 0.1), color: A }}>Publica la app para que se guarde tu progreso.</div>
        )}
        <div className="max-w-5xl mx-auto px-5 py-7 md:p-10">
          {tab === "hoy" && <Hoy {...props} />}
          {tab === "ideas" && <Ideas e={e} preguntar={preguntar} />}
          {tab === "progreso" && <Progreso {...props} />}
          {tab === "fuentes" && <Fuentes />}
          {tab === "ajustes" && <Ajustes {...props} editar={() => setEditando(true)} />}
          {M && <M.C {...props} inicial={pregunta} limpiarInicial={() => setPregunta(null)} />}
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 flex justify-around px-2 pt-2 pb-4 border-t" style={{ background: "rgba(255,255,255,.96)", borderColor: C.linea }} aria-label="Secciones">
        {abajo.map((id) => {
          const s = secciones.find((x) => x.id === id);
          return (
            <button key={id} onClick={() => irA(id)} aria-current={tab === id ? "page" : undefined} className="flex flex-col items-center gap-0.5 text-xs w-16" style={{ color: tab === id ? A : C.suave, fontWeight: tab === id ? 700 : 500 }}>
              <s.icono size={22} />{s.corto}
            </button>
          );
        })}
        <button onClick={() => setMas(true)} className="flex flex-col items-center gap-0.5 text-xs w-16" style={{ color: abajo.includes(tab) ? C.suave : A, fontWeight: 600 }}><Menu size={22} />Más</button>
      </nav>

      {mas && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end" style={{ background: "rgba(0,0,0,.35)" }} onClick={() => setMas(false)}>
          <div className="w-full rounded-t-3xl p-5 pb-8" style={{ background: C.papel, animation: "sube .25s ease-out" }} onClick={(ev) => ev.stopPropagation()}>
            {secciones.filter((s) => !abajo.includes(s.id)).map((s) => (
              <button key={s.id} onClick={() => irA(s.id)} className="w-full flex items-center gap-3 rounded-2xl px-4 py-4 text-left text-lg font-semibold" style={{ color: tab === s.id ? A : C.tinta }}>
                <s.icono size={20} /> {s.nombre}
              </button>
            ))}
          </div>
        </div>
      )}

      {aviso && (
        <div role="status" className="fixed top-5 left-1/2 -translate-x-1/2 z-50 rounded-full px-5 py-3 shadow-lg font-bold flex items-center gap-2" style={{ background: A, color: "#fff", animation: "sube .3s ease-out" }}>
          <Sparkles size={18} /> {aviso}
        </div>
      )}
    </div>
  );
}
