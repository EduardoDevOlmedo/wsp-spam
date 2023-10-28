
---

# EnviarScriptWhatsApp

Este es un pequeño script que te permite automatizar el envío de mensajes en WhatsApp Web. 


## Requisitos

- Debes usar WhatsApp Web en un navegador como Chrome o Firefox.
- Abre una conversación en WhatsApp Web antes de usar el script.

## Cómo Usar

1. **Preparación:**

   - Copia todo el código que se encuentra en [ws-spam.js](ws-spam.js).
   - No copies el archivo [dev-ws-spam.ts](dev-ws-spam.ts). De lo contrario no funcionara.

2. **Abrir WhatsApp Web:**

   - Asegúrate de que WhatsApp Web esté abierto en tu navegador y que hayas iniciado una conversación.

3. **Abrir la Consola del Navegador:**

   - En tu navegador, presiona `F12` o `Ctrl+Shift+J` (en Windows/Linux) o `Cmd+Option+J` (en Mac) para abrir la consola del navegador.

4. **Pegar el Código:**

   - En la consola del navegador, pega todo el código que copiaste en el paso 1 y presiona `Enter`.

5. **Enviar Mensajes:**

   - En el cuadro de texto que aparece, escribe el mensaje que deseas enviar.

6. **Ejecutar el Script:**

   - Ahora que el código está cargado, puedes usarlo. Te aparecerán dos botones en la esquina inferior derecha de la pantalla, "Detener proceso" y "Ejecutar proceso...".

7. **Iniciar el Proceso:**

   - El envío de mensajes comenzara automaticamente.. Asegúrate de que el mensaje que escribiste no provoque un bucle infinito.

8. **Detener el Proceso:**

   - Si deseas detener el proceso en cualquier momento, haz clic en "Detener proceso". Puedes reanudar el proceso más tarde. Cuando acabe el proceso, puedes reiniciarlo.


## Colaboración
Para colaborar sigue las guidelines: 

- **Archivos de Desarrollo:** 
El archivo dev-wsp-spam.ts contiene notaciones en TypeScript para desarrolladores.
El archivo wsp-spam.js es el archivo JavaScript que se ejecuta en el navegador.

### Pasos para Colaborar

Clona el repositorio.

Modifica el código en el archivo dev-wsp-spam.ts según tus necesidades o para agregar nuevas características.

Compila el código TypeScript en JavaScript. Podes hacerlo utilizando un transpilador de TypeScript o ejecutando el comando tsc dev-wsp-spam.ts.

Asegúrate de que el código JavaScript resultante en wsp-spam.js funcione correctamente.

Haz tus cambios y mejoras en wsp-spam.js.

Envia el PR con los cambios detallados.

## Aviso

- **Ten en cuenta que el uso inadecuado de este script podría violar los términos de servicio de WhatsApp. Úsalo con responsabilidad y de manera ética.**

- **No abuses de esta herramienta para enviar mensajes no deseados o molestar a otros usuarios.**

- **El script está diseñado para ser detenido y reanudido según sea necesario.**

- **El script puede fallar si se intenta ejecutar dos veces con diferente texto de una vez, para cambiar de texto, recarga la pagina y ejecuta el script de nuevo.**
