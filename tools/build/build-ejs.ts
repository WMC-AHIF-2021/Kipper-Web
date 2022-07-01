/**
 * Build script for compiling ejs files.
 */
import * as ejs from "ejs";
import * as lru from "lru-cache";
import * as path from "path";
import { spawnSync } from "node:child_process";
import { promises as fs, existsSync } from "fs";
import fetch from 'node-fetch';

// eslint-disable-next-line no-import-assign
ejs.cache = new lru({
  max: 500
});

/**
 * Copies all non-ejs files to the destination folder.
 */
async function copyFiles(src: string, dest: string): Promise<void> {
  // Generate the dest folder if it does not exist
  if (!existsSync(dest)) {
    await fs.mkdir(dest);
  }

  const result = await fs.readdir(src);
  for (let file of result) {
    // If the file is an ejs file or a partials' folder skip it, as it will be compiled into HTML
    if (file.endsWith('.ejs') || file === 'partials') {
      continue;
    }

    const itemSrc = `${src}/${file}`;
    const itemDest = `${dest}/${file}`;

    if ((await fs.stat(itemSrc)).isDirectory()) {
      if (!existsSync(itemDest)) {
        await fs.mkdir(itemDest);
      }

      await copyFiles(itemSrc, itemDest);
    } else {
      await fs.copyFile(itemSrc, itemDest);
    }
  }
}

/**
 * Gets the data for the ejs build.
 */
async function getBuildData(dataFile: string): Promise<Record  <string, any>> {
  // Read const config.json
  const data = JSON.parse((await fs.readFile(dataFile)).toString());

  const resp = await fetch('https://registry.npmjs.org/kipper');
  const version = (await resp.json())['dist-tags']['latest'];

  return {
    ...data,
    version: version
  };
}

/**
 * Builds all ejs files.
 */
async function buildEjsFiles(src: string, dest: string, data: Record  <string, any>): Promise<void> {
  // Generate the dest folder if it does not exist
  if (!existsSync(dest)) {
    await fs.mkdir(dest);
  }

  const result = await fs.readdir(src);
  for (let file of result) {
    // If the file is an ejs file compile it to HTML
    if (file.endsWith('.ejs')) {
      const itemSrc = `${src}/${file}`;
      const itemDest = `${dest}/${file.replace('.ejs', '.html')}`;
      const itemData = {
        filename: file,
        isDocsFile: false,
        isNestedDir: false,
        ...data
      };

      // Build ejs file
      const result: string = await ejs.renderFile(itemSrc, itemData);
      await fs.writeFile(itemDest, result);
    }
  }
}

async function buildDocs(src: string, dest: string): Promise<void> {

}

(async () => {
  const src = path.resolve(`${__dirname}/../../src`);
  const dest = path.resolve(`${__dirname}/../../build`);
  const config = path.resolve(`${src}/config.json`);

  // Get data for the ejs build
  const data = await getBuildData(config);

  // Build all ejs files
  await buildEjsFiles(src, dest, data);

  // Build all docs files
  const srcDocs = `${src}/docs`;
  const destDocs = `${dest}/docs`;
  await buildDocs(srcDocs, destDocs);

  // Copy all remaining files
  await copyFiles(src, dest);
})();
