/*
 * Generates the visual header and description on the site
 */

function GenHeaderAndDescription(): string {
  return `<div class="header-text-content flex-parent-container flex-fill-to-parent flex-column flex-center">
    <div id="page-header" class="white-text">
      <h1>${documentTitle}${isNestedDir ? " - Kipper Docs" : ""}</h1>
    </div>
    <div id="page-description" class="white-text">
      <p>${documentDescription}</p>
    </div>
  </div>
  `;
}

// writing the content to the innerHtml of the header
document.getElementById("header-description-content").innerHTML = GenHeaderAndDescription();
