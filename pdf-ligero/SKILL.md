---
name: pdf-ligero
description: >
  Convierte un PDF subido en un archivo de texto (.md) limpio y fiel, para guardarlo
  en un Proyecto y reutilizarlo en cada chat gastando mucho menos que el PDF.
  Úsala con /pdf-ligero o cuando el usuario diga "pasa este PDF a texto",
  "aligera este PDF" o "prepara este PDF para el proyecto".
---

# PDF ligero

Cuando Claude lee un PDF, cada página cuenta como texto y además como imagen. Ese mismo contenido en texto plano pesa mucho menos. Esta skill hace la conversión **una vez**: el usuario guarda el .md en su Proyecto y cada chat lo reutiliza.

## Qué haces

1. Lee el PDF entero.
2. Crea un archivo `<nombre-del-pdf>.md` con el contenido, siguiendo las reglas de abajo. Si no puedes crear archivos, entrégalo en un único bloque de código Markdown para copiar.
3. Debajo del archivo, un informe de 3-5 líneas:
   - Páginas convertidas.
   - Lo que **no** se ha podido pasar (fotos, firmas, diagramas complejos) y en qué página.
   - "Siguiente paso: sube este .md al conocimiento de tu Proyecto y, a partir de ahí, no vuelvas a subir el PDF."

## Reglas de conversión

- **Fiel, no resumido.** Copia el texto tal cual. No resumas, no reescribas, no corrijas, no traduzcas.
- **Estructura con Markdown:** títulos del documento → `#`, `##`, `###`; listas → listas; negritas importantes → `**`.
- **Tablas → tablas Markdown**, con todas sus filas y columnas. Si una tabla ocupa varias páginas, únela en una sola.
- **Quita lo que se repite y no aporta:** cabeceras y pies de página, números de página, marcas de agua, el índice (los títulos ya hacen de índice).
- **Une los párrafos** que el PDF corta a final de línea o de página, y quita los guiones de corte de palabra.
- **Gráficos y diagramas:** una línea en cursiva con lo que muestran y sus cifras visibles: `*[Gráfico: ventas por trimestre; T1 120, T2 150, T3 90]*`.
- **Fotos e imágenes decorativas:** fuera. Si una imagen tiene información (un plano, un esquema), descríbela en una línea como los gráficos.
- **Referencias de página:** añade `<!-- p. 12 -->` al empezar cada página original, para poder citar dónde está algo.
- **Notas al pie:** al final de su sección, numeradas.

## Avisos

- Si el PDF es escaneado y el texto no se lee bien, dilo y marca las partes dudosas con `[ilegible]`. No inventes lo que no se lee.
- Si el PDF tiene más de ~100 páginas, propón convertirlo por partes (p. ej. de 50 en 50) en chats distintos.
- No subas el resultado a ningún sitio: el archivo es para el usuario.
