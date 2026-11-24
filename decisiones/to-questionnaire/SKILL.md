---
name: to-questionnaire
description: Convierte una decisión que el usuario no puede resolver solo en un cuestionario para que otra persona lo rellene (el banco, el gestor, el médico, el arquitecto, el abogado, un proveedor). Úsala cuando el usuario diga «prepárame las preguntas para…», «hazme un cuestionario para…» o «¿qué le pregunto a…?».
---

<!-- Adaptación al español de la skill «to-questionnaire» de Matt Pocock (github.com/mattpocock/skills, licencia MIT, en LICENSE). Cambios: traducida, sin «disable-model-invocation» y con la entrega como archivo para descargar, para que funcione también en la app de Claude. -->

Convierte algo que el usuario no puede responder solo en un **cuestionario**: un documento en Markdown que le da a una persona para que lo rellene cuando pueda, o para rellenarlo juntos en una reunión. Esa persona sabe cosas que el usuario no sabe; el cuestionario se las saca.

**Pregunta por el envío, no por el tema.** Al usuario solo le preguntas por el _envío_, que siempre puede contestar: a quién va y qué necesita que le devuelvan. Las preguntas del documento apuntan al **hueco** entre lo que sabe esa persona y lo que necesita el usuario.

1. **¿A quién va?** Pregunta, en un solo mensaje, qué papel tiene esa persona, qué sabe y qué relación tiene con el usuario. Eso fija el tono del cuestionario y cuánto contexto tiene que llevar. Termina cuando sabes quién es y qué sabe que el usuario no sabe.

2. **¿Qué necesitas que te devuelva?** Pregunta, en un solo mensaje, qué decisiones o qué datos concretos no puede resolver el usuario solo y necesita de esa persona. Termina cuando tienes una lista concreta de lo que el usuario tiene que poder hacer o decidir después.

3. **Escribe el cuestionario.** Redacta preguntas dirigidas al hueco de los pasos 1 y 2, con la estructura de abajo. Guárdalo como `to-questionnaire-<tema>.md` en la carpeta actual (o, si no trabajas con carpetas, como un archivo para descargar) y di dónde está. Termina cuando el archivo existe y cada cosa que el usuario pidió en el paso 2 tiene su pregunta.

## Estructura del documento

Plantéalo como un **cuestionario para descubrir**: al usuario le falta contexto y la otra persona lo tiene. Ordena las preguntas de la más importante a la menos, porque si es por escrito quizá solo te contesten una vez, y agrúpalas con títulos `##` por tema cuando haya más de unas pocas. Escríbelo con esta plantilla.

<plantilla-cuestionario>

# <Título del cuestionario>

**Para qué sirve:** por qué existe este cuestionario y qué decisión depende de él.

**De:** <el usuario>, **Para:** <la persona>, **Cómo usaremos sus respuestas:** <para qué>

## Contexto

Un párrafo para situar a alguien que no estaba en la cabeza del usuario. Lo justo para contestar bien, no una página.

## Cómo contestar

Plazo y cuánto le llevará más o menos. Las respuestas a medias y los «no lo sé» sirven: que marque lo que no tenga claro en vez de saltárselo.

## <Título del tema>

Una sección `##` por tema. Debajo de cada una, sus preguntas, de la más importante a la menos. Cada pregunta es una sola idea, nunca dos juntas, con un hueco para la respuesta justo debajo, y una línea de _por qué importa_ solo cuando la pregunta se pueda malinterpretar o invite a una respuesta de cualquier manera.

<ejemplo-pregunta>
### ¿Cuánto tarda la aprobación por escrito desde que entregamos los papeles?

_Por qué importa: tenemos un plazo para firmar la compra._

>
</ejemplo-pregunta>

## ¿Algo más?

Para cerrar: ¿hay algo que no hemos preguntado y que deberíamos saber?

</plantilla-cuestionario>
