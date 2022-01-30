/* Animates the search bar and its behaviour */

// const / already set document variables essential to the
const docStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);
const searchBar: HTMLElement = document.getElementById("search-bar-input");

// The current progress, from 0 to 100
let progress = 0;
let isHovering = false;

// 10ms delay for the animation
const delay = 2.5;
const steps = 16;

// const values of the size relative to the viewport
const startSize: number = parseFloat(
  docStyle.getPropertyValue('--search-bar-size')
);
const endSize: number = parseFloat(
  docStyle.getPropertyValue('--search-bar-size-expanded')
);
const startMargin: number = parseFloat(
  docStyle.getPropertyValue('--search-bar-margin')
);
const endMargin: number = parseFloat(
  docStyle.getPropertyValue('--search-bar-margin-expanded')
);

const stepSize: number = (endSize - startSize) / steps;
const stepMargin: number = (endMargin - startMargin) / steps;

let currentMargin: number = startMargin;
let currentSize: number = startSize;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function runSearchBarAnimation(): void {
  // if the width is smaller than 1200px -> do not animate
  if (window.innerWidth < 1200)
    return;

  isHovering = true;
  setTimeout(async () => {
      while (progress < steps && isHovering) {
        progress++;
        const updatedSize = currentSize + stepSize;
        const updatedMargin = currentMargin + stepMargin;

        searchBar.style.width = `${updatedSize}vw`;
        searchBar.style.marginLeft = `${updatedMargin}vw`;

        currentSize = updatedSize;
        currentMargin = updatedMargin;

        console.log(`Increasing: ${progress}`);

        // delaying
        await sleep(delay);
      }
    }
  );
}

function stopSearchBarAnimation(): void {
  // if the width is smaller than 1200px -> do not animate
  if (window.innerWidth < 1200)
    return;

  isHovering = false;
  setTimeout(async () => {
      while (progress > 0 && !isHovering) {
        progress--;
        const updatedSize = currentSize - stepSize;
        const updatedMargin = currentMargin - stepMargin;

        searchBar.style.width = `${updatedSize}vw`;
        searchBar.style.marginLeft = `${updatedMargin}vw`;

        currentSize = updatedSize;
        currentMargin = updatedMargin;

        console.log(`Decreasing: ${progress}`);

        // delaying
        await sleep(delay);
      }
    }
  );
}

searchBar.addEventListener("focus", runSearchBarAnimation)
searchBar.addEventListener("focusout", stopSearchBarAnimation)

console.log("Loaded search-bar animation")
