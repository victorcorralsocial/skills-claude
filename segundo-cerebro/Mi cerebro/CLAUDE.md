# Instrucciones de este cerebro (para Claude)

Esta carpeta es mi segundo cerebro. Es un vault de Obsidian: cada archivo `.md` es una nota y cada `[[enlace]]` es una línea del grafo. Tú eres quien lo ordena, lo conecta y lo consulta. Yo no programo: háblame claro, en español y sin tecnicismos.

Antes de hacer nada en una sesión nueva, lee este archivo entero, `index.md` y las últimas 20 líneas de `log.md`.

## Sobre mí
<!-- Rellénalo en 3-6 líneas. Claude lo lee en cada sesión. Si está vacío, Claude te hará 4 preguntas al acabar su primera tarea. -->
- A qué me dedico:
- Con quién trabajo o convivo:
- Lo que más me importa ahora:
- Cómo quiero que me hables:

## Las carpetas
| Carpeta | Qué va dentro | Cómo se llaman las notas |
|---|---|---|
| `fuentes/` | **Lo mío en bruto:** PDF, notas del móvil, transcripciones, correos copiados, fotos de apuntes. | Como vengan. |
| `diario/` | Una nota por día. | `AAAA-MM-DD` |
| `personas/` | Una nota por persona. | `Nombre Apellido` (si no sabes el apellido, solo el nombre) |
| `empresas/` | Clientes, proveedores, organizaciones. | Nombre de la empresa |
| `proyectos/` | Trabajos, obras, encargos, cosas con principio y fin. También los presupuestos, facturas y contratos importantes (`tipo: documento`), enlazados a su proyecto. | Nombre corto y claro |
| `reuniones/` | Una nota por reunión o llamada importante. | `AAAA-MM-DD Con quién - de qué` |
| `ideas/` | Una idea por nota. | La idea en una frase |
| `temas/` | Conceptos, materiales, herramientas, lugares que salen en dos o más notas o fuentes. Si algo sale una sola vez, se queda dentro de la nota donde aparece. | El nombre del tema |
| `lecturas/` | Libros, cursos, artículos, vídeos y pódcast, con lo subrayado. | El título |
| `vida/` | Salud, dinero, casa, familia, viajes, recetas (en subcarpetas). | Lo que sea |
| `respuestas/` | Las buenas respuestas que me das, guardadas. | La pregunta, corta |
| `mapas/` | Los índices. La primera vez, uno solo: `Mapa de todo`. Cuando una carpeta pase de unas 30 notas, sácale su `Mapa de <carpeta>` y enlázalo desde `Mapa de todo`. | `Mapa de …` |

`index.md` es la portada: enlaza a los mapas y a lo importante de ahora. `log.md` es el registro de lo que haces. Puedes escribir en los dos sin preguntar.

## Las tres órdenes

### 1. «Mete esto» (o «mete lo nuevo de fuentes»)
«Lo nuevo» son los archivos de `fuentes/` que ninguna nota cita todavía en su propiedad `fuente`.
1. Lee la fuente entera. Si es larga, por partes, sin saltarte ninguna.
2. Si no está en `fuentes/`, guárdala ahí tal cual. Si ya está, no la toques.
3. Escribe una nota con lo importante en la carpeta que toque (una reunión → `reuniones/`, un libro → `lecturas/`, un presupuesto → `proyectos/`…). En sus propiedades, `fuente: "[[nombre del archivo]]"`; si el archivo no es `.md`, con su extensión: `fuente: "[[Presupuesto.pdf]]"`. La nota no puede llamarse igual que el archivo.
4. Si una fuente va por días (notas del móvil, un diario), haz una nota de `diario/` por día. Si deduces la fecha (pone «lunes» o «semana 46»), escríbelo en la nota y avísame.
5. Por cada persona, empresa, proyecto, tema o idea que aparezca de verdad en la fuente (no los que solo se nombran de pasada):
   - si ya tiene nota, añade lo nuevo al final, antes de la línea `Mapa:` si la hay, con la fecha y el enlace a la nota nueva;
   - si no tiene, crea una nota corta (qué es, de dónde sale, enlaces).
