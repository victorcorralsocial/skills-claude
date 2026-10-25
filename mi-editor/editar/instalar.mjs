// Instala /editar. Lo ejecuta Claude Code cuando le dices «instala este editor».
// Uso: node <carpeta descomprimida>/editar/instalar.mjs
// 1. Comprueba Node, git y make
// 2. Copia /editar a ~/.claude/skills (tu estilo está aparte, en ~/.editar-claude, y no se toca)
// 3. Instala la skill oficial de Remotion (remotion-best-practices)
// Whisper y su modelo se descargan solos la primera vez que editas un vídeo.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const fallo = (msg) => {
  console.error(`✗ ${msg}`);
  process.exit(1);
};

const origen = path.dirname(fileURLToPath(import.meta.url)); // esta carpeta, editar/
// EDITAR_SKILLS_DIR solo sirve para probar la instalación en otra carpeta
const skills = process.env.EDITAR_SKILLS_DIR || path.join(os.homedir(), ".claude", "skills");
const global = !process.env.EDITAR_SKILLS_DIR;

// 1. Lo que tiene que haber en el ordenador
const mayor = Number(process.versions.node.split(".")[0]);
if (mayor < 18) fallo(`Tienes Node ${process.versions.node} y hace falta el 18 o más nuevo. Descarga la versión LTS de https://nodejs.org, instálala y vuelve a intentarlo.`);
console.log(`1/3 Node ${process.versions.node}: bien`);
for (const programa of ["git", "make"]) {
  if (spawnSync("which", [programa]).status !== 0) {
    fallo(`Falta ${programa} (las herramientas de desarrollo de Apple, las usa Whisper). Escribe en la Terminal  xcode-select --install  , acepta, espera a que acabe y vuelve a intentarlo.`);
  }
}

// 2. La skill
const destino = path.join(skills, "editar");
if (path.resolve(origen) === path.resolve(destino)) {
  console.log("2/3 /editar ya está en su sitio");
} else {
  fs.rmSync(destino, { recursive: true, force: true });
  fs.mkdirSync(skills, { recursive: true });
  fs.cpSync(origen, destino, { recursive: true, filter: (f) => !f.split(path.sep).includes("node_modules") });
  console.log(`2/3 /editar copiada a ${destino}`);
}

// 3. Skill oficial de Remotion (la usa /editar para lo que la plantilla no hace)
if (fs.existsSync(path.join(skills, "remotion-best-practices"))) {
  console.log("3/3 La skill de Remotion ya estaba instalada");
} else {
  const args = ["-y", "skills@1.7.4", "add", "remotion-dev/skills", "--skill", "remotion-best-practices", "-a", "claude-code", "-y", "--copy"];
  if (global) args.push("-g");
  const r = spawnSync("npx", args, { cwd: global ? os.homedir() : path.dirname(path.dirname(skills)), stdio: ["ignore", "ignore", "pipe"], encoding: "utf8" });
  if (r.status === 0 && fs.existsSync(path.join(skills, "remotion-best-practices"))) {
    console.log("3/3 Skill oficial de Remotion instalada");
  } else {
    console.log("3/3 ! No se ha podido instalar la skill de Remotion (no es imprescindible: /editar funciona sin ella).");
  }
}

console.log("✓ Listo. Escribe /editar seguido de tu vídeo (puedes arrastrarlo a la terminal).");
console.log("  La primera vez te preguntará tu estilo y descargará Whisper (unos 1,5 GB).");
console.log("  Si /editar no aparece todavía, cierra Claude Code y vuelve a abrirlo.");
