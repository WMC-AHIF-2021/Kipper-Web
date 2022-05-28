import {PageIndex, searchIndex} from "./search-index";

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function search(): Promise<void> {
  const overlayDark = <HTMLDivElement>document.getElementById("search-background-overlay");
  const overlaySearch = <HTMLDivElement>document.getElementById("search-result-overlay");
  const searchResult = <HTMLDivElement>document.getElementById("search-result");
  const searchBarInput = <HTMLInputElement>document.getElementById("search-bar-input");
  const searchBar = <HTMLLIElement>document.getElementById("search-bar");
  overlayDark.style.visibility = "visible";
  searchResult.style.visibility = "visible";
  overlaySearch.style.visibility = "visible";
  searchResult.innerHTML = "Type to search...";
  const searchInput = searchBarInput.value.toLowerCase();

  const pageResults: Array<PageIndex> = (() => {
    const results: Array<PageIndex> = [];
    for (const page of searchIndex) {
      const title = page.pageTitle.toLowerCase();
      const description = page.pageDescription.toLowerCase();

      // If the title or the description includes the string that was searched for, add it to the list
      if (title.includes(searchInput) || description.includes(searchInput)) {
        results.push(page);
      }
    }
    console.log(results);
    return results;
  })();

  if (pageResults.length > 0) {
    let resultsHTML = "";
    for (const result of pageResults) {
      const link = result.uriPath;
      const pageTitle = result.pageTitle;
      const pageDescription = result.pageDescription;

      // Positive Result at Search
      console.log("The Search found: " + link + " for your request! (" + searchInput + ")");
      resultsHTML += '<div><p><a  href="' + link + '">' + capitalizeFirstLetter(pageTitle) + "</a></p><small>" + pageDescription + "</small></div>";
    }
    document.getElementById("search-result").innerHTML = resultsHTML;
  } else {
    // Negative Result at Search
    document.getElementById("search-result").innerHTML = "Sorry, we couldn't find anything for your search!";
  }

  // Set position of the search result box
  const searchBarRect: DOMRect = searchBar.parentElement.getBoundingClientRect();
  overlaySearch.style.left = `${searchBarRect.left}px`;
  overlaySearch.style.top = `${searchBarRect.top + searchBarRect.height}px`;
  overlaySearch.style.width = `${searchBarRect.width}px`
}

// If the user clicks outside the search, remove search
document.addEventListener('click', (e: MouseEvent) => {
  if (!document.getElementById('search-result-overlay').contains(<Element>e.target)){
    document.getElementById("search-result").style.visibility = "hidden";
    document.getElementById("search-result-overlay").style.visibility = "hidden";
    document.getElementById("search-background-overlay").style.visibility = "hidden";
  }
});
