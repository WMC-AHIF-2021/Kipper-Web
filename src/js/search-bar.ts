/* Animates the search bar and its behaviour */

// const / already set document variables essential to the
const docStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);
const searchBar: HTMLElement = document.getElementById("search-bar-input");

// The current progress, from 0 to 100
let progress = 0;
let isHovering = false;

// 10ms delay for the animation
const delay = 10;

// The init width of the search bar
const initWidth: number = +docStyle.getPropertyValue('--search-bar-size');
// The end width of the search bar
const endWidth: number = +docStyle.getPropertyValue('--search-bar-size-expanded');
// The init left margin of the search bar
const initLeftMargin: number = +docStyle.getPropertyValue('--search-bar-margin');
// The end left margin of the search bar
const endLeftMargin: number = +docStyle.getPropertyValue('--search-bar-margin-expanded');

// setting the default
searchBar.style.width = initWidth.toString();
searchBar.style.marginLeft = initLeftMargin.toString();

// each step that should be taken while animating
const stepsWidth: number = (endWidth - initWidth) / 100;
const stepsMargin: number = (endLeftMargin - initLeftMargin) / 100;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function RunSearchBarAnimation(event): void {
  // if the width is smaller than 1200px -> do not animate
  if (window.innerWidth < 1200)
    return;

  isHovering = true;
  setTimeout(async () => {
      while (progress < 100 && isHovering) {
        searchBar.style.width = (+searchBar.style.width - stepsWidth).toString();
        searchBar.style.marginLeft = (+searchBar.style.width + stepsMargin).toString();
        progress++;

        console.log(`Increasing: ${progress}`);

        // delaying
        await sleep(delay);
      }
    }
  );
}

function StopSearchBarAnimation(event): void {
  // if the width is smaller than 1200px -> do not animate
  if (window.innerWidth < 1200)
    return;

  isHovering = false;
  setTimeout(async () => {
      while (progress > 0 && !isHovering) {
        searchBar.style.width = (+searchBar.style.width + stepsWidth).toString();
        searchBar.style.marginLeft = (+searchBar.style.width - stepsMargin).toString();
        progress--;

        console.log(`Decreasing: ${progress}`);

        // delaying
        await sleep(delay);
      }
    }
  );
}

searchBar.addEventListener("mouseenter", RunSearchBarAnimation)
searchBar.addEventListener("mouseleave", StopSearchBarAnimation)

console.log("Loaded search-bar animation")
