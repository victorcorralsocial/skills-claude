# Cómo se calcula la nota

La calcula `scripts/hacer_panel.py` a partir de lo que pones en cada oferta. No la corrijas a mano: si no te cuadra, revisa los requisitos.

**Base (de 1 a 5).** Cada requisito pesa `imprescindible` 3, `importante` 2 y `deseable` 1, y cuenta `si` 1, `parcial` 0,5, `sin_dato` 0,25 y `no` 0. Nota = 1 + 4 × (lo conseguido / el máximo posible).

**Topes**, porque hay cosas que no se compensan con el resto:
| Si… | La nota no pasa de | Por qué |
|---|---|---|
| Un `imprescindible` está en `no` | 2,5 | Se cae en el primer filtro |
| Una condición (zona, jornada o salario) está en `no` | 2,5 | Aunque te cojan, no te conviene |
| Un `imprescindible` está en `sin_dato` | 3,5 | Primero hay que aclararlo |
| La mitad o más de lo `imprescindible` e `importante` (por peso) está en `no` | 2,9 | Te falta el centro del puesto |
| El anuncio da menos de 3 requisitos | 3,9 | Dice demasiado poco para un «Apúntate» |
| Hay una alerta de tipo `fraude` | 1 | No hay nada que puntuar |

El panel enseña el motivo del tope junto a la nota.
