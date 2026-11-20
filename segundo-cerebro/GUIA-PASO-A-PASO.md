# Tu segundo cerebro con Claude y Obsidian: paso a paso

Para Mac y Windows. No hace falta saber programar. Unos 15 minutos.

## Qué necesitas
- **Obsidian**, gratis (también para uso en el trabajo): es donde ves tus notas y el grafo.
- **La app de escritorio de Claude** con un **plan de pago (Pro o superior)**. Las pestañas Cowork y Code no están en el plan gratis.
- **Esta plantilla:** la carpeta `Mi cerebro`.

## 1. Pon la carpeta en su sitio
1. Descomprime el archivo que te he mandado.
2. Mueve la carpeta **`Mi cerebro`** a **Documentos**:
   - Mac: `Documentos/Mi cerebro`
   - Windows: `C:\Users\tu-nombre\Documents\Mi cerebro`
3. Mejor fuera de iCloud, OneDrive o Google Drive: si dos programas tocan los mismos archivos a la vez, pueden salir copias duplicadas.

> Dentro hay carpetas ocultas (`.obsidian` con los colores del grafo y `.claude` con una ayuda para Claude). Es normal no verlas. No las borres.

## 2. Instala Obsidian y abre la carpeta
1. Entra en **obsidian.md** y pulsa **Download**.
   - Mac: abre el `.dmg` y arrastra Obsidian a **Aplicaciones**.
   - Windows: abre el `.exe` y sigue los pasos.
2. Abre Obsidian. En la primera pantalla, pulsa **«Abrir carpeta como bóveda»** («Open folder as vault») y elige `Mi cerebro`.
3. Ya está: tema oscuro y colores del grafo puestos. No hace falta crear cuenta ni activar Sync.

## 3. Instala la app de Claude y ábrela sobre la carpeta
1. Entra en **claude.ai/download**, descarga la app de escritorio e inicia sesión.
2. Arriba verás las pestañas **Chat**, **Cowork** y **Code**. Usa una de estas dos:
   - **Cowork:** nueva tarea → elige la carpeta `Mi cerebro` → permite el acceso.
   - **Code:** nueva sesión → selecciona la carpeta `Mi cerebro`.
   - Si en tu ordenador no aparece Cowork, usa Code: hace lo mismo con esta carpeta.
3. La primera vez, escribe:
   ```
   Lee CLAUDE.md y hazme 4 preguntas para rellenar la parte «Sobre mí».
   ```
   Contesta y deja que lo apunte. A partir de ahí, cada sesión empieza sabiendo quién eres.

## 4. Mete tus cosas en `fuentes`
Arrastra a la carpeta `fuentes` lo que quieras que sepa tu cerebro:
- notas del móvil (cópialas en un archivo de texto),
- PDF del trabajo, presupuestos, apuntes de un curso,
- transcripciones de audios o reuniones,
- subrayados de libros, correos importantes copiados.

**No metas** contraseñas, DNI, datos bancarios ni datos de salud de otras personas. Lo que Claude lee se procesa en sus servidores; las notas se quedan en tu ordenador.

Empieza con 10-20 archivos. Si metes cientos de golpe, puedes llegar al límite de uso de tu plan: mejor por tandas.

## 5. Primera orden
Copia esto en Claude:
```
Lee CLAUDE.md y sigue sus reglas. Después lee todo lo que hay en fuentes/ y conviértelo en mi cerebro: una nota por cada persona, empresa, proyecto, idea o tema que aparezca, todas enlazadas con [[ ]], con su mapa en mapas/ y la portada en index.md. Al acabar, dime cuántas notas has creado y qué te ha llamado la atención.
```
Mientras trabaja, vuelve a Obsidian: las notas van apareciendo solas en las carpetas.

## 6. Mira el grafo
En Obsidian, **Cmd + G** (Mac) o **Ctrl + G** (Windows), o el icono del grafo en la barra de la izquierda.
- Cada color es un tipo de nota: personas, proyectos, ideas, lecturas, diario…
- Rueda del ratón para acercarte; pasa el ratón por encima de un punto para ver con qué se conecta.
- En la rueda dentada del grafo, **Animate** lo enseña creciendo nota a nota.

## 7. Úsalo cada día
Las órdenes están en la nota **«Cómo usar tu cerebro»**. Las tres básicas:
- **Mete esto:** «Mete en mi cerebro lo nuevo de fuentes/».
- **Pregúntale:** lo que quieras. Contesta citando tus notas, para que puedas abrirlas.
- **Revísalo:** una vez al mes, «Revisa mi cerebro».

## Si algo falla
| Pasa esto | Haz esto |
|---|---|
| El grafo sale con puntos sueltos, sin líneas | Claude ha enlazado mal. Dile: «Cambia todos los enlaces a formato [[ ]], como dice CLAUDE.md». |
| Claude dice que no puede ver la carpeta | Vuelve a elegir la carpeta `Mi cerebro` al empezar la sesión y acepta el permiso. |
| Se corta a mitad («límite de uso») | Espera a que se renueve y dile «sigue donde lo dejaste: mira log.md». |
| No ves los colores del grafo | Comprueba que abriste la carpeta `Mi cerebro` y no una de dentro. |
| Obsidian pregunta si confías en el autor | Esta plantilla no trae complementos de terceros: puedes decir que sí o que no, no cambia nada. |

## Qué hay en la plantilla
- `CLAUDE.md`: las instrucciones de Claude (las tres órdenes y las reglas). Puedes cambiarlas.
- `index.md` (la portada), `log.md` (lo que hace Claude) y `Cómo usar tu cerebro.md` (las órdenes para copiar).
- Carpetas: `fuentes`, `diario`, `personas`, `empresas`, `proyectos`, `reuniones`, `ideas`, `temas`, `lecturas`, `vida`, `respuestas` y `mapas`.
- `.obsidian/`: tema oscuro y colores del grafo por carpeta.
- `.claude/skills/obsidian-markdown/`: la guía oficial del formato de Obsidian (de los creadores de Obsidian, licencia MIT). Le enseña a Claude a escribir `[[enlaces]]` bien. No ejecuta nada.
