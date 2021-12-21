/*
 * File for main.html - Currently useless
 */

// the local identifier for the textarea cache
const localTextAreaIdentifier = "code-editor-textarea";

const codeInput: HTMLTextAreaElement = document.querySelector("#code-editor-textarea");
const textSavingState: HTMLDivElement = document.querySelector("#text-saving-state");
const runButton: HTMLDivElement = document.querySelector("#RunButtonContainer");

/**
 * Compiles and runs the program -> does nothing at the moment
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function runButtonPress(): void {
  console.log("Run Code!");
  textSavingState.innerHTML = `<p class="gray-text">Running...</p>`;
  runButton.innerHTML = `<button onclick="stopButtonPress()" id="StopButton">Stop</button>`;
}

/**
 * Stops the execution -> does nothing at the moment
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function stopButtonPress(): void {
  console.log("Stopped!");
  textSavingState.innerHTML = `<p class="gray-text">Stopped!</p>`;
  runButton.innerHTML = `<button onclick="runButtonPress()" id="RunButton">Run</button>`;
}

/**
 * Clears the content of the code editor
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function clearButtonPress(): void {
  console.log("Code Cleared!");
  codeInput.value = "";
  localStorage.setItem(localTextAreaIdentifier, "");
  textSavingState.innerHTML = `<p class="gray-text">Code cleared!</p>`;
}

/**
 * Event listener for the copy button event
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function copyButtonPress(): void {
  console.log("Code Copied!");
  //Todo: Really copy the Code
  textSavingState.innerHTML = `<p class="gray-text">Code copied!</p>`;
}

const restorePreviousContent = () => {
  // reset previously entered text
  codeInput.value = localStorage.getItem(localTextAreaIdentifier);

  // if the input is not empty, signalise that code was restored
  if (codeInput.value != "")
    textSavingState.innerHTML = `<p class="gray-text">
    Welcome back! We restored the code of your last session for you :)
    </p>`;
  else
    textSavingState.innerHTML = `<p class="gray-text">
    Start typing! We will save your changes while you are typing!
    </p>`;
}

// restoring the previous content of the textbox
restorePreviousContent();

// adding the spinner and the text save
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
    localStorage.setItem(localTextAreaIdentifier, givenTextArea.value);

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
