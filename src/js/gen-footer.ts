/* Dynamically creates the footer */

function GenFooter(): string {
  return `<div id="copyright" class="centered-text white-text">
    <small>
      © 2021 Luna Klatzer, Maximilian Lehner & Maximilian Seebacher. Content is available under
      <a class="link-on-red-background" href="https://github.com/Luna-Klatzer/Kipper/blob/main/LICENSE">this license</a>.
    </small>
  </div>`;
}

// writing the content to the innerHtml of the footer
document.getElementById("footer-bar").innerHTML = GenFooter();
