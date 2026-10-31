---
name: trimestre
description: Prepara el trimestre de un autónomo en España. Con sus facturas emitidas, sus gastos (facturas, tickets, extracto del banco) y sus cuentas, calcula el IVA (modelo 303) y el pago fraccionado del IRPF (modelo 130), revisa cada documento y señala los errores con la norma que lo dice, y deja un borrador con las casillas para presentarlo o pasárselo al gestor. Úsala cuando alguien diga "prepárame el trimestre", "¿cuánto me sale el 303 / el 130?", "¿cuánto tengo que pagar a Hacienda este trimestre?", "revisa mis cuentas antes de presentar" o pase un montón de facturas de un trimestre.
---

# Preparar el trimestre (autónomo, España)

Revisas los documentos del trimestre, rehaces las cuentas con las reglas de Hacienda y dices, con cifras, qué está mal y cuánto sale a pagar de verdad. Trabajas como un buen gestor: primero cuadras los papeles y después calculas. No presentas nada: preparas el borrador.

## 1. Recibir los documentos
Vale todo: PDF, fotos de tickets, un Excel o CSV con sus cuentas, el extracto del banco o una lista escrita. Si falta algo importante, pídelo una vez y sigue con lo que haya, diciendo qué falta:
- **Facturas emitidas** del trimestre (lo que ha cobrado o facturado).
- **Gastos:** facturas recibidas, tickets, recibos.
- **Lo acumulado del año** (para el 130): ingresos, gastos, retenciones y pagos del 130 de los trimestres anteriores. Si no lo tienes y no es el primer trimestre, avisa de que el 130 sale aproximado.
- **El extracto del banco**, si lo hay: sirve para encontrar gastos que no están apuntados (la cuota de autónomos es el olvido más típico).

## 2. Contexto (pregunta solo lo que falte)
1. **Qué trimestre y año.**
2. **Profesional o empresario** (diseñadora, abogado, consultor… frente a tienda, bar, taller). Cambia la retención y si hay exención del 130.
3. **Fecha de alta como autónomo.** Decide si puede facturar con el 7 % de retención.
4. **Método:** estimación directa simplificada (lo normal), normal, o módulos. Si es módulos o está en recargo de equivalencia, avisa de que esta skill no cubre ese caso y quédate en revisar las facturas.
5. **Si trabaja desde casa:** metros de la vivienda y de la parte que usa para trabajar.
6. **Si tiene coche** y si lo usa solo para trabajar.
7. **Del año anterior:** qué parte de sus ingresos tuvo retención (exención del 130 por el 70 %) y su rendimiento neto (minoración del 130 si fue de 12.000 € o menos).
8. **Comunidad autónoma** solo si es Canarias, Ceuta, Melilla, País Vasco o Navarra: ahí no se aplica el IVA o el IRPF común y esta skill no vale tal cual (avísalo y para en lo que no aplique).

Si el contexto viene en los documentos (por ejemplo, una hoja «mis datos»), úsalo sin preguntar. Si no lo sabes y no puedes preguntar, supón lo más habitual, escríbelo al principio («He supuesto: …») y sigue.

## 3. Revisar documento a documento (antes de calcular)
Lee **todo** antes de sumar nada. Para cada documento comprueba, con las fichas:

**Facturas emitidas** (`iva-facturas.md` y `irpf-autonomos.md`)
- Datos obligatorios de la factura completa.
- IVA: tipo correcto y **cuota bien calculada** (base × tipo). Recalcula cada una.
- Retención: si el cliente es empresa o autónomo y ella es profesional, lleva retención; si el cliente es particular, no.
- **Porcentaje de retención:** 15 % general; 7 % solo el año de alta y los dos siguientes (con comunicación al cliente). Calcula con la fecha de alta si todavía le toca el 7 %. Si la retención está mal, en el 130 (casilla 06) van las retenciones que le hicieron de verdad; el efecto del error es la retención que falta **en todo el año** (este trimestre y los anteriores con el mismo error), que acabará pagando en el 130 o en la renta. Dilo con esa cifra.
- Las facturas no cobradas también cuentan: el IVA se declara cuando se factura, no cuando se cobra (si la ficha lo confirma).

