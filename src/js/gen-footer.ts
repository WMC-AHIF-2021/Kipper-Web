/* Dynamically creates the footer */

import {
	licenseURL,
	kipperGithubURL,
	websiteGitHubURL,
	copyright,
	issueTracker,
	securityURL,
	releasesURL,
} from "./const.config";

function GenFooter(): string {
	return `<ul id="footer-content" class="no-style-list flex-column flex-parent-container flex-center">
  <li>
    <img id="htl-leonding-logo" src="https://edufs.edu.htl-leonding.ac.at/htl_leonding_logo_hell.png" alt="" height="48px">
  </li>
  <li>
    <ul id="footer-bar-list" class="no-style-list flex-row flex-parent-container flex-center">
      <li>
        <small>
          <a class="link-on-red-background underline-button" href=${releasesURL}>Releases</a>
        </small>
      </li>
      <li>
        <small>
          <a class="link-on-red-background underline-button" href=${kipperGithubURL}>GitHub</a>
        </small>
      </li>
      <li>
        <small>
          <a class="link-on-red-background underline-button" href=${securityURL}>Security</a>
        </small>
      </li>
      <li>
        <small>
          <a class="link-on-red-background underline-button" href=${issueTracker}>Issue Tracker</a>
        </small>
      </li>
      <li>
        <small>
          <a class="link-on-red-background underline-button" href=${licenseURL}>License</a>
        </small>
      </li>
      <li>
        <small>
          <a class="link-on-red-background underline-button" href=${websiteGitHubURL}>Website Repo</a>
        </small>
      </li>
    </ul>
  </li>
  <li id="copyright">
    <small class="centered-text white-text">
      ${copyright}. Kipper is licensed under the GPL-3.0 license.
    </small>
  </li>
</ul>`;
}

// writing the content to the innerHtml of the footer
document.getElementById("footer-bar").innerHTML = GenFooter();
