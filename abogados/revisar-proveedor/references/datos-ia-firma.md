# Ficha de hechos verificados: protección de datos, IA y firma (España y UE)

Comprobado el **23-10-2026**. Textos leídos directamente de la fuente oficial:
- **UE:** textos de la Oficina de Publicaciones (Cellar, mismo contenido que EUR-Lex; EUR-Lex bloquea la descarga automática). RGPD en su **versión consolidada 04.05.2016** (incluye las rectificaciones de 2018 y 2021; no hay ninguna modificación posterior). Reglamento de IA en su **texto original** + el **Reglamento (UE) 2026/1744** que lo modifica. eIDAS en su **versión consolidada 18.10.2024** (ya con la reforma 2024/1183). Vigencia y modificaciones comprobadas en los metadatos oficiales de la Oficina de Publicaciones (consulta SPARQL del 23-10-2026).
- **España:** texto consolidado del BOE (aviso del propio BOE: *"Este texto consolidado es de carácter informativo y no tiene valor jurídico"*; el que vale es el del BOE diario). Última actualización: LOPDGDD 27/12/2025, LSSI 23/01/2025, Ley 6/2020 09/05/2023, Código Civil 03/01/2025 y LEC 07/10/2026. Son las fechas de la **última norma modificadora publicada** que da el BOE ("Última actualización publicada el…"). En el Código Civil es la LO 1/2025 (BOE-A-2025-76, publicada el 03/01/2025). El 07-09-2026 que da la API del BOE (`fecha_actualizacion`) es la fecha técnica del registro del consolidado, **no** una modificación del Código (comprobado el 23-10-2026).
- Los enlaces de EUR-Lex llevan el ancla `#art_N`; los del BOE, la del bloque del artículo (`#aN` o `#aX-Y`, que es como los numera el BOE).

---

## A. RGPD (Reglamento (UE) 2016/679)

### Principios del tratamiento
- **Regla (en una frase llana):** los datos se tratan de forma lícita, leal y transparente; para fines concretos; solo los necesarios; exactos; no más tiempo del necesario; con seguridad. Y el responsable tiene que poder **demostrarlo**.
- **Norma y artículo:** RGPD art. 5.1 a)-f) y 5.2.
- **Cita literal:** «El responsable del tratamiento será responsable del cumplimiento de lo dispuesto en el apartado 1 y capaz de demostrarlo ("responsabilidad proactiva").»
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02016R0679-20160504#art_5
- **Vigencia comprobada:** vigente sin cambios (23-10-2026).
- **Matices y lo que NO dice:** los nombres oficiales en español son: licitud, lealtad y transparencia; limitación de la finalidad; minimización de datos; exactitud; limitación del plazo de conservación; integridad y confidencialidad; responsabilidad proactiva (no "accountability"). No fija plazos de conservación concretos.

### Bases de licitud
- **Regla:** solo se pueden tratar datos si se da al menos una de seis bases: consentimiento, contrato, obligación legal, intereses vitales, interés público o interés legítimo.
- **Norma y artículo:** RGPD art. 6.1 a)-f).
- **Cita literal:** «El tratamiento solo será lícito si se cumple al menos una de las siguientes condiciones: a) el interesado dio su consentimiento […]; b) […] ejecución de un contrato […]; f) […] intereses legítimos […]».
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02016R0679-20160504#art_6
- **Vigencia comprobada:** vigente sin cambios.
- **Matices y lo que NO dice:** el consentimiento **no** es la base por defecto ni la "mejor". El interés legítimo exige ponderarlo con los derechos del interesado (ojo con los niños) y **no** lo pueden usar las autoridades públicas en el ejercicio de sus funciones (art. 6.1, párrafo segundo). Para usar los datos con un fin nuevo, el art. 6.4 manda valorar si es compatible.

### Consentimiento
- **Regla:** quien se basa en el consentimiento tiene que poder probarlo. Si va en un documento con más cosas, tiene que estar separado y en lenguaje claro. Se puede retirar en cualquier momento, y retirarlo tiene que ser igual de fácil que darlo.
- **Norma y artículo:** RGPD art. 7 (definición en art. 4.11: manifestación "libre, específica, informada e inequívoca").
- **Cita literal:** «El interesado tendrá derecho a retirar su consentimiento en cualquier momento. La retirada del consentimiento no afectará a la licitud del tratamiento basada en el consentimiento previo a su retirada. […] Será tan fácil retirar el consentimiento como darlo.» (art. 7.3)
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02016R0679-20160504#art_7
- **Vigencia comprobada:** vigente sin cambios.
- **Matices y lo que NO dice:** art. 7.4: si se condiciona un contrato a consentir datos que no hacen falta para ese contrato, eso pesa en contra de que el consentimiento sea libre. El RGPD no exige una fórmula ni una casilla concreta.

### Edad del consentimiento digital (RGPD + España)
- **Regla:** en la UE, por defecto, un menor puede consentir solo desde los 16 años en servicios online que se le ofrecen directamente; cada país puede bajarlo hasta los 13. **España lo fija en 14.**
- **Norma y artículo:** RGPD art. 8.1; LOPDGDD art. 7.
- **Cita literal:** «El tratamiento de los datos personales de un menor de edad únicamente podrá fundarse en su consentimiento cuando sea mayor de catorce años.» (LOPDGDD 7.1) · «[…] los menores de catorce años, fundado en el consentimiento, solo será lícito si consta el del titular de la patria potestad o tutela» (7.2).
- **Enlace oficial:** https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673#a7 · https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02016R0679-20160504#art_8
- **Vigencia comprobada:** el art. 7 de la LOPDGDD sigue diciendo **14 años** en el consolidado del BOE (actualizado a 27/12/2025, sin cambios en este artículo).
- **Matices y lo que NO dice:** hubo un **Proyecto de Ley Orgánica de protección de las personas menores de edad en los entornos digitales** (Congreso, exp. 121/000052) que subiría la edad a 16. **No es ley.** Además, las Cortes se disolvieron el 5-10-2026 (Real Decreto 806/2026, BOE de 6-10-2026), y con la disolución «quedarán caducados todos los asuntos pendientes de examen y resolución» del Congreso (art. 207 del Reglamento del Congreso). Si seguía en tramitación, ha caducado (ver Dudas). El art. 7 dice "mayor de catorce": la redacción es literal, no la interpretes. También se exceptúan los casos en que la ley exige que firmen los padres para el propio contrato.

### Categorías especiales de datos
- **Regla:** está prohibido, en principio, tratar datos de origen étnico o racial, opiniones políticas, religión o creencias, afiliación sindical, genéticos, biométricos para identificar, salud y vida u orientación sexual, salvo en las 10 excepciones del apartado 2 (por ejemplo, consentimiento **explícito**).
- **Norma y artículo:** RGPD art. 9.1 y 9.2 a)-j).
- **Cita literal:** «Quedan prohibidos el tratamiento de datos personales que revelen el origen étnico o racial, las opiniones políticas, las convicciones religiosas o filosóficas, o la afiliación sindical, y el tratamiento de datos genéticos, datos biométricos dirigidos a identificar de manera unívoca a una persona física, datos relativos a la salud […]».
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02016R0679-20160504#art_9
- **Vigencia comprobada:** vigente (el apartado 1 tiene la redacción de la rectificación de 2018 y la letra b) del apartado 2, la de la de 2021).
- **Matices y lo que NO dice:** los datos penales **no** son categoría especial: van en el art. 10 (y en el art. 10 de la LOPDGDD). El art. 9.4 deja a los Estados poner condiciones extra para los datos genéticos, biométricos y de salud. La reforma del "Ómnibus digital" que tocaría esta materia **no está aprobada** (ver sección D, último punto).

### Información que hay que dar al interesado (y por capas en España)
- **Regla:** cuando recoges datos hay que decir, como mínimo, quién es el responsable y cómo contactarlo, el DPD si lo hay, para qué y con qué base, los destinatarios, las transferencias, el plazo de conservación, los derechos, que se puede retirar el consentimiento, que se puede reclamar ante la autoridad, etc. En España vale hacerlo **por capas**: una primera capa básica y un enlace al resto.
- **Norma y artículo:** RGPD arts. 13 (datos recogidos del interesado) y 14 (de otra fuente); LOPDGDD art. 11.
- **Cita literal:** «La información básica […] deberá contener, al menos: a) La identidad del responsable del tratamiento y de su representante, en su caso. b) La finalidad del tratamiento. c) La posibilidad de ejercer los derechos establecidos en los artículos 15 a 22 […]» (LOPDGDD 11.2).
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02016R0679-20160504#art_13 · https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673#a1-3
- **Vigencia comprobada:** vigentes sin cambios.
- **Matices y lo que NO dice:** si hay perfiles, la primera capa también tiene que decirlo e informar del derecho a oponerse a decisiones automatizadas (LOPDGDD 11.2, último párrafo). Si los datos no vienen del interesado, la capa básica añade las categorías de datos y la fuente (11.3). Las capas son una forma de cumplir: la información completa sigue siendo obligatoria.

### Derechos del interesado
- **Regla:** acceso (15), rectificación (16), supresión o "derecho al olvido" (17), limitación (18), notificar a terceros las rectificaciones y supresiones (19), portabilidad (20), oposición (21) y a no ser objeto de decisiones solo automatizadas, incluida la elaboración de perfiles (22).
- **Norma y artículo:** RGPD arts. 15-22; LOPDGDD arts. 12-18.
- **Cita literal:** «Los derechos reconocidos en los artículos 15 a 22 del Reglamento (UE) 2016/679, podrán ejercerse directamente o por medio de representante legal o voluntario.» (LOPDGDD 12.1) · «La prueba del cumplimiento del deber de responder […] recaerá sobre el responsable.» (12.4)
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02016R0679-20160504#art_15 · https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673#a1-4
- **Vigencia comprobada:** vigentes.
- **Matices y lo que NO dice:** el responsable no puede denegar un derecho solo porque se pida por otro medio distinto del que ofrece (LOPDGDD 12.2). Los padres ejercen los derechos de los **menores de 14** (12.6). Estos derechos tienen límites propios (por ejemplo, la supresión no procede si hay obligación legal de conservar, art. 17.3); no son absolutos.

### Derecho de supresión ("derecho al olvido"): cuándo procede y cuándo no
- **Regla:** el interesado puede pedir que se borren sus datos, y el responsable tiene que hacerlo sin dilación indebida, cuando: a) ya no son necesarios para el fin con el que se recogieron; b) retira el consentimiento y no hay otra base; c) se opone con el art. 21.1 y no prevalecen otros motivos legítimos, o se opone a la mercadotecnia directa (21.2); d) se trataron de forma ilícita; e) una ley obliga a borrarlos; f) se recogieron de un menor al ofrecerle servicios online (art. 8.1). Si el responsable los hizo públicos, además toma medidas razonables para avisar a quienes los estén tratando de que se ha pedido borrar enlaces y copias (17.2). **No procede** cuando el tratamiento es necesario: a) para la libertad de expresión e información; b) para cumplir una **obligación legal** o una misión de interés público; c) por salud pública; d) para archivo de interés público, investigación o estadística, si borrar lo impide o lo obstaculiza gravemente; e) para formular, ejercer o defender reclamaciones.
- **Norma y artículo:** RGPD art. 17.1, 17.2 y 17.3; en España, LOPDGDD arts. 15 y 32 (bloqueo).
- **Cita literal:** «El interesado tendrá derecho a obtener sin dilación indebida del responsable del tratamiento la supresión de los datos personales que le conciernan, el cual estará obligado a suprimir sin dilación indebida los datos personales cuando concurra alguna de las circunstancias siguientes: […]» (17.1) · «b) para el cumplimiento de una obligación legal que requiera el tratamiento de datos impuesta por el Derecho de la Unión o de los Estados miembros que se aplique al responsable del tratamiento […]» (17.3 b)
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02016R0679-20160504#art_17 · https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673#a1-7 (LOPDGDD 15) · https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673#a3-4 (LOPDGDD 32)
- **Vigencia comprobada:** RGPD art. 17 vigente sin cambios en el consolidado; LOPDGDD arts. 15 y 32 en su redacción original de 2018, sin modificaciones (23-10-2026).
- **Matices y lo que NO dice:** en España, al suprimir, el responsable tiene que **bloquear** los datos (LOPDGDD 32.1): quedan reservados, sin poder usarse ni verse, solo a disposición de jueces, Ministerio Fiscal y Administraciones competentes (incluida la AEPD) para posibles responsabilidades, y **solo durante el plazo de prescripción** de estas; después se destruyen (32.2). Si la supresión viene de oponerse a la mercadotecnia directa, se pueden conservar los datos identificativos necesarios para no volver a enviar publicidad (LOPDGDD 15.2). El art. 17 no fija plazos de conservación concretos: los da cada ley sectorial (no revisadas aquí). El "derecho al olvido" en buscadores y redes sociales tiene artículos propios en España (LOPDGDD 93 y 94), no revisados aquí.

