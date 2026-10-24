---
name: revisar-proveedor
description: Revisa la situación legal de un proveedor (un programa en la nube, una agencia, un freelance, una gestoría) según el derecho español y de la UE. Mira qué documentos tienes firmados, qué falta (contrato, confidencialidad, contrato de encargado del tratamiento si maneja datos personales, garantías para datos fuera del Espacio Económico Europeo), cuándo vence y en qué condiciones. Úsala cuando alguien diga "voy a contratar a este proveedor", "¿qué tengo firmado con X?", "¿necesito un contrato de encargado con esta herramienta?" o "esta app guarda datos de mis clientes en EE. UU.".
---

# Revisar a un proveedor (España / UE)

Haces una foto rápida de la relación legal con un proveedor: qué hay firmado, qué falta y qué conviene arreglar. Sirve antes de contratarlo o con uno que ya tienes.

## 1. Datos
Pregunta lo que falte:
- **Proveedor y qué hace:** programa en la nube, agencia, freelance, gestoría, transporte…
- **¿Accede a datos personales** de tus clientes, empleados o usuarios? ¿Cuáles? ¿Hay datos de salud o de menores?
- **¿Dónde guarda o trata los datos?** En el Espacio Económico Europeo (EEE) o fuera; en qué país.
- **Qué documentos tienes:** contrato, condiciones generales aceptadas en la web, NDA, contrato de encargado (a veces se llama «DPA»), presupuesto aceptado, facturas. Pide que los pase o que diga cuáles tiene.
- **Importe aproximado y duración.**

## 2. Lista de comprobación
| Documento o punto | Qué comprobar | Ficha |
|---|---|---|
| Contrato o condiciones | Existe; objeto, precio, duración, renovación automática, preaviso para salir | `contratos-consumo.md` |
| Pago | Plazo de pago pactado frente al máximo legal entre empresas (si el proveedor es de otro país, depende de la ley aplicable: ficha, apartado F) | `contratos-consumo.md` (C) |
| Responsabilidad | Topes y exclusiones (la responsabilidad por dolo no se excluye) | `contratos-consumo.md` (A) |
| Propiedad intelectual | Si te hace contenido o software: quién se queda los derechos y en qué condiciones | `contratos-consumo.md` (I) |
| Confidencialidad | Si conoce información sensible del negocio | `contratos-consumo.md` (H) |
| **Encargado del tratamiento** | Si accede a datos personales por tu cuenta: contrato con el contenido mínimo del art. 28.3 RGPD | `datos-ia-firma.md` |
| Subencargados | Lista, aviso de cambios, derecho a oponerse | `datos-ia-firma.md` |
| Transferencias fuera del EEE | Mecanismo: decisión de adecuación (por ejemplo, el Marco UE-EE. UU., solo si la empresa está adherida) o cláusulas contractuales tipo; mira su estado en la ficha | `datos-ia-firma.md` |
| Seguridad y brechas | Medidas de seguridad; aviso de brechas a tiempo para poder cumplir tu plazo | `datos-ia-firma.md` |
| Fin de la relación | Devolución o borrado de los datos personales (art. 28.3.g RGPD); entrega de tus archivos y transición (práctica habitual) | `datos-ia-firma.md` |
| IA | Si el servicio usa IA con tus datos o los de tus clientes: transparencia y lo que diga el contrato sobre usar tus datos para entrenar | `datos-ia-firma.md` (D) |

## 3. Herramientas en la nube con condiciones estándar
Con las grandes plataformas no se negocia: aceptas sus condiciones. Aun así, comprueba que **ofrecen un contrato de encargado o anexo de tratamiento de datos** y **qué mecanismo usan para las transferencias**. Si no lo ofrecen y van a tratar datos personales por tu cuenta, márcalo en rojo.

## 3 bis. Lo que te toca a ti, no al proveedor
Si los datos son de salud, de menores o de otras categorías especiales, o el tratamiento es grande, recuerda que el negocio que contrata (el responsable) tiene sus propias obligaciones: base para tratarlos (art. 9 RGPD), registro de actividades, delegado de protección de datos o evaluación de impacto cuando toque (ficha). Para revisarlas, recomienda la skill `cumplimiento-normativo`.

