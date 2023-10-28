// ts notations for devs only

let DEV_go = true;
let DEV_lastLine = '';
let DEV_stopButton;
let DEV_resumeButton;
let DEV_promises: Promise<unknown>[] = [];

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

  DEV_stopButton = document.createElement("button");
  DEV_stopButton.textContent = "Detener proceso";
  DEV_stopButton.style.cssText = `
    color: black;
    background: white;
    padding: 10px;
    border-radius: 5px;
  `;

  DEV_resumeButton = document.createElement("button");
  DEV_resumeButton.textContent = "Ejecutando proceso...";
  DEV_resumeButton.style.cssText = `
    color: black;
    background: white;
    padding: 10px;
    border-radius: 5px;
  `;

  container.appendChild(DEV_stopButton);
  container.appendChild(DEV_resumeButton);
  document.body.appendChild(container);

  DEV_stopButton.addEventListener("click", () => {
    DEV_go = false;
    DEV_stopButton.textContent = "Proceso detenido";
    DEV_resumeButton.textContent = "Reanudar proceso";
  });

  DEV_resumeButton.addEventListener("click", () => {
    DEV_go = true;
    
    DEV_stopButton.textContent = "Detener proceso";
    if (DEV_lastLine === '') return;
    if(DEV_resumeButton.textContent === "Iniciar de nuevo"){
        DEV_enviarScript(DEV_text);
    } else {
        DEV_enviarScript(DEV_lastLine);
    }
    DEV_resumeButton.textContent = "Ejecutando proceso...";
    
  });
}

async function DEV_enviarScript(scriptText) {
  let lines = scriptText.split(' ').map(line => line.trim()).filter(line => line);
  const main: HTMLElement = document.querySelector("#main")!;
  const textarea: HTMLElement = main?.querySelector(`div[contenteditable="true"]`)!;

  if (!textarea) throw new Error("No hay conversacion abierta.");

  DEV_promises = [];

  for (const line of lines) {
    if (DEV_go === false) {
      DEV_lastLine = lines.slice(lines.indexOf(line)).join(' ');
      break;
    }

    const promise = new Promise(async (resolve) => {
      textarea.focus();
      document.execCommand('insertText', false, line);
      textarea.dispatchEvent(new Event('change', { bubbles: true }));

      setTimeout(() => {
        ((main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`)) as HTMLElement).click();
        resolve(1);
      }, 100);
    });

    DEV_promises.push(promise);

    if (lines.indexOf(line) !== lines.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 250));
    } else {
      DEV_resumeButton.textContent = 'Proceso terminado';
      await new Promise(resolve => setTimeout(resolve, 1000));
      DEV_resumeButton.textContent = "Iniciar de nuevo"
    }
  }

  await Promise.all(DEV_promises);

  return lines.length;
}

const DEV_text = prompt("Escribe el texto a spammear");
alert("El texto que escriba, si se repite muchas veces puede provocar un bucle infinito. Si desea detener la ejecucion, haga clic en 'Detener proceso'.");

if (DEV_text) {
  DEV_enviarScript(DEV_text).then(e => console.log(`Enviando ${e} mensajes.`)).catch(console.error);
}