### Derecho de oposición, y en especial a la mercadotecnia directa
- **Regla:** 1) Si el tratamiento se basa en el **interés público o el interés legítimo** (art. 6.1 e o f), incluidos los perfiles, el interesado puede oponerse en cualquier momento por motivos de su situación particular, y el responsable deja de tratar los datos salvo que acredite motivos legítimos imperiosos que prevalezcan o que los necesite para reclamaciones (21.1). 2) Si el fin es la **mercadotecnia directa**, puede oponerse **en todo momento**, incluidos los perfiles ligados a ella (21.2), y entonces los datos **dejan de tratarse para ese fin** (21.3), sin ponderación ni excepción. 3) Este derecho se tiene que mencionar de forma explícita, clara y separada de cualquier otra información, como tarde en la primera comunicación (21.4). 4) En servicios online, se puede ejercer por medios automatizados (21.5).
- **Norma y artículo:** RGPD art. 21 (en especial 21.2 y 21.3); LOPDGDD arts. 18, 15.2 y 23.
- **Cita literal:** «Cuando el tratamiento de datos personales tenga por objeto la mercadotecnia directa, el interesado tendrá derecho a oponerse en todo momento al tratamiento de los datos personales que le conciernan, incluida la elaboración de perfiles en la medida en que esté relacionada con la citada mercadotecnia.» (21.2) · «Cuando el interesado se oponga al tratamiento con fines de mercadotecnia directa, los datos personales dejarán de ser tratados para dichos fines.» (21.3)
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02016R0679-20160504#art_21 · https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673#a1-10 (LOPDGDD 18) · https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673#a2-5 (LOPDGDD 23)
- **Vigencia comprobada:** RGPD art. 21 vigente sin cambios; LOPDGDD art. 18 original de 2018. LOPDGDD art. 23: apartado 1 modificado por la Ley 10/2025, de 26 de diciembre (BOE-A-2025-26698), vigente desde el 28-12-2025 (23-10-2026).
- **Matices y lo que NO dice:** el 21.2, a diferencia del 21.1, no pide alegar motivos de la situación particular ni deja al responsable alegar motivos imperiosos. El 21.3 corta el tratamiento **para la mercadotecnia**, no necesariamente todo tratamiento (por ejemplo, el que hace falta para un contrato en vigor). Si además se pide la supresión, se aplica el art. 17.1 c) (punto anterior). En España: se pueden guardar los datos identificativos para no volver a enviar publicidad (LOPDGDD 15.2). Quien se oponga tiene que ser informado de los **sistemas de exclusión publicitaria** existentes (23.3), y quien vaya a hacer mercadotecnia directa tiene que consultarlos antes, salvo que tenga el consentimiento del afectado (23.4). La ley no da nombre a ningún sistema concreto. Para los emails comerciales, la baja tiene además su regla propia en la LSSI (art. 22.1, sección C). Si la publicidad se basa en el consentimiento, también se puede retirar (art. 7.3).

### Plazo para responder a una solicitud de derechos
- **Regla:** el responsable tiene que contestar **sin dilación indebida y como máximo en un mes** desde que recibe la solicitud. Puede prorrogarlo **otros dos meses** si es complejo o hay muchas, pero tiene que avisar dentro del primer mes y explicar por qué. Si no va a hacer nada, también tiene que decirlo en un mes y explicar que se puede reclamar.
- **Norma y artículo:** RGPD art. 12.3 y 12.4.
- **Cita literal:** «[…] en el plazo de un mes a partir de la recepción de la solicitud. Dicho plazo podrá prorrogarse otros dos meses en caso necesario, teniendo en cuenta la complejidad y el número de solicitudes. El responsable informará al interesado de cualquiera de dichas prórrogas en el plazo de un mes […]».
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02016R0679-20160504#art_12
- **Vigencia comprobada:** vigente (redacción de la rectificación de 2021, ya en el consolidado).
- **Matices y lo que NO dice:** son **meses**, no 30 días ni días hábiles. El máximo total es de 3 meses (1 + 2), no "45 días" como en EE. UU. Si se pide por medios electrónicos, se contesta así cuando sea posible. Si hay dudas razonables sobre la identidad, se puede pedir información adicional (12.6; ver el punto siguiente).

### Comprobar la identidad de quien ejerce un derecho
- **Regla:** el responsable solo puede pedir más datos para confirmar la identidad de quien ejerce un derecho (acceso, rectificación, supresión, limitación, portabilidad u oposición) si tiene **dudas razonables** sobre ella, y solo la **información adicional necesaria** para confirmarla. No es un requisito automático.
- **Norma y artículo:** RGPD art. 12.6 (y art. 11.2 para cuando el responsable no puede identificar al interesado).
- **Cita literal:** «Sin perjuicio de lo dispuesto en el artículo 11, cuando el responsable del tratamiento tenga dudas razonables en relación con la identidad de la persona física que cursa la solicitud a que se refieren los artículos 15 a 21, podrá solicitar que se facilite la información adicional necesaria para confirmar la identidad del interesado.»
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02016R0679-20160504#art_12
- **Vigencia comprobada:** vigente sin cambios (23-10-2026).
- **Matices y lo que NO dice:** el RGPD **no** dice que haya que mandar una copia del DNI; dice "información adicional necesaria". Cubre los arts. 15 a 21, no el 22. En España, los derechos se pueden ejercer por medio de representante (LOPDGDD 12.1), y no se puede denegar el derecho solo porque se pida por un medio distinto del que ofrece el responsable (12.2).

### Gratuidad y peticiones abusivas
- **Regla:** informar y atender los derechos es **gratis**. Solo si la petición es manifiestamente infundada o excesiva (sobre todo si se repite) se puede cobrar un canon razonable o negarse, y la prueba le toca al responsable. En España, pedir el acceso más de una vez en seis meses puede considerarse repetitivo, salvo causa legítima.
- **Norma y artículo:** RGPD art. 12.5; LOPDGDD arts. 12.7 y 13.3.
- **Cita literal:** «[…] serán a título gratuito. Cuando las solicitudes sean manifiestamente infundadas o excesivas, especialmente debido a su carácter repetitivo, el responsable del tratamiento podrá: a) cobrar un canon razonable […], o b) negarse a actuar […]» · «El responsable del tratamiento soportará la carga de demostrar el carácter manifiestamente infundado o excesivo de la solicitud.»
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02016R0679-20160504#art_12 · https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673#a1-5
- **Vigencia comprobada:** vigentes.
- **Matices y lo que NO dice:** las copias adicionales del art. 15.3 sí pueden tener un canon razonable. Si el interesado elige un medio que supone un coste desproporcionado, paga el exceso (LOPDGDD 13.4).

### Encargado del tratamiento: contrato obligatorio
- **Regla:** quien trata datos por cuenta de otro (gestoría, hosting, SaaS…) tiene que tener un contrato (o acto jurídico) con el responsable. Debe fijar el objeto, la duración, la naturaleza, la finalidad, el tipo de datos, las categorías de interesados y las obligaciones del responsable, y estos 8 compromisos: a) solo instrucciones documentadas (también para las transferencias); b) confidencialidad del personal; c) seguridad del art. 32; d) condiciones para subcontratar (apartados 2 y 4); e) ayudar con los derechos de los interesados; f) ayudar con los arts. 32-36; g) suprimir o devolver los datos al terminar; h) dar la información para demostrar el cumplimiento y permitir auditorías. Además, debe avisar si una instrucción infringe la normativa.
- **Norma y artículo:** RGPD art. 28.3 (subencargados: 28.2 y 28.4; forma escrita, también electrónica: 28.9).
- **Cita literal:** «El tratamiento por el encargado se regirá por un contrato u otro acto jurídico […] que vincule al encargado respecto del responsable y establezca el objeto, la duración, la naturaleza y la finalidad del tratamiento, el tipo de datos personales y categorías de interesados, y las obligaciones y derechos del responsable.»
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02016R0679-20160504#art_28
- **Vigencia comprobada:** vigente (letras b y e en la redacción de la rectificación de 2021).
- **Matices y lo que NO dice:** sin autorización previa por escrito del responsable, específica o general, el encargado no puede subcontratar. Si la autorización es **general**, el encargado tiene que informar de cualquier cambio previsto de subencargados, «dando así al responsable la oportunidad de oponerse» (28.2). Al terminar, el responsable elige si los datos se suprimen o se devuelven, y se suprimen las copias salvo obligación legal de conservarlas (28.3 g). El RGPD **no** exige un "certificado de borrado"; pedirlo es práctica habitual. La LOPDGDD art. 33 añade reglas propias de España sobre el encargado (no revisado aquí en detalle).

### Registro de actividades de tratamiento (y excepción de menos de 250)
- **Regla:** responsables y encargados llevan un registro de sus tratamientos. Las empresas de **menos de 250 personas** no tienen que hacerlo… salvo que el tratamiento pueda suponer un riesgo, **no sea ocasional** o incluya categorías especiales o datos penales.
- **Norma y artículo:** RGPD art. 30.1, 30.2 y 30.5; LOPDGDD art. 31.
- **Cita literal:** «Las obligaciones indicadas en los apartados 1 y 2 no se aplicarán a ninguna empresa ni organización que emplee a menos de 250 personas, a menos que el tratamiento que realice pueda entrañar un riesgo […], no sea ocasional, o incluya categorías especiales […]».
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02016R0679-20160504#art_30
- **Vigencia comprobada:** vigente con el umbral de **250**.
- **Matices y lo que NO dice:** como las condiciones van con "o", basta una para que haya que llevar el registro. En la práctica casi cualquier pyme con clientes o nóminas trata datos de forma no ocasional. **La propuesta "Ómnibus IV" (2025/0130(COD)), que entre otras cosas toca este umbral, no está aprobada.** Según el EU Law Tracker oficial (consultado el 23-10-2026), hay un **acuerdo provisional** con el Consejo, refrendado por el Coreper el 26-6-2026 y aprobado por la comisión del Parlamento el 2-7-2026. Faltan la votación final, la adopción y la publicación en el DO. Los metadatos oficiales no registran ningún acto que modifique el RGPD (ver Dudas). No digas "menos de 750", y avisa de que puede cambiar pronto.

