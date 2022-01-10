/*
 * File for main.html - Currently useless
 */

// main items
const codeInput: HTMLTextAreaElement = document.querySelector("#code-editor-textarea");
const textSavingState: HTMLDivElement = document.querySelector("#text-saving-state");

// menu buttons
const runCodeListItem: HTMLLIElement = document.querySelector("#run-code-list-item");
let runCodeButton: HTMLButtonElement = document.querySelector("#run-code-list-item button");
const copyCodeButton: HTMLButtonElement = document.querySelector("#copy-code-list-item button");
const clearContentButton: HTMLButtonElement = document.querySelector("#clear-content-list-item button");

// for now, don't update the side-editor
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sideEditor: HTMLDivElement = document.querySelector("#side-editor");

// sidebar buttons
const consoleOutputButton: HTMLButtonElement = document.querySelector("#console-output-button button");
const compilerOutputButton: HTMLButtonElement = document.querySelector("#compiler-output-button button");

let ScriptRunning: boolean;

// reset previously entered text
codeInput.value = localStorage.getItem("code-editor-textarea");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function runCode() {
  console.log("Running Code!");
  ScriptRunning = true;
  runCodeListItem.innerHTML = `<button>Stop</button>`;
  runCodeButton = document.querySelector("#run-code-list-item button");
  runCodeButton.addEventListener("click", stopCode);

  // TODO: Actually run the Code
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function stopCode() {
  console.log("Stopped!");
  ScriptRunning = false;
  runCodeListItem.innerHTML = `<button>Run</button>`;
  runCodeButton = document.querySelector("#run-code-list-item button");
  runCodeButton.addEventListener("click", runCode);

  // TODO: Actually stop the Code
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function clearContent() {
  console.log("Code Cleared!");
  codeInput.value = "";
  textSavingState.innerHTML = `<p class="gray-text">Code cleared!</p>`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function copyContent() {
  console.log("Code Copied!");
  navigator.clipboard.writeText(codeInput.value).then(() => {
    textSavingState.innerHTML = `<p class="gray-text">Code copied!</p>`;
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SwitchToConsoleOutput() {
  // this will depend on the future implementation. Stop Development on this
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    localStorage.setItem("code-editor-textarea", givenTextArea.value);

    spinning = false;
    textSavingState.innerHTML = `<p class="gray-text">Code Saved!</p>`;
  }, 1000)

  if (!spinning)
  {
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
})

