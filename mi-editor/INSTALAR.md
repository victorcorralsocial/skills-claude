# Instalar /editar (instrucciones para Claude Code)

1. Si el usuario te ha pasado el zip, descomprímelo en una carpeta temporal (por ejemplo `unzip mi-editor.zip -d /tmp/mi-editor`) y trabaja desde la carpeta `mi-editor/` que sale.
2. Ejecuta:
   ```bash
   node editar/instalar.mjs
   ```
   Comprueba Node, copia la skill a `~/.claude/skills/editar` e instala la skill oficial de Remotion. Tarda menos de un minuto.
   - Si dice que falta Node: dile que descargue la versión LTS de https://nodejs.org, que la instale (doble clic, siguiente, siguiente) y que te avise para seguir.
   - Si dice que falta git o make: dile que escriba `xcode-select --install` en la Terminal y acepte.
   - Si no existe `node` en absoluto (el comando no se encuentra), es lo mismo: falta Node.
3. Cuando acabe, dile en dos líneas que ya puede escribir `/editar` y arrastrar su vídeo, y que la primera vez le preguntará su estilo y descargará Whisper (unos 1,5 GB).
4. Si `/editar` no aparece, que cierre Claude Code y lo vuelva a abrir.
