/* Defines general variables/properties of the site */

import { currentVersion } from "./const.config";

// The path to the current document
export const path = window.location.pathname;

// Signalises whether the current document is a docs file
export const isDocsFile: boolean = ((array: string[]) => {
  return array[array.length - 2] == "docs";
})(path.split("/"));

// Alias for 'isDocsFile' to signalise the local file is nested
export const isNestedDir: boolean = isDocsFile;

// The document title
export const documentTitle = document.title;

// The document description
export const documentDescription: string = document
  .querySelector('meta[name="description"]')
  .getAttribute("content");

// General interface for OpenGraph Meta-Tags
export interface OpenGraphMetaTags {
  site_name: string;
  title: string;
  description: string;
  type: string;
  url: string;
  image: string;
  locale: string;
}

export const openGraphMetaTags: OpenGraphMetaTags = {
  site_name: "Kipper",
  title: UpdateTitle(documentTitle),
  description: documentDescription,
  type: "website",
  url: window.location.href,
  image: `${isNestedDir ? ".." : "."}/img/icon.png`,
  locale: "en_GB",
};

/**
 * Defines the Open-Graph tags for the current document. The <meta> tags must be already set
 */
export function DefineOpenGraphMetaTags(tags: OpenGraphMetaTags): void {
  Object.keys(tags).forEach((key) => {
    const meta: HTMLMetaElement = document.createElement("meta");
    meta.setAttribute("property", `og:${key}`);
    meta.setAttribute("content", tags[key]);
    document.head.appendChild(meta);
  });
}

export function UpdateTitle(title: string = documentTitle): string {
  if (!title.trimEnd().endsWith("Kipper")) {
    return `${title.trimEnd()} - Kipper v${currentVersion}`;
  }
  return title;
}
