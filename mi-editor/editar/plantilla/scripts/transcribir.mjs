// Transcribe el vídeo palabra a palabra con Whisper (en tu ordenador, sin subir nada).
// Uso: node scripts/transcribir.mjs [modelo]
//   modelo: medium (por defecto, bien en español) o small (más rápido, más fallos).
//   Los nombres mal escritos ("Clot" por "Claude") se corrigen luego en escaleta.json.
// Lee public/original.* y escribe transcripcion.json (palabras y silencios) y transcripcion.txt (para leerla).
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { transcribe } from "@remotion/install-whisper-cpp";
import { CARPETA, MODELO, prepararWhisper, VERSION } from "./whisper.mjs";

const modelo = process.argv[2] || MODELO;

const original = fs.readdirSync("public").find((f) => f.startsWith("original."));
if (!original) throw new Error("No encuentro public/original.* (el vídeo que hay que editar).");

// ffmpeg viene con Remotion: no hace falta instalarlo. Escribe lo que mide en stderr.
const ffmpegLog = (args) => spawnSync("npx", ["remotion", "ffmpeg", ...args], { encoding: "utf8", maxBuffer: 1 << 26 }).stderr;

// 1. Audio a 16 kHz, que es lo que pide Whisper
fs.mkdirSync("tmp", { recursive: true });
const wav = path.resolve("tmp/audio.wav");
console.log("1/4 Sacando el audio…");
execFileSync("npx", ["remotion", "ffmpeg", "-y", "-i", `public/${original}`, "-vn", "-ar", "16000", "-ac", "1", wav], { stdio: "ignore" });

// 2. Whisper y el modelo (solo la primera vez: tarda unos minutos)
console.log("2/4 Preparando Whisper (la primera vez tarda unos minutos)…");
await prepararWhisper(modelo);

// 3. Transcripción con tiempos por palabra
const ALUCINACIONES = /amara|suscr[ií]b|gracias por ver|subt[ií]tulos? (realizados|por)/i;
const transcribirWav = async (ruta, desfase = 0, conProgreso = false) => {
  const salida = await transcribe({
    inputPath: ruta,
    whisperPath: CARPETA,
    whisperCppVersion: VERSION,
    model: modelo,
    modelFolder: CARPETA,
    language: "es",
    tokenLevelTimestamps: true,
    splitOnWord: true,
    printOutput: false,
    onProgress: conProgreso ? (p) => process.stdout.write(`\r   ${Math.round(p * 100)} %`) : undefined,
  });
  // Cada palabra empieza donde dice el alineamiento DTW (centésimas), que es mucho más fino que los "offsets"
  const lista = [];
  for (const item of salida.transcription) {
    const texto = item.text.trim().replace(/^["«“]+|["»”]+$/g, "");
    if (!texto || /^\[.*\]$/.test(texto)) continue;
    const token = item.tokens.find((t) => t.t_dtw >= 0 && !t.text.startsWith("[_"));
    lista.push({ texto, ini: desfase + (token ? token.t_dtw / 100 : item.offsets.from / 1000) });
  }
  if (ALUCINACIONES.test(lista.map((p) => p.texto).join(" "))) return [];
  return lista;
};

console.log(`3/4 Transcribiendo con el modelo ${modelo}…`);
const crudas = await transcribirWav(wav, 0, true);
process.stdout.write("\n");

// 4. Silencios medidos en el audio (más fiables que los tiempos de Whisper para cortar)
console.log("4/4 Buscando los silencios…");
const registro = ffmpegLog(["-i", wav, "-af", "silencedetect=noise=-35dB:d=0.2", "-f", "null", "-"]);
const silencios = [];
let abierto = null;
for (const linea of registro.split("\n")) {
  const a = linea.match(/silence_start: ([\d.]+)/);
  const b = linea.match(/silence_end: ([\d.]+)/);
  if (a) abierto = parseFloat(a[1]);
  if (b && abierto !== null) {
    silencios.push([abierto, parseFloat(b[1])]);
    abierto = null;
  }
}
const [h, m, sg] = registro.match(/Duration: (\d+):(\d+):([\d.]+)/).slice(1).map(Number);
const duracion = h * 3600 + m * 60 + sg;
if (abierto !== null) silencios.push([abierto, duracion]);

// Une silencios pegados (ffmpeg a veces parte uno en dos)
const unidos = [];
for (const [x, y] of silencios) {
  const ultimo = unidos[unidos.length - 1];
  if (ultimo && x - ultimo[1] < 0.06) ultimo[1] = y;
  else unidos.push([x, y]);
}
silencios.splice(0, silencios.length, ...unidos.map(([x, y]) => [+x.toFixed(3), +y.toFixed(3)]));

// Si el alineamiento deja una palabra dentro de un silencio, la lleva al borde más cercano:
// justo antes del silencio (llegó tarde) o justo después (empezó tras la pausa)
const recolocar = (lista) => {
  lista.sort((a, b) => a.ini - b.ini);
  for (let k = 0; k < lista.length; k++) {
    const p = lista[k];
    const dentro = silencios.find(([x, y]) => p.ini > x + 0.05 && p.ini < y - 0.05);
    if (dentro) {
      const [x, y] = dentro;
      p.ini = p.ini - x < y - p.ini ? x - 0.25 : y + 0.02;
    }
    if (k > 0) p.ini = Math.max(p.ini, lista[k - 1].ini + 0.05);
  }
};
recolocar(crudas);