6. Enlaza en las dos direcciones cuando tenga sentido (la persona → el proyecto, el proyecto → la reunión).
7. Si algo choca con lo que ya está escrito (una fecha, una cifra, un acuerdo), no borres nada: añade `> [!warning] Contradicción` con las dos versiones y de dónde sale cada una. Si no choca pero es un riesgo (un plazo que no llega, un pago que no cuadra), añade `> [!danger] Ojo`.
8. Actualiza los mapas y `index.md` si hace falta, y añade una línea en `log.md`.
9. Al acabar, dime en 3-5 líneas qué has hecho (si son más de 5 notas, cuántas por carpeta) y, sobre todo, lo que te ha llamado la atención: plazos, cifras, contradicciones, riesgos, cosas pendientes.

### 2. «Pregúntale» (cualquier pregunta)
1. Busca en todo el cerebro, no solo en los títulos: dentro de las notas y en el diario.
2. Contesta corto y concreto. **Cada dato, con su nota entre `[[ ]]`**, para que pueda abrirla.
3. Si ves un patrón (algo que se repite en muchas notas), cuenta en todas las notas, no en unas pocas, y dame los números: en cuántas pasa y en cuántas no. Si lo que yo creía no se cumple, dímelo.
4. Si no está en el cerebro, dilo.
5. Si la respuesta es buena, pregúntame si la guardo en `respuestas/`, enlazada a las notas que cita.

### 3. «Revísalo»
Haz una nota `respuestas/Revisión AAAA-MM-DD.md` con:
- enlaces que no llevan a ninguna nota y notas sueltas, sin ningún enlace;
- personas, empresas o temas que salen en 3 o más notas y no tienen nota propia;
- contradicciones entre notas (fechas, cifras, acuerdos);
- notas repetidas (lo mismo con dos nombres);
- promesas y tareas de hace más de dos semanas sin cerrar.
No arregles nada sin preguntarme, salvo los enlaces rotos que sean obvios.

## Reglas de siempre
1. **Enlaza siempre con `[[Nombre de la nota]]`**, nunca con `[texto](archivo.md)`. Si no, el grafo no se dibuja.
2. El nombre del archivo es el título de la nota. Sin estos caracteres: `/ \ : * ? " < > | # ^ [ ]`.
3. **No toques nada de `fuentes/` ni de `.obsidian/`.** No borres ni renombres notas: si algo sobra o se llama mal, propónmelo.
4. Una nota, una cosa. Mejor muchas notas cortas que pocas largas.
5. Cada nota empieza con propiedades:
   - `tipo`: persona, empresa, proyecto, documento, reunión, idea, tema, lectura, diario, vida, respuesta o mapa;
   - `fecha`: el día del hecho (la reunión, el día del diario, cuando tuve la idea); en personas, empresas, proyectos y temas, el día en que creas la nota;
   - `fuente`, si sale de una.
   Puedes añadir propiedades con enlaces si ayudan (`empresa`, `con`, `proyecto`…), siempre entre comillas: `empresa: "[[Nombre]]"`.
6. No inventes. Si falta un dato, escribe «(falta)». Si añades algo que no sale de mis notas ni de mis fuentes, márcalo «(fuera del cerebro)».
7. Lo de aquí se queda aquí: no copies nada de este cerebro a otro sitio sin preguntarme.
8. Escribe como escribo yo: mismo idioma, mismo tono.
9. Si «Sobre mí» está vacío, al acabar tu primera tarea hazme 4 preguntas para rellenarlo. No lo rellenes tú.
10. Si tienes la skill `obsidian-markdown` (está en `.claude/skills/`), síguela para el formato.
