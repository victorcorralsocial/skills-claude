// Comprueba escaleta.json y prepara datos.json para el render.
// Uso: node scripts/preparar.mjs <ruta de estilo.md>
// Quita los silencios dentro de cada toma, recoloca las palabras en la línea de tiempo nueva
// y escribe un resumen para revisar el montaje antes de renderizar.
import fs from "node:fs";

const FPS = 30;
const MARGEN = 0.07; // aire que se deja antes y después de cada trozo (s)

const fallo = (msg) => {
  console.error(`✗ ${msg}`);
  process.exit(1);
};

// --- Estilo: el primer bloque ```json de estilo.md
const rutaEstilo = process.argv[2];
if (!rutaEstilo || !fs.existsSync(rutaEstilo)) fallo(`No encuentro el estilo: ${rutaEstilo}`);
const bloque = fs.readFileSync(rutaEstilo, "utf8").match(/```json\s*([\s\S]*?)```/);
if (!bloque) fallo(`${rutaEstilo} no tiene un bloque \`\`\`json con el estilo.`);
let estilo;
try {
  estilo = JSON.parse(bloque[1]);
} catch (e) {
  fallo(`El JSON de ${rutaEstilo} está mal escrito: ${e.message}`);
}

// --- Transcripción y escaleta
if (!fs.existsSync("transcripcion.json")) fallo("Falta transcripcion.json: ejecuta antes scripts/transcribir.mjs");
if (!fs.existsSync("escaleta.json")) fallo("Falta escaleta.json.");
const { original, palabras, silencios } = JSON.parse(fs.readFileSync("transcripcion.json", "utf8"));
let escaleta;
try {
  escaleta = JSON.parse(fs.readFileSync("escaleta.json", "utf8"));
} catch (e) {
  fallo(`escaleta.json está mal escrita: ${e.message}`);
}

const velocidad = Number(escaleta.velocidad ?? estilo.velocidad ?? 1);
if (!(velocidad >= 0.8 && velocidad <= 1.5)) fallo(`velocidad ${velocidad}: usa un valor entre 0.8 y 1.5`);
const pausaMaxima = Number(estilo.pausaMaxima ?? 0.25);
const correcciones = escaleta.correcciones || {};
const texto = (i) => correcciones[i] ?? palabras[i].texto;
const n = palabras.length;
const idx = (v, campo) => {
  if (!Number.isInteger(v) || v < 0 || v >= n) fallo(`${campo}: ${v} no es una palabra (hay de la 0 a la ${n - 1})`);
  return v;
};

if (!Array.isArray(escaleta.tomas) || !escaleta.tomas.length) fallo("escaleta.json necesita \"tomas\": [{\"desde\": 0, \"hasta\": 10}, …]");

// --- Trozos de cada toma, sin los silencios largos
const trozos = []; // en segundos del original
const usadas = new Set();
escaleta.tomas.forEach((toma, k) => {
  const a = idx(toma.desde, `tomas[${k}].desde`);
  const z = idx(toma.hasta, `tomas[${k}].hasta`);
  if (z < a) fallo(`tomas[${k}]: "hasta" (${z}) va antes que "desde" (${a})`);
  for (let i = a; i <= z; i++) {
    if (usadas.has(i)) fallo(`La palabra ${i} ("${texto(i)}") sale en dos tomas`);
    usadas.add(i);
  }
  // Bordes: un poco de aire, sin comerse la palabra de al lado
  const anterior = a > 0 ? palabras[a - 1].fin : 0;
  const siguiente = z < n - 1 ? palabras[z + 1].ini : palabras[z].fin + 0.5;
  let ini = Math.max(palabras[a].ini - MARGEN, anterior + 0.02, 0);
  let fin = Math.min(palabras[z].fin + MARGEN, siguiente - 0.02);
  // Silencios largos dentro de la toma: fuera, dejando un poco de aire a cada lado
  const huecos = silencios
    .filter(([x, y]) => y - x > pausaMaxima && y > ini && x < fin)
    .map(([x, y]) => [Math.max(x, ini) + MARGEN, Math.min(y, fin) - MARGEN]);
  let cursor = ini;
  for (const [x, y] of huecos) {
    if (x <= cursor) {
      cursor = Math.max(cursor, y);
      continue;
    }
    if (y >= fin) {
      fin = x;
      break;
    }
    trozos.push({ ini: cursor, fin: x, toma: k });
    cursor = y;
  }
  if (fin - cursor > 0.04) trozos.push({ ini: cursor, fin, toma: k });
});

