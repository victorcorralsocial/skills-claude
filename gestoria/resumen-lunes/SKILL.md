---
name: resumen-lunes
description: El resumen del lunes de tu negocio en una página - cómo va el dinero (cobrado, pendiente, gastado, lo que es de Hacienda), qué cobras y qué pagas esta semana, qué impuestos o plazos vencen, y las 3 cosas que harías primero. Úsala cuando alguien diga "resumen del lunes", "¿cómo va el negocio?", "empiezo la semana, ¿qué tengo?", "ponme al día" o "¿qué tengo que hacer esta semana?".
---

# Resumen del lunes (negocio)

Una sola página para empezar la semana sabiendo dónde está el dinero y qué toca. Juntas lo que harían por separado `caja`, `cobrar-facturas` y `calendario-fiscal`, en versión corta.

## 1. Recibir los datos
Lo que haya: extracto del banco o saldo, facturas emitidas y pendientes, gastos, agenda de la semana (encargos, reuniones), y el resumen de la semana pasada si existe. Si falta algo, el resumen sale igual con lo que hay y lo dice.

## 2. Qué lleva (en este orden)
1. **El dinero en una línea:** saldo, de eso cuánto es de Hacienda (IVA y 130 estimados del trimestre en curso), y disponible de verdad.
2. **La semana pasada:** facturado, cobrado, gastado, frente a la anterior.
3. **Cobros:** quién debe y desde cuándo (con el tono que tocaría; los mensajes, con `cobrar-facturas`).
4. **Pagos y plazos de la semana:** impuestos, cuota, proveedores (`calendario-fiscal`).
5. **Encargos y reuniones** de la semana, si están en los datos.
6. **Las 3 cosas que harías primero**, concretas («reclamar la F-032 a Café Ruzafa», «apartar 600 € para el 303»).

## 3. Formato
Una página, sin relleno:
```
## Lunes [fecha]
**Dinero:** X € en la cuenta · Y € son de Hacienda · **Z € disponibles**
| Semana pasada | Facturado | Cobrado | Gastado |
### Cobros pendientes · ### Pagos y plazos de la semana · ### Agenda
### Lo primero
1. … 2. … 3. …
```

---

## Reglas que esta skill no se salta nunca
1. **No es asesoramiento.** Una línea al empezar, con la fecha de las fuentes.
2. **Solo afirmas lo que está en las fichas** (plazos, cuota, porcentajes), con su enlace.
3. **Lo que está en «Dudas» no lo afirmas.**
4. **Fecha de las fuentes:** **27-10-2026**.
5. **Estimaciones dichas como estimaciones.**
6. **Nada se envía ni se paga.**
7. **Privacidad:** sin NIF, IBAN ni datos personales.
8. **Lenguaje:** español neutro, de «tú», corto.

## Fuentes
- `iva-facturas.md` · `irpf-autonomos.md` · `autonomos-cobros-clientes.md`.

---
*Adaptación a España de las skills `monday-brief` y `business-pulse` del plugin «Small Business» de Anthropic ([anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins), licencia Apache 2.0), traducida y modificada. No es un producto de Anthropic ni está respaldada por Anthropic.*
