let go = true;
let lastLine = '';
let stopButton;
let resumeButton;
let promises = [];

if (!document.querySelector('.buttons_container')) {
  const container = document.createElement("div");
  container.className = 'buttons_container';

  container.style.cssText = `
    display: flex;
    gap: 1rem;
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 9999;
  `;

  stopButton = document.createElement("button");
  stopButton.textContent = "Detener proceso";
  stopButton.style.cssText = `
    color: black;
    background: white;
    padding: 10px;
    border-radius: 5px;
  `;

  resumeButton = document.createElement("button");
  resumeButton.textContent = "Ejecutando proceso...";
  resumeButton.style.cssText = `
    color: black;
    background: white;
    padding: 10px;
    border-radius: 5px;
  `;

  container.appendChild(stopButton);
  container.appendChild(resumeButton);
  document.body.appendChild(container);

  stopButton.addEventListener("click", () => {
    go = false;
    stopButton.textContent = "Proceso detenido";
    resumeButton.textContent = "Reanudar proceso";
  });

  resumeButton.addEventListener("click", () => {
    go = true;
    
    stopButton.textContent = "Detener proceso";
    if(resumeButton.textContent === "Iniciar de nuevo"){
        enviarScript(text);
    } else {
        if (lastLine === '') return;
        enviarScript(lastLine);
    }
    resumeButton.textContent = "Ejecutando proceso...";
    
  });
}

async function enviarScript(scriptText) {
  let lines = scriptText.split(' ').map(line => line.trim()).filter(line => line);
  const main = document.querySelector("#main");
  const textarea = main?.querySelector(`div[contenteditable="true"]`);

  if (!textarea) throw new Error("No hay conversacion abierta.");

  promises = [];

  for (const line of lines) {
    if (go === false) {
      lastLine = lines.slice(lines.indexOf(line)).join(' ');
      break;
    }

    const promise = new Promise(async (resolve) => {
      textarea.focus();
      document.execCommand('insertText', false, line);
      textarea.dispatchEvent(new Event('change', { bubbles: true }));

      setTimeout(() => {
        (main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`)).click();
        resolve(1);
      }, 100);
    });

    promises.push(promise);

    if (lines.indexOf(line) !== lines.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 250));
    } else {
      resumeButton.textContent = 'Proceso terminado';
      await new Promise(resolve => setTimeout(resolve, 1000));
      resumeButton.textContent = "Iniciar de nuevo"
      
    }
  }

  await Promise.all(promises);

  return lines.length;
}

const text = prompt("Escribe el texto a spammear");
alert("El texto que escriba, si se repite muchas veces puede provocar un bucle infinito. Si desea detener la ejecucion, haga clic en 'Detener proceso'.");

if (text) {
  enviarScript(text).then(e => console.log(`Enviando ${e} mensajes.`)).catch(console.error);
}