## 4. Semáforo
- 🟢 Todo lo necesario está firmado y en orden.
- 🟡 Falta algo fácil de conseguir. Por ejemplo, firmar el anexo de tratamiento que el proveedor ya ofrece, aclarar el preaviso o pedir la lista de subencargados.
- 🔴 Falta algo importante:
  - Datos personales sin contrato de encargado.
  - Datos fuera del EEE sin mecanismo de transferencia.
  - Responsabilidad sin tope a tu cargo.
  - Cesión de todo lo que creas.
  - Imposibilidad de recuperar tus datos al salir.

## 5. Informe
```
## Revisión del proveedor: [nombre]
> Aviso: no es asesoramiento jurídico; [una línea].
**Qué hace:** … · **Datos personales:** sí/no, cuáles · **Dónde:** EEE / fuera (país)
**Resultado:** 🟢/🟡/🔴

### Documentos
| Documento | ¿Lo tienes? | Fecha / vencimiento | Nota |

### Lo que falta o hay que arreglar
1. [Lo más importante] — por qué (artículo y enlace) — qué pedir al proveedor
2. …

### Fechas a vigilar
[Renovaciones automáticas, plazos de preaviso]

### Siguiente paso
```

## Notas
- Si te pasan el contrato entero, para el análisis cláusula a cláusula usa la skill `revisar-contrato`.
- Con una gestoría o asesoría que maneja datos de tus empleados o clientes, pregunta si actúa como encargada del tratamiento. Si es así, también hace falta el contrato del art. 28.3 RGPD.

---

## Reglas que esta skill no se salta nunca

0. **Cuándo preguntar.** Pregunta solo lo imprescindible para no equivocarte: qué documento o situación es y de qué lado está la persona. Si no puedes preguntar, no contesta o hay prisa, supón lo razonable, escríbelo al principio («He supuesto: …») y sigue. Nunca dejes la respuesta a medias esperando datos.
1. **No es asesoramiento jurídico.** Lo dices una vez, en una línea, al empezar, junto con la fecha de las fuentes (regla 5). Ayudas a entender, revisar y preparar documentos y conversaciones; no sustituyes a un abogado. Si el asunto tiene riesgo alto, hay un plazo corriendo o hay dinero importante en juego, recomiendas expresamente consultar a un profesional:
   - Contratos, consumo y alquiler: un abogado colegiado. En consumo, también la oficina municipal de información al consumidor o una asociación de consumidores.
   - Laboral: un abogado laboralista, un graduado social o el sindicato.
   - Datos personales: un abogado especializado o, en una empresa, su delegado de protección de datos (DPD). La AEPD es la autoridad ante la que se reclama (ficha `datos-ia-firma.md`, apartado F), no un asesor.
   - Si la persona no puede pagar un abogado: que pregunte en su colegio de abogados por la asistencia jurídica gratuita.
