/*
 * File for main.html - Currently useless
 */

// Main items
const codeInput: HTMLTextAreaElement = document.querySelector("#code-editor-textarea");
const codeInputResult: HTMLElement = document.querySelector("#highlighting-field-content");
const textSavingState: HTMLDivElement = document.querySelector("#text-saving-state");

// Menu buttons
const runCodeListItem: HTMLLIElement = document.querySelector("#run-code-list-item");
let runCodeButton: HTMLButtonElement = document.querySelector("#run-code-list-item button");
const copyCodeButton: HTMLButtonElement = document.querySelector("#copy-code-list-item button");
const clearContentButton: HTMLButtonElement = document.querySelector("#clear-content-list-item button");

// For now, don't update the side-editor
const sideEditor: HTMLDivElement = document.querySelector("#side-editor");

// Sidebar buttons
const consoleOutputButton: HTMLButtonElement = document.querySelector("#console-output-button button");
const compilerOutputButton: HTMLButtonElement = document.querySelector("#compiler-output-button button");

// Global web worker that will run the code
let worker: Worker | undefined = undefined;

/**
 * @summary Runs the code using a web worker and writes the console output to the "virtual" terminal.
 */
function runCode(): void {
  runCodeListItem.innerHTML = `<button>Stop</button>`;
  runCodeButton = document.querySelector("#run-code-list-item button");
  runCodeButton.addEventListener("click", stopCode);

  if (window.Worker) {
    // If there is a program running at the moment, stop execution and run the most recent code.
    if (worker !== undefined) {
      stopCode();
    }

    // Prepare the worker to run the code
    // @ts-ignore
    worker = new Worker(new URL('./compile/compile-worker.ts', import.meta.url));

    // Event handler for the return. This imitates stdout.
    worker.onmessage = function(event) {
      if (typeof event.data === 'string' || event.data instanceof String) {
        console.log(`Received from worker: ${event.data}`);
      } else if (typeof event.data === 'number' || event.data instanceof Number) {
        console.log(`Finished execution with exit code ${event.data}.`);
        stopCode();
      } else {
        console.error(`Invalid message from WebWorker: ${event.data}`);
      }
    }

    // Post the message to tell the worker to process the code
    worker.postMessage(localStorage.getItem("kipper-code-editor-content"));
  } else {
    alert("Your browser does not support web-workers! Aborting operation.");
  }
}

function stopCode(): void {
  runCodeListItem.innerHTML = `<button>Run</button>`;
  runCodeButton = document.querySelector("#run-code-list-item button");
  runCodeButton.addEventListener("click", runCode);

  if (window.Worker) {
    // If there is no current execution, return.
    if (worker === undefined) {
      return;
    }

    // Terminate the worker
    worker.terminate();
    worker = undefined;
  } else {
    alert("Your browser does not support web-workers! Aborting operation.");
  }
}

function clearContent(): void {
  console.log("Code Cleared!");
  codeInput.value = "";
  codeInputResult.innerHTML = "";
  textSavingState.innerHTML = `<p class="gray-text">Code cleared!</p>`;
}

function copyContent(): void {
  console.log("Code Copied!");
  navigator.clipboard.writeText(codeInput.value).then(() => {
    textSavingState.innerHTML = `<p class="gray-text">Code copied!</p>`;
  });
}

function SwitchToConsoleOutput() {
  // this will depend on the future implementation. Stop Development on this
}

function SwitchToCompilerOutput() {
  // this will depend on the future implementation. Stop Development on this
}

// if the input is not empty, signalise that code was restored
if (codeInput.value != "")
  textSavingState.innerHTML = `<p class="gray-text">Welcome back! We restored the code of your last session for you :)</p>`;
else
  textSavingState.innerHTML = `<p class="gray-text">Start typing! We will save your changes while you are typing!</p>`;

// adding event listeners to the menu buttons
runCodeButton.addEventListener("click", runCode);
copyCodeButton.addEventListener("click", copyContent);
clearContentButton.addEventListener("click", clearContent);

// adding event listeners to the sidebar buttons
consoleOutputButton.addEventListener("click", SwitchToConsoleOutput);
compilerOutputButton.addEventListener("click", SwitchToCompilerOutput);

// Initialise the codeInput
(() => {
  const localStorageCodeInput = localStorage.getItem("kipper-code-editor-content");
  if (localStorageCodeInput != undefined) {
    codeInput.value = localStorageCodeInput;
    editorUpdate(localStorageCodeInput);
  } else {
    codeInput.value = "";
  }
})();

// runtime variable for the writing event listener
let cancel;
let spinning: boolean;

// adding keyup listener
codeInput.addEventListener("keyup", event => {
  // if cancel exists / is active -> clear timeout
  if (cancel)
    clearTimeout(cancel);

  // creating the new timeout and assigning it, if the user types more
  // the timeout will be cancelled and restarted, so that the caching is
  // only done when the user finished typing!
  cancel = setTimeout(() => {
    const givenTextArea: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
    localStorage.setItem("kipper-code-editor-content", givenTextArea.value);

    spinning = false;
    textSavingState.innerHTML = `<p class="gray-text">Code Saved!</p>`;
  }, 1000);

  if (!spinning) {
    textSavingState.innerHTML = `<div id="text-save-spinner" class="spinner">
        <!-- This may look stupid, but don't delete it -->
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p class="gray-text">Saving...</p>
    `;
    spinning = true;
  }
});

/**
 * Editor-Update, which allows for syntax highlighting
 * @param value The value the element was updated to
 */
function editorUpdate(value: string) {
  // If the last character is a newline character
  // Add a placeholder space character to the final line
  if (value[value.length - 1] == "\n") {
    value += " ";
  }

  // Write results to the original 'codeInput' <textarea> and syntax-highlighted result
  codeInput.innerText = value;
  codeInputResult.innerHTML = value
    .replace(new RegExp("&", "g"), "&")
    .replace(new RegExp("<", "g"), "<"); // Allow newlines

  // @ts-ignore
  // Prism should be imported
  Prism.highlightElement(codeInputResult);
}

/**
 * Syncs the scrolling for both <textarea> and codeInputResult
 */
function syncScroll() {
  /* Scroll result to scroll coords of event - sync with textarea */

  // Get and set x and y
  codeInputResult.scrollTop = codeInput.scrollTop;
  codeInputResult.scrollLeft = codeInput.scrollLeft;
}

