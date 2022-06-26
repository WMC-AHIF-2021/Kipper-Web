/*
 * Generates the visual header and description on the site
 */

import { documentTitle, isNestedDir, documentDescription, path, isDocsFile } from "./main";
import { Version, kipperGithubURL } from "./const.config";

export const kipperPackageEndpoint: string = "https://registry.npmjs.org/kipper";

export function GenHeaderNavbar(): string {
	// @ts-ignore
	const logo = new URL("../img/base_head.png", import.meta.url);
	return `<nav id="header-nav-bar">
    <ul>
      <li>
        <a
          href="index.html"
          class="
            no-style-list
            flex-row
            flex-parent-container
            flex-center
            kipper-logo-container
          "
        >
          <img id="kipper-logo" src="${logo}" alt="" />
        </a>
        <a class="
          underline-button kipper-logo-identifier
        "
        href="${isNestedDir ? ".." : "."}/index.html"
        >
          <h1>Kipper</h1>
        </a>
        <a class="version-identifier" href="${kipperGithubURL}/releases/tag/v${Version}">
          <small>v${Version}</small>
        </a>
      </li>
      <li>
        <a
          href="${isNestedDir ? ".." : "."}/download.html"
          class="
            underline-button
            ${path.endsWith("download.html") ? "selected-nav-page" : ""}
            top-nav-menu-item
            top-nav-button
          "
          ><h4>Downloads</h4></a
        >
      </li>
      <li>
        <a
          href="${isNestedDir ? ".." : "."}/docs/index.html"
          class="
            underline-button
            ${isDocsFile ? "selected-nav-page" : ""}
            top-nav-menu-item
            top-nav-button
          "
          ><h4>Docs</h4></a
        >
      </li>
      <li>
        <a
          href="${isNestedDir ? ".." : "."}/playground.html"
          class="
            underline-button
            ${path.endsWith("playground.html") ? "selected-nav-page" : ""}
            top-nav-menu-item
            top-nav-button
          "
          ><h4>Playground</h4></a
        >
      </li>
      <li>
        <a
          href="${isNestedDir ? ".." : "."}/changelog.html"
          class="
            underline-button
            ${path.endsWith("changelog.html") ? "selected-nav-page" : ""}
            top-nav-menu-item
            top-nav-button
          "
          ><h4>Changelog</h4></a
        >
      </li>
    </ul>
    <div id="search-bar-wrapper">
      <ul>
        <li>
          <i id="search-icon" class="fa-solid fa-magnifying-glass"></i>
        </li>
        <li id="search-bar">
          <label for="search-bar-input"></label>
          <input
            id="search-bar-input"
            type="search"
            placeholder="Search..."
            spellcheck="false"
          />
        </li>
      </ul>
    </div>
  </nav>
  <div
    id="header-description-content"
    class="text-page-content-container"
  ></div>`;
}

export function GenHeaderAndDescription(): string {
	return `<div class="header-text-content flex-parent-container flex-fill-to-parent flex-column flex-center">
    <div id="page-header" class="white-text">
      <h1>${documentTitle}${isNestedDir ? ` - Kipper v${Version} Docs` : ""}</h1>
    </div>
    <div id="page-description" class="white-text">
      <p>${documentDescription}</p>
    </div>
  </div>
  `;
}
