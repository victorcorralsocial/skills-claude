---
name: libro-a-app
description: >
  Convierte un libro (sobre todo de desarrollo personal) en una app personal e interactiva
  para aplicarlo cada día: investiga el libro en varias fuentes fiables, se queda con lo que
  confirman al menos dos y rellena una app ya diseñada (acción del día, hábitos, ideas clave,
  mapa del libro, progreso, la herramienta del autor, diario o chat con el libro). Úsala con
  /libro-a-app o cuando el usuario diga "convierte este libro en una app", "hazme una app de
  [libro]", "quiero aplicar [libro]" o "libro a app".
---

# De un libro a tu app

Conviertes un libro en una app que el usuario abre cada día para aplicar lo que enseña. No es un resumen: es una acción al día, sus hábitos, las ideas del libro y la herramienta que propone el autor, hecha interactiva. **El usuario no sube el libro**: lo investigas tú en fuentes fiables.

La app ya está diseñada y probada (`assets/app.jsx`, en ordenador y en móvil). Tu trabajo es **investigar bien y escribir sus datos**. Así sale rápido, bonito y siempre igual de bien.

## Archivos

| Archivo | Cuándo lo usas |
|---|---|
| `assets/app.jsx` | La app. Solo cambias el bloque `▼ DATOS ▼` (y `HerramientaPropia` si hace falta). |
| `references/investigacion.md` | Antes de buscar: qué fuentes valen y cómo cruzarlas. |
| `references/contenido.md` | Al escribir los datos: reglas y ejemplos de cada campo. |
| `references/herramientas.md` | Al elegir la herramienta del libro y su tipo. |
| `references/ejemplo-habitos-atomicos.json` | El nivel de calidad que se espera. No copies su contenido para otro libro. |
| `scripts/montar.py` | Monta la app con tus datos y los comprueba antes (usa `comprobar.py`). |
| `scripts/comprobar.py` | Solo revisa los datos, sin montar. |

## Paso 1 · Preguntas (una sola tanda, con botones)

Pregunta con la **herramienta de preguntas con opciones de Claude** (`ask_user_input`: botones para clicar y «Otro» para escribir), **nunca en texto** ni con letras. Una sola llamada con las preguntas que toquen; como mucho media línea antes («Antes de investigarlo:»).

- **Libro** (solo si el mensaje no lo dice), la primera, de una opción: «¿Qué libro quieres convertir en tu app?». Opciones: 3 libros de desarrollo personal muy conocidos con título y autor (p. ej. «Hábitos atómicos · James Clear», «Los 7 hábitos de la gente altamente efectiva · Stephen R. Covey», «El poder del ahora · Eckhart Tolle»). El suyo lo escribe en «Otro».
- **Objetivo**, de una opción: «¿Qué quieres conseguir con el libro?» → «Aplicarlo en mi día a día» · «Entenderlo y no olvidarlo» · «Un cambio concreto» (lo escribe en «Otro»).
- **Módulos**, de varias opciones (1 o 2): «¿Qué quieres que tenga tu app?» → «Hábitos con racha» · «Un diario para reflexionar» · «Los ejercicios del libro» · «Un chat para preguntarle al libro».

Cuándo:
- Sin libro en el mensaje: las tres. Con libro: objetivo y módulos. Si ya lo dice todo, o pone «tú decides» o «hazlo ya»: ninguna.
- Si en este entorno no tienes esa herramienta, haz las mismas preguntas en una lista corta.
- **No preguntes nada más.** Lo personal (nombre, motivo, tiempo, hábito) lo pregunta la app y se guarda para cada persona: si lo metieras en el código, cualquiera que abriera la app vería los datos del usuario.

## Paso 2 · Investiga

Lee `references/investigacion.md` y sigue su orden: el autor, 2 o 3 resúmenes serios y los lectores. **Como mucho unas 8 búsquedas**; para antes si ya está todo confirmado. Una idea entra solo si la confirman 2 fuentes independientes. No inventes nada y no copies el texto del libro.

## Paso 3 · Escribe los datos

Lee `references/contenido.md` y `references/herramientas.md`, y mira el ejemplo. Después escribe los datos en JSON válido (`libro.json`).

**Módulos** (2 o 3; los campos de los que no van, vacíos):
- «Hábitos con racha» → `habitos` · «Un diario para reflexionar» → `diario` · «Los ejercicios del libro» → `herramienta` · «Un chat para preguntarle al libro» → `chat`.
- Si el autor propone una herramienta, `herramienta` va siempre y la primera.
- «Tú decides»: hábitos, productividad o salud → `herramienta` + `habitos`; mentalidad o relaciones → `diario` + `chat`; dinero o trabajo → `herramienta` + `chat`.

**El objetivo** cambia el contenido, no la app: «Aplicarlo en mi día a día», acciones muy prácticas; «Entenderlo y no olvidarlo», acciones de recordar y explicar las ideas (contárselas a alguien, ponerles un ejemplo propio); un cambio concreto, las opciones de la bienvenida, las acciones y la herramienta apuntan a ese cambio.

## Paso 4 · Monta la app (sin escribirla a mano)

La app tiene más de 80 KB: **no la escribas ni la copies a mano**, porque una sola letra mal copiada la deja en blanco. Móntala con el script, que pega tus datos en la plantilla probada y comprueba que todo cuadra:

```
python3 scripts/montar.py libro.json
```

1. Guarda tus datos en `libro.json` (solo el JSON del libro).
2. Pasa el script. Antes de montar, revisa los datos: si sale algún ❌ (una idea que apunta a otra que no existe, un color con poco contraste…), arréglalo en `libro.json` y vuelve a pasarlo. Los ⚠️, si tienen arreglo rápido.
3. Deja la app en `/mnt/user-data/outputs/<titulo>.jsx`.

**Si no puedes ejecutar código:** copia `assets/app.jsx` entero y sustituye solo lo que hay entre `/* ▼ DATOS ▼ */` y `/* ▲ FIN DE LOS DATOS ▲ */` por tus datos. Nada más: ni una línea del resto.

## Paso 5 · Entrega

1. En el chat, **antes** de la app, 6 líneas como mucho:
   - El libro en una frase.
   - Las ideas con su confianza (●●● o ●●○).
   - Los módulos y por qué, en una línea.
   - Lo que no has podido confirmar (o «Todo confirmado»).
2. **Presenta el archivo montado** para que se abra como app. Si en este entorno los archivos `.jsx` no se abren como app, crea un artifact de React con el contenido del archivo **tal cual**, sin cambiar nada.
3. Después, una sola línea: «**Publica la app** para que guarde tu progreso (hace falta un plan de pago) y ábrela en el móvil o en el ordenador.»

No repases la app, no la rehagas y no la "mejores": está probada así (ordenador y móvil, con y sin almacenamiento, con y sin IA). Solo usa React, sin más librerías: no añadas imports. Y nada de `<form>`: los artifacts bloquean los formularios. Si en `HerramientaPropia` usas una clase `md:` que no esté en el bloque `<Estilos>`, añádela ahí, porque el Tailwind de los artifacts no las trae todas.

## Por qué está hecha así

- **Una acción al día y no un resumen:** lo que cambia a alguien es aplicar el libro, no releerlo. Por eso la pantalla principal es «Hoy».
- **Cruzar fuentes:** el usuario no va a comprobar nada; si una idea está en la app, tiene que ser verdad.
- **Diseño fijo con el color del libro:** sale bien siempre, tarda menos y todas las apps se reconocen como de la misma familia. El libro se nota en el color, las ideas y su herramienta.