// --- Línea de tiempo nueva (en fotogramas, sin acumular redondeos)
let salida = 0;
const linea = trozos
  .filter((t) => t.fin - t.ini > 0.08)
  .map((t) => {
    const desde = Math.round(salida * FPS);
    const durSalida = (t.fin - t.ini) / velocidad;
    salida += durSalida;
    const hasta = Math.round(salida * FPS);
    return { ...t, desde, duracion: hasta - desde, salida: desde / FPS, desdeFotograma: Math.round(t.ini * FPS) };
  })
  .filter((t) => t.duracion > 0);
const duracion = Math.round(salida * FPS);

// Original → salida (o null si ese instante se ha cortado)
const aSalida = (s) => {
  const t = linea.find((x) => s >= x.ini - 0.001 && s <= x.fin + 0.001);
  if (!t) return null;
  return t.salida + (s - t.desdeFotograma / FPS) / velocidad;
};

const palabrasSalida = [];
for (const toma of escaleta.tomas) {
  for (let i = toma.desde; i <= toma.hasta; i++) {
    const p = palabras[i];
    const ini = aSalida(p.ini) ?? aSalida(linea.find((x) => x.ini >= p.ini)?.ini ?? -1);
    if (ini === null) continue;
    let fin = aSalida(p.fin) ?? ini + Math.min(p.fin - p.ini, 0.6) / velocidad;
    if (fin <= ini) fin = ini + 0.12;
    const t = texto(i);
    if (t === "") continue; // corrección vacía = no se subtitula
    palabrasSalida.push({ i, texto: t, ini: +ini.toFixed(3), fin: +fin.toFixed(3) });
  }
}
// Que nunca se pisen
for (let k = 0; k < palabrasSalida.length - 1; k++) {
  palabrasSalida[k].fin = Math.min(palabrasSalida[k].fin, palabrasSalida[k + 1].ini);
}

const tiempoDe = (i, campo) => {
  idx(i, campo);
  const p = palabrasSalida.find((x) => x.i === i);
  if (!p) fallo(`${campo}: la palabra ${i} ("${texto(i)}") no está en ninguna toma`);
  return p;
};

const zooms = (escaleta.zooms || []).map((z, k) => ({ t: tiempoDe(z.palabra, `zooms[${k}].palabra`).ini, tipo: z.tipo === "suave" ? "suave" : "golpe" }));
const carteles = (escaleta.carteles || []).map((c, k) => ({
  texto: String(c.texto),
  desde: tiempoDe(c.desde, `carteles[${k}].desde`).ini,
  hasta: tiempoDe(c.hasta, `carteles[${k}].hasta`).fin + 0.3,
}));
// El gancho se queda al menos 2,5 s para que dé tiempo a leerlo
const gancho = escaleta.gancho ? { texto: String(escaleta.gancho.texto), hasta: Math.max(2.5, tiempoDe(escaleta.gancho.hasta, "gancho.hasta").fin + 0.3) } : null;

// Lo que depende de cómo está grabado este vídeo manda sobre el estilo
for (const campo of ["centroCara", "posicion"]) {
  if (escaleta[campo] !== undefined) estilo[campo] = escaleta[campo];
}

const datos = {
  original: original.replace(/^public\//, ""),
  velocidad,
  duracion,
  trozos: linea.map(({ desde, duracion, salida, desdeFotograma }) => ({ desde, duracion, salida, desdeFotograma })),
  palabras: palabrasSalida.map(({ texto, ini, fin }) => ({ texto, ini, fin })),
  zooms,
  carteles,
  gancho,
  estilo,
};
fs.writeFileSync("datos.json", JSON.stringify(datos));

// --- Resumen para revisar
const mmss = (s) => `${Math.floor(s / 60)}:${(s % 60).toFixed(1).padStart(4, "0")}`;
console.log(`✓ ${linea.length} trozos · duración ${mmss(duracion / FPS)} · velocidad ×${velocidad} · estilo ${rutaEstilo}`);
escaleta.tomas.forEach((toma, k) => {
  const ps = palabrasSalida.filter((p) => p.i >= toma.desde && p.i <= toma.hasta);
  if (ps.length) console.log(`  ${mmss(ps[0].ini)}  ${ps.map((p) => p.texto).join(" ")}`);
});
if (gancho) console.log(`  gancho: «${gancho.texto}» hasta ${mmss(gancho.hasta)}`);
zooms.forEach((z) => console.log(`  zoom ${z.tipo} en ${mmss(z.t)}`));
carteles.forEach((c) => console.log(`  cartel «${c.texto}» ${mmss(c.desde)}-${mmss(c.hasta)}`));
