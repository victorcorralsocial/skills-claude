// Fuentes de Google que se pueden elegir en estilo.md
import { loadFont as anton } from "@remotion/google-fonts/Anton";
import { loadFont as archivoBlack } from "@remotion/google-fonts/ArchivoBlack";
import { loadFont as bebasNeue } from "@remotion/google-fonts/BebasNeue";
import { loadFont as inter } from "@remotion/google-fonts/Inter";
import { loadFont as montserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as nunito } from "@remotion/google-fonts/Nunito";
import { loadFont as oswald } from "@remotion/google-fonts/Oswald";
import { loadFont as poppins } from "@remotion/google-fonts/Poppins";
import { loadFont as dmSerif } from "@remotion/google-fonts/DMSerifDisplay";
import { loadFont as bricolage } from "@remotion/google-fonts/BricolageGrotesque";

const FUENTES = {
  Anton: anton,
  "Archivo Black": archivoBlack,
  "Bebas Neue": bebasNeue,
  Inter: inter,
  Montserrat: montserrat,
  Nunito: nunito,
  Oswald: oswald,
  Poppins: poppins,
  "DM Serif Display": dmSerif,
  "Bricolage Grotesque": bricolage,
};

export const NOMBRES_FUENTES = Object.keys(FUENTES);

// Estas solo tienen un grosor: pedirles negrita la deforma
const UN_PESO = new Set(["Anton", "Archivo Black", "Bebas Neue", "DM Serif Display"]);
export const pesoRotulo = (nombre, peso) => (UN_PESO.has(nombre) ? 400 : Math.max(peso, 700));

export const cargarFuente = (nombre, peso) => {
  const carga = FUENTES[nombre] || FUENTES.Poppins;
  const opciones = { subsets: ["latin", "latin-ext"] };
  try {
    return carga("normal", { ...opciones, weights: [String(peso)] }).fontFamily;
  } catch {
    return carga("normal", opciones).fontFamily; // la fuente no tiene ese grosor: se carga entera
  }
};