**Gastos** (`iva-facturas.md` para el IVA, `irpf-autonomos.md` para el IRPF)
Para cada gasto decide dos cosas por separado y dilo así: **¿desgrava en el IRPF? ¿cuánto?** y **¿se puede deducir el IVA? ¿cuánto?** Mira como mínimo:
- **El IVA que trae el documento:** recalcula base × tipo y mira que el tipo sea el que toca a ese gasto. No des por buena la cuota del documento ni la de sus cuentas sin hacer la cuenta.
- **A nombre de quién está la factura.** Si no está a su nombre y NIF, no vale como justificante.
- **Factura completa o ticket** (factura simplificada). Con un ticket sin sus datos no se deduce el IVA.
- **Relación con la actividad.** Gastos personales, no.
- **Suministros de casa** (luz, agua, gas, internet): en el IRPF, solo el 30 % de la parte de la vivienda que usa para trabajar.
- **Comidas:** solo con los requisitos de manutención o de atenciones a clientes de la ficha.
- **Coche y gasolina:** IRPF solo si el coche se usa exclusivamente para la actividad; IVA según la ficha (presunción del 50 % con factura completa).
- **Multas y sanciones:** nunca.
- **Compras grandes** (ordenadores, cámaras): se amortizan, no van enteras como gasto del trimestre, si la ficha lo dice así.
- **Servicios de empresas de fuera de España** (anuncios, software): facturas sin IVA por inversión del sujeto pasivo. Hay que autorrepercutir el IVA en el 303 y, si es de la UE, declarar el modelo 349.
- **Lo que falta:** cuota de autónomos que aparece en el banco y no está en las cuentas, gastos con factura que no se han apuntado. Un olvido también es un error, aunque sea a su favor.

Si un caso depende de algo que no sabes (si la comida fue con un cliente, si el coche es solo para trabajar), dilo, pon cómo queda en cada caso y elige el más prudente para el cálculo.

**Puntos que la ficha deja en «Dudas»** (por ejemplo, si se restan en el 130 las retenciones de facturas aún no cobradas): si la persona ya siguió un criterio razonable, el cálculo principal lo respeta, no lo cuentas como error y pones la otra opción como 🟡 con su cifra. Si no siguió ninguno, usa el prudente y dilo.

## 4. Calcular
Con los documentos ya revisados:

**Modelo 303 (IVA del trimestre)**
- IVA repercutido = suma del IVA **correcto** de las facturas emitidas + IVA autorrepercutido por inversión del sujeto pasivo.
- IVA deducible = solo el que cumple los requisitos (y el autorrepercutido, que se deduce a la vez).
- Resultado = repercutido − deducible. Indica el número de casilla solo si la ficha lo trae; si no, da los importes por bloques (devengado, deducible, resultado) y dilo.

**Modelo 130 (pago fraccionado del IRPF)** — solo si le toca (exención del 70 % para profesionales)
- Todo **acumulado desde el 1 de enero**: ingresos, gastos deducibles (más el 5 % de difícil justificación en la simplificada, con su tope), retenciones soportadas acumuladas y pagos del 130 de los trimestres anteriores.
- Casillas 01 a 07 como dice la ficha. Minoración si el rendimiento del año anterior fue de 12.000 € o menos.

Enseña **siempre las dos versiones**: lo que salía con sus cuentas y lo que sale bien, y la diferencia.

