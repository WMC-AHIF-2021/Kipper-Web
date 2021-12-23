/*
 * File for main.html - Currently useless
 */

const codeInput: HTMLTextAreaElement = document.querySelector("#code-editor-textarea");
const textSavingState: HTMLDivElement = document.querySelector("#text-saving-state");
const IDRunCode: HTMLDivElement = document.querySelector("#IDRunCode");
const IDConsoleOutput: HTMLDivElement = document.querySelector("#side-editor");
const IDCompilerOutput: HTMLDivElement = document.querySelector("#side-editor");

const ConsoleOutputButton: HTMLDivElement = document.querySelector("#console-output-button");
const CompilerOutputButton: HTMLDivElement = document.querySelector("#compiler-output-button");

// reset previously entered text
codeInput.value = localStorage.getItem("code-editor-textarea");

const OutputConsole: HTMLDivElement = IDConsoleOutput;
const OutputCompiler: HTMLDivElement = IDCompilerOutput;

let CompilerShowed: boolean;
let ScriptRunning: boolean;

function runCode() {
  console.log("Run Code!");
  ScriptRunning = true;
  textSavingState.innerHTML = `<p class="gray-text">Running...</p>`;
  IDRunCode.innerHTML = `<button onclick="stopCode(this)" id="stopCode">Stop</button>`;
  const currentTime = new Date();
  const time = (currentTime.getHours() >= 10 ? currentTime.getHours(): ("0" + currentTime.getHours()))+ ":" + (currentTime.getMinutes() >= 10 ? currentTime.getMinutes() : ("0" + currentTime.getHours()));
  IDCompilerOutput.innerHTML = time +`<p class="gray-text">: Compilation started...<br>\n</p>`;
  IDConsoleOutput.innerHTML =  time +`<p class="gray-text">: Script started...<br>\n</p>`;
  console.log("Compiler: " + IDCompilerOutput.innerHTML);
  console.log("Console: " + IDConsoleOutput.innerHTML);
  //TODO:Really run the Code
}

function stopCode() {
  console.log("Stopped!");
  ScriptRunning = false;
  textSavingState.innerHTML = `<p class="gray-text">Stopped...</p>`;
  IDRunCode.innerHTML = `<button onclick="runCode(this)" id="runCode">Run</button>`;
  const currentTime = new Date();
  const time = (currentTime.getHours() >= 10 ? currentTime.getHours(): ("0" + currentTime.getHours()))+ ":" + (currentTime.getMinutes() >= 10 ? currentTime.getMinutes() : ("0" + currentTime.getHours()));
  IDConsoleOutput.innerHTML = IDConsoleOutput.innerHTML + time +`<p class="gray-text">: Script stopped...</p>`;
  console.log("Console: " + IDConsoleOutput.innerHTML);

  //TODO:Really stop the Code
}

function clearContents() {
  console.log("Code Cleared!");
  codeInput.value = "";
  textSavingState.innerHTML = `<p class="gray-text">Code cleared!</p>`;
}

function copy() {
  console.log("Code Copied!");
  navigator.clipboard.writeText(codeInput.value);
  textSavingState.innerHTML = `<p class="gray-text">Code copied!</p>`;
}

function ConsoleOutput() {
  console.log("Switched to Console Output");
  ConsoleOutputButton.innerHTML = "<b><u><button onclick=\"ConsoleOutput()\">Console Output</button></u></b>";
  CompilerOutputButton.innerHTML = "<button onclick=\"CompilerOutput()\">Compiler Output</button>";
  IDConsoleOutput.innerHTML = `<iframe src="https://orf.at/" style="border:0px #ffffff none;" name="consoleOutputIframe" scrolling="yes" frameborder="0" marginheight="0px" marginwidth="0px" height="400px" width="600px" allowfullscreen></iframe>`;
}

function CompilerOutput() {
  console.log("Switched to Compiler Output");
  ConsoleOutputButton.innerHTML = "<button onclick=\"ConsoleOutput()\">Console Output</button>";
  CompilerOutputButton.innerHTML = "<b><u><button onclick=\"CompilerOutput()\">Compiler Output</button></u></b>";
  CompilerShowed = true;
  IDCompilerOutput.innerHTML = `<iframe src="https://orf.at/" style="border:0px #ffffff none;" name="consoleOutputIframe" scrolling="yes" frameborder="0" marginheight="0px" marginwidth="0px" height="400px" width="600px" allowfullscreen></iframe>`;
  console.log("Compiler: " + OutputCompiler.innerHTML);
}

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
