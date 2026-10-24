# Cómo escribir los datos del libro

Los datos van en el bloque `▼ DATOS ▼` de `assets/app.jsx`, en **JSON válido**: comillas dobles, sin comas al final, sin comentarios. Modelo completo: `references/ejemplo-habitos-atomicos.json` (mira el nivel; no copies su contenido para otro libro).

Todo en español neutro, de tú, como se lo explicarías a un amigo. Nada de jerga, nada de «cabe destacar», nada de vender el libro.

## Índice
1. Cabecera y color
2. Ideas
3. Fuentes
4. Bienvenida
5. Acciones
6. Módulos, técnicas, diario y chat

## 1. Cabecera y color

- `titulo`: el de la edición en español si existe («Hábitos atómicos», no «Atomic Habits»). `anio`: el de la edición original.
- `acento`: **un color sacado de la portada o del tema del libro**. Es el lomo de la app: llena la barra lateral y los botones, con texto blanco encima, así que tiene que ser **oscuro** (contraste ≥ 4,5 con el blanco; `scripts/comprobar.py` lo mide). Si la portada es clara (amarilla, blanca), coge su color más oscuro o un tono profundo del mismo color. Evita el negro y los grises: el color tiene que recordar al libro.
- `ideaCentral`: una frase que entendería un niño de 12 años.
  - ✅ «Los cambios pequeños, repetidos cada día, acaban cambiando tu vida.»
  - ❌ «Un marco integral para la optimización conductual sostenible.»
- `enTreintaSegundos`: 3 o 4 frases que cuentan el libro de principio a fin.

## 2. Ideas (5 a 7)

| Campo | Regla | ✅ | ❌ |
|---|---|---|---|
| `nombre` | 1 a 4 palabras, fácil de recordar. Si el autor le da nombre, ese. | «Hazlo fácil» | «La importancia de reducir la fricción» |
| `dice` | Dos frases como mucho: qué es y por qué importa. | «Cuantos menos pasos, más lo harás. Empieza con una versión que dure menos de dos minutos.» | Un párrafo con todo el capítulo. |
| `hoy` | Algo que se hace hoy, en menos de 5 minutos, y se sabe cuándo está hecho. | «Reduce tu hábito a dos minutos: leer una página.» | «Reflexiona sobre la fricción en tu vida.» |
| `confianza` | 3 o 2, según `investigacion.md`. | | |
| `fuentes` | Índices de `fuentes`, al menos 2 distintos. | `[0, 2]` | `[0]` |
| `conecta` | 1 o 2 ids de las ideas a las que lleva. Es el mapa del libro: que cuente cómo se encadenan. | identidad → hazlo obvio | todas con todas |

Orden de las ideas: el del libro, o de la más básica a la más avanzada.

## 3. Fuentes

`{ "tipo": "autor" | "resumen" | "lectores", "titulo": "…", "url": "https://…" }`. Solo las que has usado de verdad, con su URL real. El `titulo` dice quién y qué: «James Clear: página del libro», «Lectores en r/getdisciplined».

## 4. Bienvenida

- `cambiar`: de 4 a 6 cosas concretas que alguien querría cambiar con **este** libro, dichas como las diría esa persona.
  - ✅ «Dejar un mal hábito (el móvil, picar entre horas…)» · ❌ «Optimizar mis rutinas»
  - `compromiso`: frase en primera persona, al estilo del libro. En libros de identidad, «Soy una persona que…»; en otros, la forma que use el autor («Hoy elijo…», «Mi prioridad es…»).
  - `ideas`: las 2 o 3 ideas que más le sirven a quien elige esa opción (salen en «Tu plan»).
- `escala`: la pregunta de desde dónde parte y qué significan el 1 (`bajo`) y el 10 (`alto`) **en este libro**. Se vuelve a preguntar cada semana, así que tiene que tener sentido repetirla.
  - ✅ «¿Cómo de constante eres hoy con tus hábitos?» · 1: «empiezo cosas y las dejo a los pocos días» · 10: «mantengo mis hábitos aunque cueste».

## 5. Acciones (14)

Son el corazón de la app: una por día, durante dos semanas, de la más fácil a la más exigente (semana 1, lo básico; semana 2, lo que pide más). Después se repiten.

- Cada una sale de una idea (`idea`) y tiene dos versiones: `corta` (2 minutos) y `larga` (5 a 10 minutos). Las dos hacen lo mismo; la larga va más a fondo.
- **Verbo en imperativo y resultado claro:** escribe, pon, elige, quita, apunta, manda, prepara. Se tiene que saber cuándo está hecha para poder pulsar «Hecho».
- **Variadas:** escribir, preparar el entorno, hablar con alguien, probar algo, revisar tu semana. No 14 veces «escribe».
- Que sirvan a cualquiera de las opciones de la bienvenida; si el usuario eligió un cambio concreto (Paso 1 de la skill), oriéntalas a ese cambio.

| ✅ | ❌ |
|---|---|
| «Deja a la vista lo que necesitas para tu hábito de mañana.» | «Piensa en tu entorno.» |
| «Escribe: «Después de [algo que ya haces], haré [tu hábito]».» | «Aplica el apilamiento de hábitos.» |
| «Escribe a alguien para quien tu hábito es lo normal.» | «Busca una comunidad.» |

## 6. Módulos, técnicas, diario y chat

- `modulos`: 2 o 3 de `herramienta`, `habitos`, `diario`, `chat` (reglas para elegir en `SKILL.md`). Los campos de los módulos que no van se dejan vacíos (`[]`).
- `tecnicas` (con `habitos`): de 3 a 6 técnicas del libro para que un hábito cueste menos. `como` en una frase. Si la técnica se completa con algo del usuario, añade `pregunta` y `plantilla` con los huecos `{respuesta}` y `{habito}`:
  - `{ "nombre": "Apilar hábitos", "como": "Ata el hábito nuevo a uno que ya haces.", "pregunta": "¿Después de qué lo harás?", "plantilla": "Después de {respuesta}, {habito}." }` → «Después de cenar, leer 10 páginas.»
  - El hábito va en minúscula dentro de la frase; la app pone la mayúscula inicial.
- `diario` (con `diario`): 14 preguntas abiertas inspiradas en las ideas, que no se respondan con sí o no. ✅ «¿Qué te lo ha puesto difícil hoy?» · ❌ «¿Has cumplido tu hábito?»
- `chatEjemplos` (con `chat`): 3 situaciones reales, en primera persona, que alguien le contaría al libro. ✅ «Siempre dejo los hábitos a la semana» · ❌ «¿Qué dice el capítulo 3?»
- `herramienta`: ver `references/herramientas.md`.
