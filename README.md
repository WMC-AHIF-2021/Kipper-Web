# Kipper-Web

The interactive Website for the [Kipper programming language](https://github.com/Luna-Klatzer/Kipper.git)

## Project Overview & Dependencies
- [Semantic versioning](https://semver.org/) is used for the versioning of new releases.
- CHANGELOG.md uses the format from [KeepAChangelog](https://keepachangelog.com/en/1.0.0/).
- [`parcel`](https://www.npmjs.com/package/parcel) with NodeJS is used for building and deploying the application.
- [`ts-mocha`](https://www.npmjs.com/package/ts-mocha) with [`chai`](https://www.npmjs.com/package/chai) is used for the testing environment.
- [`typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint) is used for analysing the code and detecting errors, warnings and code style violations.
- [`prettier`](https://prettier.io/) is used for analysing and reformatting the code.

## Goals

- Provide simple and straight-forward documentation on the programming language.
- Provide an interactive code-editor and online compiler for using Kipper online.
- Have a simple, organised and well-designed Homepage, providing basic info on the project.
- Provide docs on the logical background and implementation.

## Timeline

*For a detailed view on the mile-stones visit https://github.com/WMC-AHIF-2021/Kipper-Web/milestones*

- 17th October: Grammar file and project setup for [Kipper](https://github.com/Luna-Klatzer/Kipper) finished.
- 30th October: Design finalised and base page content is finished. Figma Design is done ([prototype](https://www.figma.com/proto/wpt1dHa6Y1NITO2sq0xdRX/Web-Layout?node-id=0%3A1)).
- 13th December: Rough Design finished (HTML done) - CSS might be not fully implemented.
- 16th January: Finished CSS and HTMl - Static part release candidate.
- End of Semeser: Finalised design and release of static part.

## Team-Members

- Luna Klatzer (Team-Lead): Main Developer for the programming language and interactive editor (TyoeScript)
- Maximilian Seebacher: Main Developer for the Website and design (CSS, HTML)

## Development

### Setup

#### Install the TypeScript Compiler and Node.js

- [Download page of TypeScript](https://www.typescriptlang.org/download)
- [Download page of Node.js](https://nodejs.org/en/download/)

#### Install dependencies

Whenever dependencies in `package.json` are changed, run the following command:

```sh
npm install
```

To only install resolved dependencies in `package-lock.json`:

```sh
npm ci
```

## Run the application

```sh
npm start
```

This will run the application using `parcel`

## Rebuild the project

To build the project using `parcel`:

```sh
npm run build
```

## Fix code style and formatting issues

(Using `lint` will also call `prettier` afterwards. For a pure `typescript-eslint` use `tslint`)

```sh
npm run lint
```

To automatically fix such issues:

```sh
npm run lint:fix
```

## Tests

```sh
npm test
```
