# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added

### Changed

### Removed

## [v0.1.4] - 2021-12-16
### Added
- `screen.css` for specific screen-based handling and arrangement

### Changed
- Updated Responsive Design handling for `text-content` html elements
- Minor responsive design handling, and formatting

### Removed
- Outdated placeholders and replacements

## [v0.1.3] - 2021-12-16

### Added
- Added quickstart.html and usage-example.html (also to nav)

### Changed
- Edited Design of 404.html
- Disabled Spellcheck in Searchbar and Playground Editor

## [v0.1.2] - 2021-12-11

### Added
- Spinner and Text Saving to restore the code of the last session (As long as cookies are not cleared!).
- `search-bar.ts` for Search-bar handling (In Work!).
- Dynamic Open Graph Meta Tag generation across all sites using `main.ts`.
- `main.ts` for general definitions of global variables.
- `gen-footer.ts` to generate the footer across all sites and avoid code-repetition.

### Changed
- Made the text inside buttons bold.
- Fixed overflow issues with inline `<code>` fields, by changing line-height to `1.5`.
- Updated and replaced info in `install.html` with more descriptive and detailed content.
- Changed `--default-border-radius` to `0.5em` from `0.5rem`.
- Link Behaviour, and removed text-decoration when the link is not visited.
- Fixed link bug in `docs/index.html` re-directing to itself when clicking on the logo for the homepage.

### Removed
- Linux Bash Tags and replaced them with simple `>`.
- Remaining site `docs.html`, which was replaced by `/docs`.

## [v0.1.1] - 2021-12-03

### Added
- `gen-header.ts` for auto-generating the header and description text.
- Docs Navigation Sidebar for the docs pages.
- The `/docs` folder for all documentation sites, with the default `index.html` being the entry-point.
- 'Inter' Fonts using the Google-Fonts API.
- `gen-docs-nav-specifier.ts` for generating documentation nav bars.
- `gen-header.ts` for generating the visual header and description on the site.

### Changed
- Updated fonts and added backups fonts.
- Changed button behaviour to not light as yellow, but change it's background color to a darker fuchsia red.
- Label Handling for proper usage of `<label>` with `<input>` and `<textarea>` elements.
- Fixed partially flex overflow caused by width specifiers.
- Text Boxes with specific handling for `<article>` and `<section>`.

### Removed
- Mocha tests that were unneeded.

## [v0.1] - 2021-11-29

### Added

- Interactive Console on the Site
- Proper dynamic footer positioning at the bottom of the page.
- Current page navbar highlighting.
- Search-Bar with simple Animation.
- The basic icons and logos that are used throughout the project.
- HTML5 Boilerplate base setup.
- General Default Formatting CSS for the Project.
- `download.html`, `docs.html`, `install.css` and `playground.html`.
- Template file for Nav-Bar.

### Changed
- Set the Links in the Navbar in all important files.

### Removed
- Removed unnecessary `start_local_Server.exe`

[unreleased]: https://github.com/WMC-AHIF-2021/Kipper-Web/compare/HEAD...base-dev
[v0.1.4]: https://github.com/WMC-AHIF-2021/Kipper-Web/compare/v0.1.3...v0.1.4
[v0.1.3]: https://github.com/WMC-AHIF-2021/Kipper-Web/compare/v0.1.2...v0.1.3
[v0.1.2]: https://github.com/WMC-AHIF-2021/Kipper-Web/compare/v0.1.1...v0.1.2
[v0.1.1]: https://github.com/WMC-AHIF-2021/Kipper-Web/compare/v0.1...v0.1.1
[v0.1]: https://github.com/WMC-AHIF-2021/Kipper-Web/tree/v0.1