// Huecos con voz (entre silencios) en los que no ha salido ninguna palabra:
// un tramo entero, su principio, su final o un salto largo entre dos palabras
const huecosSinPalabras = () => {
  const bordes = [0, ...silencios.flat(), duracion];
  const huecos = [];
  for (let k = 0; k < bordes.length; k += 2) {
    const [x, y] = [bordes[k], bordes[k + 1]];
    if (y - x < 0.5) continue;
    const dentro = crudas.filter((p) => p.ini >= x - 0.1 && p.ini <= y).map((p) => p.ini);
    if (!dentro.length) {
      huecos.push([x, y]);
      continue;
    }
    if (dentro[0] - x > 0.7) huecos.push([x, dentro[0]]);
    for (let j = 1; j < dentro.length; j++) {
      if (dentro[j] - dentro[j - 1] > 1.2) huecos.push([dentro[j - 1] + 0.5, dentro[j]]);
    }
    if (y - dentro[dentro.length - 1] > 1.2) huecos.push([dentro[dentro.length - 1] + 0.5, y]);
  }
  return huecos;
};

// Whisper a veces se salta una toma repetida (o parte): se vuelve a escuchar cada hueco por separado
let rescatadas = 0;
for (const [x, y] of huecosSinPalabras()) {
  const desde = Math.max(0, x - 0.15);
  const trozo = path.resolve(`tmp/trozo-${desde.toFixed(2)}.wav`);
  execFileSync("npx", ["remotion", "ffmpeg", "-v", "error", "-y", "-ss", desde.toFixed(3), "-to", Math.min(duracion, y + 0.15).toFixed(3), "-i", wav, trozo]);
  // Solo las palabras que caen en el hueco (las de los bordes ya estaban)
  const nuevas = (await transcribirWav(trozo, desde)).filter((p) => p.ini >= x - 0.1 && p.ini <= y - 0.1);
  nuevas.forEach((p) => (p.rescatada = true));
  crudas.push(...nuevas);
  rescatadas += nuevas.length;
}
if (rescatadas) recolocar(crudas);
const sinPalabras = huecosSinPalabras().filter(([x, y]) => y - x > 0.6);

// Fin de cada palabra: el inicio de la siguiente o, si antes empieza un silencio, el silencio
const palabras = crudas.map((p, k) => {
  const siguiente = crudas[k + 1] ? crudas[k + 1].ini : duracion;
  const silencio = silencios.find(([x]) => x > p.ini + 0.05 && x < siguiente);
  const fin = Math.min(siguiente, silencio ? silencio[0] : siguiente, p.ini + 1.5);
  return { i: k, texto: p.texto, ini: +p.ini.toFixed(2), fin: +Math.max(fin, p.ini + 0.08).toFixed(2), ...(p.rescatada ? { rescatada: true } : {}) };
});

// Un fotograma del original para ver dónde está la cara
fs.mkdirSync("revision", { recursive: true });
execFileSync("npx", ["remotion", "ffmpeg", "-v", "error", "-y", "-ss", String(Math.min(2, duracion / 2)), "-i", `public/${original}`, "-frames:v", "1", "-vf", "scale=540:-2", "revision/original.png"]);

fs.writeFileSync("transcripcion.json", JSON.stringify({ original: `public/${original}`, duracion, palabras, silencios }, null, 1));

// Versión para leer: una línea por frase, con el número de cada palabra.
// Las frases rescatadas en la segunda pasada llevan (2.ª pasada): comprueba que tienen sentido.
const lineas = [];
let frase = [];
const cerrar = () => {
  if (!frase.length) return;
  const a = frase[0], z = frase[frase.length - 1];
  const marca = frase.some((p) => p.rescatada) ? "  (2.ª pasada)" : "";
  lineas.push({ t: a.ini, texto: `[${a.i}-${z.i}] ${a.ini.toFixed(2)}-${z.fin.toFixed(2)}  ${frase.map((p) => `${p.texto}·${p.i}`).join(" ")}${marca}` });
  frase = [];
};
palabras.forEach((p, k) => {
  const siguiente = palabras[k + 1];
  frase.push(p);
  if (!siguiente || siguiente.ini - p.fin > 0.3 || /[.?!]$/.test(p.texto) || !!siguiente.rescatada !== !!p.rescatada) cerrar();
});
cerrar();
for (const [x, y] of sinPalabras) lineas.push({ t: x, texto: `[sonido sin palabras] ${x.toFixed(2)}-${y.toFixed(2)}  (risa, ruido o algo que Whisper no entiende: si importa, escúchalo)` });
lineas.sort((a, b) => a.t - b.t);
fs.writeFileSync("transcripcion.txt", lineas.map((l) => l.texto).join("\n") + "\n");
console.log(`Listo: ${palabras.length} palabras${rescatadas ? ` (${rescatadas} rescatadas en una segunda pasada)` : ""}, ${silencios.length} silencios. Lee transcripcion.txt y mira revision/original.png`);
