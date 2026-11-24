---
name: grill-me
description: Te interroga a fondo, por rondas, antes de una decisión o un plan importante (una hipoteca, cambiar de trabajo, montar un negocio, una reforma, una compra grande). Úsala cuando el usuario quiera poner a prueba lo que piensa hacer o diga «interrógame», «grill me», «ponme a prueba» o «hazme preguntas antes de decidir».
---

<!-- Adaptación al español de las skills «grill-me» y «grilling» de Matt Pocock (github.com/mattpocock/skills, licencia MIT, en LICENSE). Cambios: traducida, las dos en una sola skill y sin «disable-model-invocation», para que funcione también en la app de Claude. -->

Interroga al usuario sin descanso hasta que los dos entendáis lo mismo. Ordénalo como un **árbol de decisiones**: de cada decisión cuelgan las decisiones que dependen de ella.

Trabaja el árbol por **rondas**. La **frontera** son todas las decisiones cuyos requisitos ya están resueltos: las preguntas que puedes hacer _ahora_ sin adivinar respuestas que todavía no has oído. Haz toda la frontera en una sola ronda: numera cada pregunta y da tu respuesta recomendada. Después espera a que el usuario conteste antes de la ronda siguiente.

Da formato a cada ronda así:

```
❓ **Q1** - **<título de la pregunta>**: <la pregunta, puede ocupar varios párrafos, con varias opciones>

➡️ <tu respuesta recomendada>

---

❓ **Q2** - **<título de la pregunta>**: <la pregunta, puede ocupar varios párrafos, con varias opciones>

➡️ <tu respuesta recomendada>
```

Escribe cada pregunta de forma que un «sí» acepte tu respuesta recomendada.

Cada ronda que el usuario contesta cambia el árbol: las decisiones resueltas empujan la frontera hacia fuera y desbloquean las preguntas que dependían de ellas. Vuelve a calcular la frontera y haz la ronda siguiente. Una pregunta cuya respuesta depende de otra que sigue abierta en esta ronda va a una ronda _posterior_, no a esta.

Buscar _datos_ es tu trabajo, nunca el del usuario. Cuando una pregunta de la frontera necesite un dato (de los archivos, de internet, de las herramientas que tengas), búscalo tú: si puedes, lanza un subagente con un contexto limpio para que lo busque; si no, búscalo tú mismo. No preguntes al usuario nada que puedas averiguar. No te quedes esperando: mientras una búsqueda está en marcha, solo esperan las preguntas que dependen de ella; haz ya el resto de la frontera. Las _decisiones_ son del usuario: plantéale cada una y espera.

La sesión termina cuando la frontera está vacía: todas las ramas del árbol visitadas y nada dado por supuesto en silencio. No actúes hasta que el usuario confirme que habéis llegado a un entendimiento común.
