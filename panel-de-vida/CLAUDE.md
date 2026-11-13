# Panel de vida

Mi panel personal: lo abro por la mañana y veo mi día y cómo voy en todo (agenda, lo que vence, dinero, suscripciones, hábitos, salud, objetivos, gente y huchas).

## Para quién es
Para mí. No soy programador: explícame cada cambio en una frase y sin jerga.

## Cómo está hecho
- HTML, CSS y JavaScript normales. **Sin instalar nada**: se abre con doble clic en `index.html`.
- `js/datos.js`: mis datos (al principio, de ejemplo, generados a partir de la fecha de hoy).
- `js/calendario.js`: mi agenda (ver «Actualiza el panel»).
- `js/graficos.js`: los gráficos, dibujados a mano en SVG (sin librerías).
- `js/app.js`: pinta cada tarjeta y responde a los clics. Lo que marco se guarda en el navegador (localStorage).
- `css/estilos.css`: el diseño. Colores en variables al principio, con modo oscuro y claro.
- `datos/` (si existe): archivos que te dejo para que los leas (movimientos del banco, exportación de salud, pólizas…). No se suben a Git.

## «Actualiza el panel»
Cuando te lo diga, mete en `js/calendario.js` mis eventos de hoy a dentro de 30 días (y los de esta semana que ya han pasado), con `actualizado` = ahora y la `fuente` de donde salen:
- Si tengo el conector de **Google Calendar**: léelo con él, de todos mis calendarios (`fuente: 'google'`).
- Si tengo el conector de **Microsoft 365**: lee mi calendario de Outlook, que es el mismo que el de Teams (`fuente: 'outlook'`).
- Si en `datos/calendario-secreto.txt` hay un enlace iCal/ICS: descárgalo y léelo (`fuente: 'ical'`). Ese enlace es privado: no lo copies en ningún otro archivo ni lo enseñes.

Solo título, hora, lugar y calendario: nada de descripciones, enlaces ni invitados. Pon cada evento en el calendario que mejor le encaje (trabajo, familia, personal, salud, casa, cumples) y dime en una frase cuántos has metido.

## Reglas
- Antes de un cambio grande, **primero el plan** y espera a que te diga que sí.
- **Un cambio cada vez.** Cuando funcione, guárdalo con un commit de Git con un mensaje en español.
- Compruébalo en el navegador (portátil y móvil) antes de decirme que está.
- Nada de librerías ni servidores salvo que te lo pida.
- Todo en español de España: fechas y euros en formato español (1.284 €, 13 de noviembre).
- El panel no envía mis datos a ningún sitio. Lo único que sale a internet es la ciudad, para el tiempo (Open-Meteo, sin cuenta).
