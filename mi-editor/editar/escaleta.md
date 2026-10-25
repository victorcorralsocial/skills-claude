# Cómo se escribe escaleta.json

Los números son los de cada palabra en `transcripcion.txt` (`palabra·12` es la 12).

```json
{
  "tomas": [
    { "desde": 0, "hasta": 12 },
    { "desde": 81, "hasta": 92 }
  ],
  "correcciones": { "1": "Claude", "49": "Claude." },
  "gancho": { "texto": "Mi Claude tiene *abogado*", "hasta": 4 },
  "zooms": [
    { "palabra": 8, "tipo": "golpe" },
    { "palabra": 15, "tipo": "suave" }
  ],
  "carteles": [
    { "texto": "*9* abogados", "desde": 8, "hasta": 12 }
  ],
  "centroCara": 0.55,
  "posicion": "bajo",
  "velocidad": 1.0
}
```

- **tomas**: los trozos que se quedan, en el orden en que salen. Cada uno va de una palabra a otra (las dos incluidas). Los silencios de dentro se quitan solos.
- **correcciones**: palabras que Whisper ha escrito mal. Con `""` la palabra se oye pero no se subtitula.
- **gancho**: rótulo grande arriba desde el principio hasta que acaba esa palabra. `*palabra*` sale en el color de acento. Máximo unas 6 palabras.
- **zooms**: `golpe` (acerca de repente, para remarcar) o `suave` (se va acercando, para algo serio o emotivo). Empiezan en esa palabra y duran hasta el siguiente corte.
- **carteles**: texto corto arriba mientras se dice algo importante (una cifra, un nombre, un paso).
- **centroCara**: a qué altura está la cara en este vídeo (0 arriba, 1 abajo; mírala en `revision/original.png`, a la altura de la nariz). Ahí apuntan los zooms.
- **posicion**: dónde van los subtítulos en este vídeo si la del estilo tapa la boca o los ojos: `bajo` (apoyados en el borde de abajo de la zona segura, y 1436 de 1920), `medio` (centrados en y 1000) o `alto` (centrados en y 560). Opcional.
- **velocidad**: opcional; si no está, se usa la del estilo.
