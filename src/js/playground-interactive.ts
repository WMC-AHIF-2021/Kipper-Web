/*
 * File for main.html - Currently useless
 */

const codeInput: HTMLTextAreaElement = document.querySelector("#code-editor-textarea");
const textSavingState: HTMLDivElement = document.querySelector("#text-saving-state")

// reset previously entered text
codeInput.value = localStorage.getItem("code-editor-textarea");

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
