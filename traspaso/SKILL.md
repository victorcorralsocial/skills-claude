---
name: traspaso
description: >
  Resume la conversación actual en un bloque corto para seguir en un chat nuevo
  sin perder nada (objetivo, lo decidido, datos clave, trabajo en curso y siguiente
  paso). Úsala con /traspaso o cuando el usuario diga "pásalo a un chat nuevo",
  "resume para seguir en otro chat", "este chat es muy largo" o "traspaso".
---

# Traspaso

Un chat largo gasta más en cada mensaje, porque Claude vuelve a leer la conversación entera cada vez. Esta skill resume el chat en un bloque que el usuario pega en un chat nuevo para seguir donde lo dejó, gastando mucho menos.

## Qué haces

1. Repasa **toda** la conversación, no solo los últimos mensajes.
2. Escribe el bloque de traspaso con la plantilla de abajo, **en el idioma del usuario**.
3. Después del bloque, una sola línea: "Copia el bloque, abre un chat nuevo y pégalo."

No añadas nada más: ni introducción, ni resumen del resumen, ni preguntas.

## Plantilla

```
TRASPASO DE CHAT — pega esto en un chat nuevo y continúa.

🎯 Objetivo
<Qué estamos haciendo y para qué, en 1-2 frases.>

✅ Ya decidido
- <Cada decisión tomada, una por línea. Incluye lo que se descartó y por qué, si importa.>

📌 Datos clave
- <Nombres, cifras, fechas, enlaces, nombres de archivos y preferencias del usuario (tono, formato, idioma, lo que no le gusta).>

📝 Trabajo en curso
<La última versión del texto, código, tabla o lista en la que se estaba trabajando, COPIADA TAL CUAL, sin resumir. Si no hay nada en curso, pon "Nada".>

⏭️ Siguiente paso
<Lo que tocaba hacer justo ahora.>

Instrucción para Claude: continúa desde el siguiente paso. No repitas este resumen ni vuelvas a preguntar lo que ya está decidido.
```

## Reglas

- **Corto pero completo.** El objetivo es que el chat nuevo no tenga que preguntar nada que ya se sabía. Si un dato sería necesario para seguir, va; si no, fuera.
- **El trabajo en curso nunca se resume:** se copia literal (es lo único largo del bloque). Si son varias versiones, solo la última.
- **No inventes.** Solo lo que se dijo en el chat. Si algo quedó sin decidir, ponlo en "Siguiente paso" como pregunta abierta.
- **Archivos subidos:** no los copies. Escribe su nombre y añade al final: "Vuelve a subir: <nombres>" (o, si están en un Proyecto, "Están en el Proyecto").
- **Datos sensibles** (contraseñas, números de cuenta, documentos de identidad): no los copies; escribe "[dato sensible: vuelve a ponerlo si hace falta]".
- Si la conversación es corta (menos de ~10 mensajes), dilo en una línea: todavía no compensa cambiar de chat. Haz el bloque igualmente si el usuario insiste.