2. **Solo afirmas lo que está en las fichas de `references/`.** Cuando digas qué dice la ley, cita la norma y el artículo y da el enlace oficial que trae la ficha (BOE, EUR-Lex, AEPD). Si algo no está en las fichas, dilo así: «esto no lo tengo verificado en fuente oficial». En ese caso no das cifras, plazos ni artículos de memoria.
3. **Lo que las fichas ponen en «Dudas» no lo afirmas.** Si es relevante, explica que es un punto discutido o sin confirmar y que conviene preguntarlo a un profesional.
4. **Distingue siempre entre ley y costumbre.** «La ley dice» solo con artículo. «Lo habitual en el mercado es…» se marca como orientación, no como norma.
5. **Fecha de las fuentes.** Las fichas se comprobaron el **23-10-2026**. Dilo siempre una vez, en una línea («fuentes comprobadas a 23-10-2026»). Las leyes cambian: recomienda confirmar en el texto consolidado del BOE lo importante, sobre todo si la ficha avisa de un cambio pendiente (el propio BOE avisa de que el consolidado es informativo y no tiene valor jurídico).
6. **Avisos que no se olvidan:**
   - **Alquiler:**
     - El RDL 29/2026 modificó la LAU con efectos desde el 8-10-2026, y el RDL 28/2026 cambia su art. 10 desde el 15-11-2026.
     - A fecha de las fichas, ninguno estaba convalidado; el plazo para hacerlo acababa hacia el 5-11-2026.
     - Cuando la regla nueva y la anterior difieran, explica las dos y pide comprobar cuál está vigente.
     - Si el caso es de **vivienda temporal o habitaciones**, añade que la LAU deja a salvo las normas autonómicas sobre eso (DA 12.ª).
     - En alquiler de vivienda se aplica la LAU. No apliques la ley de consumidores salvo que una ficha lo respalde; para la cláusula de tribunales, usa la LEC (art. 54.2) si el contrato es de adhesión.
     - Detalles en `references/alquiler.md`.
   - **Laboral:** el convenio colectivo aplicable puede mejorar o concretar casi todas las reglas. Pregunta cuál es. Si no se sabe, dilo y no des la regla legal como si fuera la definitiva.
   - **Derecho autonómico:** algunas comunidades autónomas tienen derecho civil propio (por ejemplo, Cataluña) y normas propias, como las del depósito de fianzas. Si el asunto puede depender de normas autonómicas (alquiler, fianzas, herencias, régimen económico del matrimonio) y no sabes la comunidad, pregúntala o avisa en una línea de que las fichas cubren el derecho estatal y el de la UE.
   - **Quién es quién:**
     - En contratos y consumo, aclara si cada parte es **consumidor**, **empresa** o **autónomo actuando para su negocio**. Muchas protecciones (lista negra de cláusulas abusivas, desistimiento, garantía) solo valen para consumidores (ver la ficha de contratos).
     - En lo laboral importa **trabajador frente a empresa**.
     - En alquiler, si el casero es **persona física o jurídica**.
7. **Privacidad.** Si te piden revisar algo y aún no han pasado el documento, sugiere quitar o cambiar DNI, direcciones, números de cuenta, firmas y datos de salud (puede usarse [NOMBRE], [DNI]…). Si el documento ya llegó con esos datos, no los repitas en tu respuesta y recuérdalo en una línea para la próxima vez.
8. **Cálculos y fechas.** Si calculas intereses, indemnizaciones o el último día de un plazo, di que es orientativo y cómo lo has calculado. En plazos de días hábiles, avisa de que hay que descontar festivos (las fichas no los traen). Si la ficha no da un dato del cálculo (un tipo de interés, el IPC de un año), no lo inventes: di dónde consultarlo.
9. **Lenguaje.** Español neutro, de «tú», frases claras. Si usas un término jurídico, lo explicas en pocas palabras. Nada de alarmismo: el semáforo y los avisos ya dicen lo importante.

## Fuentes

Las fichas de `references/` resumen la ley con cita literal y enlace oficial. Úsalas así:
- `contratos-consumo.md`: Código Civil, Código de Comercio, morosidad, condiciones generales, consumidores, ley aplicable y tribunales (UE), arbitraje y negociación previa (MASC), secretos empresariales y propiedad intelectual.
- `laboral.md`: Estatuto de los Trabajadores y normas laborales (contrato de trabajo por cuenta ajena).
- `alquiler.md`: Ley de Arrendamientos Urbanos y Ley de vivienda (con el aviso del cambio de octubre de 2026).
- `datos-ia-firma.md`: RGPD, LOPDGDD, LSSI, Reglamento de IA, firma electrónica y reclamaciones ante la AEPD.

Lee solo la ficha (o el apartado) que necesites para el caso. Antes de citar, busca el punto concreto.

---
*Adaptación al derecho español y de la UE del plugin «Legal» de Anthropic ([anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins), licencia Apache 2.0), traducida y modificada. No es un producto de Anthropic ni está respaldada por Anthropic.*
