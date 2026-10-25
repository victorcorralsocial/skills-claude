import { AbsoluteFill, Easing, Freeze, interpolate, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { cargarFuente, pesoRotulo } from "./fuentes.js";

// Zonas seguras de TikTok, Reels y Shorts a la vez (sobre 1080×1920):
// texto entre x 60 y 940 (x ≤ 900 entre y 1000 y 1650) y entre y 250 y 1436.
const SUB = { izquierda: 180, ancho: 720 }; // centrado y dentro de x 180-900
const ROTULO = { izquierda: 140, ancho: 800, arriba: 270 }; // x 140-940
const ALTURAS = { alto: 560, medio: 1000 }; // centro del bloque; "bajo" se apoya en el borde de abajo
const LIMITE_ABAJO = 1436;

const POR_DEFECTO = {
  fuente: "Poppins",
  peso: 700,
  mayusculas: false,
  tamano: 76,
  palabrasPorGrupo: 3,
  posicion: "bajo",
  colorTexto: "#FFFFFF",
  colorActivo: "#FFFFFF",
  resaltado: "pastilla",
  colorResaltado: "#2F6BFF",
  contorno: true,
  animacion: "suave",
  colorCaja: "#FFFFFF",
  colorTextoCaja: "#111111",
  colorAcento: "#2F6BFF",
  zoomEnCortes: 1.08,
  zoomGolpe: 1.22,
  centroCara: 0.38,
};

// ---------- Vídeo: trozos encadenados con zoom ----------

const escalaEn = (t, trozo, k, zooms, e, fps) => {
  // Cada corte alterna el encuadre para que el salto no se note
  let escala = k % 2 === 1 ? e.zoomEnCortes : 1;
  for (const z of zooms) {
    if (z.t < trozo.salida || z.t >= trozo.salida + trozo.duracion / fps) continue;
    if (t < z.t) continue;
    const dt = t - z.t;
    if (z.tipo === "golpe") {
      const entra = interpolate(dt, [0, 0.1], [0, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
      escala = escala + (e.zoomGolpe - 1) * entra;
    } else {
      const entra = interpolate(dt, [0, 1.6], [0, 1], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.sin) });
      escala = escala + (e.zoomGolpe - 1) * 0.6 * entra;
    }
  }
  return escala;
};

const Trozo = ({ trozo, k, zooms, e, original, velocidad }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = trozo.salida + frame / fps;
  const escala = escalaEn(t, trozo, k, zooms, e, fps);
  return (
    <AbsoluteFill style={{ transform: `scale(${escala})`, transformOrigin: `50% ${e.centroCara * 100}%` }}>
      <OffthreadVideo
        src={staticFile(original)}
        trimBefore={trozo.desdeFotograma}
        playbackRate={velocidad}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </AbsoluteFill>
  );
};

// ---------- Subtítulos palabra a palabra ----------

const agrupar = (palabras, maximo) => {
  const grupos = [];
  let actual = [];
  palabras.forEach((p, k) => {
    actual.push(p);
    const siguiente = palabras[k + 1];
    const pausa = siguiente ? siguiente.ini - p.fin : 1;
    if (actual.length >= maximo || /[.,;:?!]$/.test(p.texto) || pausa > 0.25 || !siguiente) {
      grupos.push(actual);
      actual = [];
    }
  });
  return grupos.map((g, k) => {
    const siguiente = grupos[k + 1];
    const fin = g[g.length - 1].fin;
    // Se queda en pantalla hasta el siguiente grupo si el hueco es corto
    const hasta = siguiente && siguiente[0].ini - fin < 0.4 ? siguiente[0].ini : fin + 0.15;
    return { palabras: g, ini: g[0].ini, hasta };
  });
};

const Subtitulos = ({ palabras, e }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const grupos = agrupar(palabras, e.palabrasPorGrupo);
  const grupo = grupos.find((g) => t >= g.ini && t < g.hasta);
  if (!grupo) return null;

  const familia = cargarFuente(e.fuente, e.peso);
  const letras = grupo.palabras.reduce((n, p) => n + p.texto.length + 1, 0);
  const tamano = Math.min(e.tamano, Math.round((e.tamano * 13) / Math.max(letras, 1)) + 20);
  const alto = tamano * 1.25 * 2; // caben dos líneas
  const arriba = e.posicion in ALTURAS ? ALTURAS[e.posicion] - alto / 2 : LIMITE_ABAJO - alto;

  const dt = t - grupo.ini;
  let entrada = 1;
  if (e.animacion === "pop") entrada = spring({ frame: Math.round(dt * fps), fps, config: { damping: 12, stiffness: 220 } });
  if (e.animacion === "suave") entrada = interpolate(dt, [0, 0.12], [0, 1], { extrapolateRight: "clamp" });

  const sombra = e.contorno
    ? "0 0 2px #000, 0 0 2px #000, 0 3px 0 #000, 0 0 12px rgba(0,0,0,0.65)"
    : "0 2px 10px rgba(0,0,0,0.45)";

  return (
    <div
      style={{
        position: "absolute",
        left: SUB.izquierda,
        width: SUB.ancho,
        top: arriba,
        height: alto,
        display: "flex",
        flexWrap: "wrap",
        alignContent: e.posicion in ALTURAS ? "center" : "flex-end",
        justifyContent: "center",
        gap: `0 ${Math.round(tamano * 0.28)}px`,
        fontFamily: familia,
        fontWeight: e.peso,
        fontSize: tamano,
        lineHeight: 1.2,
        textAlign: "center",
        opacity: e.animacion === "suave" ? entrada : 1,
        transform: `scale(${e.animacion === "pop" ? 0.8 + 0.2 * entrada : 1})`,
      }}
    >
      {grupo.palabras.map((p, j) => {
        // Solo una a la vez: la última que ha empezado, mientras suena (o poco después)
        const ultima = grupo.palabras.findLastIndex((q) => q.ini <= t);
        const activa = j === ultima && t < p.fin + 0.25;
        const pastilla = e.resaltado === "pastilla" && activa;
        return (
          <span
            key={j}
            style={{
              color: activa ? (e.resaltado === "color" ? e.colorResaltado : e.colorActivo) : e.colorTexto,
              textTransform: e.mayusculas ? "uppercase" : "none",
              textShadow: pastilla ? "none" : sombra,
              background: pastilla ? e.colorResaltado : "transparent",
              borderRadius: Math.round(tamano * 0.22),
              padding: `0 ${Math.round(tamano * 0.14)}px`,
              margin: `0 -${Math.round(tamano * 0.14)}px`,
            }}
          >
            {p.texto}
          </span>
        );
      })}
    </div>
  );
};

// ---------- Rótulo del gancho y carteles ----------

// *palabra* sale en el color de acento
const conAcento = (texto, color) =>
  texto.split(/(\*[^*]+\*)/).map((trozo, k) =>
    trozo.startsWith("*") ? (
      <span key={k} style={{ color }}>
        {trozo.slice(1, -1)}
      </span>
    ) : (
      <span key={k}>{trozo}</span>
    ),
  );

const Rotulo = ({ texto, tamano, e, duracion }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const peso = pesoRotulo(e.fuente, e.peso);
  const familia = cargarFuente(e.fuente, peso);
  const entra = spring({ frame, fps, config: { damping: 14, stiffness: 180 } });
  const sale = interpolate(frame, [duracion - 6, duracion], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: ROTULO.izquierda, width: ROTULO.ancho, top: ROTULO.arriba, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          background: e.colorCaja,
          color: e.colorTextoCaja,
          fontFamily: familia,
          fontWeight: peso,
          fontSize: tamano,
          lineHeight: 1.12,
          textAlign: "center",
          textTransform: e.mayusculas ? "uppercase" : "none",
          padding: `${Math.round(tamano * 0.3)}px ${Math.round(tamano * 0.45)}px`,
          borderRadius: Math.round(tamano * 0.3),
          boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
          maxWidth: ROTULO.ancho,
          opacity: sale,
          transform: `translateY(${(1 - entra) * -40}px) scale(${0.9 + 0.1 * entra})`,
        }}
      >
        {conAcento(texto, e.colorAcento)}
      </div>
    </div>
  );
};

