// Import the kipper module
importScripts('//cdn.jsdelivr.net/npm/@kipper/core@latest/kipper-standalone.min.js');

// Import the babel transpiler
importScripts('//unpkg.com/@babel/standalone/babel.min.js');

// The message handler for the compiler log messages - We don't handle those yet and just log them onto the console
const msgHandler = (level, msg) => {
  // @ts-ignore
  postMessage(`[${Kipper.getLogLevelString(level)}]: ${msg}`);
}

// Global logger for the compiler
// @ts-ignore
const logger = new Kipper.KipperLogger(msgHandler);

// Global compiler
// @ts-ignore
const compiler = new Kipper.KipperCompiler(logger);

/**
 * Evaluates the passed Kipper code using specific handlers.
 * @param code The translated code to evaluate. (Must be in JavaScript)
 */
async function evalKipperCode(code: string) {
  // Overwrite 'console.log'
  const prevLog = console.log;
  console.log = (msg: string) => {
    postMessage(msg);
  }

  // Eval the Kipper code
  eval(code);

  // Restore old 'console.log'
  console.log = prevLog;
}

// Define the handler for worker messages
onmessage = async function(event) {
  console.log("Received compilation request from main thread. Preparing compilation in Worker.");

  // Compile the code to TypeScript
  let result: string;
  try {
    result = (await compiler.compile(event.data, {})).write();
  } catch (e) {
    postMessage(1);
    throw e;
  }

  postMessage(0);

  // Transpile the code from TypeScript to JavaScript
  // @ts-ignore
  const compiledCode = Babel.transform(result, { filename: "kipper-web-script.ts", presets: ["env", "typescript"] });

  // Evaluate the code
  await evalKipperCode(compiledCode.code);

  // Return with exit code 0 (Success)
  postMessage(0);
}
