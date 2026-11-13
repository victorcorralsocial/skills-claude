// Tu agenda.
// Este archivo lo reescribe Claude Code cuando le dices «actualiza el panel»: lee tu calendario (conector de
// Google Calendar, conector de Microsoft 365 o un enlace iCal) y deja aquí los eventos de los próximos 30 días.
//
// Formato de cada evento:
//   { titulo: 'Dentista', calendario: 'salud', inicio: '2026-11-17T10:00', fin: '2026-11-17T10:45', lugar: 'Clínica Sanz' }
//   Eventos de todo el día: { titulo: 'Cumple de Laura', calendario: 'cumples', inicio: '2026-11-19', todoElDia: true }
//
// Ahora mismo son datos de ejemplo (fuente: 'ejemplo'), generados a partir de la fecha de hoy.
window.PANEL = window.PANEL || {};

PANEL.calendario = {
  fuente: 'ejemplo', // 'google', 'outlook' o 'ical' cuando venga de tu calendario
  actualizado: null, // '2026-11-13T09:00' cuando Claude lo actualice
  calendarios: [
    { id: 'trabajo', nombre: 'Trabajo', color: 'azul' },
    { id: 'familia', nombre: 'Familia', color: 'coral' },
    { id: 'personal', nombre: 'Personal', color: 'verde' },
    { id: 'salud', nombre: 'Salud', color: 'violeta' },
    { id: 'casa', nombre: 'Casa y papeles', color: 'ambar' },
    { id: 'cumples', nombre: 'Cumpleaños', color: 'rosa' },
  ],
  eventos: (function ejemplo() {
    const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
    const lunes = new Date(hoy); lunes.setDate(hoy.getDate() - ((hoy.getDay() + 6) % 7));
    const f = (base, n, hm) => {
      const d = new Date(base); d.setDate(d.getDate() + n);
      const s = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      return hm ? s + 'T' + hm : s;
    };
    const ev = [];
    const e = (base, n, ini, fin, titulo, calendario, lugar) => ev.push({ titulo, calendario, inicio: f(base, n, ini), fin: f(base, n, fin), lugar });
    const todo = (base, n, titulo, calendario) => ev.push({ titulo, calendario, inicio: f(base, n), todoElDia: true });

    // Hoy (pase lo que pase con el día de la semana)
    e(hoy, 0, '07:30', '08:15', 'Correr 5 km', 'personal', 'Retiro');
    e(hoy, 0, '09:00', '11:00', 'Bloque de foco: guion del vídeo', 'trabajo');
    e(hoy, 0, '11:30', '12:00', 'Llamada con el gestor', 'trabajo', 'Teléfono');
    e(hoy, 0, '14:00', '15:30', 'Comida con mamá', 'familia', 'Casa de mamá');
    e(hoy, 0, '17:00', '18:30', 'Grabar el vídeo del panel', 'trabajo');
    e(hoy, 0, '20:30', '22:30', 'Cena con Marta', 'personal', 'La Tasquita');

    // El resto de esta semana y las siguientes (por días desde el lunes)
    for (let s = -3; s < 6; s++) {
      const base = new Date(lunes); base.setDate(lunes.getDate() + s * 7);
      const salta = (n) => { const d = new Date(base); d.setDate(d.getDate() + n); return d.getTime() === hoy.getTime(); };
      const add = (n, ini, fin, t, c, l) => { if (!salta(n)) e(base, n, ini, fin, t, c, l); };
      add(0, '09:00', '10:00', 'Reunión de equipo', 'trabajo');
      add(0, '19:00', '20:00', 'Gimnasio · fuerza', 'salud', 'Gimnasio');
      add(1, '10:00', '13:00', 'Grabar pantallas', 'trabajo');
      add(1, '18:30', '19:30', 'Inglés', 'personal', 'Online');
      add(2, '09:30', '11:30', 'Bloque de foco', 'trabajo');
      add(2, '19:00', '20:00', 'Gimnasio · fuerza', 'salud', 'Gimnasio');
      add(3, '12:00', '13:00', 'Revisión de métricas', 'trabajo');
      add(3, '18:30', '19:30', 'Inglés', 'personal', 'Online');
      add(4, '10:00', '11:00', 'Planificar la semana', 'trabajo');
      add(5, '10:00', '11:30', 'Pádel con Dani', 'personal', 'Club Las Encinas');
      add(5, '13:30', '16:00', 'Comida en casa de la abuela', 'familia');
      add(6, '10:00', '11:00', 'Compra de la semana', 'casa');
      add(6, '19:00', '20:00', 'Llamar a la abuela', 'familia');
    }

    // Cosas sueltas (desde hoy)
    e(hoy, 4, '10:00', '10:45', 'Dentista', 'salud', 'Clínica Sanz');
    todo(hoy, 6, 'Cumple de Laura', 'cumples');
    e(hoy, 9, '08:30', '09:15', 'ITV: pedir cita', 'casa');
    e(hoy, 12, '17:00', '18:00', 'Fisio', 'salud', 'Fisio Chamberí');
    todo(hoy, 15, 'Cumple de papá', 'cumples');
    e(hoy, 18, '19:30', '22:00', 'Cena de empresa', 'trabajo', 'Restaurante Lúa');
    todo(hoy, 24, 'Cumple de Dani', 'cumples');
    e(hoy, -2, '18:00', '18:30', 'Recoger paquete', 'casa');
    return ev;
  })(),
};
