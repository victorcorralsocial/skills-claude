# Skills de Claude en español

Skills que hago y pruebo para mis vídeos. Casi todas son un archivo de texto con instrucciones para Claude, sin código. La excepción es `mi-editor`, que trae unos scripts para escuchar y montar el vídeo en tu ordenador (puedes leerlos en su carpeta).


## Panel de vida: tu día en una página, hecho con Claude Code

No es una skill: es una página que hice con Claude Code para abrirla cada mañana. Agenda del día con los huecos libres y el tiempo, calendario (Google, Outlook o cualquiera con enlace iCal), lo que vence (seguro, ITV, IBI, DNI, garantías), dinero del mes con previsión, suscripciones, hábitos con rachas, salud, objetivos del año, la gente con la que quieres hablar y tus huchas. HTML, CSS y JavaScript normales: se abre con doble clic, sin instalar nada. Trae **datos de ejemplo**; los tuyos se los das a Claude Code.

| Proyecto | Descarga |
|---|---|
| **panel-de-vida** | [panel-de-vida.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v15/panel-de-vida.zip) |

### Cómo se usa
Descomprime el zip, abre la carpeta `panel-de-vida` en **Claude Code** (pestaña Code de la app de Claude para ordenador, plan Pro o superior) y dile: «Vamos a cambiar los datos de ejemplo por los míos. Pregúntame uno a uno». Para tu agenda: «actualiza el panel» (lee el `CLAUDE.md` de la carpeta).

## Detective: ¿esta tienda online es una estafa? (Claude y ChatGPT)

Una skill mía, en español, para quien compra en España. Le pasas el enlace de una tienda que no conoces y busca pruebas antes de que pagues: avisos de la OCU, INCIBE, la Guardia Civil y la prensa; edad del dominio (y si es de segunda mano); de quién es de verdad el CIF que enseña; precios frente a la web oficial; formas de pago; textos copiados de otras tiendas; sellos falsos y reseñas de fuera. **Nunca dice que una tienda es segura**: lo más alto es «No he encontrado señales de alarma», siempre con cómo pagar para no perder el dinero. Si ya has pagado, te dice qué hacer con tu banco.

Probada el 12-11-2026 en Claude y en ChatGPT con tiendas falsas denunciadas por la OCU, la Guardia Civil y Maldita (todas en rojo) y con tiendas legales (ninguna acusada).

Guía: https://claude.ai/artifact/EQPaon8rPujn5qeJaNVoZ6

| Skill | Descarga |
|---|---|
| **detective** | [detective.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v14/detective.zip) |

