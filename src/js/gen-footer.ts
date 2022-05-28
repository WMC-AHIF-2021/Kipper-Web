/* Dynamically creates the footer */

function GenFooter(): string {
  return `<ul id="footer-content" class="no-style-list flex-column flex-parent-container flex-center">
  <li>
    <img id="htl-leonding-logo" src="https://edufs.edu.htl-leonding.ac.at/htl_leonding_logo_hell.png" alt="" height="48px">
  </li>
  <li>
    <ul id="footer-bar-list" class="no-style-list flex-row flex-parent-container flex-center">
      <li>
        <small>
          <a class="link-on-red-background underline-button" href="https://github.com/Luna-Klatzer/Kipper/blob/main/LICENSE">License</a>
        </small>
      </li>
      <li>
        <small>
          <a class="link-on-red-background underline-button" href="https://github.com/Luna-Klatzer/Kipper/">GitHub</a>
        </small>
      </li>
      <li>
        <small>
          <a class="link-on-red-background underline-button" href="https://github.com/WMC-AHIF-2021/Kipper-Web">Website Source Code</a>
        </small>
      </li>
    </ul>
  </li>
  <li id="copyright">
    <small class="centered-text white-text">
      © 2021-2022 Luna Klatzer & Maximilian Seebacher
    </small>
  </li>
</ul>`;
}

// writing the content to the innerHtml of the footer
document.getElementById("footer-bar").innerHTML = GenFooter();
