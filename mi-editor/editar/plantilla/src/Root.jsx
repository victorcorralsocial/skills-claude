import { Composition } from "remotion";
import { ConGuias, Editado, Revision } from "./Editado.jsx";

const PROPS = { trozos: [], palabras: [], zooms: [], carteles: [], gancho: null, estilo: {}, original: "original.mp4", duracion: 30, velocidad: 1 };
const duracion = ({ props }) => ({ durationInFrames: Math.max(1, props.duracion) });

// Los datos (trozos, palabras, zooms, estilo) los genera scripts/preparar.mjs en datos.json.
// Revision y ConGuias solo se usan para revisar (scripts/fotogramas.mjs).
export const Root = () => (
  <>
    <Composition id="Editado" component={Editado} width={1080} height={1920} fps={30} durationInFrames={30} defaultProps={PROPS} calculateMetadata={duracion} />
    <Composition id="ConGuias" component={ConGuias} width={1080} height={1920} fps={30} durationInFrames={30} defaultProps={PROPS} calculateMetadata={duracion} />
    <Composition id="Revision" component={Revision} width={1080} height={1920} fps={30} durationInFrames={30} defaultProps={PROPS} calculateMetadata={duracion} />
  </>
);
