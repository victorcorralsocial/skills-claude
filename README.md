# Skills de Claude en español

Skills que hago y pruebo para mis vídeos. Casi todas son un archivo de texto con instrucciones para Claude, sin código. La excepción es `mi-editor`, que trae unos scripts para escuchar y montar el vídeo en tu ordenador (puedes leerlos en su carpeta).

## Mi editor: edita tus vídeos con Claude

Le pasas un vídeo tuyo hablando a cámara y Claude Code te lo devuelve montado para TikTok, Reels o Shorts: quita silencios, frases repetidas y tomas en falso, pone subtítulos palabra a palabra, zooms, el rótulo del gancho y carteles, todo dentro de las zonas seguras y **con tu estilo** (te lo pregunta la primera vez). Luego le pides cambios con el minuto: «en el 0:12 quita esa frase». Usa [Whisper](https://github.com/ggml-org/whisper.cpp) y [Remotion](https://www.remotion.dev); tu vídeo no se sube a ningún sitio.

| Skill | Para qué | Descarga |
|---|---|---|
| **/editar** | Edita tus vídeos verticales en tu ordenador, con tu estilo. Necesita **Claude Code** (plan Pro de Claude o superior); probado en Mac. | [mi-editor.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v4/mi-editor.zip) |

Guía con todo el paso a paso: https://claude.ai/artifact/HMKpR8mkUWcdHxuj61Vmfe

### Cómo se instala y se usa
1. Instala Claude Code: en la Terminal, `curl -fsSL https://claude.ai/install.sh | bash`, y luego escribe `claude`.
2. Descarga `mi-editor.zip`, arrástralo a Claude Code y escribe **«instala este editor»**.
3. Escribe `/editar` y arrastra tu vídeo. La primera vez te pregunta tu estilo y descarga Whisper (unos 1,5 GB).
4. Te deja `tu-video-editado.mp4` junto a tu vídeo. Pídele los cambios que quieras.

> Este no se sube en **Ajustes → Skills** de claude.ai: es para Claude Code, que es el que puede ejecutar Whisper y Remotion en tu ordenador.

Remotion es gratis para particulares y empresas de hasta 3 personas; las más grandes necesitan [su licencia](https://www.remotion.pro/license).

## Tu libro en una app: libro-a-app

Le das a Claude el título del libro que te estás leyendo (sobre todo de desarrollo personal) y te monta una app para aplicarlo cada día: una acción pequeña con racha, las ideas clave con su mapa, la herramienta del autor, tus hábitos, un diario o un chat con el libro. **No hace falta subir el libro:** Claude investiga lo que cuenta el autor, resúmenes y lectores, y solo se queda con lo que confirman al menos dos fuentes.

| Skill | Para qué | Descarga |
|---|---|---|
| **/libro-a-app** | Convierte un libro en tu app para aplicarlo cada día (probada con *Hábitos atómicos* y *Los 7 hábitos*). | [libro-a-app.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v3/libro-a-app.zip) |

Guía con todo el paso a paso: https://claude.ai/artifact/TF8F9VJ25bzDuGsmJenKGZ

### Cómo se instala y se usa
1. Descarga `libro-a-app.zip` (no lo descomprimas).
2. En Claude (web o app del ordenador): **Ajustes → Skills → Añadir → Subir una Skill**.
3. Escribe `/libro-a-app` y el título, por ejemplo `/libro-a-app Hábitos atómicos`, y contesta las dos preguntas.
4. **Publica la app** para que guarde tu progreso y la tengas en el móvil (guardar el progreso necesita un plan de pago de Claude).

Los iconos de la app son trazos de [Lucide](https://lucide.dev) (ISC; algunos de Feather, MIT). Sus licencias van en `NOTICE`, dentro de la carpeta.

## Mi Claude ya tiene abogado: 9 skills legales con la ley española

El paquete «Legal» de Anthropic, pensado para abogados de empresas de EE. UU., adaptado a España y la UE para particulares, autónomos y pymes. Cada skill lleva 4 fichas con 129 reglas en total, cada una con su cita literal y su enlace oficial (BOE, EUR-Lex y AEPD), comprobadas el 23-10-2026.

**No es asesoramiento jurídico ni sustituye a un abogado.** Sirve para entender un documento y saber qué preguntar antes de firmar.

| Skill | Para qué | Descarga |
|---|---|---|
| **revisar-contrato** | Revisa un contrato (de trabajo, de alquiler, con una empresa o con un cliente) cláusula a cláusula, con semáforo, el artículo de cada cosa y propuestas para negociar. | [revisar-contrato.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v2/revisar-contrato.zip) |
| **revisar-nda** | Criba rápida de un acuerdo de confidencialidad: si se puede firmar, qué retocar o qué no firmar. | [revisar-nda.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v2/revisar-nda.zip) |
| **riesgo-legal** | «¿Qué me juego si…?»: gravedad, probabilidad y cuándo hace falta un abogado. | [riesgo-legal.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v2/riesgo-legal.zip) |
| **cumplimiento-normativo** | Si tu web, tu newsletter o tu uso de la IA cumple el RGPD, la LSSI, las cookies, consumidores y el Reglamento de IA. | [cumplimiento-normativo.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v2/cumplimiento-normativo.zip) |
| **respuesta-legal** | Escritos: reclamar a una empresa, pedir la fianza, reclamar un impago, ejercer tus derechos de datos. | [respuesta-legal.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v2/respuesta-legal.zip) |
| **revisar-proveedor** | Qué tienes firmado con un proveedor y qué te falta (contrato de encargado, datos fuera del EEE…). | [revisar-proveedor.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v2/revisar-proveedor.zip) |
| **resumen-legal** | Te explica en claro un documento, una carta o un tema legal, con la fuente oficial y los plazos. | [resumen-legal.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v2/resumen-legal.zip) |
| **preparar-reunion** | Dosier para negociar con la empresa, un cliente o el casero, o para aprovechar la consulta con un abogado. | [preparar-reunion.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v2/preparar-reunion.zip) |
| **antes-de-firmar** | Último repaso antes de firmar y qué firma electrónica vale. | [antes-de-firmar.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v2/antes-de-firmar.zip) |

Las 9 de una vez: [las-9-skills.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v2/las-9-skills.zip) (este sí hay que descomprimirlo: dentro están los 9 `.zip`). Para probarlas: [contrato de trabajo de ejemplo](https://github.com/victorcorralsocial/skills-claude/releases/download/v2/contrato-trabajo-ejemplo.pdf) (inventado, con trampas).

### Cómo se instalan
1. Descarga los `.zip` de la tabla (no los descomprimas).
2. En Claude (web o app del ordenador): **Ajustes → Skills → Añadir → Subir una Skill**.
3. Elige los que quieras a la vez y súbelos.
4. Pásale a Claude tu contrato o tu duda («¿puedo firmar esto?», «escríbeme una reclamación…»): elige solo la skill que toca. También puedes llamarla con `/revisar-contrato`, `/riesgo-legal`…

### Ojo
- Las leyes cambian: las fichas están comprobadas a 23-10-2026. La parte de alquiler depende de dos reales decretos-ley de 2026 pendientes de convalidar (plazo hasta principios de noviembre de 2026).
- No cubren convenios colectivos concretos, derecho propio de las comunidades autónomas, jurisprudencia, impuestos ni derecho penal.
- Créditos: obra derivada del plugin [Legal de Anthropic](https://github.com/anthropics/knowledge-work-plugins/tree/main/legal) (Apache 2.0), traducida y modificada. No es un producto de Anthropic ni está respaldada por Anthropic. Su licencia y su aviso van dentro de cada carpeta.

## Que te dure Claude: 3 skills para gastar menos límite

| Skill | Para qué | Descarga |
|---|---|---|
| **/traspaso** | Resume un chat largo en un bloque para seguir en un chat nuevo sin perder nada. | [traspaso.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v1/traspaso.zip) |
| **/pdf-ligero** | Convierte un PDF en un texto (.md) limpio y fiel para guardarlo en un Proyecto y no volver a subir el PDF. | [pdf-ligero.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v1/pdf-ligero.zip) |
| **/cavernicola** | Claude contesta con lo justo: sin saludos, sin relleno, con todos los datos. | [cavernicola.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v1/cavernicola.zip) |

### Cómo se instalan
1. Descarga los tres `.zip` de la tabla (no los descomprimas).
2. En Claude (web o app del ordenador): **Ajustes → Skills → Añadir → Subir una Skill**.
3. Elige los tres a la vez y pulsa **Subir 3 Skills**.
4. Escribe `/traspaso`, `/pdf-ligero` o `/cavernicola` en cualquier chat.

Si no te aparece "Skills", activa la ejecución de código en **Ajustes → Capacidades**.

> No uses el botón verde "Code → Download ZIP" de esta página: descarga el repositorio entero y Claude no lo acepta como skill. Usa los enlaces de la tabla.

### Créditos
`/cavernicola` está basada en la skill `ultracave` de Julius Brussee ([caveman](https://github.com/JuliusBrussee/caveman), licencia Apache 2.0), traducida al español y ajustada. Su licencia y su aviso van dentro de su carpeta.

— Víctor
