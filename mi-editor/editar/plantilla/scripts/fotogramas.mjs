// Saca fotogramas para revisar el montaje, con las zonas seguras dibujadas en rojo:
// revision/mosaico.png (9 instantes repartidos, o los que digas) y revision/t-<segundo>.png.
// Uso: node scripts/fotogramas.mjs [segundo segundo …]
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import fs from "node:fs";
import path from "node:path";

if (!fs.existsSync("datos.json")) {
  console.error("✗ Falta datos.json: ejecuta antes scripts/preparar.mjs");
  process.exit(1);
}
const datos = JSON.parse(fs.readFileSync("datos.json", "utf8"));
const instantes = process.argv.slice(2).map(Number).filter((s) => s >= 0);
fs.mkdirSync("revision", { recursive: true });

const serveUrl = await bundle({ entryPoint: path.resolve("src/index.js") });
const foto = async (id, props, salida, frame = 0) => {
  const composition = await selectComposition({ serveUrl, id, inputProps: props });
  await renderStill({ composition, serveUrl, inputProps: props, output: salida, frame, imageFormat: "png" });
};

await foto("Revision", datos, "revision/mosaico.png");
for (const s of instantes) {
  await foto("ConGuias", datos, `revision/t-${s}.png`, Math.min(datos.duracion - 1, Math.round(s * 30)));
}
console.log(`✓ revision/mosaico.png${instantes.length ? ` y ${instantes.map((s) => `revision/t-${s}.png`).join(", ")}` : ""}`);
