---
name: enrutador
description: "Tres cerebros: reparte cada tarea entre Haiku, Sonnet y Opus para gastar menos límite sin perder calidad. Lo mecánico y voluminoso (resumir, sacar fichas o tablas, traducir documentos largos) lo hace un ayudante con Haiku, que cuesta unas 40 veces menos que Opus; analizar mucho material con criterio (un análisis o un informe extenso), un ayudante con Sonnet, la mitad que Opus; lo difícil (decidir, planificar, aconsejar), Opus; lo corto, el modelo actual sin ayudantes. Se usa escribiendo /enrutador seguido de la tarea (en Claude Code)."
disable-model-invocation: true
---

# Enrutador: tres cerebros

Objetivo: **la misma respuesta, gastando menos límite.** El límite se va en lo que el modelo lee y escribe, y no todos cuestan igual (precio de API por millón de tokens, de entrada/salida): **Opus 4/20 $, Sonnet 2/10 $, Haiku 0,10/0,50 $.** Haiku es ~40 veces más barato que Opus; Sonnet, la mitad. **Cada trabajo, al modelo más barato que lo hace bien:** lo mecánico a Haiku, el criterio sobre mucho material a Sonnet, las decisiones a Opus.

## 1. Decide en tu primer paso, sin leer el material

Eres el cerebro principal (mira en tus instrucciones qué modelo eres). Colores: 🟢 Haiku · 🟡 Sonnet · 🔴 Opus. Con lo que dice el mensaje y, si hace falta, un solo `wc -w` de los archivos, elige un camino **en este orden** (el primero que encaje). **No abras el material para decidir:** leerlo ya es pagarlo a tu precio.

**1.º ¿Hay mucho material que leer entero?** Más de ~5.000 palabras, y la respuesta **no** sale buscando unas líneas. Analizar, valorar, resumir o traducir algo entero nunca se resuelve buscando: hay que leerlo todo. Entonces se reparte la lectura, aunque luego haya que decidir o aconsejar:
- **Mecánico** (resumir, sacar fichas o tablas, traducir, revisar punto por punto contra una lista) → camino **B** (Haiku).
- **Con criterio** (un análisis extenso, valorar riesgos o puntos débiles, un informe a partir de varios documentos, redactar algo largo que tiene que quedar bien) → camino **S** (Sonnet). Si eres Sonnet, eso lo haces tú (camino A).
- **Si además hay que decidir o aconsejar**, el ayudante te trae el extracto o el análisis y **tú** decides o aconsejas sobre él.

**2.º ¿Es difícil, con poco material?** Decidir, elegir entre opciones, planificar, aconsejar con matices, un problema complicado.
- Si eres Opus → camino **A**.
- Si eres Sonnet o Haiku → camino **C**, aunque sea corto.

**3.º Todo lo demás** → camino **A**: poco material, o la respuesta sale **buscando** (Grep) y leyendo solo las líneas encontradas ("¿qué contrato habla de X?", "¿dónde pone Y?"). Busca con varias palabras y sinónimos ("penaliz", "cancel", "antes de", "resolu").

**A. Lo haces tú, sin ayudante.** Exactamente como lo harías sin esta skill: sin comprobaciones extra, sin pasos de más. La skill solo añade la línea 🧠.

**B. Ayudante Haiku** 🟢, con los pasos 2 y 3.

**S. Ayudante Sonnet** 🟡, con los pasos 2 y 3: lee el material entero y te devuelve el análisis hecho; tú lo revisas, lo completas si hace falta y contestas.

**C. Ayudante Opus** 🔴: le pasas la tarea entera (y las rutas, si hay archivos) y le pides la respuesta final completa. Ahí no se ahorra: se gana calidad. Dilo en la línea 🧠.

En la duda entre B y S, B: si el trabajo es sacar o resumir lo que pone, aunque sea mucho, es de Haiku.

## 2. El encargo al ayudante (en un solo paso)

Herramienta de agentes (Agent o Task), tipo `general-purpose`, con **`model: "haiku"` y `effort: "low"`** (en S, `model: "sonnet"` y `effort: "medium"`; en C, `model: "opus"` sin `effort`). Esta skill pide esos esfuerzos a propósito: con el razonamiento por defecto, Haiku piensa decenas de miles de tokens para un resumen. Sin `model`, el ayudante usa tu modelo y no ahorra nada.

- **Trozos de ≤ 15.000 palabras por ayudante Haiku:** el ayudante arrastra ~22.000 tokens de instrucciones propias y, por encima de ~100.000 tokens, Haiku cuesta 5 veces más. Sonnet no tiene ese salto: un solo ayudante Sonnet puede leer hasta ~60.000 palabras (si el análisis necesita verlo todo junto, mejor uno que varios). Si hay más material, varios ayudantes **en paralelo, en el mismo paso**, cada uno con su parte (un archivo, o un rango de líneas: "de la línea 1 a la 1400").
- El encargo se entiende solo: objetivo en una frase, **rutas absolutas**, "lee cada archivo entero, no busques solo palabras".
- **Qué devuelve y cuánto, como mucho:** por ejemplo, "una línea por punto: artículo y lo que dice, máx. 25 líneas". Nunca el texto entero.
- **Si el resultado es largo** (una traducción, una tabla de 40 filas), que lo **escriba en un archivo** y te devuelva solo la ruta, cuántas líneas o filas y los totales. Tú no lo relees entero.
- "Si no lo encuentras o dudas, dilo. No inventes." y, si decides tú, "no recomiendes: solo informa".

## 3. Comprueba en un solo paso (solo en B y S)

Cada paso tuyo relee toda la conversación a tu precio: **un solo paso, como mucho 3 comprobaciones lanzadas a la vez**, solo de lo que sostiene tu respuesta:
- **Las 2-3 citas o datos decisivos:** Grep de la frase exacta en el original.
- **Un archivo escrito:** `wc -l -w` y que exista; un vistazo con `head` si hace falta.
- **Sumas y totales:** recalcúlalos con un script.

Si algo no cuadra, rehaz esa parte tú. No releas todo el material: eso es justo lo que se quería ahorrar.

## 4. Contesta

Primera línea, siempre:

> 🧠 🟢 Haiku leyó la ley entera · 🔴 Opus comprobó y contesta

> 🧠 🟡 Sonnet analizó los 3 informes · 🔴 Opus revisó y contesta

> 🧠 🔴 Opus · lo resuelvo buscando, sin ayudantes

Siempre en el idioma del usuario, aunque el material o el resultado estén en otro. Después, la respuesta, igual de completa que sin el enrutador. No digas cuánto se ha ahorrado: no lo sabes. Se ve en Ajustes → Uso.

## Si no hay ayudantes (la app de chat)

En claude.ai y en la app de escritorio fuera de Claude Code no hay herramienta de agentes. Clasifica igual, sin leer el material. Si toca 🟢 Haiku y hay mucho material, dilo **antes de hacer nada**: "🧠 Esto es de 🟢 Haiku: cámbialo en el selector de modelo y vuelve a mandar el mensaje. Si prefieres que lo haga yo, dime «sigue»." Si no, hazlo tú, empezando por la línea 🧠.

---
Hecha por Víctor Corral (github.com/victorcorralsocial/skills-claude). La idea de delegar en ayudantes con otro modelo viene de model-router (github.com/imskyleen/model-router, MIT); el texto y las reglas son propios, probados con 26+ ejecuciones medidas.
