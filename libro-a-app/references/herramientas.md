# La herramienta del libro

Muchos libros de desarrollo personal proponen un ejercicio propio: una tabla, una matriz, un test, una serie de preguntas. Convertirlo en algo interactivo es lo que más distingue la app de un resumen. Va **siempre que el autor proponga uno** (y la primera en `modulos`).

**Fiel al autor:** usa su nombre, sus pasos y sus categorías, comprobados en las fuentes. Si el libro no propone ninguna herramienta, no la inventes: usa otros módulos.

## Los cinco tipos

| `tipo` | Qué hace el usuario | Encaja con | Campos |
|---|---|---|---|
| `puntuacion` | Apunta cosas de su vida y valora cada una en 3 niveles; ve el resultado en barras. | Inventarios: hábitos actuales, gastos, actividades, relaciones. | `instruccion`, `valores` (3 textos: bueno, neutro, malo) |
| `escalas` | Se puntúa del 1 al 10 en varias dimensiones; ve un radar y lo compara con la vez anterior. | Ruedas de la vida, autoevaluaciones, los «pilares» o «acuerdos» de un libro. | `dimensiones`: 4 a 7 × `{ nombre, bajo, alto }` |
| `matriz` | Coloca elementos en 4 casillas según dos preguntas de sí o no. | Prioridades, decisiones, clasificar tareas o gastos. | `ejeX` y `ejeY`: `{ nombre, si, no }` · `cuadrantes`: 4 × `{ nombre, consejo }` en orden (X sí, Y sí), (X no, Y sí), (X sí, Y no), (X no, Y no) |
| `pasos` | Responde unas preguntas guiadas y la app (con la IA de dentro) le redacta un resultado. | Ejercicios de reflexión con un producto final: tu misión, tu propósito, tu carta, tu plan. | `pasos`: 3 a 6 × `{ pregunta, ayuda }` · `resultado`: `{ titulo, instruccion }` |
| `propia` | Lo que no encaje en lo anterior. | Visualizaciones muy propias del libro. | Escribes `HerramientaPropia` |

`corto` (12 caracteres como mucho) es el nombre en la barra del móvil: «Tabla», «Matriz», «Tu rueda», «Tu misión».

## Ejemplos de libros conocidos

Orientativos: **comprueba en las fuentes** que el autor lo plantea así antes de usarlo.

| Libro | Herramienta del autor | `tipo` |
|---|---|---|
| Hábitos atómicos (James Clear) | La tabla de hábitos: lo que haces en un día, marcado como +, = o − | `puntuacion` |
| Los 7 hábitos de la gente altamente efectiva (Stephen R. Covey) | La matriz del tiempo: urgente / importante | `matriz` |
| Los 7 hábitos (Covey) | La declaración de misión personal | `pasos` |
| Ikigai (García y Miralles) | Lo que amas, en lo que eres bueno, lo que el mundo necesita, por lo que te pueden pagar | `pasos` |
| Padre rico, padre pobre (Robert Kiyosaki) | Activos frente a pasivos | `puntuacion` (activo, neutro, pasivo) o `matriz` |
| Los cuatro acuerdos (Miguel Ruiz) | Los cuatro acuerdos | `escalas` (4 dimensiones) |
| Trabajo profundo (Cal Newport) | Trabajo profundo frente a superficial | `puntuacion` |
| ¡Tráguese ese sapo! (Brian Tracy) | Método ABCDE para ordenar tareas | `puntuacion` o `propia` |
| Cuatro mil semanas (Oliver Burkeman) | Tu vida en semanas | `propia` (cuadrícula) |

## Cómo escribir cada tipo

**`puntuacion`.** La `instruccion` dice qué apuntar y cómo empezar («Apunta lo que haces en un día normal, desde que te levantas»). Los `valores`, con el lenguaje del autor y su símbolo si lo tiene: «Me acerca (+)», «Neutro (=)», «Me aleja (−)».

**`escalas`.** Cada dimensión con su nombre corto y qué significan el 1 y el 10, en palabras de la vida real. ✅ `{ "nombre": "Impecable con tus palabras", "bajo": "digo cosas que luego lamento", "alto": "cuido lo que digo" }`.

**`matriz`.** Los `si` y `no` de cada eje son las etiquetas de los botones que mueven cada elemento («Urgente» / «No urgente»). Cada cuadrante con un `consejo` de una frase que diga qué hacer con lo que cae ahí.

**`pasos`.** Preguntas que se puedan contestar en una o dos frases, con una `ayuda` corta que desbloquee («Piensa en lo que harías gratis»). La `instruccion` del `resultado` le dice a la IA qué redactar, cómo de largo y en qué tono: «Redacta una declaración de misión personal de 3 frases, en primera persona, con lo que la persona ha contado.» Si no hay IA, la app enseña las respuestas juntas.

## Si escribes `HerramientaPropia`

- Recibe `{ datos, guarda, hoy }`: `datos` es lo guardado; `guarda({ … })` guarda (se mezcla con lo que había).
- Usa las piezas de la plantilla (`Panel`, `Rotulo`, `Boton`, `Campo`, `Texto`) y los colores `C` y `A`. Nada de estilos nuevos.
- Que funcione en el ordenador y a 390 px de ancho (`grid grid-cols-1 md:grid-cols-…`). Usa solo las clases `md:` que ya están en `<Estilos>`, o añade la tuya ahí: el Tailwind de los artifacts no las trae todas.
- **Nunca uses `<form>`**: los artifacts corren en un marco que bloquea los formularios, así que «enviar» no haría nada. Añade con un botón (`onClick`) y con la tecla Enter en el campo (`onKeyDown`), como en la herramienta `puntuacion`.
- Corta: lo importante es que se use, no que tenga muchas opciones.
