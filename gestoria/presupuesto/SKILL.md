---
name: presupuesto
description: Prepara un presupuesto o propuesta para un cliente en España, con el IVA y la retención bien puestos (el precio final con impuestos si el cliente es un particular), lo que incluye y lo que no, plazos, forma de pago y condiciones claras para cobrar sin problemas. Úsala cuando alguien diga "hazme un presupuesto", "¿cuánto le cobro?", "prepárame una propuesta para este cliente", "pásame esto a presupuesto" o cuente un encargo y quiera enviarle precio.
---

# Presupuesto para un cliente (España)

Conviertes un encargo en un presupuesto que el cliente entiende y que protege a quien lo envía: qué se hace, cuánto cuesta con impuestos, cuándo y cómo se paga, y qué pasa si cambia algo.

## 1. Contexto (pregunta solo lo que falte)
1. **El encargo:** qué hay que hacer, para cuándo, y lo que el cliente ha pedido con sus palabras.
2. **Quién es el cliente:** particular (consumidor), empresa o autónomo. Cambia el IVA que se enseña y la retención.
3. **Su precio:** por hora, por proyecto o por partidas. Si no lo sabe, ayúdale a desglosarlo (horas × tarifa, materiales, desplazamientos) sin inventar precios de mercado.
4. **Su actividad, fecha de alta y si es profesional** (retención del 15 % o del 7 %).

## 2. Qué lleva el presupuesto
- **Partidas** claras con su importe.
- **Base, IVA y total** (`iva-facturas.md` para el tipo). A un **particular**, el precio final con impuestos bien visible (`autonomos-cobros-clientes.md`). A una **empresa o autónomo**, base, IVA y retención si aplica (`irpf-autonomos.md`), y el total que cobrará.
- **Lo que incluye y lo que no** (rondas de cambios, desplazamientos, materiales, derechos de uso).
- **Plazos** de entrega y **validez** del presupuesto.
- **Forma de pago:** señal, plazos, vencimiento. Entre empresas, el plazo de pago dentro del máximo legal de la ficha.
- **Si cambia el encargo:** cómo se presupuesta lo nuevo.
- **Aceptación:** cómo se acepta (firma, respuesta por correo).

## 3. Formato
```
## Presupuesto [N.º] · [cliente] · [fecha]
> Aviso: no es asesoramiento; fuentes comprobadas a [fecha].
[tabla de partidas] · Base · IVA · (Retención) · **Total**
**Incluye:** … **No incluye:** … **Plazo:** … **Pago:** … **Validez:** … **Aceptación:** …
### Notas para ti (no se envían)
[por qué ese precio, qué negociar, avisos de la ficha]
```

---

## Reglas que esta skill no se salta nunca
0. **Cuándo preguntar:** solo lo imprescindible; si no, supón lo razonable, escríbelo y sigue.
1. **No es asesoramiento.** Una línea al empezar.
2. **Solo afirmas lo que está en las fichas** (tipos de IVA, retención, plazo de pago, precio a consumidores), con su enlace. Precios de mercado: nunca inventados; como mucho «compara con otros presupuestos».
3. **Lo que está en «Dudas» no lo afirmas.**
4. **Fecha de las fuentes:** **27-10-2026**.
5. **Cálculos a la vista.**
6. **No se envía nada sin OK.**
7. **Lenguaje:** español neutro; el presupuesto, en el trato que la persona use con su cliente.

## Fuentes
- `iva-facturas.md` · `irpf-autonomos.md` · `autonomos-cobros-clientes.md`.

---
*Adaptación a España de la skill `proposal-builder` del plugin «Small Business» de Anthropic ([anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins), licencia Apache 2.0), traducida y modificada. No es un producto de Anthropic ni está respaldada por Anthropic.*
