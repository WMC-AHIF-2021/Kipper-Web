/* Defines general variables/properties of the site */

// The path to the current document
const path = window.location.pathname;
// Signalises whether the current document is a docs file
const isDocsFile: boolean = ((array: string[]) => {return array[array.length - 2] == 'docs'})(path.split("/"));
// Alias for 'isDocsFile' to signalise the local file is nested
const isNestedDir: boolean = isDocsFile;
// The document title
const documentTitle = document.title;
// The document description
const documentDescription: string = document.querySelector(
  'meta[name="description"]'
).getAttribute('content');

// General interface for OpenGraph Meta-Tags
interface OpenGraphMetaTags {
  site_name: string;
  title: string;
  description: string;
  type: string;
  url: string;
  image: string;
  locale: string;
}

const openGraphMetaTags: OpenGraphMetaTags = {
  site_name: "Kipper",
  title: documentTitle,
  description: documentDescription,
  type: "website",
  url: window.location.href,
  image: `${isNestedDir ? ".." : "."}/img/icon.png`,
  locale: "en_GB"
}

/**
 * Defines the Open-Graph tags for the current document. The <meta> tags must be already set
 */
function DefineOpenGraphMetaTags(tags: OpenGraphMetaTags): void {
  Object.keys(tags).forEach(key => {
    const meta: HTMLMetaElement = document.createElement('meta');
    meta.setAttribute("property", `og:${key}`);
    meta.setAttribute("content", tags[key])
    document.head.appendChild(meta);
  });
}

DefineOpenGraphMetaTags(openGraphMetaTags);
