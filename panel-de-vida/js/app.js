// Panel de vida 2.0: pinta cada tarjeta y responde a los clics.
(function () {
  const P = window.PANEL;
  const G = window.GRAFICOS;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // ── Opciones de la dirección (para grabar o probar) ──────────────────
  // ?hora=11:40 → el panel cree que es esa hora · ?tiempo=ejemplo → no consulta el tiempo
  const params = new URLSearchParams(location.search);
  const AHORA = (() => {
    const d = new Date();
    const h = params.get('hora');
    if (h && /^\d{1,2}:\d{2}$/.test(h)) { const [hh, mm] = h.split(':').map(Number); d.setHours(hh, mm, 0, 0); }
    return d;
  })();
  const HOY = new Date(AHORA); HOY.setHours(0, 0, 0, 0);

  // ── Guardar en el navegador ──────────────────────────────────────────
  const almacen = {
    leer(k, def) { try { const v = localStorage.getItem('panel2:' + k); return v === null ? def : JSON.parse(v); } catch (e) { return def; } },
    guardar(k, v) { try { localStorage.setItem('panel2:' + k, JSON.stringify(v)); } catch (e) {} },
    borrarTodo() { try { Object.keys(localStorage).filter((k) => k.startsWith('panel2:')).forEach((k) => localStorage.removeItem(k)); } catch (e) {} },
  };

  // ── Formatos en español ──────────────────────────────────────────────
  const nf0 = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0, useGrouping: 'always' });
  const nf2 = new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: 'always' });
  const eur = (n, dec = false) => (dec ? nf2.format(n) : nf0.format(Math.round(n))) + ' €';
  const num = (n) => nf0.format(n);
  const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const DIAS_C = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
  const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const MESES_C = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const iso = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const desdeIso = (s) => { const [a, m, d] = s.slice(0, 10).split('-').map(Number); const f = new Date(a, m - 1, d); if (s.length > 10) { const [hh, mm] = s.slice(11, 16).split(':').map(Number); f.setHours(hh, mm); } return f; };
  const masDias = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const diasEntre = (a, b) => Math.round((desdeIso(iso(b)) - desdeIso(iso(a))) / 864e5);
  const hm = (d) => String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  const fechaCorta = (d) => d.getDate() + ' ' + MESES_C[d.getMonth()];
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const duracion = (min) => { const h = Math.floor(min / 60); const m = Math.round(min % 60); return h && m ? `${h} h ${m} min` : h ? `${h} h` : `${m} min`; };
  const cuando = (n) => n === 0 ? 'hoy' : n === 1 ? 'mañana' : n === -1 ? 'ayer' : n > 1 && n < 7 ? 'el ' + DIAS[masDias(HOY, n).getDay()] : n > 0 ? 'en ' + n + ' días' : 'hace ' + -n + ' días';
  const colorVar = (c) => (c && c.startsWith('#') ? c : `var(--${c || 'acento'})`);
  const semanaIso = (d) => { const x = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())); const n = x.getUTCDay() || 7; x.setUTCDate(x.getUTCDate() + 4 - n); const a = new Date(Date.UTC(x.getUTCFullYear(), 0, 1)); return Math.ceil(((x - a) / 864e5 + 1) / 7); };
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ── Iconos (trazo de 24×24) ──────────────────────────────────────────
  const I = {
    hoy: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    calendario: '<rect x="3" y="4.5" width="18" height="16" rx="3"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
    vence: '<path d="M12 7v5l3 2"/><circle cx="12" cy="12" r="9"/>',
    dinero: '<rect x="2.5" y="6" width="19" height="13" rx="3"/><path d="M2.5 10h19M16.5 14.5h2"/>',
    suscripciones: '<path d="M4 7h16M4 12h16M4 17h10"/><circle cx="18.5" cy="17" r="2.5"/>',
    habitos: '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.6 2.5L16 9.5"/>',
    salud: '<path d="M12 20s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7.3 4.5 4.5 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z"/>',
    objetivos: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
    gente: '<circle cx="9" cy="8.5" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5.2a3.5 3.5 0 0 1 0 6.6M18 14.2a6.5 6.5 0 0 1 3.5 5.8"/>',
    ahorro: '<path d="M5 11a7 6 0 0 1 13.5-1.5H20v4h-1.7A7 6 0 0 1 15 17v2.5h-3V18h-2v1.5H7V17A6 6 0 0 1 5 11Z"/><path d="M15 10h.01"/>',
    datos: '<path d="M4 19V5M4 19h16"/><path d="m7.5 14.5 3.5-4 3 2.5 5-6"/>',
    nota: '<path d="M15.5 4.5 19.5 8.5 9 19H5v-4L15.5 4.5Z"/>',
    sol: '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"/>',
    nube: '<path d="M7 18.5h10a4.5 4.5 0 0 0 .4-9A6 6 0 0 0 6 9.8a4.4 4.4 0 0 0 1 8.7Z"/>',
    solnube: '<path d="M8.5 4.2v1.3M3.7 9H2.4M4.8 5.3l.9.9M12.3 6.2l.9-.9"/><path d="M5.6 11.7A3.6 3.6 0 0 1 11.5 8"/><path d="M9 19.5h8.5a3.8 3.8 0 0 0 .3-7.6 5 5 0 0 0-9.6 1.2A3.2 3.2 0 0 0 9 19.5Z"/>',
    lluvia: '<path d="M7 15.5h10a4.5 4.5 0 0 0 .4-9A6 6 0 0 0 6 6.8a4.4 4.4 0 0 0 1 8.7Z"/><path d="m8 18-1 2.5M12.5 18l-1 2.5M17 18l-1 2.5"/>',
    nieve: '<path d="M7 15.5h10a4.5 4.5 0 0 0 .4-9A6 6 0 0 0 6 6.8a4.4 4.4 0 0 0 1 8.7Z"/><path d="M8 19h.01M12 20.5h.01M16 19h.01"/>',
    tormenta: '<path d="M7 15.5h10a4.5 4.5 0 0 0 .4-9A6 6 0 0 0 6 6.8a4.4 4.4 0 0 0 1 8.7Z"/><path d="m12.5 15-2 3.5h3l-2 3.5"/>',
    niebla: '<path d="M4 9h16M3 13h18M5 17h14"/>',
    paraguas: '<path d="M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9Z"/><path d="M12 12v6.5a2 2 0 0 1-4 0"/>',
    reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    aviso: '<path d="M12 3.5 2.5 20h19L12 3.5Z"/><path d="M12 10v4M12 17h.01"/>',
    regalo: '<rect x="3.5" y="8" width="17" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12M12 8S10.5 3.5 8 4.5 9 8 12 8Zm0 0s1.5-4.5 4-3.5S15 8 12 8Z"/>',
    mas: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    llama: '<path d="M12 21c-3.9 0-6.5-2.6-6.5-6.2 0-3.3 2.3-5.4 3.6-7.8.4 1.6 1.2 2.6 2.4 3.2C11.8 7 13 4.6 15 3c.3 3.4 3.5 5.6 3.5 10.6 0 4.3-2.6 7.4-6.5 7.4Z"/>',
    luna: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/>',
    pasos: '<path d="M8.5 3.5c1.5 0 2.5 1.6 2.5 4s-.9 4.5-2.5 4.5S6 10 6 7.5s1-4 2.5-4ZM15.5 9c1.5 0 2.5 1.6 2.5 4s-.9 4.5-2.5 4.5S13 15.5 13 13s1-4 2.5-4ZM6.5 14.5h4M13.5 20h4"/>',
    libro: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5"/>',
    gota: '<path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11Z"/>',
    pesa: '<path d="M6.5 7v10M17.5 7v10M3.5 9.5v5M20.5 9.5v5M6.5 12h11"/>',
    telefono: '<path d="M5 3.5h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.6 6.6l1.4-2.3 4.5 1.8V19a2 2 0 0 1-2 2A16.5 16.5 0 0 1 3 5.5a2 2 0 0 1 2-2Z"/>',
    coche: '<path d="M5 16.5h14M5.5 16.5V12l2-5h9l2 5v4.5M3.5 11.5h17"/><circle cx="7.5" cy="16.5" r="1.5"/><circle cx="16.5" cy="16.5" r="1.5"/>',
    casa: '<path d="M4 10.5 12 4l8 6.5V20H4v-9.5Z"/><path d="M10 20v-5.5h4V20"/>',
    papeles: '<path d="M7 3h7l4 4v14H7V3Z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>',
    flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    bajada: '<path d="M7 7l10 10M17 9v8H9"/>',
    subida: '<path d="M7 17 17 7M9 7h8v8"/>',
    tema: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/>',
    temaClaro: '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"/>',
    google: '<rect x="3" y="4.5" width="18" height="16" rx="3"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/><path d="M9 14.5h6M12 11.5v6"/>',
  };
  const ico = (n, cls = '') => `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n] || ''}</svg>`;

  const cabecera = (icono, titulo, extra = '') => `<header class="t-cabeza"><h2>${ico(icono)}<span>${titulo}</span></h2>${extra}</header>`;
  const chip = (txt, cls = '') => `<span class="chip ${cls}">${txt}</span>`;

  // ── Estado guardado ──────────────────────────────────────────────────
  const estado = {
    habitos: almacen.leer('habitos', {}), // { idHabito: { fecha: 1|0 } } cambios sobre los datos de ejemplo
    vence: almacen.leer('vence', {}), // { id: true }
    gastos: almacen.leer('gastos', []),
    gente: almacen.leer('gente', {}), // { id: 'YYYY-MM-DD' }
    nota: almacen.leer('nota', ''),
    vistaCal: almacen.leer('vistaCal', 'semana'),
  };

  // ── Agenda ───────────────────────────────────────────────────────────
  const CAL = P.calendario;
  const NOMBRE_CAL = {google: 'Google Calendar', outlook: 'Outlook', ical: 'Tu calendario'}[CAL.fuente] || 'Google Calendar';
  const colorCal = (id) => colorVar((CAL.calendarios.find((c) => c.id === id) || {}).color);
  const eventos = CAL.eventos.map((e) => ({ ...e, ini: desdeIso(e.inicio), fin: e.fin ? desdeIso(e.fin) : null }))
    .sort((a, b) => a.ini - b.ini);
  const eventosDe = (d) => eventos.filter((e) => iso(e.ini) === iso(d));
  const deHoy = eventosDe(HOY).filter((e) => !e.todoElDia);

  // ── Tiempo (Open-Meteo, sin clave). Solo sale a internet la ciudad. ──
  const TIEMPO_EJEMPLO = {
    actual: { temp: 14, codigo: 3 },
    max: 16, min: 8,
    horas: [ { h: 12, temp: 15, codigo: 2, lluvia: 5 }, { h: 15, temp: 16, codigo: 3, lluvia: 20 }, { h: 18, temp: 13, codigo: 61, lluvia: 70 }, { h: 21, temp: 10, codigo: 61, lluvia: 60 } ],
    lluviaDesde: 18,
    ejemplo: true,
  };
  const textoTiempo = (c) => c === 0 ? 'Despejado' : c <= 2 ? 'Algo de nubes' : c === 3 ? 'Nublado' : c <= 48 ? 'Niebla' : c <= 57 ? 'Llovizna' : c <= 67 ? 'Lluvia' : c <= 77 ? 'Nieve' : c <= 82 ? 'Chubascos' : 'Tormenta';
  const iconoTiempo = (c) => c === 0 ? 'sol' : c <= 2 ? 'solnube' : c === 3 ? 'nube' : c <= 48 ? 'niebla' : c <= 67 ? 'lluvia' : c <= 77 ? 'nieve' : c <= 82 ? 'lluvia' : 'tormenta';

  async function cargarTiempo() {
    if (params.get('tiempo') === 'ejemplo') return TIEMPO_EJEMPLO;
    try {
      const u = `https://api.open-meteo.com/v1/forecast?latitude=${P.persona.lat}&longitude=${P.persona.lon}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FMadrid&forecast_days=1`;
      const ctl = new AbortController(); setTimeout(() => ctl.abort(), 3500);
      const r = await fetch(u, { signal: ctl.signal });
      const j = await r.json();
      const hAhora = AHORA.getHours();
      const horas = [];
      for (let k = 1; k <= 4; k++) {
        const h = Math.min(23, hAhora + k * 3 - 2);
        if (horas.length && horas[horas.length - 1].h === h) continue;
        horas.push({ h, temp: Math.round(j.hourly.temperature_2m[h]), codigo: j.hourly.weather_code[h], lluvia: j.hourly.precipitation_probability[h] });
      }
      let lluviaDesde = null;
      for (let h = hAhora; h <= 23; h++) if (j.hourly.precipitation_probability[h] >= 50) { lluviaDesde = h; break; }
      return { actual: { temp: Math.round(j.current.temperature_2m), codigo: j.current.weather_code }, max: Math.round(j.daily.temperature_2m_max[0]), min: Math.round(j.daily.temperature_2m_min[0]), horas, lluviaDesde };
    } catch (e) {
      return TIEMPO_EJEMPLO;
    }
  }

  // ── Menú lateral ─────────────────────────────────────────────────────
  const SECCIONES = [
    ['hoy', 'Hoy', 'hoy'], ['calendario', 'Calendario', 'calendario'], ['vence', 'Lo que vence', 'vence'], ['dinero', 'Dinero', 'dinero'],
    ['habitos', 'Hábitos', 'habitos'], ['salud', 'Salud', 'salud'], ['objetivos', 'Objetivos', 'objetivos'], ['gente', 'Gente', 'gente'],
  ];
  function pintarLateral() {
    $('#menu').innerHTML = SECCIONES.map(([id, txt, ic]) => `<a href="#${id}" data-id="${id}">${ico(ic)}<span>${txt}</span></a>`).join('');
    const inicioAno = new Date(HOY.getFullYear(), 0, 1);
    const finAno = new Date(HOY.getFullYear() + 1, 0, 1);
    const pct = (AHORA - inicioAno) / (finAno - inicioAno);
    const quedan = diasEntre(HOY, finAno);
    $('#ano').innerHTML = `<div class="ano-texto"><span>${HOY.getFullYear()}</span><strong>${Math.round(pct * 100)} %</strong></div>
      <div class="barra"><span style="--p:${pct}"></span></div><small>Quedan ${quedan} días</small>`;
    const real = CAL.fuente !== 'ejemplo';
    const act = CAL.actualizado ? desdeIso(CAL.actualizado) : null;
    $('#sync').innerHTML = `<span class="sync-punto ${real ? 'ok' : ''}"></span>
      <div><strong>${NOMBRE_CAL}</strong><small>${real && act ? 'Actualizado ' + cuando(diasEntre(HOY, act)) + ' a las ' + hm(act) : 'Agenda de ejemplo'}</small></div>`;

    // Resalta la sección que estás viendo
    const enlaces = $$('#menu a');
    const obs = new IntersectionObserver((ents) => {
      ents.forEach((en) => { if (en.isIntersecting) enlaces.forEach((a) => a.classList.toggle('activo', a.dataset.id === en.target.id)); });
    }, { rootMargin: '-35% 0px -60% 0px' });
    SECCIONES.forEach(([id]) => { const s = document.getElementById(id); if (s) obs.observe(s); });
  }

  // ── Hoy ──────────────────────────────────────────────────────────────
  function franja() {
    const h = AHORA.getHours();
    return h < 6 ? 'noche' : h < 13 ? 'manana' : h < 20 ? 'tarde' : 'noche';
  }
  function saludo() {
    const h = AHORA.getHours();
    return h < 6 ? 'Buenas noches' : h < 14 ? 'Buenos días' : h < 21 ? 'Buenas tardes' : 'Buenas noches';
  }

  function pintarHoy(tiempo) {
    const el = $('#hoy');
    el.dataset.franja = franja();
    const ahoraEv = deHoy.find((e) => e.ini <= AHORA && e.fin > AHORA);
    const siguiente = deHoy.find((e) => e.ini > AHORA);
    const ocupado = deHoy.reduce((s, e) => s + (e.fin - e.ini) / 6e4, 0);
    const libre = libresHoy();
    const libreMin = libre.reduce((s, l) => s + l.min, 0);
    const vencePronto = venceOrdenado().find((v) => !estado.vence[v.id]);
    const cumple = eventos.find((e) => e.calendario === 'cumples' && e.ini >= HOY && diasEntre(HOY, e.ini) <= 7);

    const lineas = [];
    lineas.push(`${ico('calendario')}<span>Hoy tienes <b>${deHoy.length} cosas</b> en la agenda y <b>${duracion(libreMin)} libres</b> entre las 8 y las 22.</span>`);
    if (ahoraEv) lineas.push(`${ico('reloj')}<span>Ahora: <b>${esc(ahoraEv.titulo)}</b>${siguiente ? `. Después, <b>${esc(siguiente.titulo)}</b> a las ${hm(siguiente.ini)}` : ''}.</span>`);
    else if (siguiente) { const m = Math.round((siguiente.ini - AHORA) / 6e4); lineas.push(`${ico('reloj')}<span>Lo siguiente: <b>${esc(siguiente.titulo)}</b> ${m < 90 ? `en <b>${m} min</b>` : `a las <b>${hm(siguiente.ini)}</b>`}.</span>`); }
    if (tiempo && tiempo.lluviaDesde !== null && tiempo.lluviaDesde !== undefined) lineas.push(`${ico('paraguas')}<span><b>Lluvia desde las ${tiempo.lluviaDesde}:00</b>: coge paraguas.</span>`);
    if (vencePronto) { const n = diasEntre(HOY, desdeIso(vencePronto.fecha)); lineas.push(`${ico('aviso')}<span><b>${n === 0 ? 'Hoy' : n + ' días'}</b> para: ${esc(vencePronto.que.toLowerCase())}.</span>`); }
    if (cumple) lineas.push(`${ico('regalo')}<span>${esc(cumple.titulo)} <b>${cuando(diasEntre(HOY, cumple.ini))}</b>.</span>`);

    const fecha = `${cap(DIAS[HOY.getDay()])}, ${HOY.getDate()} de ${MESES[HOY.getMonth()]} · semana ${semanaIso(HOY)}`;
    const t = tiempo || TIEMPO_EJEMPLO;

    el.innerHTML = `
      <div class="hero-fondo" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="hero-cuerpo">
        <div class="hero-texto">
          <p class="hero-fecha">${fecha}</p>
          <h1>${saludo()}, <em>${esc(P.persona.nombre)}</em></h1>
          <ul class="resumen">${lineas.map((l, i) => `<li style="--i:${i}">${l}</li>`).join('')}</ul>
        </div>
        <div class="tiempo" title="${t.ejemplo ? 'Tiempo de ejemplo' : 'Tiempo de Open-Meteo'}">
          <div class="tiempo-ahora">${ico(iconoTiempo(t.actual.codigo), 'tiempo-ico')}<div><strong>${t.actual.temp}°</strong><span>${textoTiempo(t.actual.codigo)}</span></div></div>
          <p class="tiempo-mm">${esc(P.persona.ciudad)} · máx ${t.max}° · mín ${t.min}°</p>
          <div class="tiempo-horas">${t.horas.map((h) => `<div class="${h.lluvia >= 50 ? 'llueve' : ''}"><small>${h.h}:00</small>${ico(iconoTiempo(h.codigo))}<b>${h.temp}°</b><em>${h.lluvia} %</em></div>`).join('')}</div>
        </div>
      </div>
      ${lineaDelDia(libre)}
      <div class="hero-foco">${ico('objetivos')}<span>Foco de la semana: <b>${esc(P.persona.foco)}</b></span></div>`;
    void ocupado;
  }

  // Huecos libres de más de 45 min entre las 8:00 y las 22:00
  function libresHoy() {
    const ini = new Date(HOY); ini.setHours(8, 0, 0, 0);
    const fin = new Date(HOY); fin.setHours(22, 0, 0, 0);
    const huecos = [];
    let t = ini;
    deHoy.forEach((e) => {
      if (e.ini > t) huecos.push({ a: new Date(t), b: new Date(Math.min(e.ini, fin)) });
      if (e.fin > t) t = e.fin;
    });
    if (t < fin) huecos.push({ a: new Date(t), b: fin });
    return huecos.map((h) => ({ ...h, min: (h.b - h.a) / 6e4 })).filter((h) => h.min >= 45);
  }

  function lineaDelDia(libre) {
    const H0 = 7, H1 = 23;
    const x = (d) => ((d.getHours() + d.getMinutes() / 60 - H0) / (H1 - H0)) * 100;
    const marcas = [];
    for (let h = H0; h <= H1; h += 2) marcas.push(`<span class="ld-marca" style="left:${((h - H0) / (H1 - H0)) * 100}%">${h}:00</span>`);
    const bloques = deHoy.map((e, i) => {
      const pasado = e.fin <= AHORA, ahora = e.ini <= AHORA && e.fin > AHORA;
      return `<div class="ld-ev ${pasado ? 'pasado' : ''} ${ahora ? 'ahora' : ''}" style="left:${x(e.ini)}%;width:${x(e.fin) - x(e.ini)}%;--c:${colorCal(e.calendario)};--i:${i}">
        <b>${esc(e.titulo)}</b><small>${hm(e.ini)} · ${duracion((e.fin - e.ini) / 6e4)}</small></div>`;
    }).join('');
    const huecos = libre.filter((h) => h.b > AHORA && h.min >= 60).map((h) =>
      `<div class="ld-libre" style="left:${x(h.a)}%;width:${x(h.b) - x(h.a)}%"><span>Libre · ${duracion(h.min)}</span></div>`).join('');
    const pAhora = x(AHORA);
    const ahora = pAhora >= 0 && pAhora <= 100 ? `<div class="ld-ahora" style="left:${pAhora}%"><span>${hm(AHORA)}</span></div>` : '';
    return `<div class="linea-dia" aria-label="Tu día de 7:00 a 23:00">
      <div class="ld-pista">${huecos}${bloques}${ahora}</div>
      <div class="ld-marcas">${marcas.join('')}</div>
    </div>`;
  }

  // ── Calendario ───────────────────────────────────────────────────────
  function pintarCalendario() {
    const el = $('#calendario');
    const vista = estado.vistaCal;
    const real = CAL.fuente !== 'ejemplo';
    const extra = `<div class="t-acciones">
      <span class="insignia-google" title="${real ? 'Tu agenda de verdad' : 'Agenda de ejemplo: dile a Claude «actualiza el panel»'}">${ico('google')}${NOMBRE_CAL}</span>
      <div class="segmento" role="tablist">
        <button role="tab" data-vista="semana" aria-selected="${vista === 'semana'}">Semana</button>
        <button role="tab" data-vista="mes" aria-selected="${vista === 'mes'}">Mes</button>
      </div></div>`;
    el.innerHTML = cabecera('calendario', 'Calendario', extra) + (vista === 'semana' ? vistaSemana() : vistaMes()) +
      `<div class="leyenda">${CAL.calendarios.map((c) => `<span><i style="background:${colorVar(c.color)}"></i>${esc(c.nombre)}</span>`).join('')}</div>`;
    $$('.segmento button', el).forEach((b) => b.addEventListener('click', () => {
      estado.vistaCal = b.dataset.vista; almacen.guardar('vistaCal', estado.vistaCal); pintarCalendario();
    }));
  }

  function vistaSemana() {
    const lunes = masDias(HOY, -((HOY.getDay() + 6) % 7));
    const cols = [];
    for (let i = 0; i < 7; i++) {
      const d = masDias(lunes, i);
      const evs = eventosDe(d);
      const esHoy = iso(d) === iso(HOY);
      const pasado = d < HOY;
      cols.push(`<div class="sem-dia ${esHoy ? 'hoy' : ''} ${pasado ? 'pasado' : ''}">
        <div class="sem-cab"><small>${DIAS[d.getDay()].slice(0, 3)}</small><strong>${d.getDate()}</strong></div>
        <div class="sem-evs">${evs.map((e, k) => e.todoElDia
          ? `<div class="sem-ev todo" style="--c:${colorCal(e.calendario)};--i:${k}">${ico('regalo')}<b>${esc(e.titulo)}</b></div>`
          : `<div class="sem-ev ${e.fin && e.fin <= AHORA ? 'hecho' : ''}" style="--c:${colorCal(e.calendario)};--i:${k}"><small>${hm(e.ini)}</small><b>${esc(e.titulo)}</b></div>`).join('') || '<div class="sem-vacio">Libre</div>'}</div>
      </div>`);
    }
    return `<div class="semana">${cols.join('')}</div>`;
  }

  function vistaMes() {
    const primero = new Date(HOY.getFullYear(), HOY.getMonth(), 1);
    const inicio = masDias(primero, -((primero.getDay() + 6) % 7));
    const celdas = [];
    for (let i = 0; i < 42; i++) {
      const d = masDias(inicio, i);
      if (i >= 35 && d.getMonth() !== HOY.getMonth()) break;
      const evs = eventosDe(d);
      const fuera = d.getMonth() !== HOY.getMonth();
      const cumple = evs.find((e) => e.calendario === 'cumples');
      celdas.push(`<div class="mes-dia ${fuera ? 'fuera' : ''} ${iso(d) === iso(HOY) ? 'hoy' : ''} ${d < HOY ? 'pasado' : ''}">
        <strong>${d.getDate()}</strong>
        ${cumple ? `<span class="mes-cumple">${ico('regalo')}${esc(cumple.titulo.replace('Cumple de ', ''))}</span>` : ''}
        <span class="mes-puntos">${evs.filter((e) => !e.todoElDia).slice(0, 5).map((e) => `<i style="background:${colorCal(e.calendario)}"></i>`).join('')}</span>
      </div>`);
    }
    return `<div class="mes">
      <div class="mes-titulo">${cap(MESES[HOY.getMonth()])} ${HOY.getFullYear()}</div>
      <div class="mes-cab">${['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d) => `<span>${d}</span>`).join('')}</div>
      <div class="mes-rejilla">${celdas.join('')}</div></div>`;
  }

  // ── Lo que vence ─────────────────────────────────────────────────────
  const venceOrdenado = () => [...P.vence].sort((a, b) => a.fecha.localeCompare(b.fecha));
  function pintarVence() {
    const el = $('#vence');
    const lista = venceOrdenado().sort((a, b) => (estado.vence[a.id] ? 1 : 0) - (estado.vence[b.id] ? 1 : 0));
    const mes = lista.filter((v) => !estado.vence[v.id] && diasEntre(HOY, desdeIso(v.fecha)) <= 31).length;
    el.innerHTML = cabecera('vence', 'Lo que vence', chip(`${mes} este mes`, mes ? 'chip-aviso' : '')) +
      `<ul class="vence-lista">${lista.map((v, i) => {
        const n = diasEntre(HOY, desdeIso(v.fecha));
        const hecho = !!estado.vence[v.id];
        const nivel = hecho ? 'hecho' : n <= 7 ? 'urgente' : n <= 31 ? 'pronto' : 'tranquilo';
        return `<li class="vence ${nivel}" style="--i:${i}">
          <div class="vence-dias"><strong>${hecho ? ico('check') : n}</strong><small>${hecho ? 'hecho' : n === 1 ? 'día' : 'días'}</small></div>
          <div class="vence-texto"><b>${ico(v.tipo)}${esc(v.que)}</b><span>${esc(v.detalle)}</span><small>${cap(DIAS[desdeIso(v.fecha).getDay()])}, ${fechaCorta(desdeIso(v.fecha))}</small></div>
          <button class="boton-check ${hecho ? 'si' : ''}" data-id="${v.id}" aria-label="${hecho ? 'Marcar como pendiente' : 'Marcar como hecho'}">${ico('check')}</button>
        </li>`;
      }).join('')}</ul>`;
    $$('.boton-check', el).forEach((b) => b.addEventListener('click', () => {
      const id = b.dataset.id;
      if (estado.vence[id]) delete estado.vence[id]; else { estado.vence[id] = true; avisar('Hecho. Uno menos.'); }
      almacen.guardar('vence', estado.vence); pintarVence(); pintarHoy(TIEMPO);
    }));
  }

  // ── Dinero ───────────────────────────────────────────────────────────
  const todosGastos = () => [...P.dinero.gastos, ...estado.gastos].sort((a, b) => a.fecha.localeCompare(b.fecha));
  function pintarDinero() {
    const el = $('#dinero');
    const D = P.dinero;
    const gastos = todosGastos();
    const total = gastos.reduce((s, g) => s + g.importe, 0);
    const diasMes = new Date(HOY.getFullYear(), HOY.getMonth() + 1, 0).getDate();
    const d = HOY.getDate();
    const quedan = D.presupuesto - total;
    const diasQuedan = diasMes - d + 1;
    const prevision = total + (total - gastos.filter((g) => g.importe >= 300).reduce((s, g) => s + g.importe, 0)) / d * (diasMes - d);
    const dif = total - D.mesPasadoHastaHoy;

    // Gasto acumulado por día
    const acum = []; let s = 0;
    for (let i = 1; i <= d; i++) { s += gastos.filter((g) => desdeIso(g.fecha).getDate() === i).reduce((a, g) => a + g.importe, 0); acum.push({ x: (i - 1) / (diasMes - 1), y: s }); }
    const max = Math.max(D.presupuesto, prevision) * 1.05;
    const a = G.area(acum, { ancho: 600, alto: 170, min: 0, max, color: 'var(--coral)', id: 'dinero' });
    const yPres = a.py(D.presupuesto), xHoy = a.px(acum[acum.length - 1].x), yHoy = a.py(total), yPrev = a.py(prevision);
    const extra = `<line x1="0" x2="600" y1="${yPres}" y2="${yPres}" class="linea-presupuesto"/>
      <line x1="${xHoy}" y1="${yHoy}" x2="600" y2="${yPrev}" class="linea-prevision"/>
      <circle cx="${xHoy}" cy="${yHoy}" r="5" class="punto-hoy"/>`;
    const svg = a.svg.replace('</svg>', extra + '</svg>');

    const cats = D.categorias.map((c) => ({ ...c, gastado: gastos.filter((g) => g.categoria === c.id).reduce((s2, g) => s2 + g.importe, 0) }));
    const ultimos = gastos.slice(-4).reverse();

    el.innerHTML = cabecera('dinero', `Dinero · ${MESES[HOY.getMonth()]}`, `<button class="boton boton-fuerte" id="boton-gasto">${ico('mas')}Gasto</button>`) + `
      <div class="dinero-cima">
        <div class="dinero-grande">
          <p><strong data-contar="${total}" data-formato="eur">${eur(total)}</strong><span>de ${eur(D.presupuesto)}</span></p>
          <p class="dinero-sub">${quedan >= 0 ? `Te quedan <b>${eur(quedan)}</b> para ${diasQuedan} días: <b>${eur(quedan / diasQuedan)} al día</b>.` : `Te has pasado <b>${eur(-quedan)}</b> del presupuesto.`}</p>
          <div class="dinero-chips">
            ${chip(`${ico(dif <= 0 ? 'bajada' : 'subida')}${eur(Math.abs(dif))} ${dif <= 0 ? 'menos' : 'más'} que el mes pasado a estas alturas`, dif <= 0 ? 'chip-bien' : 'chip-mal')}
            ${chip(`Previsión: ${eur(prevision)}`, prevision <= D.presupuesto ? '' : 'chip-mal')}
          </div>
        </div>
        <div class="dinero-graf">${svg}<div class="dinero-ejes"><span>1 ${MESES_C[HOY.getMonth()]}</span><span>Presupuesto ${eur(D.presupuesto)}</span><span>${diasMes} ${MESES_C[HOY.getMonth()]}</span></div></div>
      </div>
      <div class="dinero-pie">
        <ul class="categorias">${cats.map((c, i) => {
          const p = c.gastado / c.presupuesto;
          return `<li style="--i:${i}"><div><span><i style="background:${colorVar(c.color)}"></i>${esc(c.nombre)}</span><b class="${p > 1 ? 'mal' : ''}">${eur(c.gastado)} <small>/ ${eur(c.presupuesto)}</small></b></div>
            <div class="barra fina"><span style="--p:${Math.min(1, p)};background:${p > 1 ? 'var(--rojo)' : colorVar(c.color)}"></span></div></li>`;
        }).join('')}</ul>
        <div class="movimientos"><h3>Últimos movimientos</h3><ul>${ultimos.map((g) => `<li><span><i style="background:${colorVar((D.categorias.find((c) => c.id === g.categoria) || {}).color)}"></i>${esc(g.concepto)}<small>${cuando(diasEntre(HOY, desdeIso(g.fecha)))}</small></span><b>−${eur(g.importe, true)}</b></li>`).join('')}</ul></div>
      </div>`;
    $('#boton-gasto').addEventListener('click', abrirGasto);
  }

  function abrirGasto() {
    const m = $('#modal-gasto');
    $('#gasto-categoria').innerHTML = P.dinero.categorias.map((c) => `<option value="${c.id}">${esc(c.nombre)}</option>`).join('');
    $('#form-gasto').reset();
    m.showModal();
    setTimeout(() => m.querySelector('input').focus(), 30);
  }
  function prepararModal() {
    const m = $('#modal-gasto');
    $('#gasto-cancelar').addEventListener('click', () => m.close());
    $('#form-gasto').addEventListener('submit', (ev) => {
      ev.preventDefault();
      const f = new FormData(ev.target);
      const importe = parseFloat(String(f.get('importe')).replace(/\./g, '').replace(',', '.'));
      if (!(importe > 0)) { avisar('Pon un importe, por ejemplo 24,90'); return; }
      estado.gastos.push({ id: 'n' + Date.now(), fecha: iso(HOY), concepto: String(f.get('concepto')).trim() || 'Gasto', importe, categoria: f.get('categoria') });
      almacen.guardar('gastos', estado.gastos);
      m.close();
      pintarDinero(); pintarDatos();
      avisar(`Apuntado: ${eur(importe, true)}`);
    });
  }

  // ── Suscripciones ────────────────────────────────────────────────────
  function pintarSuscripciones() {
    const el = $('#suscripciones');
    const S = [...P.suscripciones].sort((a, b) => a.cobro.localeCompare(b.cobro));
    const alMes = S.reduce((s, x) => s + (x.cada === 'año' ? x.precio / 12 : x.precio), 0);
    const mayor = [...S].sort((a, b) => (b.cada === 'año' ? b.precio / 12 : b.precio) - (a.cada === 'año' ? a.precio / 12 : a.precio))[0];
    el.innerHTML = cabecera('suscripciones', 'Suscripciones', chip(S.length + ' activas')) + `
      <div class="sus-total"><strong data-contar="${alMes}" data-formato="eur2">${eur(alMes, true)}</strong><span>al mes</span><em>${eur(alMes * 12)} al año</em></div>
      <ul class="sus-lista">${S.map((x, i) => {
        const n = diasEntre(HOY, desdeIso(x.cobro));
        return `<li style="--i:${i}"><span class="sus-logo" style="--c:${x.color}">${esc(x.letra)}</span>
          <div><b>${esc(x.nombre)}</b><small>Cobra ${n <= 1 ? `<em>${cuando(n)}</em>` : cuando(n)} · ${fechaCorta(desdeIso(x.cobro))}</small></div>
          <strong>${eur(x.precio, true)}<small>/${x.cada}</small></strong></li>`;
      }).join('')}</ul>
      <p class="nota-pie">Lo que más pesa: <b>${esc(mayor.nombre)}</b>, el ${Math.round(((mayor.cada === 'año' ? mayor.precio / 12 : mayor.precio) / alMes) * 100)} % del total.</p>`;
  }

  // ── Hábitos ──────────────────────────────────────────────────────────
  const hechoHabito = (h, f) => { const c = estado.habitos[h.id]; if (c && f in c) return !!c[f]; return !!h.dias[f]; };
  const rachaHabito = (h) => { let n = 0; let d = new Date(HOY); if (!hechoHabito(h, iso(d))) d = masDias(d, -1); while (hechoHabito(h, iso(d))) { n++; d = masDias(d, -1); } return n; };

  function pintarHabitos() {
    const el = $('#habitos');
    const H = P.habitos;
    const lunes = masDias(HOY, -((HOY.getDay() + 6) % 7));
    const hechosHoy = H.filter((h) => hechoHabito(h, iso(HOY))).length;
    // Mapa de calor: 26 semanas, de lunes a domingo
    const inicio = masDias(lunes, -25 * 7);
    const vals = [];
    for (let c = 0; c < 26; c++) for (let r = 0; r < 7; r++) {
      const d = masDias(inicio, c * 7 + r);
      vals.push(d > HOY ? null : H.filter((h) => hechoHabito(h, iso(d))).length / H.length);
    }
    // Columnas → filas para la rejilla (7 filas)
    const porFila = [];
    for (let r = 0; r < 7; r++) for (let c = 0; c < 26; c++) porFila.push(vals[c * 7 + r]);
    let hechosMes = 0, totalMes = 0;
    for (let i = 0; i < 30; i++) { const f = iso(masDias(HOY, -i)); H.forEach((h) => { totalMes++; if (hechoHabito(h, f)) hechosMes++; }); }
    const mejor = H.map((h) => ({ h, r: rachaHabito(h) })).sort((a, b) => b.r - a.r)[0];

    el.innerHTML = cabecera('habitos', 'Hábitos', chip(`${hechosHoy} de ${H.length} hoy`, hechosHoy === H.length ? 'chip-bien' : '')) + `
      <div class="hab-tabla">
        <div class="hab-fila hab-cab"><span></span>${[0, 1, 2, 3, 4, 5, 6].map((i) => { const d = masDias(lunes, i); return `<small class="${iso(d) === iso(HOY) ? 'hoy' : ''}">${DIAS_C[d.getDay()]}</small>`; }).join('')}<small>Racha</small></div>
        ${H.map((h, k) => `<div class="hab-fila" style="--i:${k};--c:${colorVar(h.color)}">
          <span class="hab-nombre"><i>${ico(h.icono)}</i>${esc(h.nombre)}</span>
          ${[0, 1, 2, 3, 4, 5, 6].map((i) => { const d = masDias(lunes, i); const f = iso(d); const futuro = d > HOY; const hoy = f === iso(HOY);
            return `<button class="hab-celda ${hechoHabito(h, f) ? 'si' : ''} ${hoy ? 'hoy' : ''}" ${futuro ? 'disabled' : ''} data-h="${h.id}" data-f="${f}" aria-label="${esc(h.nombre)}, ${DIAS[d.getDay()]}">${ico('check')}</button>`; }).join('')}
          <span class="hab-racha">${ico('llama')}${rachaHabito(h)}</span>
        </div>`).join('')}
      </div>
      <div class="hab-pie">
        <div class="hab-calor"><small>Últimas 26 semanas</small>${G.calor(porFila, { color: 'var(--verde)' })}</div>
        <div class="hab-cifras">
          <div><small>Cumplido en 30 días</small><strong>${Math.round((hechosMes / totalMes) * 100)} %</strong></div>
          <div><small>Racha más larga ahora</small><strong>${mejor.r} <span>días</span></strong><em>${esc(mejor.h.nombre)}</em></div>
        </div>
      </div>`;
    $$('.hab-celda', el).forEach((b) => b.addEventListener('click', () => {
      const h = H.find((x) => x.id === b.dataset.h);
      const f = b.dataset.f;
      estado.habitos[h.id] = estado.habitos[h.id] || {};
      estado.habitos[h.id][f] = hechoHabito(h, f) ? 0 : 1;
      almacen.guardar('habitos', estado.habitos);
      pintarHabitos(); pintarDatos();
      if (estado.habitos[h.id][f]) avisar(`${h.nombre}: racha de ${rachaHabito(h)} ${rachaHabito(h) === 1 ? 'día' : 'días'}`);
    }));
  }

  // ── Salud ────────────────────────────────────────────────────────────
  function pintarSalud() {
    const el = $('#salud');
    const S = P.salud;
    const medio = S.sueno.reduce((s, x) => s + x.horas, 0) / S.sueno.length;
    const h = Math.floor(medio), m = Math.round((medio - h) * 60);
    const pesoHoy = S.peso[S.peso.length - 1].kg, peso30 = S.peso[0].kg;
    const pa = G.area(S.peso.map((p, i) => ({ x: i / (S.peso.length - 1), y: p.kg })), { ancho: 300, alto: 70, color: 'var(--violeta)', id: 'peso' });
    const cita = eventos.find((e) => e.calendario === 'salud' && e.ini >= AHORA && !/gimnasio/i.test(e.titulo));
    el.innerHTML = cabecera('salud', 'Salud', chip(`Sueño: meta ${String(S.suenoMeta).replace('.', ',')} h`)) + `
      <div class="salud-tres">
        <div class="mini"><small>${ico('luna')}Sueño medio</small><strong>${h}<span>h</span> ${String(m).padStart(2, '0')}</strong><em>${medio >= S.suenoMeta ? 'Bien' : `Te faltan ${Math.round((S.suenoMeta - medio) * 60)} min`}</em></div>
        <div class="mini mini-anillo"><small>${ico('pasos')}Pasos hoy</small><div class="mini-fila">${G.anillo(S.pasosHoy / S.pasosMeta, { tam: 40, grosor: 5, color: 'var(--verde)' })}<div><strong data-contar="${S.pasosHoy}">${num(S.pasosHoy)}</strong></div></div><em>de ${num(S.pasosMeta)}</em></div>
        <div class="mini"><small>${ico('salud')}Peso</small><strong>${String(pesoHoy).replace('.', ',')}<span>kg</span></strong><em class="bien">${String((pesoHoy - peso30).toFixed(1)).replace('.', ',')} kg en 30 días</em></div>
      </div>
      <div class="salud-graf">
        <div><small>Últimas 14 noches</small>${G.barras(S.sueno.map((x) => ({ valor: x.horas, clase: x.horas >= S.suenoMeta ? 'bien' : '', titulo: x.horas + ' h' })), { alto: 150, meta: S.suenoMeta, max: 9 })}</div>
        <div><small>Peso, 30 días</small><div class="peso-graf">${pa.svg}</div></div>
      </div>
      ${cita ? `<div class="cita" style="--c:var(--violeta)">${ico('calendario')}<span>Próxima cita: <b>${esc(cita.titulo)}</b>, ${cuando(diasEntre(HOY, cita.ini))} a las ${hm(cita.ini)}${cita.lugar ? ' · ' + esc(cita.lugar) : ''}</span></div>` : ''}`;
  }

  // ── Objetivos ────────────────────────────────────────────────────────
  function pintarObjetivos() {
    const el = $('#objetivos');
    const inicioAno = new Date(HOY.getFullYear(), 0, 1);
    const ritmo = (HOY - inicioAno) / (new Date(HOY.getFullYear() + 1, 0, 1) - inicioAno);
    el.innerHTML = cabecera('objetivos', `Objetivos ${HOY.getFullYear()}`, chip(`<i class="marca-ritmo"></i>dónde deberías ir hoy`)) +
      `<ul class="obj-lista">${P.objetivos.map((o, i) => {
        const p = o.hecho / o.meta;
        const debe = o.meta * ritmo;
        const falta = debe - o.hecho;
        const fmt = (n) => o.unidad === '€' ? eur(n) : o.unidad === 'kg' ? `${String(Math.round(n * 10) / 10).replace('.', ',')} kg` : `${Math.ceil(n - 0.001)} ${o.unidad}`;
        return `<li style="--i:${i};--c:${colorVar(o.color)}">
          <div class="obj-cab"><b>${esc(o.nombre)}</b><strong>${fmt(o.hecho)}</strong></div>
          <div class="obj-barra"><span style="--p:${Math.min(1, p)}"></span><i style="left:${ritmo * 100}%"></i></div>
          <div class="obj-pie"><em class="${falta <= 0 ? 'bien' : 'mal'}">${falta <= 0 ? 'Vas por delante' : `Te faltan ${fmt(falta)} para ir al día`}</em><small>${o.desde ? esc(o.desde) + ' · ' : ''}meta: ${fmt(o.meta)}</small></div>
        </li>`;
      }).join('')}</ul>`;
  }

  // ── Gente que importa ────────────────────────────────────────────────
  const ultimaVez = (g) => desdeIso(estado.gente[g.id] || g.ultima);
  function pintarGente() {
    const el = $('#gente');
    const cumples = eventos.filter((e) => e.calendario === 'cumples' && e.ini >= HOY).slice(0, 3);
    const lista = [...P.gente].sort((a, b) => (diasEntre(ultimaVez(b), HOY) - b.cada) - (diasEntre(ultimaVez(a), HOY) - a.cada));
    const toca = lista.filter((g) => diasEntre(ultimaVez(g), HOY) > g.cada).length;
    const cada = (n) => n === 1 ? 'Cada día' : n === 7 ? 'Cada semana' : n === 14 ? 'Cada 2 semanas' : n === 30 ? 'Cada mes' : `Cada ${n} días`;
    el.innerHTML = cabecera('gente', 'Gente que importa', chip(toca ? `${toca} por llamar` : 'Al día', toca ? 'chip-aviso' : 'chip-bien')) + `
      <ul class="gente-lista">${lista.map((g, i) => {
        const n = diasEntre(ultimaVez(g), HOY);
        const tarde = n > g.cada;
        return `<li style="--i:${i}"><span class="avatar-g" style="--c:${g.color}">${esc(g.nombre[0])}</span>
          <div><b>${esc(g.nombre)}</b><small>${cada(g.cada)}</small></div>
          <span class="gente-cuando ${tarde ? 'tarde' : ''}">${n === 0 ? 'Hoy' : n === 1 ? 'Ayer' : `Hace ${n} días`}</span>
          <button class="boton-llamar ${n === 0 ? 'si' : ''}" data-id="${g.id}" aria-label="Ya he hablado con ${esc(g.nombre)}">${ico(n === 0 ? 'check' : 'telefono')}</button></li>`;
      }).join('')}</ul>
      <div class="cumples"><h3>${ico('regalo')}Próximos cumpleaños</h3>${cumples.map((c) => `<span>${esc(c.titulo.replace('Cumple de ', ''))} <b>${cuando(diasEntre(HOY, c.ini))}</b></span>`).join('')}</div>`;
    $$('.boton-llamar', el).forEach((b) => b.addEventListener('click', () => {
      estado.gente[b.dataset.id] = iso(HOY); almacen.guardar('gente', estado.gente);
      pintarGente(); pintarDatos();
      avisar('Apuntado: habéis hablado hoy');
    }));
  }

  // ── Ahorro ───────────────────────────────────────────────────────────
  function pintarAhorro() {
    const el = $('#ahorro');
    const total = P.ahorro.reduce((s, a) => s + a.tengo, 0);
    el.innerHTML = cabecera('ahorro', 'Huchas', chip(eur(total) + ' ahorrados')) +
      `<ul class="huchas">${P.ahorro.map((a, i) => {
        const p = a.tengo / a.meta;
        return `<li style="--i:${i};--c:${colorVar(a.color)}">${G.anillo(p, { tam: 58, grosor: 6, color: colorVar(a.color), centro: `<text x="29" y="33" text-anchor="middle" class="anillo-texto">${Math.round(p * 100)}%</text>` })}
          <div><b>${esc(a.nombre)}</b><span>${eur(a.tengo)} de ${eur(a.meta)}</span><small>${esc(a.nota)}</small></div></li>`;
      }).join('')}</ul>`;
  }

  // ── Lo que dicen tus datos ───────────────────────────────────────────
  function pintarDatos() {
    const el = $('#datos');
    const frases = [];
    // Sueño los días que andas
    const andar = P.habitos.find((h) => h.id === 'andar');
    const con = [], sin = [];
    P.salud.sueno.forEach((s) => { const antes = iso(masDias(desdeIso(s.fecha), -1)); (hechoHabito(andar, antes) ? con : sin).push(s.horas); });
    if (con.length && sin.length) {
      const dif = Math.round(((con.reduce((a, b) => a + b, 0) / con.length) - (sin.reduce((a, b) => a + b, 0) / sin.length)) * 60);
      if (dif > 0) frases.push(['luna', `Los días que andas 8.000 pasos, esa noche duermes <b>${dif} min más</b> de media.`, 'violeta']);
    }
    // Ritmo de gasto
    const gastos = todosGastos();
    const total = gastos.reduce((s, g) => s + g.importe, 0);
    const diasMes = new Date(HOY.getFullYear(), HOY.getMonth() + 1, 0).getDate();
    const prev = total + (total - gastos.filter((g) => g.importe >= 300).reduce((s, g) => s + g.importe, 0)) / HOY.getDate() * (diasMes - HOY.getDate());
    const dif = P.dinero.presupuesto - prev;
    frases.push(['dinero', `A este ritmo cierras ${MESES[HOY.getMonth()]} en <b>${eur(prev)}</b>: ${dif >= 0 ? `${eur(dif)} por debajo` : `${eur(-dif)} por encima`} del presupuesto.`, dif >= 0 ? 'verde' : 'rojo']);
    // Racha del agua
    const agua = P.habitos.find((h) => h.id === 'agua');
    frases.push(['gota', `Llevas <b>${rachaHabito(agua)} días seguidos</b> con 2 litros de agua.`, 'cian']);
    // Gente
    const olvidada = [...P.gente].map((g) => ({ g, n: diasEntre(ultimaVez(g), HOY) })).filter((x) => x.n > x.g.cada).sort((a, b) => (b.n / b.g.cada) - (a.n / a.g.cada))[0];
    if (olvidada) frases.push(['telefono', `Hace <b>${olvidada.n} días</b> que no hablas con ${esc(olvidada.g.nombre.toLowerCase().startsWith('abuela') ? 'la ' + olvidada.g.nombre.toLowerCase().replace(/ .*/, '') : olvidada.g.nombre)}.`, 'coral']);
    // Suscripciones
    const alMes = P.suscripciones.reduce((s, x) => s + (x.cada === 'año' ? x.precio / 12 : x.precio), 0);
    frases.push(['suscripciones', `Tus suscripciones son <b>${Math.round((alMes / P.dinero.presupuesto) * 100)} %</b> de lo que gastas al mes.`, 'ambar']);

    el.innerHTML = cabecera('datos', 'Lo que dicen tus datos') +
      `<ul class="datos-lista">${frases.slice(0, 4).map(([ic, t, c], i) => `<li style="--i:${i};--c:var(--${c})"><span>${ico(ic)}</span><p>${t}</p></li>`).join('')}</ul>`;
  }

  // ── Nota rápida ──────────────────────────────────────────────────────
  function pintarNota() {
    const el = $('#nota');
    el.innerHTML = cabecera('nota', 'Para no olvidarlo', '<small class="guardado" id="nota-estado"></small>') +
      `<textarea id="nota-texto" placeholder="Lo que tengas en la cabeza: se guarda solo.">${esc(estado.nota)}</textarea>`;
    let t;
    $('#nota-texto').addEventListener('input', (ev) => {
      clearTimeout(t);
      t = setTimeout(() => { estado.nota = ev.target.value; almacen.guardar('nota', estado.nota); $('#nota-estado').textContent = 'Guardado'; setTimeout(() => ($('#nota-estado').textContent = ''), 1500); }, 400);
    });
  }

  // ── Tema, avisos y animaciones ───────────────────────────────────────
  function prepararTema() {
    const b = $('#boton-tema');
    const pinta = () => { const oscuro = (document.documentElement.dataset.theme || 'dark') === 'dark'; b.innerHTML = ico(oscuro ? 'temaClaro' : 'tema'); };
    if (!document.documentElement.dataset.theme) document.documentElement.dataset.theme = 'dark';
    pinta();
    b.addEventListener('click', () => {
      const nuevo = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = nuevo; almacen.guardar('tema', nuevo); pinta();
    });
  }

  let tAviso;
  function avisar(txt) {
    const a = $('#aviso'); a.textContent = txt; a.classList.add('visible');
    clearTimeout(tAviso); tAviso = setTimeout(() => a.classList.remove('visible'), 2200);
  }

  function contarNumeros() {
    $$('[data-contar]').forEach((el) => {
      if (el.dataset.contado) return; el.dataset.contado = '1';
      const fin = parseFloat(el.dataset.contar); const fmt = el.dataset.formato;
      const f = (v) => fmt === 'eur' ? eur(v) : fmt === 'eur2' ? eur(v, true) : num(v);
      const t0 = performance.now(); const dur = 1100;
      const paso = (t) => { const k = Math.min(1, (t - t0) / dur); const e = 1 - Math.pow(1 - k, 3); el.textContent = f(fin * e); if (k < 1) requestAnimationFrame(paso); else el.textContent = f(fin); };
      requestAnimationFrame(paso);
    });
  }

  function animarEntrada() {
    const tarjetas = $$('.tarjeta');
    const obs = new IntersectionObserver((ents) => {
      ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('visto'); obs.unobserve(en.target); setTimeout(contarNumeros, 80); } });
    }, { threshold: 0.12 });
    tarjetas.forEach((t) => obs.observe(t));
  }

  // ── Arranque ─────────────────────────────────────────────────────────
  let TIEMPO = params.get('tiempo') === 'ejemplo' ? TIEMPO_EJEMPLO : null;
  function pintarTodo() {
    pintarLateral(); pintarHoy(TIEMPO); pintarCalendario(); pintarVence(); pintarDinero(); pintarSuscripciones();
    pintarHabitos(); pintarSalud(); pintarObjetivos(); pintarGente(); pintarAhorro(); pintarDatos(); pintarNota();
  }
  pintarTodo();
  prepararTema();
  prepararModal();
  $('#restablecer').addEventListener('click', () => { almacen.borrarTodo(); location.reload(); });
  requestAnimationFrame(() => { document.body.classList.add('listo'); animarEntrada(); });
  if (!TIEMPO) cargarTiempo().then((t) => { TIEMPO = t; pintarHoy(t); $('#hoy').classList.add('visto'); });
})();
