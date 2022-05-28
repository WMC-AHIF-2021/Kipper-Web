export const rawSearchIndex: Array<string> = [
  "Quickstart;/docs/quickstart.html;Quickstart;How to quickly start with Kipper",
  "Our Goals;/docs/our-goals.html;Our Goals;Goals & Timeline for Kipper",
  "Supported Platforms;/docs/supported-platforms.html;Supported Platforms;Supported platforms for Kipper",
  "Usage Examples;/docs/usage-examples.html;Usage;Example to Show how Kipper Works",
  "Variables;/docs/variables.html;Variables;Storing values and defining variables",
  "Variable Datatypes;/docs/datatypes.html;Variable Datatypes;Datatypes in the Kipper language",
  "Expressions;/docs/expressions.html;Kipper Expressions;Expressions, which represent the core functionality of Kipper",
  "Statements;/docs/statements.html;Kipper Statements;Statements, which represent the core functionality of Kipper",
  "If-Statement;/docs/decision-making.html;If-Statement;Decision making using if-statements",
  "While-Loop;/docs/while-loop.html;While-Loop;While-loop to run a block of code multiple times under certain conditions",
  "Do-While-Loop;/docs/do-while-loop.html;Do-While-Loop;While-loop to run a block of code multiple times under certain conditions",
  "For-Loop;/docs/for-loop.html;For-Loop;For-loop to run a block of code under certain conditions",
  "Functions;/docs/functions.html;Functions;Functions (callable code-blocks) for reusing code",
  "Built-In Functions;/docs/built-in-functions.html;Built-In;Built-in Functions",
  "Playground;/playground.html;Playground;The playground for trying out Kipper and learning the basics in a pre-configured setup",
  "Docs;/docs/index.html;Documentation;Docs Overview and General Info",
  "Changelog;/changelog.html;Changelog;Changelog for the Kipper Language",
  "Downloads;/download.html;Downloads;Downloads for the Kipper Language"
];

/**
 * The index for a single Kipper docs page.
 */
export interface PageIndex {
  keyword: string,
  uriPath: string,
  pageTitle: string,
  pageDescription: string
}

export const searchIndex: Array<PageIndex> = rawSearchIndex.map((index) => {
  const lineContent = index.split(";");
  return {
    keyword: lineContent[0],
    uriPath: lineContent[1],
    pageTitle: lineContent[2],
    pageDescription: lineContent[3]
  }
});