### Seguridad del tratamiento
- **Regla:** responsable y encargado aplican medidas técnicas y organizativas adecuadas al riesgo; entre otras, según el caso: seudonimización y cifrado, confidencialidad e integridad, disponibilidad y resiliencia, poder recuperar los datos y revisar periódicamente las medidas.
- **Norma y artículo:** RGPD art. 32.1.
- **Cita literal:** «[…] el responsable y el encargado del tratamiento aplicarán medidas técnicas y organizativas apropiadas para garantizar un nivel de seguridad adecuado al riesgo, que en su caso incluya, entre otros: a) la seudonimización y el cifrado de datos personales; […]».
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02016R0679-20160504#art_32
- **Vigencia comprobada:** vigente.
- **Matices y lo que NO dice:** no hay una lista cerrada de medidas obligatorias ni de certificaciones: es proporcional al riesgo.

### Brecha de seguridad: aviso a la autoridad (72 horas)
- **Regla:** el responsable avisa a la autoridad (en España, la AEPD) sin dilación indebida y, si es posible, **en un máximo de 72 horas desde que la conoce**, salvo que sea improbable que suponga un riesgo. Si llega tarde, explica por qué. El encargado avisa al responsable sin dilación indebida.
- **Norma y artículo:** RGPD art. 33.1 y 33.2 (contenido mínimo de la notificación: 33.3; documentar todas las brechas: 33.5).
- **Cita literal:** «[…] la notificará a la autoridad de control competente […] sin dilación indebida y, de ser posible, a más tardar 72 horas después de que haya tenido constancia de ella, a menos que sea improbable que dicha violación de la seguridad constituya un riesgo para los derechos y las libertades de las personas físicas.»
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02016R0679-20160504#art_33
- **Vigencia comprobada:** vigente con **72 horas**.
- **Matices y lo que NO dice:** son horas naturales desde que se tiene constancia, no desde que ocurre. El Consejo de la UE apoya **ampliar** este plazo dentro del Ómnibus digital (mandato del 21-10-2026), pero **es solo una posición negociadora, no un cambio aprobado**. Aunque no haya que notificar, la brecha se documenta (33.5).

### Brecha de seguridad: aviso a los afectados
- **Regla:** si es probable que la brecha suponga un **alto riesgo** para las personas, el responsable se lo comunica sin dilación indebida, en lenguaje claro. No hace falta si los datos estaban cifrados o eran ininteligibles, si ya se ha eliminado el alto riesgo o si supone un esfuerzo desproporcionado (entonces, comunicación pública).
- **Norma y artículo:** RGPD art. 34.1 y 34.3.
- **Cita literal:** «Cuando sea probable que la violación de la seguridad de los datos personales entrañe un alto riesgo para los derechos y libertades de las personas físicas, el responsable del tratamiento la comunicará al interesado sin dilación indebida.»
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02016R0679-20160504#art_34
- **Vigencia comprobada:** vigente.
- **Matices y lo que NO dice:** no fija un número de horas para avisar a los afectados. El umbral es más alto que el del art. 33 ("alto riesgo" frente a "riesgo").

### Evaluación de impacto (EIPD)
- **Regla:** antes de un tratamiento que probablemente suponga un **alto riesgo** (sobre todo con tecnologías nuevas), el responsable hace una evaluación de impacto. Es obligatoria, en particular, con perfiles que llevan a decisiones con efectos jurídicos o similares, con categorías especiales o datos penales a gran escala y con la observación sistemática a gran escala de zonas de acceso público.
- **Norma y artículo:** RGPD art. 35.1 y 35.3 (listas de la autoridad: 35.4; consulta previa si el riesgo sigue alto: art. 36).
- **Cita literal:** «Cuando sea probable que un tipo de tratamiento, en particular si utiliza nuevas tecnologías, […] entrañe un alto riesgo para los derechos y libertades de las personas físicas, el responsable del tratamiento realizará, antes del tratamiento, una evaluación del impacto […]».
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02016R0679-20160504#art_35
- **Vigencia comprobada:** vigente.
- **Matices y lo que NO dice:** la AEPD publica la lista de tratamientos que necesitan EIPD (art. 35.4); no se ha descargado aquí (ver Dudas). Usar IA no obliga por sí solo a hacer una EIPD: depende del riesgo.

### Delegado de protección de datos (DPD)
- **Regla:** es obligatorio en la UE para autoridades públicas, para quien observa de forma habitual y sistemática a gran escala y para quien trata a gran escala categorías especiales o datos penales. **España añade una lista fija** de entidades que siempre lo necesitan: colegios profesionales, centros docentes y universidades, telecos a gran escala, perfiles a gran escala en servicios online, entidades de crédito, aseguradoras, empresas de inversión, eléctricas y gasistas, ficheros de solvencia o de fraude, publicidad con perfiles, centros sanitarios con historias clínicas (salvo profesionales a título individual), informes comerciales, juego online, seguridad privada y federaciones deportivas con datos de menores. El nombramiento se comunica a la AEPD en 10 días.
- **Norma y artículo:** RGPD art. 37.1; LOPDGDD art. 34.1 a)-o) y 34.3.
- **Cita literal:** «Los responsables y encargados del tratamiento deberán designar un delegado de protección de datos en los supuestos previstos en el artículo 37.1 del Reglamento (UE) 2016/679 y, en todo caso, cuando se trate de las siguientes entidades: […]» (LOPDGDD 34.1).
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02016R0679-20160504#art_37 · https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673#a3-6
- **Vigencia comprobada:** vigentes.
- **Matices y lo que NO dice:** un autónomo o una pyme "normal" **no** está obligado por tamaño; depende de la actividad. Nombrarlo voluntariamente es posible (34.2) y entonces se aplica todo su régimen.

### Transferencias internacionales: regla general y vías
- **Regla:** solo se pueden enviar datos fuera del EEE si hay: (1) **decisión de adecuación** de la Comisión (art. 45); si no, (2) **garantías adecuadas**, como las cláusulas contractuales tipo (CCT) o las normas corporativas vinculantes (art. 46); y, solo como excepción, (3) supuestos concretos del art. 49 (consentimiento explícito informado de los riesgos, contrato con el interesado, reclamaciones…).
- **Norma y artículo:** RGPD arts. 44, 45, 46.2 c) y 49.1.
- **Cita literal:** «Podrá realizarse una transferencia […] cuando la Comisión haya decidido que el tercer país […] garantizan un nivel de protección adecuado. Dicha transferencia no requerirá ninguna autorización específica.» (45.1)
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02016R0679-20160504#art_44
- **Vigencia comprobada:** vigentes.
- **Matices y lo que NO dice:** el art. 49 es para situaciones concretas, no una vía ordinaria. En el aviso de privacidad hay que informar de las transferencias (arts. 13.1 f y 14.1 f).

### Cláusulas contractuales tipo (CCT) vigentes
- **Regla:** las CCT vigentes para enviar datos fuera del EEE son las de la **Decisión de Ejecución (UE) 2021/914**, con sus cuatro módulos (de responsable a responsable, de responsable a encargado, de encargado a encargado y de encargado a responsable).
- **Norma y artículo:** Decisión de Ejecución (UE) 2021/914 de la Comisión (base: RGPD art. 46.2 c).
- **Cita literal:** (no se descargó el texto completo: ver Dudas). Los metadatos oficiales la marcan **"en vigor"**, sin fecha de fin de validez y sin ningún acto que la modifique o derogue (solo rectificaciones de 2022, 2023, 2024 y 2025).
- **Enlace oficial:** https://eur-lex.europa.eu/eli/dec_impl/2021/914/oj
- **Vigencia comprobada:** en vigor a 23-10-2026. No consta ninguna decisión nueva de CCT adoptada desde junio de 2024 (búsqueda en los metadatos de la Oficina de Publicaciones).
- **Matices y lo que NO dice:** no confundir con las cláusulas contractuales tipo **entre responsable y encargado dentro de la UE** (Decisión 2021/915, para el art. 28), que es otra decisión. Las CCT antiguas (de 2001, 2004 y 2010) ya no sirven.

### Transferencias a EE. UU.: Marco de Privacidad de Datos UE-EE. UU. (DPF)
- **Regla:** se pueden enviar datos sin más garantías a empresas estadounidenses **adheridas (certificadas) al DPF**, gracias a la decisión de adecuación de 10-7-2023. A una empresa de EE. UU. que no esté adherida hacen falta CCT u otra garantía.
- **Norma y artículo:** Decisión de Ejecución (UE) 2023/1795 (base: RGPD art. 45).
- **Cita literal:** (página oficial de la Comisión) «On 10 July the European Commission adopted its adequacy decision for the EU-US Data Privacy Framework.»
- **Enlace oficial:** https://eur-lex.europa.eu/eli/dec_impl/2023/1795/oj · https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/eu-us-data-transfers_en · Asunto en el TJUE: https://curia.europa.eu/juris/liste.jsf?num=C-703/25&language=es
- **Vigencia comprobada (23-10-2026):** **sigue en vigor.** Los metadatos oficiales la marcan "en vigor", sin fin de validez y sin ningún acto que la derogue o suspenda (solo rectificaciones de 2025). El **Tribunal General desestimó** el recurso de anulación (T-553/23, *Latombe/Comisión*, sentencia de 3-9-2025). Contra esa sentencia hay un **recurso de casación ante el Tribunal de Justicia, asunto C-703/25 P, interpuesto el 31-10-2025 y "Pendiente"** según InfoCuria, con un auto de 04/06/2026 (ECLI:EU:C:2026:465) cuyo contenido no se ha leído.
- **Matices y lo que NO dice:** no cubre "EE. UU." en general, solo a las organizaciones adheridas (se comprueba en la lista oficial del DPF). Que esté vigente hoy no garantiza el futuro: el TJUE podría anularla (como pasó con Safe Harbor en 2015 y Privacy Shield en 2020). Algunos despachos señalan como riesgo una sentencia del Tribunal Supremo de EE. UU. de 2026 sobre la independencia de la FTC; es solo una **pista no oficial** y no cambia la vigencia. Recomendación prudente para las skills: tener CCT de reserva.

### Sanciones del RGPD (dos niveles)
- **Regla:** **nivel 1:** hasta **10 millones de euros** o el **2 %** del volumen de negocio anual mundial del ejercicio anterior (se aplica la cifra mayor), por incumplir las obligaciones de responsable y encargado (arts. 8, 11, 25-39, 42 y 43). **Nivel 2:** hasta **20 millones** o el **4 %** (la mayor), por los principios, las bases y el consentimiento (arts. 5, 6, 7 y 9), los derechos (12-22), las transferencias (44-49) o desobedecer a la autoridad.
- **Norma y artículo:** RGPD art. 83.4, 83.5 y 83.6 (criterios para fijar la cuantía: 83.2). En España, la tipificación y la prescripción están en la LOPDGDD, arts. 71-78.
- **Cita literal:** «[…] multas administrativas de 20 000 000 EUR como máximo o, tratándose de una empresa, de una cuantía equivalente al 4 % como máximo del volumen de negocio total anual global del ejercicio financiero anterior, optándose por la de mayor cuantía» (83.5).
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02016R0679-20160504#art_83
- **Vigencia comprobada:** vigente.
- **Matices y lo que NO dice:** son **máximos**, no multas automáticas. La regla de "la cifra mayor" se aplica a empresas. La AEPD también puede apercibir u ordenar medidas en lugar de multar (art. 58.2 RGPD; art. 64.3 LOPDGDD).

---

## B. LOPDGDD (Ley Orgánica 3/2018): lo propio de España

*(Edad del menor (art. 7), información por capas (art. 11), ejercicio de derechos (arts. 12-13) y DPD (art. 34): ver sección A.)*

