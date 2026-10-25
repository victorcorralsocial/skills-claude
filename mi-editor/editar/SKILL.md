---
name: editar
description: Edita un vídeo vertical de alguien hablando a cámara (TikTok, Reels, Shorts) en el propio ordenador, sin subir nada - transcribe con Whisper, quita silencios, repeticiones y tomas falsas, pone subtítulos palabra a palabra, zooms, el rótulo del gancho y carteles dentro de las zonas seguras, y lo renderiza con Remotion en el estilo del usuario. Úsala con /editar o cuando el usuario diga "edítame este vídeo", "monta este vídeo", "quítale los silencios", "ponle subtítulos", "cambia mi estilo" o pida cambios en un vídeo ya editado ("en el 0:12 quita…").
---

# /editar

Editas el vídeo del usuario de principio a fin y se lo entregas listo para subir. Hablas en español y sin jerga: no tiene por qué saber qué es Remotion, Whisper ni una escaleta.

`SKILL_DIR` es la carpeta de esta skill (donde está este archivo). Los comandos de los pasos 2 a 6 se ejecutan **dentro de la carpeta de edición** que crea el paso 1.

## 1. Preparar
Si no te ha dado el vídeo, pídeselo (puede arrastrarlo a la terminal). Luego:
```bash
node "SKILL_DIR/empezar.mjs" "<vídeo>"
```
Comprueba Node, crea `edicion-<nombre>/` junto al vídeo (ahí se queda todo lo de trabajo), instala Remotion (1-2 minutos la primera vez) y te dice **dónde está su estilo** (`ESTILO` a partir de ahora) y si ya existe. Si falla, explícale el mensaje con palabras sencillas: cómo instalar Node desde nodejs.org o las herramientas de Apple con `xcode-select --install`.

## 2. Estilo
- Si `ESTILO` existe y no ha pedido cambiarlo, úsalo y díselo en una línea («Lo edito con tu estilo: …»).
- Si no existe, o pide cambiarlo, sigue `SKILL_DIR/estilo/cuestionario.md`: le haces las preguntas de una vez (o miras la captura que te pase) y guardas `ESTILO`. Mientras contesta, puedes adelantar los pasos 3 y 4 (todo menos el render).
- Si quiere un cambio de estilo solo para este vídeo, copia `ESTILO` a `edicion-…/estilo.md`, cámbialo ahí y usa esa ruta.

## 3. Transcribir
```bash
node scripts/transcribir.mjs
```
La primera vez descarga y prepara Whisper con su modelo (unos 1,5 GB, entre 1 y 5 minutos según la conexión): avísale. Deja `transcripcion.txt`: una línea por frase, `[primera-última] inicio-fin` y cada palabra con su número (`palabra·12`). Whisper a veces se salta una toma repetida; el script vuelve a escuchar esos huecos y marca lo que rescata con `(2.ª pasada)` (compruébalo: puede inventarse algo en un trozo de ruido). Lo que sigue sin entenderse sale como `[sonido sin palabras]`.

## 4. Decidir el montaje
Lee `transcripcion.txt` entero, mira `revision/original.png` (un fotograma de su vídeo) y escribe `escaleta.json` como explica `SKILL_DIR/escaleta.md`:
- **Encuadre:** `centroCara` a la altura de su nariz y, si los subtítulos del estilo le taparían la boca o los ojos, otra `posicion`.
- **Tomas:** cuando una frase se repite, quédate con **la última que esté completa**. Fuera los arranques en falso, las frases a medias, los «eh», «em» y lo que diga que sobra («corta», «otra vez», «vale, repito»). Respeta el orden en que habla salvo que pida otra cosa.
- **Correcciones:** nombres que Whisper escribe mal (marcas, apps, personas). Si dudas, pregunta.
- **Gancho:** si la primera frase engancha, un rótulo de 3-6 palabras con la idea y `*la palabra clave*`.
- **Zooms:** unos `zoomsPorMinuto` del estilo, en palabras que importan (cifras, nombres, giros, el remate). `golpe` para remarcar, `suave` para lo serio o emotivo.
- **Carteles:** unos `cartelesPorMinuto` del estilo, solo para datos que ayudan a entender (un número, un paso, un nombre).

```bash
node scripts/preparar.mjs "<ESTILO>"
```
Si avisa de un error, corrige la escaleta. Si no, escribe el texto que queda, toma a toma y con su minuto: léelo y comprueba que se entiende, que no falta nada y que nada se repite. **Enséñale en pocas líneas qué vas a cortar** (las frases repetidas o en falso que quitas, cuánto dura antes y después) y sigue sin esperar, salvo que tengas una duda de verdad (por ejemplo, dos tomas igual de buenas).

## 5. Renderizar y revisar
```bash
node scripts/render.mjs "../<nombre>-editado.mp4"
node scripts/fotogramas.mjs <segundos que quieras ver, separados por espacios>
```
Renderizar tarda entre 1 y 3 minutos por minuto de vídeo; `fotogramas.mjs` se puede lanzar antes, en cuanto `preparar.mjs` acaba, y tarda unos segundos. Mira `revision/mosaico.png` (9 instantes repartidos) y los fotogramas sueltos `revision/t-<segundo>.png` (pide los del gancho, los cortes y los zooms). El rectángulo rojo es la zona segura: **ningún texto puede salirse**, y la franja roja de la derecha es donde Shorts pone sus botones. Comprueba también que los subtítulos no tapan ojos ni boca, que no hay fotogramas negros y que los zooms no cortan la cabeza (si pasa, cambia `centroCara` o quita ese zoom). Si algo falla, corrígelo y repite los pasos 4 y 5.

## 6. Entregar y cambios
Dile dónde está `<nombre>-editado.mp4` (en la misma carpeta que su vídeo), cuánto dura y qué has quitado, en dos líneas. Dile que te pida cambios con el minuto («en el 0:12 quita esa frase», «subtítulos más grandes», «sin zoom en el 0:30»). Para cada cambio:
- Busca en la salida de `preparar.mjs` qué palabras suenan en ese minuto.
- Cambia la escaleta (o el estilo) y repite los pasos 4 y 5.

## Si pide algo que la plantilla no hace
Una animación, su logo, una barra de progreso, un efecto…: añádelo en `src/Editado.jsx` siguiendo la skill oficial de Remotion (`remotion-best-practices`, si está instalada), dentro de las mismas zonas seguras, y avísale de que ese cambio es solo para este vídeo. Si quiere tenerlo siempre, cópialo también a `SKILL_DIR/plantilla/src/`.

## No hagas
- No subas el vídeo a ningún sitio: todo pasa en su ordenador.
- No borres nada suyo; solo lo que crea esta skill.
- No abras Remotion Studio salvo que lo pida: se renderiza directamente.
