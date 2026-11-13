// Gráficos dibujados a mano en SVG (sin librerías).
window.GRAFICOS = (function () {
  const NS = 'http://www.w3.org/2000/svg';

  // Anillo de progreso: valor de 0 a 1
  function anillo(valor, { tam = 120, grosor = 12, color = 'var(--acento)', fondo = 'var(--pista)', centro = '' } = {}) {
    const r = (tam - grosor) / 2;
    const c = 2 * Math.PI * r;
    const v = Math.max(0, Math.min(1, valor));
    return `<svg class="anillo" viewBox="0 0 ${tam} ${tam}" width="${tam}" height="${tam}" aria-hidden="true">
      <circle cx="${tam / 2}" cy="${tam / 2}" r="${r}" fill="none" stroke="${fondo}" stroke-width="${grosor}"/>
      <circle class="anillo-valor" cx="${tam / 2}" cy="${tam / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="${grosor}"
        stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c}" style="--final:${c * (1 - v)}"
        transform="rotate(-90 ${tam / 2} ${tam / 2})"/>
      ${centro}
    </svg>`;
  }

  // Barras verticales: [{valor, etiqueta, clase}]
  function barras(datos, { alto = 120, meta = null, max = null, clase = '' } = {}) {
    const m = max ?? Math.max(...datos.map((d) => d.valor), meta ?? 0) * 1.08;
    const ancho = 100 / datos.length;
    const metaY = meta ? 100 - (meta / m) * 100 : null;
    return `<div class="barras ${clase}" style="height:${alto}px">
      ${metaY !== null ? `<span class="barras-meta" style="top:${metaY}%"></span>` : ''}
      ${datos.map((d, i) => `<span class="barra-v ${d.clase || ''}" style="left:${i * ancho}%;width:${ancho}%;--alto:${(d.valor / m) * 100}%;--i:${i}" title="${d.titulo || ''}"><i></i></span>`).join('')}
    </div>`;
  }

  // Línea con área: puntos [{x (0-1), y (valor)}]
  function area(puntos, { ancho = 600, alto = 180, min = null, max = null, color = 'var(--acento)', id = 'a', extra = '' } = {}) {
    const ys = puntos.map((p) => p.y);
    const lo = min ?? Math.min(...ys);
    const hi = max ?? Math.max(...ys);
    const px = (x) => x * ancho;
    const py = (y) => alto - ((y - lo) / (hi - lo || 1)) * (alto - 8) - 4;
    const linea = puntos.map((p, i) => `${i ? 'L' : 'M'}${px(p.x).toFixed(1)},${py(p.y).toFixed(1)}`).join(' ');
    const ult = puntos[puntos.length - 1];
    const relleno = `${linea} L${px(ult.x).toFixed(1)},${alto} L${px(puntos[0].x).toFixed(1)},${alto} Z`;
    return {
      svg: `<svg class="area" viewBox="0 0 ${ancho} ${alto}" preserveAspectRatio="none" aria-hidden="true">
        <defs><linearGradient id="grad-${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${color}" stop-opacity=".35"/><stop offset="1" stop-color="${color}" stop-opacity="0"/>
        </linearGradient></defs>
        <path class="area-relleno" d="${relleno}" fill="url(#grad-${id})"/>
        <path class="area-linea" d="${linea}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" pathLength="1"/>
        ${extra}
      </svg>`,
      px, py,
    };
  }

  // Mapa de calor: valores de 0 a 1 por día (columnas = semanas)
  function calor(valores, { color = 'var(--verde)' } = {}) {
    return `<div class="calor" style="--color:${color}">${valores.map((v, i) =>
      `<span style="--v:${v === null ? 0 : v};--i:${i}" class="${v === null ? 'vacio' : ''}"></span>`).join('')}</div>`;
  }

  return { anillo, barras, area, calor, NS };
})();