### Videovigilancia
- **Regla:** se puede grabar con cámaras para la seguridad de personas, bienes e instalaciones. De la vía pública, solo lo imprescindible. Las imágenes se borran **en un mes como máximo** (salvo que acrediten un delito o un ataque, y entonces se entregan a la autoridad en 72 horas). Hay que poner un **cartel** con la existencia del tratamiento, quién es el responsable y cómo ejercer los derechos. Grabar solo el interior de tu propia casa queda fuera del RGPD.
- **Norma y artículo:** LOPDGDD art. 22 (en el trabajo: art. 89).
- **Cita literal:** «Los datos serán suprimidos en el plazo máximo de un mes desde su captación, salvo cuando hubieran de ser conservados para acreditar la comisión de actos que atenten contra la integridad de personas, bienes o instalaciones.» (22.3)
- **Enlace oficial:** https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673#a2-4
- **Vigencia comprobada:** vigente.
- **Matices y lo que NO dice:** la exclusión del domicilio **no** vale si una empresa de seguridad contratada accede a las imágenes (22.5). Nunca se puede captar el interior de un domicilio ajeno. En el trabajo hace falta además informar a los trabajadores (art. 89) y nunca grabar en vestuarios, aseos o comedores (89.2).

### Derechos digitales en el trabajo y desconexión digital
- **Regla:** los trabajadores tienen derecho a la intimidad en los dispositivos que les da la empresa (87), a la **desconexión digital** fuera de su horario (88), a la intimidad frente a la videovigilancia y la grabación de sonido (89) y frente a la geolocalización (90). Los convenios pueden mejorar estas garantías (91). La empresa, oyendo antes a los representantes, tiene que hacer una **política interna de desconexión**.
- **Norma y artículo:** LOPDGDD arts. 87-91 (desconexión: art. 88).
- **Cita literal:** «Los trabajadores y los empleados públicos tendrán derecho a la desconexión digital a fin de garantizar, fuera del tiempo de trabajo legal o convencionalmente establecido, el respeto de su tiempo de descanso, permisos y vacaciones, así como de su intimidad personal y familiar.» (88.1)
- **Enlace oficial:** https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673#a8-10 (art. 88) · art. 87: `#a8-9`
- **Vigencia comprobada:** vigentes.
- **Matices y lo que NO dice:** el art. 88 **no** fija horas concretas ni sanciones propias: remite a la negociación colectiva o al acuerdo con los representantes. El art. 87.3 exige criterios de uso de los dispositivos y que los trabajadores los conozcan. La grabación de sonido en el trabajo solo se admite si hay riesgos relevantes para la seguridad (89.3).

---

## C. LSSI (Ley 34/2002)

### Información obligatoria en la web
- **Regla:** quien presta un servicio online (también un autónomo con web) tiene que dar acceso permanente, fácil, directo y gratuito a: nombre o razón social, domicilio, correo electrónico y otro contacto directo; datos registrales (Registro Mercantil u otro); autorización administrativa si la necesita; si es una profesión regulada, el colegio, el número de colegiado, el título y las normas aplicables; el **NIF**; los precios claros (con o sin impuestos y gastos de envío); y los códigos de conducta. Se cumple poniéndolo en la propia web.
- **Norma y artículo:** LSSI art. 10.1 y 10.2.
- **Cita literal:** «[…] a) Su nombre o denominación social; su residencia o domicilio […]; su dirección de correo electrónico y cualquier otro dato que permita establecer con él una comunicación directa y efectiva. […] e) El número de identificación fiscal que le corresponda.»
- **Enlace oficial:** https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a10
- **Vigencia comprobada:** vigente (última modificación de este artículo: Ley 9/2014, en vigor desde el 11-5-2014).
- **Matices y lo que NO dice:** la LSSI no usa la expresión "aviso legal": es la práctica habitual para cumplir el art. 10. La información de privacidad (RGPD) es otra obligación distinta.

### Emails comerciales: consentimiento previo y excepción de cliente
- **Regla:** está prohibido enviar publicidad por email (o un medio electrónico equivalente) que no se haya **pedido o autorizado expresamente antes**. **Excepción:** si hay una **relación contractual previa**, los datos se obtuvieron lícitamente y se anuncian productos o servicios **propios y similares** a los contratados. Aun así, hay que ofrecer una baja sencilla y gratuita al recoger los datos y en **cada** envío; en el email, con una dirección electrónica válida. Además, cada comunicación debe identificarse como publicidad y al anunciante.
- **Norma y artículo:** LSSI arts. 20.1, 21.1 y 21.2; revocación del consentimiento: art. 22.1.
- **Cita literal:** «Queda prohibido el envío de comunicaciones publicitarias o promocionales por correo electrónico u otro medio de comunicación electrónica equivalente que previamente no hubieran sido solicitadas o expresamente autorizadas por los destinatarios de las mismas.» (21.1) · «Lo dispuesto en el apartado anterior no será de aplicación cuando exista una relación contractual previa […] referentes a productos o servicios de su propia empresa que sean similares […]» (21.2)
- **Enlace oficial:** https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a21 · `#a20` · `#a22`
- **Vigencia comprobada:** vigentes (última modificación: Ley 9/2014).
- **Matices y lo que NO dice:** la excepción **no** cubre a quien solo pidió presupuesto o se suscribió sin contratar (se exige una "relación contractual previa"), ni productos de terceros o no similares. Las llamadas comerciales se rigen por otras normas (Ley General de Telecomunicaciones y LOPDGDD art. 23, sistemas de exclusión), no revisadas aquí.

### Darse de baja de las comunicaciones comerciales (revocar el consentimiento)
- **Regla:** quien recibe comunicaciones comerciales puede **revocar en cualquier momento** su consentimiento con solo comunicárselo al remitente. El que envía tiene que ofrecer **procedimientos sencillos y gratuitos** para darse de baja e informar de ellos por medios electrónicos. Si la comunicación llega por **email**, tiene que incluir obligatoriamente una dirección de correo electrónico u otra dirección electrónica válida donde darse de baja; está prohibido enviar emails comerciales sin ella.
- **Norma y artículo:** LSSI art. 22.1 (infracciones: art. 38.3 d) y 38.4 h); quién sanciona: art. 43.1).
- **Cita literal:** «El destinatario podrá revocar en cualquier momento el consentimiento prestado a la recepción de comunicaciones comerciales con la simple notificación de su voluntad al remitente. A tal efecto, los prestadores de servicios deberán habilitar procedimientos sencillos y gratuitos para que los destinatarios de servicios puedan revocar el consentimiento que hubieran prestado.» (22.1)
- **Enlace oficial:** https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a22 · infracciones: https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a38 · competencia: https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a43
- **Vigencia comprobada:** art. 22 vigente; última modificación por la Ley 9/2014 (vigente desde el 11-5-2014). Consolidado del BOE con última actualización publicada el 23/01/2025 (comprobado el 23-10-2026).
- **Matices y lo que NO dice:** no hace falta dar motivos: basta la «simple notificación de su voluntad». El art. 22.1 **no fija un plazo** para dar de baja. Tampoco dice "enlace de baja": pide «una dirección de correo electrónico u otra dirección electrónica válida». La misma baja sencilla y gratuita se exige también en la excepción de clientes del art. 21.2 (punto anterior). Incumplir el 22.1 es infracción **grave** si el incumplimiento es significativo (38.3 d) y **leve** si no (38.4 h), y la sanciona la **AEPD** (43.1). Las cuantías de las multas (art. 39) no se han revisado aquí. Si los datos se usan para mercadotecnia, también vale el derecho de oposición del RGPD (art. 21.2 y 21.3, sección A).

### Cookies
- **Regla:** solo se pueden instalar o leer cookies (y tecnologías similares) con el **consentimiento** del usuario, después de darle información clara y completa. Quedan exentas las estrictamente técnicas: las que sirven solo para transmitir la comunicación o las estrictamente necesarias para un servicio que el usuario ha pedido.
- **Norma y artículo:** LSSI art. 22.2. Guía oficial: **AEPD, "Guía sobre el uso de las cookies"**, versión actualizada en **mayo de 2024** (la actualización de julio de 2023 incorporó las Directrices 03/2022 del CEPD sobre patrones engañosos, con adaptación hasta el 11-1-2024).
- **Cita literal:** «Los prestadores de servicios podrán utilizar dispositivos de almacenamiento y recuperación de datos en equipos terminales de los destinatarios, a condición de que los mismos hayan dado su consentimiento después de que se les haya facilitado información clara y completa sobre su utilización […]».
- **Enlace oficial:** https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a22 · Guía: https://www.aepd.es/guias/guia-cookies.pdf · Nota de prensa: https://www.aepd.es/prensa-y-comunicacion/notas-de-prensa/aepd-actualiza-guia-cookies-para-adaptarla-a-nuevas-directrices-cepd
- **Vigencia comprobada:** art. 22.2 vigente (redacción de 2014). La guía de mayo de 2024 es la que enlaza hoy la AEPD.
- **Matices y lo que NO dice:** el texto del art. 22.2 aún remite a la LO 15/1999 (derogada); hoy se lee como remisión al RGPD y la LOPDGDD. Según la guía AEPD: el botón **"Rechazar"** debe estar al mismo nivel que "Aceptar"; seguir navegando **no** es consentir; no valen casillas premarcadas; y un muro de cookies solo es admisible con una alternativa real de acceso, que no tiene por qué ser gratuita. La misma guía recoge que, para las **grandes plataformas en línea**, el CEPD (dictamen 8/2024) considera que en la mayoría de los casos ofrecer solo la alternativa de pago no basta para que el consentimiento sea válido. El Ómnibus digital quiere ampliar las cookies exentas (medición de audiencia, seguridad), pero **solo es una posición del Consejo, no ley**.

---

## D. Reglamento de IA (Reglamento (UE) 2024/1689), con el Ómnibus digital sobre IA ya aprobado

### ⚠️ Cambio reciente clave: Reglamento (UE) 2026/1744 ("Ómnibus digital sobre IA")
- **Regla:** el paquete Ómnibus **sobre IA ya está aprobado y en vigor**: es el Reglamento (UE) 2026/1744, de 8 de julio de 2026, publicado en el DO L de **24-7-2026**, que entra en vigor **a los tres días de su publicación** (es decir, el 27-7-2026). Modifica, entre otras cosas, los arts. 4, 5, 50.7, 99, 111 y 113 del Reglamento de IA.
- **Norma y artículo:** Reglamento (UE) 2026/1744, art. 1 (modificaciones) y art. 4 (entrada en vigor).
- **Cita literal:** «REGLAMENTO (UE) 2026/1744 […] de 8 de julio de 2026 por el que se modifican los Reglamentos (UE) 2024/1689, (UE) 2018/1139 y (UE) 2023/1230 en lo que respecta a la simplificación de la aplicación de normas armonizadas en materia de inteligencia artificial (Ómnibus digital sobre IA)» · «El presente Reglamento entrará en vigor a los tres días de su publicación en el Diario Oficial de la Unión Europea.»
- **Enlace oficial:** https://eur-lex.europa.eu/eli/reg/2026/1744/oj · original: https://eur-lex.europa.eu/eli/reg/2024/1689/oj
- **Vigencia comprobada:** en vigor. Es el único acto que modifica el Reglamento de IA según los metadatos oficiales (además de cuatro rectificaciones de 2025 y 2026).
- **Matices y lo que NO dice:** la parte del Ómnibus que toca el **RGPD, la ePrivacy y las cookies es OTRA propuesta (2025/0360(COD)) y NO está aprobada**: el Consejo fijó su mandato el 21-10-2026 y falta la posición del Parlamento. No mezclar las dos.