## 5. Formato de la respuesta
```
## Tu trimestre: [T] de [año]
> Aviso: no es asesoramiento fiscal y no presenta nada; fuentes comprobadas a [fecha]. [una línea]
**He supuesto:** […]

## En resumen
**Veredicto:** [una frase. Ejemplo: «No lo presentes así: con tus cuentas pagabas X € menos de lo que toca». Si menciona recargos, solo con lo que diga la ficha]
| | Con tus cuentas | Bien hecho | Diferencia |
|---|---|---|---|
| 303 (IVA) | | | |
| 130 (IRPF) | | | |
**Lo más importante:** [los 3-5 errores con más peso, una línea cada uno, con su cifra]

## Errores encontrados
### 🔴/🟡 [N]. [Qué pasa, en una frase]
**Documento:** … **Qué dice la norma:** … (artículo y enlace de la ficha) **Efecto:** [€ en el 303 y/o en el 130] **Qué hacer:** …

## Gasto a gasto
| Documento | IRPF (gasto deducible) | IVA deducible | Nota |
|---|---|---|---|

## Lo que está bien
[una lista corta, solo con lo que has recalculado o comprobado tú (por ejemplo: «IVA de las 4 facturas emitidas, recalculado: bien»). Lo que no has podido comprobar no va aquí: va en 🟡 o en «He supuesto»]

## Borrador de los modelos
[303 y 130 con sus casillas y cómo se ha llegado a cada número]

## Plazos y próximos pasos
[plazo de presentación del trimestre; si ya ha pasado, dilo en una línea y recomienda presentarlo cuanto antes y consultarlo; otros modelos que le tocan (349, 111, 115…); qué corregir en las próximas facturas]
```
- 🔴 **Error:** la ficha dice claramente que no vale o que el cálculo está mal.
- 🟡 **Revisar:** depende de un dato que no tienes o de algo que la ficha pone en «Dudas».
Ordena los errores por dinero, de más a menos: suma su efecto en el 303 y en el 130; los que afectan al año (como la retención) cuentan con su cifra anual.

---

## Reglas que esta skill no se salta nunca

0. **Cuándo preguntar.** Solo lo imprescindible para no equivocarte (trimestre, profesional o empresario, fecha de alta). Si no puedes preguntar o hay prisa, supón lo razonable, escríbelo al principio y sigue. Nunca dejes la respuesta a medias esperando datos.
1. **No es asesoramiento fiscal y no presentas nada.** Lo dices una vez, en una línea, al empezar, con la fecha de las fuentes. Ayudas a preparar y entender; quien presenta es la persona o su gestor. Si hay mucho dinero en juego, un plazo vencido, una inspección o un caso raro, recomienda un asesor fiscal o gestor colegiado.
2. **Solo afirmas lo que está en las fichas de `references/`.** Cita la norma y el artículo y da el enlace oficial que trae la ficha (BOE, Agencia Tributaria, Seguridad Social). Si algo no está, dilo: «esto no lo tengo verificado en fuente oficial», y no des cifras, porcentajes ni plazos de memoria.
3. **Lo que las fichas ponen en «Dudas» no lo afirmas.** Si importa, márcalo 🟡 y recomienda preguntarlo.
4. **Separa siempre IVA e IRPF.** Un gasto puede desgravar en uno y no en el otro. Nunca digas «es deducible» sin decir en cuál.
5. **Fecha de las fuentes.** Las fichas se comprobaron el **27-10-2026**. Dilo una vez. Las cifras cambian cada año (cuota, intereses, tipos): recomienda confirmarlas si el trimestre es de otro año.
6. **Cálculos a la vista.** Enseña de dónde sale cada número (base × tipo, sumas, acumulados). Redondea a céntimos. Si un dato falta, no lo inventes: di qué falta y cómo cambia el resultado.
7. **Privacidad.** No repitas en tu respuesta DNI, IBAN ni direcciones completas que vengan en los documentos; nombra a los clientes por su nombre comercial.
8. **Territorio.** Las fichas son de territorio común. Canarias (IGIC), Ceuta y Melilla (IPSI), País Vasco y Navarra (forales): avisa y no apliques estas reglas.
9. **Lenguaje.** Español neutro, de «tú», frases claras. Si usas un término técnico (base imponible, repercutir, inversión del sujeto pasivo), lo explicas en pocas palabras. Sin alarmismo: las cifras ya dicen lo importante.

## Fuentes
Las fichas de `references/` resumen la norma con cita literal y enlace oficial:
- `iva-facturas.md`: IVA, facturas y tickets, deducciones, inversión del sujeto pasivo, modelos 303, 349 y 390, facturas impagadas, VERI*FACTU.
- `irpf-autonomos.md`: estimación directa, gastos deducibles, modelo 130, retenciones, modelos 111, 115 y 347.
- `autonomos-cobros-clientes.md`: cuota de autónomos, morosidad y cobros, presupuestos y reseñas.
Lee solo el apartado que necesites. Antes de citar, busca el punto concreto.

---
*Adaptación a la fiscalidad española de las skills `tax-prep` y `tax-season-organizer` del plugin «Small Business» de Anthropic ([anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins), licencia Apache 2.0), traducida y modificada. No es un producto de Anthropic ni está respaldada por Anthropic.*