Toma ideas de método de is-website-safe (ClaudSkills) y de [scam-site-investigation](https://github.com/rickyananda/hermes-skills) (MIT), sin copiar su texto. Lleva un script de Python (`scripts/comprobar.py`, sin librerías de fuera) que comprueba el CIF y la edad del dominio con fuentes públicas.

### Cómo se instala
- **Claude** (web o app del ordenador): **Ajustes → Skills → Añadir → Subir una Skill** y elige el zip. Se usa con `/detective` y el enlace.
- **ChatGPT** (app del ordenador, modo Work): adjunta el zip y escribe `Mete esta skill en ~/.codex/skills/`. Se usa con `/detective` y el enlace.

## Enrutador: tres cerebros para que no se te funda el límite de Claude

Una skill mía, en español, para **Claude Code**. Escribes `/enrutador` y lo que necesitas, y Claude reparte el trabajo: lo mecánico y largo (resumir un PDF, traducir un documento) se lo pasa a ayudantes con **Haiku**, que cuesta unas 40 veces menos que Opus; los análisis extensos, a **Sonnet**; y las decisiones se las queda **Opus**, que además revisa lo que le traen. En la primera línea de la respuesta te dice qué modelo ha hecho cada cosa.

Probada el 9 y el 10-11-2026 con leyes del BOE (26 ejecuciones con y sin la skill, a precio de API): resumir, ~20 % menos; traducir, ~40 % menos; analizar, ~10 % menos. En preguntas cortas no ahorra nada: ahí contesta Opus directamente.

Guía con cómo instalarla, cuándo usarla y mis pruebas: https://claude.ai/artifact/RPkQZh1cmS2PuPTXDXxtWA

| Skill | Descarga |
|---|---|
| **enrutador** | [enrutador.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v13/enrutador.zip) |

La idea de delegar en ayudantes con otro modelo viene de [model-router](https://github.com/imskyleen/model-router) (MIT); el texto y las reglas son propios.

### Cómo se instala
Va en **Claude Code** (pestaña Code de la app de Claude para ordenador, o la terminal), con un plan de pago. Descomprime el zip y copia la carpeta `enrutador` en `~/.claude/skills/` (en Windows, `C:\Users\TU_USUARIO\.claude\skills\`). En una conversación nueva, escribe `/enrutador` y la tarea.

## Replica: clona la app que pagas cada mes (11 skills para Claude Code)

Once skills que trabajan como un equipo: una estudia la app, otra la planea, otra la diseña, otra la programa, otra la prueba, otra la compara con la original, otra lee lo que odian sus usuarios en reseñas reales, otra le pone nombre, otra le hace la web y la última te dice qué hace falta para publicarla. Las probé el 9-11-2026 rehaciendo lo principal de una app de dividir gastos: 34 minutos, 23 de 23 pruebas en verde y 105 reseñas leídas.

No son mías: son de [Jakeschincariol/replica-skill](https://github.com/Jakeschincariol/replica-skill) (MIT), sin cambios y con su `LICENSE` dentro de cada carpeta.

Guía con cómo instalarlas, qué pedirle a cada una y la prueba entera: https://claude.ai/artifact/Mx57pY1kBm9w1Rc6fm8uf9

| Skills | Descarga |
|---|---|
| **Las 11 juntas** (replica-recon, architect, design, build, backend, test, diff, entrepreneur, brand, launch y deploy) | [replica-11-skills.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v12/replica-11-skills.zip) |

### Cómo se instalan
Van en **Claude Code** (pestaña Code de la app de Claude para ordenador, o la terminal), con un plan de pago. Descomprime el zip y copia las 11 carpetas en `~/.claude/skills/` (en Windows, `C:\Users\TU_USUARIO\.claude\skills\`). En una conversación nueva, escribe `/replica` y te salen las 11.

## Buscar trabajo: tu IA te busca un trabajo mejor (Claude y ChatGPT)

Una skill mía, en español, que funciona en Claude y en ChatGPT. Le das tu CV, cuánto quieres cobrar y qué jornada, y busca ofertas reales (con el conector de Indeed, por internet o las que le pegues), les pone nota de 1 a 5 frente a tu CV, te dice a cuáles no apuntarte y por qué, te enseña el CV ideal de ese puesto y adapta el tuyo a la mejor oferta, sin inventarse nada, en un Word listo para enviar. Probada el 6-11-2026 en la app de Claude (Pro) y en la de ChatGPT (Plus, modo Work) con un CV inventado.

No se apunta a nada ni envía nada: decides tú. Lleva dos scripts de Python (sin librerías de fuera) para calcular la nota, hacer el panel y crear el Word; puedes leerlos en su carpeta.

| Skill | Descarga |
|---|---|
| **buscar-trabajo** | [buscar-trabajo.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v10/buscar-trabajo.zip) |
| CV inventado para probarla (Javi) | [cv-javi-inventado.pdf](https://github.com/victorcorralsocial/skills-claude/releases/download/v10/cv-javi-inventado.pdf) |

Toma ideas de método de [career-ops](https://github.com/career-ops-hq/career-ops) y [ResumeSkills](https://github.com/Paramchoudhary/ResumeSkills) (MIT), sin código ni texto copiados: ver `buscar-trabajo/CREDITOS.md`.

### Cómo se instala
- **Claude** (web o app del ordenador): **Ajustes → Skills → Añadir → Subir una Skill** y elige el zip. Se usa con `/buscar-trabajo`.
- **ChatGPT** (app del ordenador, modo Work): adjunta el zip y escribe `Mete esta skill en ~/.codex/skills/`. Se usa con `@Buscar Trabajo`.

## Mi Claude tiene diseñadores: logo, web y presentación

Tres skills de diseño que, en el mismo chat, hacen el logo de un negocio (con todos sus archivos), la web con ese logo y la presentación para el banco o un cliente, con los mismos colores. Probadas en la app de Claude (plan Pro) el 2-11-2026 con un negocio inventado: Doce Horas, la panadería de Marta.

No son mías: son de sus autores en GitHub, con licencia MIT. Los zip son los originales, sin cambios, con su `LICENSE` dentro (a `frontend-slides` le he añadido la de su repositorio, que no venía en el zip).

| Skill | Para qué | Autor | Descarga |
|---|---|---|---|
| **logo-design** | Tres propuestas con su idea, y el logo final con sus versiones, maquetas y guía de uso. | [kaankiziltug/logo-design-skill](https://github.com/kaankiziltug/logo-design-skill) | [logo-design.zip](https://github.com/kaankiziltug/logo-design-skill/releases/latest/download/logo-design.zip) (de su autor) |
| **design-taste-frontend** | Una web de una página con dirección de arte propia, sin plantilla. | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | [design-taste-frontend.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v7/design-taste-frontend.zip) |
| **frontend-slides** | Presentaciones en HTML con animaciones, con tu logo y tus colores. | [zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides) | [frontend-slides.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v7/frontend-slides.zip) |

Guía con los tres mensajes de la prueba y buenas prácticas: https://claude.ai/artifact/QRv96nKpYCPEedD26tLxKv

### Cómo se instalan
1. Descarga los tres `.zip` (no los descomprimas).
2. En Claude (web o app del ordenador): **Ajustes → Skills → Añadir → Subir una Skill**.
3. Elige los tres a la vez y súbelos.
4. Empieza el mensaje con `/logo-design`, `/design-taste-frontend` o `/frontend-slides`. En el mismo chat y en ese orden, cada una usa lo que hizo la anterior.

## Mi Claude tiene gestoría propia: 9 skills para autónomos en España

El paquete «Small Business» de Anthropic (44 skills para pequeños negocios de EE. UU.) reducido a las 9 que le sirven a un autónomo o una pyme en España y adaptado a sus impuestos: IVA, IRPF, cuota de autónomos y modelos 303 y 130. Cada skill lleva 3 fichas con 101 reglas en total, cada una con su cita literal y su enlace oficial (BOE, Agencia Tributaria y Seguridad Social), comprobadas el 27-10-2026. Funcionan con PDF, Excel o fotos, sin conectar nada.

**No es asesoramiento fiscal ni sustituye a tu gestor.** Sirve para llegar a él con todo ordenado y revisado. No presentan, no pagan ni envían nada: preparan borradores.

| Skill | Para qué | Descarga |
|---|---|---|
| **trimestre** | Con tus facturas, tickets y cuentas calcula el 303 (IVA) y el 130 (IRPF), señala cada error con su norma y deja el borrador con las casillas. | [trimestre.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v6/trimestre.zip) |
| **cobrar-facturas** | «¿Quién me debe dinero?»: un mensaje para cada cliente con su tono, el interés de demora y los 40 € por costes de cobro. | [cobrar-facturas.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v6/cobrar-facturas.zip) |
| **caja** | «¿Llego a fin de mes?»: previsión a 30, 60 y 90 días, separando lo que es de Hacienda. | [caja.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v6/caja.zip) |
| **revisar-facturas** | Revisa cada factura o ticket: datos obligatorios, IVA y retención, y si desgrava en el IRPF y en el IVA. | [revisar-facturas.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v6/revisar-facturas.zip) |
| **calendario-fiscal** | Qué presentar y pagar, y cuándo (303, 130, 111, 115, 349, 390, 347, renta, cuota), por urgencia. | [calendario-fiscal.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v6/calendario-fiscal.zip) |
| **presupuesto** | Presupuestos con el IVA y la retención bien puestos y condiciones claras para cobrar. | [presupuesto.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v6/presupuesto.zip) |
| **resenas** | Responde reseñas, también las malas, sin revelar datos del cliente y sin saltarte la ley. | [resenas.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v6/resenas.zip) |
| **redes-negocio** | Las 3-5 publicaciones de la semana para las redes del negocio. | [redes-negocio.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v6/redes-negocio.zip) |
| **resumen-lunes** | Una página para empezar la semana: dinero, cobros, pagos, plazos y lo primero que haría. | [resumen-lunes.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v6/resumen-lunes.zip) |

Las 9 de una vez: [las-9-skills.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v6/las-9-skills.zip) (este sí hay que descomprimirlo: dentro están los 9 `.zip`). Para probarlas, las cuentas inventadas del vídeo: [prueba-trimestre.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v6/prueba-trimestre.zip) (16 archivos con errores metidos a propósito) y [facturas-y-cobros-2026.xlsx](https://github.com/victorcorralsocial/skills-claude/releases/download/v6/facturas-y-cobros-2026.xlsx).

Guía con todo el paso a paso: https://claude.ai/artifact/VH8KJ4F97bGxgfUBsEmUEm

### Cómo se instalan
1. Descarga los `.zip` de la tabla (no los descomprimas).
2. En Claude (web o app del ordenador): **Ajustes → Skills → Añadir → Subir una Skill**.
3. Elige los que quieras a la vez y súbelos.
4. Pásale a Claude tus facturas o tu duda («¿cuánto me sale el trimestre?», «¿quién me debe dinero?»): elige solo la skill que toca. También puedes llamarla con `/trimestre`, `/cobrar-facturas`…

### Ojo
- Las normas cambian cada año (cuota de autónomos, interés de demora, plazos): las fichas están comprobadas a 27-10-2026. Lo que estaba pendiente ese día (IVA del alquiler turístico corto y regularización de la cuota, por reales decretos-ley sin convalidar, y la tarifa plana de 2026) va como duda.
- No cubren módulos ni recargo de equivalencia (solo lo básico), Canarias, Ceuta, Melilla, País Vasco ni Navarra, sociedades ni nóminas.
- Créditos: obra derivada del plugin [Small Business de Anthropic](https://github.com/anthropics/knowledge-work-plugins/tree/main/small-business) (Apache 2.0), traducida y modificada. No es un producto de Anthropic ni está respaldada por Anthropic. Su licencia y su aviso van dentro de cada carpeta.

## Find Skills: la skill que te busca skills (Claude y ChatGPT)

La skill más instalada de [skills.sh](https://skills.sh/), con 4 millones de instalaciones. Le dices qué quieres hacer y te busca la mejor skill para eso: qué hace, quién la ha hecho, cuántas instalaciones tiene y cómo se instala. Si no hay ninguna de fiar, te lo dice.

No es mía: es de Vercel ([vercel-labs/skills](https://github.com/vercel-labs/skills/tree/main/skills/find-skills), licencia MIT). El zip es el original, sin cambios, con su `LICENSE` dentro.

| Skill | Para qué | Descarga |
|---|---|---|
| **find-skills** | Busca en skills.sh la mejor skill para lo que quieres hacer y mira si es de fiar (instalaciones, autor y estrellas en GitHub). Va en Claude y en ChatGPT. | [find-skills.zip](https://github.com/victorcorralsocial/skills-claude/releases/download/v5/find-skills.zip) |

Guía con todo el paso a paso: https://claude.ai/artifact/CfusRQT6fm4dwem7teFSAZ

### Cómo se instala
- **Claude** (web o app del ordenador): **Ajustes → Skills → Añadir → Subir una Skill** y subes el zip sin descomprimirlo. Se usa con `/find-skills`.
- **ChatGPT** (probado con Plus, app del ordenador, modo Work): en Complementos da error. Adjunta el zip en un chat y escribe «@Skill Creator crea una skill que sea una réplica exacta de find-skills». Se usa con `@Find Skills`.

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