### Calendario de aplicación (art. 113, tras el Ómnibus)
- **Regla:**
  - **1-8-2024:** entrada en vigor.
  - **2-2-2025:** capítulos I y II (definiciones, **alfabetización** y **prácticas prohibidas**).
  - **2-8-2025:** modelos de IA de uso general (cap. V), gobernanza, sanciones (cap. XII, salvo el art. 101) y otros.
  - **2-8-2026:** fecha general, incluida la **transparencia del art. 50**.
  - **27-7-2026:** arts. 102-110 (nueva letra d).
  - **2-12-2026:** nuevas prohibiciones del art. 5.1 b bis) y b ter) (deepfakes sexuales y material de abuso infantil).
  - **2-12-2027:** alto riesgo del anexo III, es decir, el capítulo III, secciones 1 a 3, salvo el art. 6.5 (antes era el 2-8-2026).
  - **2-8-2028:** alto riesgo del anexo I, es decir, productos regulados (antes era el 2-8-2027).
- **Norma y artículo:** Reglamento de IA art. 113, en la redacción del Reglamento 2026/1744, art. 1, punto 40.
- **Cita literal:** «a) los capítulos I y II serán aplicables a partir del 2 de febrero de 2025, a excepción del artículo 5, apartado 1, párrafo primero, letras b bis) y b ter) […], que serán aplicables a partir del 2 de diciembre de 2026;» · «c) […] i) 2 de diciembre de 2027 en lo que respecta a los sistemas de IA clasificados como de alto riesgo en virtud del artículo 6, apartado 2, y el anexo III, y ii) 2 de agosto de 2028 […] anexo I».
- **Enlace oficial:** https://eur-lex.europa.eu/eli/reg/2026/1744/oj · https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32024R1689#art_113
- **Vigencia comprobada:** redacción vigente desde el 27-7-2026. El párrafo segundo ("Será aplicable a partir del 2 de agosto de 2026") y la letra b) (2-8-2025) **no** se modificaron.
- **Matices y lo que NO dice:** cualquier fuente anterior a julio de 2026 que diga "alto riesgo desde agosto de 2026" está **desfasada**. Las autoridades públicas que usan alto riesgo ya comercializado tienen hasta el 2-8-2030 (art. 111.2 nuevo).

### Quién es "proveedor" y quién "responsable del despliegue"
- **Regla:** **proveedor** es quien desarrolla un sistema de IA o un modelo de IA de uso general (o lo encarga) y lo introduce en el mercado o lo pone en servicio **con su propio nombre o marca**, cobrando o gratis. **Responsable del despliegue** es quien **usa** un sistema de IA bajo su propia autoridad (empresa, autónomo, Administración…), **salvo que el uso sea una actividad personal y no profesional**. Las obligaciones del Reglamento dependen de qué papel se tenga.
- **Norma y artículo:** Reglamento de IA art. 3.3 y 3.4; exclusión del uso personal: art. 2.10; cambio de papel en alto riesgo: art. 25.1.
- **Cita literal:** «"proveedor": una persona física o jurídica, autoridad pública, órgano u organismo que desarrolle un sistema de IA o un modelo de IA de uso general o para el que se desarrolle un sistema de IA o un modelo de IA de uso general y lo introduzca en el mercado o ponga en servicio el sistema de IA con su propio nombre o marca, previo pago o gratuitamente;» (3.3) · «"responsable del despliegue": una persona física o jurídica, o autoridad pública, órgano u organismo que utilice un sistema de IA bajo su propia autoridad, salvo cuando su uso se enmarque en una actividad personal de carácter no profesional;» (3.4)
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02024R1689-20260727#art_3 · art. 6: https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02024R1689-20260727#art_6 · anexo III: https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02024R1689-20260727#anx_III
- **Vigencia comprobada:** art. 3.3 y 3.4 en la redacción original (el Ómnibus 2026/1744 no los toca), aplicables desde el 2-2-2025 (capítulo I). Comprobado en el consolidado oficial 02024R1689-20260727 (23-10-2026).
- **Matices y lo que NO dice:**
  - El art. 2.10 confirma que el Reglamento no se aplica a las obligaciones de los responsables del despliegue que sean **personas físicas** con un uso **puramente personal** y no profesional. Una empresa o un autónomo que usa un chatbot en su trabajo sí es responsable del despliegue de ese uso.
  - Un distribuidor, importador, responsable del despliegue o tercero pasa a ser **proveedor de un sistema de alto riesgo** si le pone su nombre o marca, lo modifica sustancialmente o cambia su finalidad de modo que pase a ser de alto riesgo (art. 25.1).
  - **Qué es alto riesgo, en general (art. 6):** 1) un sistema que es componente de seguridad de un producto (o es el propio producto) regulado por la legislación de armonización del **anexo I** y que necesita una evaluación de la conformidad por un tercero (6.1); 2) los sistemas del **anexo III** (6.2). El anexo III es una **lista de ámbitos y usos concretos**: biometría; infraestructuras críticas; educación y formación profesional; empleo, gestión de trabajadores y acceso al autoempleo; acceso a servicios privados esenciales y a servicios y prestaciones públicos esenciales; garantía del cumplimiento del Derecho; migración, asilo y control de fronteras; y administración de justicia y procesos democráticos. Estar en un ámbito no basta: hay que mirar el uso concreto que describe la lista.
  - **Excepción (6.3):** un sistema del anexo III no es de alto riesgo si no plantea un riesgo importante para la salud, la seguridad o los derechos fundamentales; por ejemplo, si solo hace una tarea de procedimiento limitada, mejora el resultado de una actividad humana ya hecha, detecta patrones sin sustituir la valoración humana o hace una tarea preparatoria. Pero **siempre** es de alto riesgo si elabora perfiles de personas físicas. El proveedor que se acoja a la excepción tiene que documentar su evaluación (6.4).
  - El Ómnibus añadió los apartados 6.1 bis a 6.1 quater. Concretan qué cuenta y qué no como componente de seguridad (no cuenta lo que solo sirve para asistencia al usuario, rendimiento, eficiencia, automatización, comodidad o control de calidad, salvo que su fallo pueda poner en peligro la salud o la seguridad). Y dicen que no basta una evaluación por un tercero exigida solo por riesgos ajenos a la salud y la seguridad.
  - Las obligaciones de alto riesgo del anexo III se aplican desde el **2-12-2027** (ver calendario).

### Prácticas de IA prohibidas
- **Regla:** desde el **2-2-2025** está prohibido: la manipulación subliminal o engañosa que cause perjuicio; explotar vulnerabilidades (edad, discapacidad, situación social o económica); la puntuación social; predecir delitos solo por el perfil; crear bases de reconocimiento facial con extracción masiva de internet o CCTV; reconocer emociones en el trabajo y en centros educativos (salvo por motivos médicos o de seguridad); la categorización biométrica para deducir datos sensibles; y la identificación biométrica remota en tiempo real en espacios públicos por la policía (con excepciones). **Desde el 2-12-2026** se añaden: sistemas que generan o manipulan imágenes íntimas o sexuales realistas de una persona identificable **sin su consentimiento** (b bis) y material de abuso sexual infantil (b ter). Multa por infringir el art. 5: hasta **35 millones** o el **7 %** del volumen de negocio mundial (la cifra mayor).
- **Norma y artículo:** Reglamento de IA art. 5.1 a)-h); nuevas letras b bis), b ter) y apdos. 1 bis y 1 ter (Reglamento 2026/1744, art. 1.7); multas: art. 99.3.
- **Cita literal:** «b bis) la introducción en el mercado, la puesta en servicio o la utilización de un sistema de IA que genere o manipule imágenes, vídeos o audios realistas o material similar de las partes íntimas de una persona física identificable, o de una persona física identificable que participe en actividades sexualmente explícitas, sin el consentimiento […] de dicha persona […]».
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32024R1689#art_5 · https://eur-lex.europa.eu/eli/reg/2026/1744/oj
- **Vigencia comprobada:** letras a)-h) aplicables desde el 2-2-2025; letras b bis) y b ter), desde el 2-12-2026 (aún **no** aplicables a 23-10-2026).
- **Matices y lo que NO dice:** según el nuevo apdo. 1 bis, para quien comercializa el sistema la prohibición b bis/b ter solo se aplica si esa generación es su finalidad o un resultado razonablemente previsible sin salvaguardias. Para quien lo usa, solo si lo usa con ese fin. Las multas las fija cada Estado dentro de esos máximos (art. 99.1). Para pymes y empresas emergentes se aplica la cifra menor en todas las multas, también las del art. 5 (art. 99.6). El nuevo art. 99.6 bis extiende la cifra menor a las "pequeñas empresas de mediana capitalización" **solo para las multas de los apartados 4 y 5**, no para las de prácticas prohibidas (apartado 3).

### Alfabetización en IA (art. 4): redacción suavizada
- **Regla:** quienes desarrollan o usan sistemas de IA (incluida una pyme que usa IA en su actividad profesional) adoptan medidas para **apoyar la promoción** de la alfabetización en IA de su personal y de quien use la IA en su nombre, según sus conocimientos y el contexto de uso. **No se exige garantizar un nivel concreto** de alfabetización.
- **Norma y artículo:** Reglamento de IA art. 4, sustituido por el Reglamento 2026/1744, art. 1.5.
- **Cita literal (vigente):** «Los proveedores y responsables del despliegue de sistemas de IA adoptarán medidas para apoyar la promoción de la alfabetización en materia de IA de su personal […]. Esta obligación no exige que los proveedores o los responsables del despliegue garanticen un nivel específico de alfabetización en materia de IA de ninguna persona en particular.»
- **Enlace oficial:** https://eur-lex.europa.eu/eli/reg/2026/1744/oj (art. 1, punto 5) · original: https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32024R1689#art_4
- **Vigencia comprobada:** obligación aplicable desde el **2-2-2025**; la redacción nueva, más suave, rige desde el **27-7-2026**. La redacción original decía «adoptarán medidas para garantizar que, en la mayor medida posible, su personal […] tengan un nivel suficiente de alfabetización».
- **Matices y lo que NO dice:** no exige certificados, cursos concretos ni horas mínimas. La Comisión publicará ejemplos prácticos (4.2 nuevo). Un uso puramente personal y no profesional no convierte a alguien en "responsable del despliegue" (art. 3.4, verificado: «salvo cuando su uso se enmarque en una actividad personal de carácter no profesional»).

### Obligaciones de transparencia (art. 50)
- **Regla:** desde el **2-8-2026**: (1) el **proveedor** de un chatbot o de otro sistema que interactúa directamente con personas lo diseña para que estas sepan que hablan con una IA, salvo que sea evidente (la obligación del 50.1 es del proveedor); (2) quien proporciona IA generativa marca su contenido en un formato legible por máquina y detectable como artificial; (3) quien usa reconocimiento de emociones o categorización biométrica informa a las personas expuestas; (4) quien usa IA para crear **ultrasuplantaciones (deepfakes)** lo hace público, y quien publica **texto generado por IA para informar al público sobre asuntos de interés público** lo divulga, salvo que haya revisión humana o control editorial con un responsable editorial. La información se da de forma clara a más tardar en la primera interacción o exposición.
- **Norma y artículo:** Reglamento de IA art. 50.1-50.5; transición del art. 111.4 (nuevo); art. 50.7 modificado (códigos de buenas prácticas).
- **Cita literal:** «Los responsables del despliegue de un sistema de IA que genere o manipule imágenes o contenidos de audio o vídeo que constituyan una ultrasuplantación harán público que estos contenidos o imágenes han sido generados o manipulados de manera artificial.» (50.4) · «Los proveedores […] que generen contenido sintético […] y se hayan introducido en el mercado antes del 2 de agosto de 2026 adoptarán las medidas necesarias para cumplir lo dispuesto en el artículo 50, apartado 2, a más tardar el 2 de diciembre de 2026.» (111.4)
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32024R1689#art_50 · https://eur-lex.europa.eu/eli/reg/2026/1744/oj
- **Vigencia comprobada:** **aplicable desde el 2-8-2026** (fecha general del art. 113, no cambiada). Solo el marcado del 50.2, para sistemas comercializados antes de esa fecha, tiene margen hasta el **2-12-2026**.
- **Matices y lo que NO dice:** en obras manifiestamente creativas, satíricas o de ficción, el aviso del deepfake se limita a revelar que existe, sin estropear la obra (50.4). El art. 50 **no** obliga a un particular que usa ChatGPT para sí mismo a etiquetar todo; las obligaciones son para proveedores y responsables del despliegue en los supuestos citados.

