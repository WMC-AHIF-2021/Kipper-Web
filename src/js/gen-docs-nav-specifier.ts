/*
 * Generates the visual specifier for the local docs file
 */

import { documentTitle } from "./main";

function GenDocsNavSpecifier(): string {
	const path = window.location.pathname;
	const page = path.split("/").pop();
	return `<ul class="flex-row no-style-list">
      <li class="gray-text"><a id="docs-page-nav-kipper-origin" href="./index.html">Kipper Docs /</a></li>
      <li><a class="docs-page-nav-header" href="./${page}">${documentTitle}</a></li>
    </ul>
    `;
}

// writing the content to the innerHtml of the document docs page navigation list
document.getElementById("docs-page-nav").innerHTML = GenDocsNavSpecifier();
