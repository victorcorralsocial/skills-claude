# Limpio

Fácil de leer: subtítulos en minúscula, la palabra que suena sobre una pastilla azul y zooms de vez en cuando.

```json
{
  "fuente": "Poppins",
  "peso": 700,
  "mayusculas": false,
  "tamano": 76,
  "palabrasPorGrupo": 3,
  "posicion": "bajo",
  "colorTexto": "#FFFFFF",
  "colorActivo": "#FFFFFF",
  "resaltado": "pastilla",
  "colorResaltado": "#2F6BFF",
  "contorno": true,
  "animacion": "suave",
  "colorCaja": "#FFFFFF",
  "colorTextoCaja": "#111111",
  "colorAcento": "#2F6BFF",
  "zoomEnCortes": 1.08,
  "zoomGolpe": 1.22,
  "zoomsPorMinuto": 6,
  "cartelesPorMinuto": 2,
  "pausaMaxima": 0.25,
  "velocidad": 1.0,
  "centroCara": 0.45
}
```

## Qué es cada campo (vale para todos los estilos)

| Campo | Qué cambia | Valores |
|---|---|---|
| `fuente` | Letra de subtítulos y rótulos | Poppins, Montserrat, Inter, Nunito, Anton, Bebas Neue, Archivo Black, Oswald, DM Serif Display, Bricolage Grotesque |
| `peso` | Grosor de la letra | 400 (normal) a 900 (muy gruesa) |
| `mayusculas` | Todo en mayúsculas | `true` / `false` |
| `tamano` | Tamaño de los subtítulos | 56 (discreto) a 100 (enorme) |
| `palabrasPorGrupo` | Cuántas palabras salen a la vez | 1 a 5 |
| `posicion` | Altura de los subtítulos | `bajo` (lo más abajo posible), `medio`, `alto` |
| `colorTexto` / `colorActivo` | Color de las palabras / de la que suena | color en hexadecimal |
| `resaltado` | Cómo se marca la palabra que suena | `pastilla` (fondo de color), `color` (cambia de color), `ninguno` |
| `colorResaltado` | Color de esa marca | hexadecimal |
| `contorno` | Sombra negra para leer sobre cualquier fondo | `true` / `false` |
| `animacion` | Cómo entra cada grupo | `suave`, `pop`, `ninguna` |
| `colorCaja` / `colorTextoCaja` / `colorAcento` | Rótulo del gancho y carteles: fondo, letra y la palabra marcada con `*asteriscos*` | hexadecimal |
| `zoomEnCortes` | Cuánto se acerca la imagen en cortes alternos (disimula los saltos) | 1 (nada) a 1.15 |
| `zoomGolpe` | Cuánto acerca un zoom de golpe | 1.1 a 1.4 |
| `zoomsPorMinuto` | Cuántos zooms pone Claude | 0 a 20 |
| `cartelesPorMinuto` | Cuántos carteles de texto pone Claude | 0 a 6 |
| `pausaMaxima` | Silencio más largo que se deja (s) | 0.15 (ritmo muy rápido) a 0.5 (calmado) |
| `velocidad` | Acelera la voz sin cambiar el tono | 1 a 1.15 |
| `centroCara` | Altura de la cara (0 arriba, 1 abajo): ahí apuntan los zooms. Cada vídeo puede cambiarla en su escaleta | 0.3 a 0.6 |