### Multas del Reglamento de IA (art. 99): tres niveles y regla para pymes
- **Regla:**
  - **Nivel 1 (prácticas prohibidas del art. 5):** hasta **35 millones de euros** o el **7 %** del volumen de negocios mundial del ejercicio anterior (99.3).
  - **Nivel 2 (otras obligaciones):** hasta **15 millones** o el **3 %** (99.4). Cubre las obligaciones de proveedores (art. 16), representantes autorizados (22), importadores (23), distribuidores (24), proveedores y operadores del art. 25.2 y 25.4 (letra d bis, nueva), responsables del despliegue (26), organismos notificados y **transparencia del art. 50**.
  - **Nivel 3:** dar información inexacta, incompleta o engañosa a los organismos notificados o a las autoridades cuando la piden: hasta **7,5 millones** o el **1 %** (99.5).
  - En las empresas se aplica la cifra **mayor**. Para las **pymes** (incluidas las empresas emergentes), en todos los niveles, la **menor** de las dos (99.6). Para las **pequeñas empresas de mediana capitalización**, también la menor, pero **solo en los niveles 2 y 3** (99.6 bis).
- **Norma y artículo:** Reglamento de IA art. 99.3, 99.4, 99.5, 99.6 y 99.6 bis (este último y la letra d bis del 99.4, introducidos por el Reglamento 2026/1744); definiciones de pyme y de pequeña empresa de mediana capitalización: art. 3.14 bis y 3.14 ter.
- **Cita literal:** «En el caso de las pymes, incluidas las empresas emergentes, cada una de las multas a que se refiere el presente artículo podrá ser por el porcentaje o el importe a que se refieren los apartados 3, 4 y 5, según cuál de ellos sea menor.» (99.6) · «En el caso de las pequeñas empresas de mediana capitalización, cada multa a que se refieren los apartados 4 y 5 no excederá de los porcentajes o importes mencionados en dichos apartados, aplicándose el menor de ellos.» (99.6 bis)
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02024R1689-20260727#art_99 · https://eur-lex.europa.eu/eli/reg/2026/1744/oj
- **Vigencia comprobada:** consolidado oficial 02024R1689-20260727. Los apartados 3 a 6 tienen la redacción original. El 99.1, la letra d bis) del 99.4 y el 99.6 bis son del Reglamento 2026/1744 y rigen desde el 27-7-2026. El régimen de sanciones (capítulo XII, salvo el art. 101) se aplica desde el 2-8-2025 (art. 113 b).
- **Matices y lo que NO dice:** son **máximos**: cada Estado fija su régimen de sanciones (99.1) y, al imponerlas, tiene en cuenta las circunstancias del caso (lista del 99.7) y los intereses y la viabilidad económica de pymes y pequeñas empresas de mediana capitalización (99.1). Cada Estado decide si se puede multar a las Administraciones públicas y cuánto (99.8). Los proveedores de **modelos de IA de uso general** no van por este artículo: les multa la **Comisión**, con hasta el 3 % o 15 millones, la cifra mayor (art. 101). La pyme se define con la Recomendación 2003/361/CE y la pequeña empresa de mediana capitalización con la Recomendación (UE) 2025/1099 (umbrales no revisados aquí). La ley española de sanciones (AESIA) no está comprobada (Dudas, n.º 9).

### Estado del resto del "Ómnibus digital" (RGPD, ePrivacy y cookies)
- **Regla:** la propuesta de Ómnibus digital que modifica el **RGPD** (seudonimización, investigación, plazo de las brechas…) y las **cookies** de la Directiva ePrivacy **NO es ley**. El Consejo aprobó su mandato negociador el **21-10-2026**; las negociaciones con el Parlamento empezarán cuando el Parlamento fije su posición.
- **Norma y artículo:** procedimiento 2025/0360(COD); documento del Consejo ST-14756/26.
- **Cita literal:** (nota de prensa del Consejo, 21-10-2026) «Following today's approval of the Council's mandate, the Council presidency will start negotiations with the European Parliament once the latter adopts its own negotiating position […]».
- **Enlace oficial:** https://www.consilium.europa.eu/en/press/press-releases/2026/10/21/digital-rulebook-council-agrees-position-to-simplify-data-protection-privacy-and-cyber-reporting-rules/
- **Vigencia comprobada:** propuesta en tramitación. Los metadatos oficiales no registran ningún acto que modifique el RGPD (solo las rectificaciones de 2016, 2018 y 2021).
- **Matices y lo que NO dice:** las skills deben citar el RGPD **tal como está** (72 h, 250 trabajadores, cookies con consentimiento) y, como mucho, mencionar que hay reformas propuestas.

---

## E. Firma electrónica y validez de los contratos

### Tipos de firma electrónica y sus efectos (eIDAS)
- **Regla:** hay tres niveles. **Simple:** cualquier dato electrónico que se usa para firmar. **Avanzada:** vinculada al firmante de forma única, lo identifica, está bajo su control exclusivo y detecta cualquier cambio posterior. **Cualificada:** avanzada + dispositivo cualificado + certificado cualificado. A **ninguna** se le pueden negar efectos jurídicos ni que se admita como prueba solo por ser electrónica o por no ser cualificada. **Solo la cualificada equivale por ley a la firma manuscrita**, y se reconoce en toda la UE.
- **Norma y artículo:** Reglamento (UE) 910/2014 (eIDAS), art. 3.10-12 (definiciones), **art. 25.1-2** (efectos), art. 26 (avanzada) y art. 24 bis (reconocimiento en toda la UE, introducido por el Reglamento 2024/1183).
- **Cita literal:** «No se denegarán efectos jurídicos ni admisibilidad como prueba en procedimientos judiciales a una firma electrónica por el mero hecho de ser una firma electrónica o porque no cumpla los requisitos de la firma electrónica cualificada.» (25.1) · «Una firma electrónica cualificada tendrá un efecto jurídico equivalente al de una firma manuscrita.» (25.2)
- **Enlace oficial:** https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02014R0910-20241018#art_25 · reforma: https://eur-lex.europa.eu/eli/reg/2024/1183/oj
- **Vigencia comprobada:** vigente (consolidado de 18-10-2024). La reforma 2024/1183 **suprimió el antiguo art. 25.3** (reconocimiento transfronterizo de la cualificada) y lo trasladó al **art. 24 bis.1**. Rectificaciones de eIDAS registradas hasta el 15-10-2026; no se han revisado una a una (ver Dudas).
- **Matices y lo que NO dice:** eIDAS **no** dice que una firma simple (un clic, un trazo en la pantalla o un PDF con imagen) valga como la manuscrita: dice que no se le pueden negar efectos solo por ser electrónica; su fuerza como prueba depende del caso. Una "firma con DocuSign o similar" suele ser simple o avanzada. Solo es cualificada si es avanzada, «se crea mediante un dispositivo cualificado de creación de firmas electrónicas» **y** se basa en un certificado cualificado (art. 3.12), de un prestador de la lista de confianza. Tener un certificado cualificado no basta por sí solo: firmar con un certificado digital instalado en el navegador o el ordenador no convierte la firma en cualificada si no se usa un dispositivo cualificado.

### Documentos electrónicos y prueba en España (Ley 6/2020 + LEC)
- **Regla:** los documentos electrónicos tienen el valor que les corresponde según su naturaleza (público, administrativo o privado). Si se impugna un documento privado firmado con un servicio **no cualificado**, quien lo presenta puede pedir un cotejo pericial o proponer otra prueba; si no se acredita su autenticidad, el juez lo valora «conforme a las reglas de la sana crítica» (LEC 326.2 y 326.3). Si se usó un servicio **cualificado** que estaba en la lista de confianza, **se presume** que es correcto y la carga de probar lo contrario pasa a quien lo impugna (con costas y una posible multa de 300 a 1.200 € si la impugnación es temeraria).
- **Norma y artículo:** Ley 6/2020 art. 3; LEC art. 326.3 y 326.4 (redacción de la Ley 6/2020).
- **Cita literal:** «Los documentos electrónicos públicos, administrativos y privados, tienen el valor y la eficacia jurídica que corresponda a su respectiva naturaleza, de conformidad con la legislación que les resulte aplicable.» (Ley 6/2020, 3.1) · «Si se hubiera utilizado algún servicio de confianza cualificado […] se presumirá que el documento reúne la característica cuestionada […]» (LEC 326.4)
- **Enlace oficial:** https://www.boe.es/buscar/act.php?id=BOE-A-2020-14046#a3 · https://www.boe.es/buscar/act.php?id=BOE-A-2000-323#a326
- **Vigencia comprobada:** vigentes (art. 3 sin modificar; LEC 326, última redacción de 12-11-2020).
- **Matices y lo que NO dice:** la Ley 6/2020 no crea "tipos de firma" propios: se remite a eIDAS. Si nadie impugna un documento privado, hace prueba plena (LEC 326.1).

### Libertad de forma de los contratos (Código Civil) y contratos electrónicos
- **Regla:** en España, por regla general, un contrato obliga **sea cual sea su forma** (verbal, escrito, electrónico) si tiene consentimiento, objeto y causa. Hay excepciones en las que la ley exige escritura pública u otra forma (art. 1280: actos sobre inmuebles, capitulaciones, ciertos poderes…), pero aun así las partes pueden exigirse cumplir esa forma (art. 1279). Los contratos electrónicos son válidos sin pacto previo sobre el medio, y el soporte electrónico cumple el requisito de "por escrito".
- **Norma y artículo:** Código Civil arts. 1278, 1279 y 1280; LSSI arts. 23 y 24.
- **Cita literal:** «Los contratos serán obligatorios, cualquiera que sea la forma en que se hayan celebrado, siempre que en ellos concurran las condiciones esenciales para su validez.» (CC 1278) · «Siempre que la Ley exija que el contrato o cualquier información relacionada con el mismo conste por escrito, este requisito se entenderá satisfecho si el contrato o la información se contiene en un soporte electrónico.» (LSSI 23.3)
- **Enlace oficial:** https://www.boe.es/buscar/act.php?id=BOE-A-1889-4763#art1278 · https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a23
- **Vigencia comprobada:** art. 1278 en su redacción original (1889), vigente; LSSI 23 vigente.
- **Matices y lo que NO dice:** el título de contratación electrónica de la LSSI no se aplica a los contratos de derecho de familia y sucesiones. Los que exigen por ley documento público o la intervención de juez, notario, registrador o autoridad se rigen por su legislación específica (23.4). Sobre el art. 1280 CC: la forma que exige no impide que el contrato obligue, porque las partes pueden exigirse cumplirla (art. 1279). En qué casos concretos la forma es requisito de validez no está en esta ficha. El último párrafo del art. 1280 (los contratos de más de 1.500 pesetas, por escrito) sigue en el texto, pero no condiciona la validez (por el art. 1278). Ojo: el art. 24 LSSI aún cita la derogada Ley 59/2003 de firma electrónica. Este es el derecho civil común; algunas comunidades con derecho civil propio (por ejemplo, Cataluña) tienen normas propias no revisadas aquí.

