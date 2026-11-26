---
name: enrutador
description: "Gasta la mitad de límite en Codex: el modelo principal hace de jefe (decide, comprueba y contesta) y el trabajo pesado se lo encarga a una ayudante con GPT-6 Luna, unas 20 veces más barata que Sol (leer o resumir documentos largos, sacar lo importante para un análisis, datos o tablas, traducir, programar o arreglar algo con lo que pide el usuario). Si Luna se atasca, sube a GPT-6.1 Terra y, si hace falta, lo termina el jefe. Lo corto lo hace el jefe solo. Úsala cuando el usuario escriba $enrutador o pida gastar menos límite."
---

# Enrutador: el jefe, la becaria y el refuerzo

**La regla que manda:** en Codex, **cada paso que das tú vuelve a leer toda la conversación**, y se paga a tu precio. Tarifa oficial (créditos por millón de tokens, entrada/salida): **Sol 50/250 · Terra 25/125 · Luna 2,5/12,5.** Así que el ahorro sale de dos cosas: que el trabajo lo haga **el modelo más barato que lo hace bien** y que **tú des los mínimos pasos posibles** (lo normal: 4).

Los tres niveles:
- 🟢 **Luna, la becaria** (`model: "gpt-6-luna"`, `reasoning_effort: "high"`): hace casi todo el trabajo. En las pruebas resumió una ley de 30.000 palabras, programó una app y arregló una calculadora de hipoteca con 4 fallos, igual de bien que Sol y unas 15 veces más barato.
- 🟡 **Terra, el refuerzo** (`model: "gpt-6.1-terra"`, `reasoning_effort: "medium"`): solo si el trabajo de Luna **no pasa la comprobación** dos veces. Cuesta 10 veces lo que Luna y la mitad que Sol.
- 🔵 **Tú, el jefe:** decides, encargas, compruebas y contestas. Haces tú el trabajo solo si es corto, si es difícil con poco material o si Terra tampoco lo saca.

**Si no eres el modelo caro** (tu modelo es Luna o Terra), no lances ayudantes: haz el trabajo tú y empieza con la línea 🧠. Si `gpt-6-luna` no está disponible en esta cuenta, usa `gpt-5.6-luna`; si tampoco, hazlo tú.

## Paso 1 · Decide y encarga a la vez, sin abrir el material

Con lo que dice el mensaje (y, solo si no sabes el tamaño, un `wc -w` o `ls` en el mismo paso), elige un camino. **No abras el material:** leerlo ya es pagarlo a tu precio.

- **🟢 Luna lo hace entero:** leer o resumir algo largo, sacar puntos, fichas o tablas, traducir, revisar contra una lista, **programar o arreglar algo** cuando está claro lo que se pide (una app, un script, unos fallos descritos), con sus pruebas.
- **🟢 Luna lee y 🔵 tú piensas:** un análisis, un consejo o una decisión sobre mucho material. Luna lo lee entero y te trae **solo lo que importa para esa pregunta** (artículos, cifras o frases clave con su referencia, en 15-25 líneas); **tú haces el análisis sobre ese extracto**, sin abrir el material.
- **🔵 Tú, sin ayudante:** algo corto (una pregunta, un cambio pequeño, menos de ~3.000 palabras que leer) o difícil con poco material (decidir entre opciones, un plan con matices). La skill solo añade la línea 🧠.

Si toca ayudante, **lánzalo en este mismo paso** (`spawn_agent`, sin pasarle la conversación entera: `fork_turns` "none"). El encargo, completo, porque no vas a corregirlo:
- El objetivo en una frase y **las rutas completas** de los archivos («lee cada archivo entero»).
- **Lo que tiene que entregar, ya terminado:** la respuesta final para el usuario (con su formato y su largo), el extracto para tu análisis, o el archivo hecho y probado.
- **Para código:** «escríbelo, ejecuta su prueba y no termines hasta que pase. Deja la prueba en un archivo de la carpeta». **Si es una web:** «la prueba tiene que abrir la página entera como un navegador (Chrome sin ventana o el navegador de Codex), usar el botón principal y fallar si sale cualquier error en la consola; probar solo los cálculos no vale».
- **Para un resumen o un extracto:** «al final, 3 trozos de 4-6 palabras copiados tal cual del original, cada uno de una sola línea del archivo».
- «No busques en internet salvo que haga falta para la tarea. Si algo no está o dudas, dilo; no inventes.»
- Que te devuelva **solo** eso. Nada de texto de más.

## Paso 2 · Espera una sola vez

Un solo `wait_agent` con un tiempo largo (`timeout_ms` de 1.800.000). **No preguntes a cada rato** ni hagas nada mientras: cada consulta es un paso tuyo más.

## Paso 3 · Comprueba en UN solo paso

**Un único comando**, y después contestas. Cada comando es un paso tuyo, y cada paso relee toda la conversación a tu precio.
- **Un resumen o un extracto:** `rg -c -F` de los 3 trozos en el original, juntos. Si aparecen al menos 2, vale. Si alguno no sale, suele ser un salto de línea: **no es motivo para repetir nada ni para leer el documento**.
- **Código:** que el archivo exista y que su prueba pase (ejecútala una vez). En una web, que esa prueba abra la página de verdad.
- **Sumas o totales:** recalcúlalos con una línea de script.

**Si falla de verdad** (la prueba da error, el archivo no existe o no aparece ningún trozo), sube un nivel:
1. Pídele a **Luna** que lo arregle, con el error exacto (`followup_task`, una espera y una comprobación).
2. Si vuelve a fallar, lanza a **Terra** con el mismo encargo, el error y lo que ya hay hecho.
3. Si Terra tampoco, termínalo tú.

## Paso 4 · Contesta

Primera línea, siempre, diciendo quién hizo qué:

> 🧠 🟢 Luna leyó la ley entera · 🔵 Sol comprobó y contesta

> 🧠 🟢 Luna programó y probó la app · 🔵 Sol hizo el encargo y lo comprobó

> 🧠 🟢 Luna leyó la ley y sacó lo clave · 🔵 Sol hizo el análisis

> 🧠 🟢 Luna se atascó · 🟡 Terra lo arregló · 🔵 Sol comprobó

> 🧠 🔵 Sol · lo resuelvo yo, es corto

Después, la respuesta del ayudante tal cual (sin los trozos de comprobación), tu análisis, o la ruta del archivo y cómo se ha comprobado. **No la reescribas ni la amplíes:** eso es otro paso caro. Siempre en el idioma del usuario. No digas cuánto se ha ahorrado: no lo sabes. Se ve en Ajustes → Uso.

---
Hecha por Víctor Corral (github.com/victorcorralsocial/skills-claude). Versión para Codex de su skill /enrutador para Claude Code, medida con pruebas reales.
