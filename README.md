# Skills de Claude en español

Skills que hago y pruebo para mis vídeos. Cada una es un archivo de texto con instrucciones para Claude: sin código, sin conexiones a ningún sitio.

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