---

## F. Autoridad: reclamar ante la AEPD

### Cómo se presenta una reclamación
- **Regla:** cualquier persona puede reclamar ante la autoridad de su residencia habitual, de su trabajo o del lugar de la infracción (en España, la AEPD). Se hace **preferentemente por la sede electrónica**, con el formulario de cada tipo: derechos no atendidos, publicidad no deseada, morosidad, videovigilancia u "otros". **Si es por un derecho (acceso, supresión…), antes hay que habérselo pedido al responsable** (o a su DPD) por un medio que deje constancia. La AEPD tiene **3 meses** para decidir si admite la reclamación; si no decide, se entiende admitida (FAQ 13.08). Si la reclamación es solo por un derecho no atendido, la AEPD resuelve en **6 meses** desde que notifica al reclamante la admisión a trámite, y si no resuelve se puede entender estimada (LOPDGDD 64.1).
- **Norma y artículo:** RGPD art. 77.1; LOPDGDD art. 64.1 (procedimiento por derechos) y art. 65 (admisión); Ley 39/2015 arts. 14 y 16.4 (canales); requisitos de cada formulario en la resolución de la AEPD publicada como BOE-A-2023-16062.
- **Cita literal:** (AEPD, FAQ 13.09) «Sí, siempre que su reclamación no se refiera al ejercicio de un derecho, en cuyo caso deberá dirigirse previamente al responsable del tratamiento, por cualquiera de los canales que tenga establecidos, o al Delegado de Protección de Datos (DPD) […]» · (LOPDGDD 64.1) «[…] el plazo para resolver el procedimiento será de seis meses […]. Transcurrido ese plazo, el interesado podrá considerar estimada su reclamación.»
- **Enlace oficial:** derechos no atendidos: https://sedeaepd.gob.es/sede-electronica/procedures/claims/rights · publicidad («Publicidad / Comunicaciones comerciales»): https://sedeaepd.gob.es/sede-electronica/procedures/claims/advertising · índice de formularios de reclamación: https://sedeaepd.gob.es/sede-electronica/procedures/claims · videovigilancia: https://sedeaepd.gob.es/sede-electronica/procedures/claims/surveillance · otros: https://sedeaepd.gob.es/sede-electronica/procedures/claims/buzon-guiado/Q500 · FAQ: https://www.aepd.es/preguntas-frecuentes/13-reclamaciones/FAQ-1301-como-puedo-interponer-una-reclamacion-si-han-vulnerado-mis-datos-de-caracter-personal · https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673#a6-6
- **Vigencia comprobada:** las FAQ de la AEPD se consultaron en vivo el 23-10-2026. LOPDGDD art. 64 vigente.
- **Matices y lo que NO dice:** según la AEPD (FAQ 13.08, leída el 23-10-2026), en las demás infracciones puede haber actuaciones previas de investigación de hasta 18 meses desde la admisión; si se abre un procedimiento sancionador, se resuelve en 12 meses como máximo, y uno de apercibimiento, en 6. Reclamar es gratis. La AEPD no da indemnizaciones: eso va por los tribunales (art. 82 RGPD). En Cataluña y el País Vasco, las autoridades autonómicas son competentes para el sector público de su territorio (no revisado aquí en detalle). Esperar el mes (o los 3 meses con prórroga) del art. 12.3 antes de reclamar es lo prudente; la FAQ solo exige haberse dirigido antes al responsable. La publicidad no deseada tiene un **formulario propio, distinto del de derechos**, que se llama **«Publicidad / Comunicaciones comerciales»**. Primero pregunta por el canal: correo electrónico, SMS, mensajería tipo WhatsApp o Telegram, llamadas o publicidad postal. La sede (Trámites > Reclamaciones) tiene seis opciones: «Morosidad, deudas impagadas no reconocidas», «Publicidad / Comunicaciones comerciales», «Solicitudes de derechos no atendidas», «Videovigilancia», «Otros» y «Canal prioritario de retirada de contenidos sexuales/violentos» (comprobado en vivo el 23-10-2026).

---

## Dudas y lo que no pude confirmar

1. **Recurso Latombe (C-703/25 P):** consta como **pendiente** en InfoCuria. Hay un **auto de 04/06/2026 (ECLI:EU:C:2026:465)** cuyo contenido no leí (probablemente procesal: intervenciones o similar, pero **no confirmado**). No hay fecha de vista ni conclusiones de abogado general localizadas. Tampoco confirmé en fuente oficial si la Comisión ha hecho una segunda revisión periódica del DPF (la primera es del 9-10-2024).
2. **Riesgo para el DPF tras la sentencia del Tribunal Supremo de EE. UU. sobre la FTC (2026):** solo lo leí en despachos (Skadden, julio de 2026). No es una fuente oficial y no cambia la vigencia.
3. **Propuesta "Ómnibus IV" (2025/0130(COD), registro de actividades):** el estado está confirmado en el EU Law Tracker oficial. Hay un acuerdo provisional, refrendado por el Coreper el 26-6-2026 y aprobado por la comisión del Parlamento el 2-7-2026. No consta la votación final ni la publicación. Los metadatos oficiales no registran ningún acto que modifique el RGPD. Lo que **no** he leído es el texto acordado, así que no sé qué umbral fija (750 era la propuesta inicial). Tratar como **no aprobada** y avisar de que puede aprobarse en cualquier momento.
4. **Ómnibus digital de datos (RGPD y cookies):** confirmado solo el mandato del Consejo (21-10-2026), en su nota de prensa oficial; no leí el texto del mandato (ST-14756/26). No sé si el Parlamento ha votado algo en comisión.
5. **Proyecto de Ley Orgánica de menores en entornos digitales (exp. 121/000052, edad de 14 a 16):** el BOE consolidado mantiene los 14 años (sin cambios en el art. 7). Con la disolución de las Cortes (RD 806/2026), los asuntos pendientes del Congreso caducan (art. 207 del Reglamento del Congreso, comprobado en el BOE). No he verificado en la web del Congreso que el proyecto siguiera pendiente el 5-10-2026, pero no hay ninguna ley orgánica publicada que cambie el art. 7. Un Congreso nuevo tendría que volver a empezar.
6. **Texto completo de las CCT 2021/914:** no lo descargué; solo verifiqué su vigencia en los metadatos oficiales y por la ausencia de actos que la deroguen.
7. **Consolidado oficial del Reglamento de IA con el Ómnibus:** **sí existe**: CELEX 02024R1689-20260727 (comprobado el 23-10-2026 en la Oficina de Publicaciones; los arts. 4 y 113 coinciden con lo que dice esta ficha). Enlace: https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02024R1689-20260727. Las citas del Ómnibus están tomadas del propio Reglamento 2026/1744 (DO). Hay cuatro rectificaciones del Reglamento de IA (2025-2026) que no revisé; podrían afectar a la redacción en español de algún artículo citado.
8. **eIDAS:** hay rectificaciones registradas en 2025 y 2026 (la última, de 15-10-2026) posteriores al consolidado de 18-10-2024. No las revisé; no parecen afectar al art. 25, pero no está confirmado.
9. **Ley española de IA (gobernanza y sanciones, AESIA):** no comprobé si el anteproyecto de 2025 se ha aprobado. El art. 99 del Reglamento de IA deja a cada Estado el régimen de sanciones.
10. **Lista de la AEPD de tratamientos que requieren EIPD (art. 35.4):** no la descargué.
11. **LOPDGDD art. 33 (encargado) y art. 31 (registro):** no revisé su texto literal.
12. **(Añadido 23-10-2026)** No revisé el texto de los arts. 93 y 94 de la LOPDGDD (derecho al olvido en buscadores y redes), ni las cuantías de las multas de la LSSI (art. 39), ni los umbrales de la Recomendación (UE) 2025/1099 (pequeña empresa de mediana capitalización).
13. **(Añadido 23-10-2026)** La AEPD no dice en el formulario de publicidad si hay que haberse opuesto antes ante el remitente. La FAQ 13.09 solo lo exige para las reclamaciones por derechos. No está confirmado.
14. **(Añadido 23-10-2026)** El consolidado oficial 02024R1689-20260727 solo recoge **dos** rectificaciones (C1, DO de 9-10-2025, y C2, DO de 4-5-2026). La Duda 7 habla de cuatro rectificaciones (2025-2026). Puede que las otras dos sean posteriores al consolidado o que no afecten a la versión española. No está comprobado.

## Fuentes consultadas

**Oficina de Publicaciones de la UE / EUR-Lex (textos y metadatos oficiales):**
- RGPD consolidado 04.05.2016: https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02016R0679-20160504 (descargado vía http://publications.europa.eu/resource/celex/02016R0679-20160504)
- Reglamento de IA 2024/1689: https://eur-lex.europa.eu/eli/reg/2024/1689/oj
- Reglamento (UE) 2026/1744, Ómnibus digital sobre IA (DO L de 24.7.2026): https://eur-lex.europa.eu/eli/reg/2026/1744/oj
- eIDAS consolidado 18.10.2024: https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:02014R0910-20241018 · Reglamento 2024/1183: https://eur-lex.europa.eu/eli/reg/2024/1183/oj
- Decisión 2021/914 (CCT): https://eur-lex.europa.eu/eli/dec_impl/2021/914/oj · Decisión 2023/1795 (DPF): https://eur-lex.europa.eu/eli/dec_impl/2023/1795/oj
- Punto SPARQL de la Oficina de Publicaciones (actos que modifican o derogan y estado "en vigor"): https://publications.europa.eu/webapi/rdf/sparql

**BOE (textos consolidados):**
- LOPDGDD: https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673
- LSSI: https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758
- Ley 6/2020: https://www.boe.es/buscar/act.php?id=BOE-A-2020-14046
- Código Civil: https://www.boe.es/buscar/act.php?id=BOE-A-1889-4763
- Ley de Enjuiciamiento Civil: https://www.boe.es/buscar/act.php?id=BOE-A-2000-323

**TJUE:** InfoCuria, asunto C-703/25 P: https://curia.europa.eu/juris/liste.jsf?num=C-703/25&language=es

**Comisión Europea:** https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/eu-us-data-transfers_en · https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en

**Consejo de la UE:** https://www.consilium.europa.eu/en/press/press-releases/2026/10/21/digital-rulebook-council-agrees-position-to-simplify-data-protection-privacy-and-cyber-reporting-rules/

**AEPD:**
- https://www.aepd.es/preguntas-frecuentes/13-reclamaciones/FAQ-1301-como-puedo-interponer-una-reclamacion-si-han-vulnerado-mis-datos-de-caracter-personal
- https://www.aepd.es/preguntas-frecuentes/13-reclamaciones/FAQ-1309-posibilidad-de-reclamar-directamente-ante-incumplimiento
- https://www.aepd.es/preguntas-frecuentes/13-reclamaciones/FAQ-1308-plazos-para-contestar-una-reclamacion (solo el extracto de búsqueda)
- https://www.aepd.es/guias/guia-cookies.pdf · https://www.aepd.es/prensa-y-comunicacion/notas-de-prensa/aepd-actualiza-guia-cookies-para-adaptarla-a-nuevas-directrices-cepd · https://www.aepd.es/areas-de-actuacion/innovacion-y-tecnologia

**Solo como pista (no oficiales):** resultados de búsqueda sobre el estado del recurso Latombe, el Ómnibus IV y el proyecto de ley de menores (secureprivacy.ai, privacy-daily.com, Skadden, Better Regulation, blogs de la UOC y de Sepin, controlcongreso.com).

## Registro de la revisión independiente (23-10-2026)

**Qué se comprobó.** Los 35 puntos (###) originales de la ficha (más el nuevo, 36 en total), contra textos descargados el 23-10-2026:
- RGPD consolidado (Cellar, CELEX 02016R0679-20160504).
- Reglamento de IA original (32024R1689), su consolidado nuevo (02024R1689-20260727) y el Reglamento (UE) 2026/1744 (32026R1744, DO L de 24-7-2026).
- eIDAS consolidado (02014R0910-20241018).
- Consulta SPARQL de la Oficina de Publicaciones (actos que modifican el RGPD, el Reglamento de IA y eIDAS, y versiones consolidadas).
- LOPDGDD, LSSI, Ley 6/2020, LEC, Código Civil y Reglamento del Congreso, vía la API de datos abiertos del BOE.
- Guía de cookies de la AEPD (PDF de mayo de 2024); FAQ 13.01, 13.08 y 13.09 de la AEPD.
- Nota de prensa del Consejo de 21-10-2026; EU Law Tracker (2025/0130(COD)); InfoCuria C-703/25 P.

**Cambio reciente del Reglamento de IA: CONFIRMADO.**
- El Reglamento (UE) 2026/1744, «de 8 de julio de 2026», se publicó en el DO L el 24-7-2026 y «entrará en vigor a los tres días de su publicación» (art. 4), es decir, el 27-7-2026. El Consejo dice que el acto se adoptó el 29-6-2026; la fecha del acto (firma) es el 8-7-2026.
- Comprobados literalmente: el nuevo art. 4 (punto 5), el art. 5.1 b bis/b ter, 1 bis y 1 ter (punto 7), el art. 50.7 (punto 20), el art. 99.1 y 6 bis (punto 38), el art. 111.2 y 111.4 (punto 39) y el art. 113 a), c) y d) (punto 40).
- Según SPARQL, es el único acto que modifica el Reglamento de IA.

