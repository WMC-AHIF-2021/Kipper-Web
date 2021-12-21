/*
 * File for main.html - Currently useless
 */

const codeInput: HTMLTextAreaElement = document.querySelector("#code-editor-textarea");
const textSavingState: HTMLDivElement = document.querySelector("#text-saving-state");
const IDRunCode: HTMLDivElement = document.querySelector("#IDRunCode");

function runCode() {
  console.log("Run Code!");
  textSavingState.innerHTML = `<p class="gray-text">Running...</p>`;
  IDRunCode.innerHTML = `<button onclick="stopCode(this)" id="stopCode">Stop</button>`;
}

function stopCode() {
  console.log("Stopped!");
  textSavingState.innerHTML = `<p class="gray-text">Stopped...</p>`;
  IDRunCode.innerHTML = `<button onclick="runCode(this)" id="runCode">Run</button>`;
}

function clearContents() {
  console.log("Code Cleared!");
  codeInput.value = "";
  textSavingState.innerHTML = `<p class="gray-text">Code cleared!</p>`;
}

function copy() {
  console.log("Code Copied!");
  //Todo: Really copy the Code
  textSavingState.innerHTML = `<p class="gray-text">Code copied!</p>`;
}

function codeExport() {
  console.log("Code exported!");
  //Todo: Really export the Code
  textSavingState.innerHTML = `<p class="gray-text">Code exported!</p>`;
}

// reset previously entered text
codeInput.value = localStorage.getItem("code-editor-textarea");


// if the input is not empty, signalise that code was restored
if (codeInput.value != "")
  textSavingState.innerHTML = `<p class="gray-text">Welcome back! We restored the code of your last session for you :)</p>`;
else
  textSavingState.innerHTML = `<p class="gray-text">Start typing! We will save your changes while you are typing!</p>`;

let cancel;
let spinning: boolean;
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
