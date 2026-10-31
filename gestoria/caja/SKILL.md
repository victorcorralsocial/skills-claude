---
name: caja
description: Previsión de caja de un autónomo o pequeño negocio en España a 30, 60 y 90 días, separando el dinero que de verdad es tuyo del que tendrás que pagar (IVA, IRPF del trimestre, cuota de autónomos). Responde a "¿llego a fin de mes?", "¿cuánto puedo gastar?", "¿cuánto aparto para Hacienda?" y avisa de los meses flojos con nombre y cifra. Úsala cuando alguien diga "¿llego a fin de mes?", "previsión de caja", "¿me puedo permitir esto?", "¿cuánto tengo que guardar para impuestos?" o "voy justo".
---

# Previsión de caja (España)

Miras el dinero que hay, el que va a entrar y el que va a salir, y respondes con una cifra: cuánto hay de verdad disponible y cuándo puede faltar. El error típico del autónomo es contar como suyo el IVA cobrado y la parte del IRPF que tocará pagar: aquí se separan siempre.

## 1. Recibir los datos
Saldo de hoy (o extracto del banco), facturas pendientes de cobro, gastos fijos (alquiler, cuota de autónomos, seguros, suscripciones), pagos previstos y, si lo hay, el historial de cobros de los últimos meses. Excel, CSV, PDF o lista escrita.

## 2. Contexto (pregunta solo lo que falte)
1. **Saldo de hoy** en la cuenta del negocio.
2. **Fijos mensuales** y su día de cargo.
3. **Facturas pendientes de cobro** con su vencimiento.
4. **Profesional o empresario, fecha de alta y método** (para estimar el 130 y la retención).
5. **Cuota de autónomos** que paga (o su tramo).

## 3. Cómo se calcula
1. **Cuándo pagan de verdad los clientes:** con el historial, el retraso medio de cada cliente (si no hay historial, el vencimiento y dilo). Una factura vencida hace más de 90 días va aparte como «dudosa», no dentro de la previsión.
2. **Entradas** por ventanas de 30, 60 y 90 días, con la fecha esperada de cobro.
3. **Salidas:** fijos, pagos previstos y **los impuestos** en su fecha (`iva-facturas.md` e `irpf-autonomos.md` para plazos; `autonomos-cobros-clientes.md` para la cuota):
   - **IVA del trimestre:** el IVA repercutido menos el deducible de las facturas del trimestre en curso se paga en el plazo del 303.
   - **IRPF (130):** estimación con el 20 % del rendimiento acumulado menos retenciones y pagos anteriores, si le toca.
   - **Cuota de autónomos** cada mes.
4. **Disponible de verdad** = saldo − IVA pendiente de pagar − 130 estimado − fijos hasta la fecha.
5. **Margen de error:** da un rango (por ejemplo ± 10-25 %) según lo seguro que sea cada cobro, y di de dónde sale.

## 4. Riesgos con nombre
Señala solo los que existan, con cifra y fecha:
- Un mes en el que el saldo previsto baja de los fijos de un mes.
- Mucho dinero en un solo cliente que paga tarde.
- Un pago de impuestos que coincide con un mes flojo.
- Facturas dudosas (más de 90 días): recomienda `cobrar-facturas`.

## 5. Formato de la respuesta
```
## Tu caja a [fecha]
> Aviso: previsión orientativa, no es asesoramiento financiero; fuentes comprobadas a [fecha].
**Disponible de verdad hoy:** X € (de los Y € de la cuenta, Z € son de Hacienda)
| | 30 días | 60 días | 90 días |
|---|---|---|---|
| Entra | | | |
| Sale (con impuestos) | | | |
| Saldo previsto | | | |
## Riesgos
## Qué haría yo
[2-3 acciones concretas: reclamar una factura, adelantar o retrasar un gasto, apartar X € al mes]
```

---

## Reglas que esta skill no se salta nunca
0. **Cuándo preguntar:** solo lo imprescindible; si no, supón lo razonable, escríbelo y sigue.
1. **No es asesoramiento financiero ni fiscal.** Una línea al empezar. Nada de recomendar inversiones, préstamos concretos ni productos financieros.
2. **Solo afirmas lo que está en las fichas** (plazos, cuota, porcentajes), con su enlace. Si no está, sin cifras de memoria.
3. **Lo que está en «Dudas» no lo afirmas.**
4. **Fecha de las fuentes:** **27-10-2026**.
5. **Cálculos a la vista, orientativos y en rango.**
6. **Nada de prometer:** «si cobras X a tiempo, llegas», nunca «llegas».
7. **Privacidad:** sin IBAN ni datos personales en la respuesta.
8. **Lenguaje:** español neutro, de «tú», claro y sin alarmismo.

## Fuentes
- `iva-facturas.md` (303 y plazos) · `irpf-autonomos.md` (130 y retenciones) · `autonomos-cobros-clientes.md` (cuota de autónomos, morosidad).

---
*Adaptación a España de la skill `cash-flow-snapshot` del plugin «Small Business» de Anthropic ([anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins), licencia Apache 2.0), traducida y modificada. No es un producto de Anthropic ni está respaldada por Anthropic.*