// ---------- Composición ----------

export const Editado = ({ trozos, palabras, zooms, carteles, gancho, estilo, original, velocidad }) => {
  const { fps } = useVideoConfig();
  const e = { ...POR_DEFECTO, ...estilo };
  const desde = (s) => Math.round(s * fps);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {trozos.map((trozo, k) => (
        <Sequence key={k} from={trozo.desde} durationInFrames={trozo.duracion} name={`Trozo ${k + 1}`}>
          <Trozo trozo={trozo} k={k} zooms={zooms} e={e} original={original} velocidad={velocidad} />
        </Sequence>
      ))}
      <Subtitulos palabras={palabras} e={e} />
      {gancho ? (
        <Sequence from={0} durationInFrames={Math.max(1, desde(gancho.hasta))} name="Gancho">
          <Rotulo texto={gancho.texto} tamano={72} e={e} duracion={Math.max(1, desde(gancho.hasta))} />
        </Sequence>
      ) : null}
      {carteles.map((c, k) => (
        <Sequence key={k} from={desde(c.desde)} durationInFrames={Math.max(1, desde(c.hasta - c.desde))} name={`Cartel ${k + 1}`}>
          <Rotulo texto={c.texto} tamano={58} e={e} duracion={Math.max(1, desde(c.hasta - c.desde))} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

// ---------- Revisión: zonas seguras y mosaico de 9 instantes ----------

export const Guias = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <div style={{ position: "absolute", left: 60, top: 250, width: 880, height: 1186, border: "4px solid rgba(255,0,0,0.85)" }} />
    <div style={{ position: "absolute", left: 900, top: 1000, width: 40, height: 436, background: "rgba(255,0,0,0.45)" }} />
  </AbsoluteFill>
);

export const Revision = (props) => {
  const { fps } = useVideoConfig();
  const instantes = props.instantes?.length ? props.instantes : Array.from({ length: 9 }, (_, k) => ((k + 0.5) * props.duracion) / 9 / fps);
  return (
    <AbsoluteFill style={{ backgroundColor: "#222" }}>
      {instantes.slice(0, 9).map((s, k) => (
        <div key={k} style={{ position: "absolute", left: (k % 3) * 360, top: Math.floor(k / 3) * 640, width: 1080, height: 1920, transform: "scale(0.3333)", transformOrigin: "0 0", overflow: "hidden" }}>
          <Freeze frame={Math.min(props.duracion - 1, Math.round(s * fps))}>
            <Editado {...props} />
            <Guias />
          </Freeze>
          <div style={{ position: "absolute", left: 20, top: 20, padding: "6px 18px", background: "rgba(0,0,0,0.7)", color: "#fff", fontSize: 64, fontFamily: "sans-serif" }}>{s.toFixed(1)} s</div>
        </div>
      ))}
    </AbsoluteFill>
  );
};

export const ConGuias = (props) => (
  <AbsoluteFill>
    <Editado {...props} />
    <Guias />
  </AbsoluteFill>
);
