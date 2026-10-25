// Prepara la carpeta de edición de un vídeo.
// Uso: node ~/.claude/skills/editar/empezar.mjs <vídeo>
// Crea "edicion-<nombre>/" junto al vídeo, con el proyecto de Remotion, y deja el vídeo listo en public/original.mp4.
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const fallo = (msg) => {
  console.error(`✗ ${msg}`);
  process.exit(1);
};

const video = process.argv[2] && path.resolve(process.argv[2]);
if (!video || !fs.existsSync(video)) fallo("Uso: node empezar.mjs <vídeo>");

// 1. Lo que hace falta en el ordenador
const mayor = Number(process.versions.node.split(".")[0]);
if (mayor < 18) fallo(`Tienes Node ${process.versions.node} y hace falta el 18 o más nuevo (https://nodejs.org).`);
for (const programa of ["git", "make"]) {
  if (spawnSync("which", [programa]).status !== 0) {
    fallo(`Falta ${programa} (las herramientas de desarrollo de Apple, las usa Whisper). Escribe en la Terminal  xcode-select --install  , acepta y vuelve a intentarlo.`);
  }
}

// 2. Carpeta de trabajo
const nombre = path.basename(video, path.extname(video)).replace(/[^\w-]+/g, "-");
const carpeta = path.join(path.dirname(video), `edicion-${nombre}`);
const plantilla = path.join(path.dirname(fileURLToPath(import.meta.url)), "plantilla");
if (!fs.existsSync(carpeta)) {
  fs.cpSync(plantilla, carpeta, { recursive: true });
  console.log(`1/3 Carpeta creada: ${carpeta}`);
} else {
  console.log(`1/3 La carpeta ya existía: ${carpeta}`);
}

// 3. Remotion y Whisper (solo la primera vez en esta carpeta)
if (!fs.existsSync(path.join(carpeta, "node_modules", "remotion"))) {
  console.log("2/3 Instalando Remotion (1-2 minutos)…");
  execFileSync("npm", ["install", "--no-audit", "--no-fund", "--loglevel=error"], { cwd: carpeta, stdio: "inherit" });
} else {
  console.log("2/3 Remotion ya estaba instalado");
}

// 4. El vídeo en un formato que Remotion lee bien (H.264, 30 fps, girado como se grabó)
fs.mkdirSync(path.join(carpeta, "public"), { recursive: true });
const destino = path.join(carpeta, "public", "original.mp4");
if (!fs.existsSync(destino)) {
  console.log("3/3 Preparando el vídeo…");
  const r = spawnSync(
    "npx",
    ["remotion", "ffmpeg", "-v", "error", "-y", "-i", video, "-c:v", "libx264", "-crf", "18", "-preset", "veryfast", "-r", "30", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", destino],
    { cwd: carpeta, stdio: "inherit" },
  );
  if (r.status !== 0) fallo("No he podido leer el vídeo.");
} else {
  console.log("3/3 El vídeo ya estaba preparado");
}
const sonda = spawnSync("npx", ["remotion", "ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height:format=duration", "-of", "json", destino], { cwd: carpeta, encoding: "utf8" });
const info = JSON.parse(sonda.stdout || "{}");
const { width, height } = info.streams?.[0] || {};
const segundos = Number(info.format?.duration || 0);
console.log(`✓ Listo. Vídeo de ${width}×${height}, ${segundos.toFixed(1)} s${width > height ? " (horizontal: se recortará a vertical por el centro)" : ""}.`);
// El estilo vive fuera de ~/.claude (Claude Code pide permiso para escribir ahí). EDITAR_DATOS solo es para pruebas.
const estilo = path.join(process.env.EDITAR_DATOS || path.join(os.homedir(), ".editar-claude"), "estilo.md");
console.log(fs.existsSync(estilo) ? `Estilo guardado: ${estilo}` : `Todavía no hay estilo: créalo en ${estilo} (estilo/cuestionario.md)`);
console.log(`Carpeta de edición: ${carpeta}`);
