// Datos de ejemplo del panel.
// Se generan a partir de la fecha de hoy, así que el panel siempre parece al día.
// Para usar los tuyos, dile a Claude Code: «cambia los datos de ejemplo por los míos».
window.PANEL = window.PANEL || {};

(function () {
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  const dia = (n) => { const d = new Date(hoy); d.setDate(d.getDate() + n); return d; };
  const iso = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');

  // Números "al azar" pero siempre los mismos (así el panel no cambia cada vez que lo abres)
  let semilla = 7;
  const azar = () => (semilla = (semilla * 16807) % 2147483647) / 2147483647;

  PANEL.persona = {
    nombre: 'Víctor',
    ciudad: 'Madrid',
    lat: 40.4168,
    lon: -3.7038,
    foco: 'Grabar dos vídeos y dormir antes de las 00:00',
  };

  // ── Lo que vence: papeles, casa y coche ────────────────────────────────
  PANEL.vence = [
    { id: 'seguro-coche', que: 'Avisar al seguro del coche', detalle: 'Se renueva solo el ' + fechaCorta(dia(35)) + ' por 412 € (el año pasado, 389 €). Hay que avisar un mes antes.', fecha: iso(dia(5)), tipo: 'coche' },
    { id: 'ibi', que: 'IBI · segundo plazo', detalle: 'Se cobra de la cuenta: 286,40 €', fecha: iso(dia(7)), tipo: 'casa' },
    { id: 'itv', que: 'ITV del coche', detalle: 'Pide cita: en diciembre se llenan', fecha: iso(dia(26)), tipo: 'coche' },
    { id: 'garantia-lavadora', que: 'Garantía de la lavadora', detalle: 'Bosch, comprada hace 3 años. Si hace ruido, ahora', fecha: iso(dia(31)), tipo: 'casa' },
    { id: 'caldera', que: 'Revisión de la caldera', detalle: 'Obligatoria cada 2 años', fecha: iso(dia(58)), tipo: 'casa' },
    { id: 'dni', que: 'Renovar el DNI', detalle: 'Caduca. Cita previa en la policía', fecha: iso(dia(110)), tipo: 'papeles' },
  ];

  // ── Dinero ─────────────────────────────────────────────────────────────
  const diaDelMes = hoy.getDate();
  PANEL.dinero = {
    presupuesto: 2300,
    categorias: [
      { id: 'casa', nombre: 'Casa', presupuesto: 900, color: 'azul' },
      { id: 'comida', nombre: 'Comida', presupuesto: 520, color: 'coral' },
      { id: 'transporte', nombre: 'Coche y transporte', presupuesto: 240, color: 'ambar' },
      { id: 'ocio', nombre: 'Ocio', presupuesto: 260, color: 'violeta' },
      { id: 'suscripciones', nombre: 'Suscripciones', presupuesto: 150, color: 'cian' },
      { id: 'salud', nombre: 'Salud', presupuesto: 120, color: 'verde' },
      { id: 'otros', nombre: 'Otros', presupuesto: 110, color: 'gris' },
    ],
    // Gastos de este mes (hasta hoy)
    gastos: (() => {
      const g = [
        { d: 1, concepto: 'Alquiler', importe: 750, categoria: 'casa' },
        { d: 1, concepto: 'Gimnasio', importe: 39.9, categoria: 'suscripciones' },
        { d: 2, concepto: 'Supermercado', importe: 84.35, categoria: 'comida' },
        { d: 3, concepto: 'Gasolina', importe: 62.1, categoria: 'transporte' },
        { d: 4, concepto: 'Luz', importe: 48.6, categoria: 'casa' },
        { d: 5, concepto: 'Netflix', importe: 13.99, categoria: 'suscripciones' },
        { d: 6, concepto: 'Cena con Marta', importe: 58, categoria: 'ocio' },
        { d: 7, concepto: 'Supermercado', importe: 71.2, categoria: 'comida' },
        { d: 8, concepto: 'Farmacia', importe: 12.45, categoria: 'salud' },
        { d: 9, concepto: 'Fibra y móvil', importe: 45, categoria: 'casa' },
        { d: 9, concepto: 'Spotify', importe: 11.99, categoria: 'suscripciones' },
        { d: 10, concepto: 'Mercado', importe: 38.7, categoria: 'comida' },
        { d: 11, concepto: 'Entradas del cine', importe: 19, categoria: 'ocio' },
        { d: 12, concepto: 'Supermercado', importe: 66.8, categoria: 'comida' },
        { d: 12, concepto: 'Regalo cumple Laura', importe: 35, categoria: 'otros' },
        { d: 13, concepto: 'Café', importe: 2.8, categoria: 'comida' },
        { d: 14, concepto: 'Pádel', importe: 12, categoria: 'ocio' },
        { d: 15, concepto: 'Claude Pro', importe: 18, categoria: 'suscripciones' },
        { d: 16, concepto: 'Supermercado', importe: 79.4, categoria: 'comida' },
        { d: 17, concepto: 'Gasolina', importe: 58.3, categoria: 'transporte' },
        { d: 18, concepto: 'Fisio', importe: 45, categoria: 'salud' },
        { d: 19, concepto: 'Mercado', importe: 41.25, categoria: 'comida' },
        { d: 20, concepto: 'Cena fuera', importe: 64, categoria: 'ocio' },
        { d: 21, concepto: 'Supermercado', importe: 69.9, categoria: 'comida' },
      ];
      return g.filter((x) => x.d <= diaDelMes).map((x, i) => ({ id: 'g' + i, fecha: iso(new Date(hoy.getFullYear(), hoy.getMonth(), x.d)), concepto: x.concepto, importe: x.importe, categoria: x.categoria }));
    })(),
    // Lo que gastaste el mes pasado hasta este mismo día (para comparar)
  };
  PANEL.dinero.mesPasadoHastaHoy = Math.round(PANEL.dinero.gastos.reduce((s, g) => s + g.importe, 0) * 1.07);

  // ── Suscripciones ──────────────────────────────────────────────────────
  const proximo = (diaCobro) => {
    const d = new Date(hoy.getFullYear(), hoy.getMonth(), diaCobro);
    if (d < hoy) d.setMonth(d.getMonth() + 1);
    return iso(d);
  };
  PANEL.suscripciones = [
    { nombre: 'Gimnasio', precio: 39.9, cada: 'mes', cobro: proximo(1), color: '#3DD68C', letra: 'G' },
    { nombre: 'Fibra y móvil', precio: 45, cada: 'mes', cobro: proximo(9), color: '#6E9BFF', letra: 'F' },
    { nombre: 'Claude Pro', precio: 18, cada: 'mes', cobro: proximo(15), color: '#E8875B', letra: 'C' },
    { nombre: 'Netflix', precio: 13.99, cada: 'mes', cobro: proximo(5), color: '#E5484D', letra: 'N' },
    { nombre: 'Spotify', precio: 11.99, cada: 'mes', cobro: proximo(9), color: '#1DB954', letra: 'S' },
    { nombre: 'iCloud 200 GB', precio: 2.99, cada: 'mes', cobro: proximo(22), color: '#8EA6C8', letra: 'i' },
    { nombre: 'Amazon Prime', precio: 49.9, cada: 'año', cobro: iso(dia(19)), color: '#FFB648', letra: 'A' },
  ];

  // ── Ahorro ─────────────────────────────────────────────────────────────
  PANEL.ahorro = [
    { nombre: 'Colchón para imprevistos', tengo: 8400, meta: 12000, nota: '4,2 de 6 meses de gastos', color: 'verde' },
    { nombre: 'Viaje a Japón', tengo: 2480, meta: 4000, nota: 'Mayo de 2027', color: 'coral' },
    { nombre: 'Coche nuevo', tengo: 3150, meta: 9000, nota: 'Entrada para 2028', color: 'azul' },
  ];

  // ── Hábitos (últimos 182 días: 1 = hecho) ───────────────────────────────
  const habitos = [
    { id: 'andar', nombre: '8.000 pasos', icono: 'pasos', color: 'verde', prob: 0.78, racha: 12 },
    { id: 'leer', nombre: 'Leer 20 minutos', icono: 'libro', color: 'ambar', prob: 0.72, racha: 6 },
    { id: 'pantallas', nombre: 'Sin móvil en la cama', icono: 'luna', color: 'violeta', prob: 0.6, racha: 3 },
    { id: 'agua', nombre: '2 litros de agua', icono: 'gota', color: 'cian', prob: 0.85, racha: 23 },
    { id: 'fuerza', nombre: 'Estirar 10 minutos', icono: 'pesa', color: 'coral', prob: 0.5, racha: 2 },
    { id: 'llamar', nombre: 'Llamar a alguien que quiero', icono: 'telefono', color: 'rosa', prob: 0.5, racha: 0 },
  ];
  PANEL.habitos = habitos.map((h) => {
    const dias = {};
    for (let i = 182; i >= 1; i--) if (azar() < h.prob) dias[iso(dia(-i))] = 1;
    for (let i = 1; i <= 30; i++) { if (i <= h.racha) dias[iso(dia(-i))] = 1; else if (i === h.racha + 1) delete dias[iso(dia(-i))]; }
    return { id: h.id, nombre: h.nombre, icono: h.icono, color: h.color, dias };
  });
  // Hoy, dos ya marcados
  PANEL.habitos[0].dias[iso(hoy)] = 1;
  PANEL.habitos[3].dias[iso(hoy)] = 1;

  // ── Salud ──────────────────────────────────────────────────────────────
  PANEL.salud = {
    sueno: Array.from({ length: 14 }, (_, i) => ({ fecha: iso(dia(i - 14)), horas: +(6.1 + azar() * 1.9).toFixed(1) })),
    suenoMeta: 7.5,
    pasosHoy: 6430,
    pasosMeta: 8000,
    peso: Array.from({ length: 31 }, (_, i) => ({ fecha: iso(dia(i - 30)), kg: +(82.6 - i * 0.055 + (azar() - 0.5) * 0.5).toFixed(1) })),
    pesoMeta: 78,
  };

  // ── Objetivos del año ──────────────────────────────────────────────────
  PANEL.objetivos = [
    { nombre: 'Ahorrar 6.000 €', hecho: 5310, meta: 6000, unidad: '€', color: 'verde' },
    { nombre: 'Leer 20 libros', hecho: 18, meta: 20, unidad: 'libros', color: 'ambar' },
    { nombre: 'Correr 600 km', hecho: 529, meta: 600, unidad: 'km', color: 'coral' },
    { nombre: 'Inglés: llegar al B2', hecho: 39, meta: 48, unidad: 'lecciones', color: 'azul' },
    { nombre: 'Bajar a 78 kg', hecho: 4.6, meta: 7, unidad: 'kg', color: 'violeta', desde: 'Empecé en 85 kg' },
  ];

  // ── Gente que importa ──────────────────────────────────────────────────
  PANEL.gente = [
    { id: 'mama', nombre: 'Mamá', cada: 3, ultima: iso(dia(-2)), color: '#FF8A65' },
    { id: 'abuela', nombre: 'Abuela Carmen', cada: 7, ultima: iso(dia(-12)), color: '#B39DFF' },
    { id: 'dani', nombre: 'Dani', cada: 14, ultima: iso(dia(-5)), color: '#6E9BFF' },
    { id: 'laura', nombre: 'Laura', cada: 14, ultima: iso(dia(-20)), color: '#3DD68C' },
    { id: 'javi', nombre: 'Javi', cada: 30, ultima: iso(dia(-41)), color: '#FFC24B' },
  ];

  function fechaCorta(d) {
    return d.getDate() + ' ' + ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'][d.getMonth()];
  }
})();
