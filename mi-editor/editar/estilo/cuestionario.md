# Cómo se crea el estilo

El estilo se guarda en la ruta que te da `empezar.mjs` (normalmente `~/.editar-claude/estilo.md`). Se crea la primera vez que se usa `/editar` y se cambia cuando el usuario lo pida («cambia mi estilo», «quiero los subtítulos más grandes»…).

## 1. ¿Hay referencia?
Si el usuario pasa **capturas** de un vídeo que le gusta, míralas y saca de ahí: la letra más parecida de la lista, mayúsculas o no, cuántas palabras salen a la vez, dónde van, el color de la palabra que suena y si lleva fondo. Si pasa **un vídeo**, saca 6 fotogramas desde la carpeta de edición (ahí ya está ffmpeg) y míralos:
```bash
npx remotion ffmpeg -v error -i "<vídeo>" -vf "fps=1/3,scale=540:-1" -frames:v 6 revision/referencia-%d.png
```
Solo el estilo: no copies logos ni marcas de nadie.

## 2. Preguntas (solo las que la referencia no responda), todas de una vez
1. **Aspecto:** Limpio · Minimalista · Llamativo (en `limpio.md`, `minimalista.md` y `llamativo.md`; descríbelos en una línea cada uno). También puede mandarte una captura de un vídeo que le guste.
2. **Subtítulos:** ¿grandes o discretos? ¿Abajo o en el medio? ¿En mayúsculas?
3. **Palabras a la vez:** una (muy dinámico) · dos o tres · cuatro o cinco (tranquilo).
4. **Color principal:** el de su marca o uno que le guste. Acepta nombres («verde lima») y pásalos a hexadecimal.
5. **Letra:** redonda y amable (Poppins, Nunito) · seria (Inter, Montserrat) · de impacto (Anton, Bebas Neue, Archivo Black) · con personalidad (DM Serif Display, Bricolage Grotesque).
6. **Ritmo:** calmado · normal · rápido.

Si dice «el que tú veas» o «da igual», usa Limpio tal cual y sigue.

## 3. Escribir el estilo
Copia el aspecto elegido, aplica las respuestas y escribe el estilo en esa ruta con el mismo formato: una línea que lo describe y un bloque ```json con **todos** los campos (qué es cada uno: tabla de `limpio.md`).

Para que se lea bien en el móvil:
- `tamano` entre 56 y 110. Con 1-2 palabras a la vez puede ir grande; con 4-5, no más de 70.
- Si la letra es clara, `contorno: true`.
- Anton, Bebas Neue, Archivo Black y DM Serif Display solo tienen un grosor: `peso: 400`.
- Ritmo calmado: `pausaMaxima` 0.4, `zoomsPorMinuto` 2-3, `velocidad` 1. Normal: 0.25, 6, 1. Rápido: 0.15, 12-15, 1.1.

Cuéntale el estilo en tres líneas (letra, subtítulos, ritmo) y sigue con la edición.
