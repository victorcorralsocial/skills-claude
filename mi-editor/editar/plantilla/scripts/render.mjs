// Renderiza el vídeo editado con los datos de datos.json.
// Uso: node scripts/render.mjs <salida.mp4>
import { spawnSync } from "node:child_process";
import fs from "node:fs";

const salida = process.argv[2] || "video-editado.mp4";
if (!fs.existsSync("datos.json")) {
  console.error("✗ Falta datos.json: ejecuta antes scripts/preparar.mjs");
  process.exit(1);
}
// Si la escaleta o el estilo han cambiado después de preparar, se renderizaría el montaje viejo
if (fs.existsSync("escaleta.json") && fs.statSync("escaleta.json").mtimeMs > fs.statSync("datos.json").mtimeMs) {
  console.error("✗ escaleta.json ha cambiado: ejecuta antes scripts/preparar.mjs");
  process.exit(1);
}
const r = spawnSync(
  "npx",
  ["remotion", "render", "src/index.js", "Editado", salida, "--props=./datos.json", "--codec=h264", "--crf=18", "--audio-bitrate=192k", "--log=error"],
  { stdio: "inherit" },
);
if (r.status !== 0) process.exit(r.status ?? 1);
console.log(`✓ Vídeo listo: ${salida}`);