**Ómnibus del RGPD: CONFIRMADO que no está aprobado.**
- El Consejo fijó su mandato el 21-10-2026 (nota de prensa leída) y espera a la posición del Parlamento.
- SPARQL: ningún acto modifica el RGPD; solo constan propuestas (52025PC0501, Ómnibus IV, y 52025PC0837, Ómnibus digital).

**Cambios hechos en la ficha:**
1. *Categorías especiales*, matiz.
   - Decía: «(ver sección E)». Dice ahora: «(ver sección D, último punto)».
   - Motivo: el Ómnibus del RGPD está en D; E es firma.
2. *Edad del consentimiento digital*, matiz y Duda 5.
   - Decía: el proyecto de LO de menores «sigue en tramitación».
   - Dice ahora: no es ley y, con la disolución de las Cortes (RD 806/2026), los asuntos pendientes del Congreso caducan; si seguía en trámite, ha caducado.
   - Fuente: Reglamento del Congreso, art. 207 (BOE-A-1982-5196); RD 806/2026 (BOE-A-2026-20742).
3. **Punto nuevo**, *Comprobar la identidad de quien ejerce un derecho*.
   - Contenido: RGPD art. 12.6 con cita literal. Solo cabe con «dudas razonables» y solo la «información adicional necesaria»; el RGPD no exige una copia del DNI.
   - Motivo: lo necesita `respuesta-legal`.
4. *Encargado del tratamiento*, matiz.
   - Se añade: la autorización general de subencargados obliga a informar de los cambios y da derecho a oponerse (28.2, cita literal); la supresión o devolución al terminar la elige el responsable (28.3 g); el RGPD no exige un "certificado de borrado".
   - Motivo: lo usan `cumplimiento-normativo` y `revisar-proveedor`.
5. *Registro de actividades*, matiz y Duda 3.
   - Decía: que el Ómnibus IV «no aparece como aprobado» y que no se pudo confirmar su estado.
   - Dice ahora: según el EU Law Tracker, hay un acuerdo provisional (Coreper, 26-6-2026; comisión del Parlamento, 2-7-2026), sin votación final ni publicación. Sigue sin estar aprobado, pero puede aprobarse pronto.
6. *Cookies*, matiz.
   - Se añade lo que la propia guía de la AEPD recoge del dictamen 8/2024 del CEPD: en las grandes plataformas, la alternativa solo de pago en general no basta.
   - Fuente: guía AEPD de mayo de 2024, apartado sobre muros de cookies.
7. *Calendario del Reglamento de IA*.
   - Se precisa que el 2-12-2027 se refiere al capítulo III, secciones 1 a 3, salvo el art. 6.5.
   - Fuente: art. 113 c) en la redacción del 2026/1744.
8. *Prácticas prohibidas*, matiz de multas. **Error corregido.**
   - Decía: que la cifra menor para pymes del 99.6 «ahora también vale» para las pequeñas empresas de mediana capitalización (99.6 bis), en el contexto de las multas del art. 5.
   - Dice ahora: el 99.6 bis solo cubre las multas de los apartados 4 y 5, no las de prácticas prohibidas.
   - Fuente: Reglamento 2026/1744, art. 1, punto 38 c).
9. *Transparencia (art. 50)*, regla.
   - Decía: «los chatbots… deben avisar de que es una IA».
   - Dice ahora: el **proveedor** diseña el sistema para que la persona sepa que habla con una IA, porque el 50.1 obliga al proveedor.
   - Fuente: Reglamento de IA, art. 50.1.
10. *Tipos de firma*, matiz.
    - Decía: que una firma es cualificada «si usa un certificado cualificado».
    - Dice ahora: hace falta además un dispositivo cualificado de creación de firma (art. 3.12 eIDAS, cita literal); un certificado digital instalado en el ordenador no basta por sí solo.
11. *Documentos electrónicos*, regla.
    - Decía: que, si se impugna un documento con un servicio no cualificado, quien lo presenta «tiene que probarlo».
    - Dice ahora: puede pedir un cotejo pericial u otra prueba y, si no se acredita, el juez lo valora con las reglas de la sana crítica.
    - Fuente: LEC 326.2 y 326.3.
12. *Libertad de forma*, matiz del art. 23.4 LSSI.
    - Decía: que la LSSI «excluye» lo que requiera notario o registrador.
    - Dice ahora: el título no se aplica a familia y sucesiones, y lo que exige forma pública o la intervención de juez, notario o registrador se rige por su legislación específica. Se añade la relación entre los arts. 1279 y 1280 CC.
    - Fuente: LSSI 23.4; CC 1279 y 1280.
13. *Reclamación ante la AEPD*, regla y matiz.
    - Los 6 meses cuentan desde que se notifica la admisión a trámite (LOPDGDD 64.1, texto literal).
    - Se añaden los plazos de la FAQ 13.08, leída hoy: 3 meses para admitir (si no, admitida); 18 meses de actuaciones previas; 12 meses del sancionador; 6 del apercibimiento.
14. *Dudas*, n.º 7: el consolidado 02024R1689-20260727 **existe** y coincide con la ficha en los arts. 4 y 113.

**Confirmado sin cambios:**
- Citas de los arts. 5.2, 6.1, 7.3, 4.11, 8.1, 9.1, 12.3, 12.5, 28.3, 30.5, 32.1, 33.1, 34.1, 35.1, 45.1 y 83.4-83.5 del RGPD.
- LOPDGDD arts. 7, 11.2-11.3, 12, 13.3-13.4, 22, 34, 64 y 88-89. Su última modificación es la del art. 23, publicada el 27-12-2025.
- LSSI arts. 10, 20, 21, 22.2 y 23; Ley 6/2020 art. 3; LEC 326.4 (multa de 300 a 1.200 €); CC 1278.
- eIDAS art. 25.1-25.2 y art. 24 bis.
- Guía de cookies de mayo de 2024: rechazar al mismo nivel que aceptar; seguir navegando no es consentir; sin casillas premarcadas.
- C-703/25 P pendiente, con auto de 4-6-2026, cuyo texto no está disponible en Cellar (sigue en Dudas).
- Anclas del BOE: #a7, #a1-3 (art. 11), #a1-4 (art. 12), #a1-5 (art. 13), #a2-4 (art. 22), #a3-6 (art. 34), #a6-6 (art. 64), #a8-9 y #a8-10; CC #art1278.

**Sin respaldo oficial (sigue en Dudas):** el contenido del auto C-703/25 P, el texto del mandato del Consejo, el texto del acuerdo provisional del Ómnibus IV y la lista de EIPD de la AEPD.

**Puntos y cambios añadidos tras las pruebas (23-10-2026)** (textos descargados de nuevo hoy):
- Cabecera, fecha del Código Civil: se mantiene el **03/01/2025** y se explica qué es. Es la fecha de la última norma modificadora, la LO 1/2025 (BOE-A-2025-76): es la última versión que trae el XML consolidado y es lo que dice la página act.php («Última actualización publicada el 03/01/2025»). El 07-09-2026 es el `fecha_actualizacion` técnico de los metadatos de la API, no una modificación. Fuente: API de datos abiertos del BOE, `/legislacion-consolidada/id/BOE-A-1889-4763/metadatos` y `/texto`, y https://www.boe.es/buscar/act.php?id=BOE-A-1889-4763.
- Punto nuevo (A), *Derecho de supresión*: RGPD art. 17.1-17.3 y LOPDGDD arts. 15 y 32. Fuente: Cellar, CELEX 02016R0679-20160504 (`#art_17`), y API del BOE BOE-A-2018-16673 (bloques a1-7 y a3-4, versión única de 2018).
- Punto nuevo (A), *Derecho de oposición y mercadotecnia directa*: RGPD art. 21 (21.2 y 21.3 literales) y LOPDGDD arts. 15.2, 18 y 23. El art. 23.1 fue modificado por la Ley 10/2025 (BOE-A-2025-26698), vigente desde el 28-12-2025. Fuente: Cellar 02016R0679-20160504 (`#art_21`); API del BOE BOE-A-2018-16673 (a1-10 y a2-5).
- Punto nuevo (C), *Darse de baja de las comunicaciones comerciales*: LSSI art. 22.1 literal; infracciones 38.3 d) y 38.4 h); la sanciona la AEPD (43.1). Fuente: API del BOE BOE-A-2002-13758 (a22, a38 y a43); última versión del art. 22, de la Ley 9/2014.
- Punto nuevo (D), *Proveedor y responsable del despliegue*: arts. 3.3, 3.4, 2.10, 25.1 y 6, y lista de ámbitos del anexo III. Fuente: consolidado oficial CELEX 02024R1689-20260727 (Cellar, generado el 11-8-2026).
- Punto nuevo (D), *Multas del Reglamento de IA*: arts. 99.3-99.6 bis, 3.14 bis y ter, 101 y 113 b). Fuente: consolidado 02024R1689-20260727 (marcas ▼M1 en 99.1, 99.4 d bis y 99.6 bis).
- Punto F, *Reclamación ante la AEPD*: se añade el nombre oficial del formulario de publicidad («Publicidad / Comunicaciones comerciales»), que es distinto del de derechos, y las seis opciones de la sede. Enlace comprobado: funciona y abre el cuestionario por canal. Fuente: https://sedeaepd.gob.es/sede-electronica/procedures/claims/advertising y https://sedeaepd.gob.es/sede-electronica/procedures/claims, renderizadas en vivo el 23-10-2026.
- Dudas 12-14 añadidas.
- Anclas nuevas comprobadas en act.php: LOPDGDD #a1-7, #a1-10, #a2-5 y #a3-4; LSSI #a22, #a38 y #a43. EUR-Lex (en el XHTML oficial): RGPD art_17 y art_21; Reglamento de IA art_3, art_6, art_99 y anx_III.
