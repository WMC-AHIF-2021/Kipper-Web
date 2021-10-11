![](./src/img/Kipper-Logo-with-head.png)
# Setup

You need to install TypeScript and Node.js at first.
The Download links are below.

#### Install the TypeScript Compiler and Node.js

- [Download page of TypeScript](https://www.typescriptlang.org/download)
- [Download page of Node.js](https://nodejs.org/en/download/)

#### Install dependencies

Whenever `package.json` is changed, run the following command:

```sh
npm install
```

## Run the application

To start the Application use the command:

```sh
npm start
```

## Build the project

To build the project:

```sh
npm run build
```
## Project Summary & Dependencies
- [Semantic versioning](https://semver.org/) is used for the versioning of new releases.
- CHANGELOG.md uses the format from [KeepAChangelog](https://keepachangelog.com/en/1.0.0/).
- [`parcel`](https://www.npmjs.com/package/parcel) with NodeJS is used for building and deploying the application.
- [`ts-mocha`](https://www.npmjs.com/package/ts-mocha) with [`chai`](https://www.npmjs.com/package/chai) is used for the testing environment.
- [`typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint) is used for analysing the code and detecting errors, warnings and code style violations.
- [`prettier`](https://prettier.io/) is used for analysing and reformatting the code.