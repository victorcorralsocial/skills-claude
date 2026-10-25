// Whisper (whisper.cpp) y su modelo, compartidos por todos los vídeos en ~/.editar-claude/whisper.
// Ejecutado a mano (node scripts/whisper.mjs) solo lo prepara.
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { downloadWhisperModel, installWhisperCpp } from "@remotion/install-whisper-cpp";

export const VERSION = "1.5.5"; // se compila con make, sin instalar nada más
// EDITAR_DATOS solo sirve para probar en otra carpeta
export const CARPETA = path.join(process.env.EDITAR_DATOS || path.join(os.homedir(), ".editar-claude"), "whisper");
export const MODELO = "medium"; // bien en español sin tardar demasiado

export const prepararWhisper = async (modelo = MODELO) => {
  await installWhisperCpp({ to: CARPETA, version: VERSION, printOutput: false });
  await downloadWhisperModel({ model: modelo, folder: CARPETA, printOutput: false });
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log("Preparando Whisper y el modelo (1,5 GB; solo la primera vez)…");
  await prepararWhisper(process.argv[2]);
  console.log(`✓ Whisper listo en ${CARPETA}`);
}
