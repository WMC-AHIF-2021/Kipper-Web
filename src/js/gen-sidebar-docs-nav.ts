/**
 * Generator for the sidebar navigation for the documentation
 */

const docsFiles: Record<string, { file: string; title: string }> = {
  index: {
    file: "index.html",
    title: "Docs Overview",
  },
  quickstart: {
    file: "quickstart.html",
    title: "Quickstart",
  },
  ourGoals: {
    file: "our-goals.html",
    title: "Goals & Timeline",
  },
  compiler: {
    file: "compiler.html",
    title: "Kipper Compiler",
  },
  supportedPlatforms: {
    file: "supported-platforms.html",
    title: "Supported platforms",
  },
  usageExamples: {
    file: "usage-examples.html",
    title: "Usage Examples",
  },
  variables: {
    file: "variables.html",
    title: "Variables",
  },
  datatypes: {
    file: "datatypes.html",
    title: "Variable Datatypes",
  },
  expression: {
    file: "expressions.html",
    title: "Expressions",
  },
  statements: {
    file: "statements.html",
    title: "Statements",
  },
  decisionMaking: {
    file: "decision-making.html",
    title: "If-Statement",
  },
  whileLoop: {
    file: "while-loop.html",
    title: "While-Loop",
  },
  doWhileLoop: {
    file: "do-while-loop.html",
    title: "Do-While-Loop",
  },
  forLoop: {
    file: "for-loop.html",
    title: "For-Loop",
  },
  functions: {
    file: "functions.html",
    title: "Kipper Functions",
  },
  builtinFunctions: {
    file: "built-in-functions.html",
    title: "Built-in Kipper Functions",
  },
};

function GenDocsSidebarNavigation(): string {
  let headers = "";
  for (const item of Object.values(docsFiles)) {
    const pathToInsert = `./${item.file}`;
    const isCurrentFile = item.file == path.split("/").pop();
    headers = headers.concat(`
      <li>
        <h5 class="sidebar-nav-header ${
          isCurrentFile ? "selected-page-sidebar-nav-header" : ""
        }">
          <a href=${pathToInsert}>
            ${item.title}
          </a>
        </h5>
      </li>
    `);
  }

  return `<nav id="docs-sidebar-nav">
          <h6 id="nav-kipper-header">
            Kipper Docs
          </h6>
          <ul class="bullet-list flex-column">
            ${headers}
          </ul>
        </nav>`;
}

// writing the content to the innerHtml of the document docs page navigation list
document.getElementById("docs-sidebar-nav-wrapper").innerHTML =
  GenDocsSidebarNavigation();
