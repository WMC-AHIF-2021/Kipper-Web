/*
 * Generates the visual header and description on the site
 */

function GenHeaderAndDescription(): string {
  return `<div class="header-text-content flex-fill-container flex-column centered">
      <div id="page-header" class="white-text">
        <h1>${document.title}</h1>
      </div>
      <div id="page-description" class="white-text">
        <p>${document.querySelector('meta[name="description"]').getAttribute('content')}</p>
      </div>
    </div>
    `
  ;
}

// writing the content to the
document.getElementById("header-description-content").innerHTML = GenHeaderAndDescription();
