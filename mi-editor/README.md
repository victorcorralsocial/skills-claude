# Mi editor: edita tus vídeos con Claude

Una skill para **Claude Code**, `/editar`, que edita tus vídeos verticales (TikTok, Reels y Shorts) en tu ordenador. Le pasas un vídeo tuyo hablando a cámara y te lo devuelve montado:

- Quita silencios, frases repetidas y tomas en falso (se queda con la última buena).
- Pone subtítulos palabra a palabra, zooms, un rótulo para el gancho y carteles con los datos importantes.
- Lo coloca todo donde no lo tapan los botones de TikTok, Reels ni Shorts.
- Lo hace con **tu estilo**: la primera vez te pregunta cómo te gustan los vídeos (o mira una captura de uno que te guste) y lo recuerda.
- Luego le pides cambios con el minuto: «en el 0:12 quita esa frase».

Usa [Whisper](https://github.com/ggml-org/whisper.cpp) para escuchar el vídeo y [Remotion](https://www.remotion.dev) para montarlo. Tu vídeo no se sube a ningún sitio: Whisper y Remotion trabajan en tu ordenador (Claude solo lee la transcripción y algunos fotogramas para decidir el montaje).

**Guía paso a paso, con capturas de lo que vas a ver:** https://claude.ai/artifact/HMKpR8mkUWcdHxuj61Vmfe

## Qué necesitas
- **Claude Code**, con un plan de pago de Claude (Pro o superior).
- Un **Mac**, que es donde está probado.
- Unos 2 GB libres para Whisper y su modelo en español.

## Instalar
1. Abre Claude Code.
2. Arrastra `mi-editor.zip` a la terminal y escribe **«instala este editor»**.

Claude lo instala todo solo. Si te falta algo (Node, por ejemplo), te dice cómo ponerlo.

## Usar
1. Escribe `/editar` y arrastra tu vídeo.
2. La primera vez te pregunta tu estilo y descarga Whisper (unos minutos).
3. Te cuenta qué va a cortar y te deja `tu-video-editado.mp4` en la misma carpeta.
4. Pídele los cambios que quieras. Para cambiar de estilo: «/editar cambia mi estilo».

## Para que no te lleves una sorpresa
- Esto es una base: cortes, subtítulos, zooms y rótulos. Las animaciones a medida (gráficos, pantallas, efectos) se le piden aparte y Claude las añade con Remotion.
- Es para vídeos de alguien hablando. Una grabación de pantalla sin voz no tiene nada que transcribir.
- Whisper a veces escribe mal los nombres de marcas o personas. Claude los corrige, pero revisa los subtítulos antes de publicar.
- Renderizar tarda entre 1 y 3 minutos por cada minuto de vídeo.

## Licencia
MIT. Úsalo, cámbialo y compártelo.
