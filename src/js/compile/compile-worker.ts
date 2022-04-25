// Import the kipper module
importScripts('//cdn.jsdelivr.net/npm/@kipper/base@0.2.1/kipper-standalone.min.js');

// Import the babel transpiler
importScripts('//unpkg.com/@babel/standalone/babel.min.js');

// The message handler for the compiler log messages - We don't handle those yet and just log them onto the console
const msgHandler = (level, msg) => {
  // @ts-ignore
  postMessage(`[${Kipper.getLogLevelString(level)}]: ${msg}`);
}

// The log handler that will be used inside the kipper program to handle print messages and allow them to be sent
// to the main thread, so they can be handled and printed onto the console.
const logHandler = {
  identifier: "print",
  args: [
    {
      name: "printText",
      type: "str",
    },
  ],
  handler: [
    "function _kipperGlobal_print(printText: string): void {",
    "postMessage(printText);", // Using 'postMessage' we can simulate a stream like stdout, where everything that is
    // sent is printed in the main thread onto the console.
    "}"
  ],
  returnType: "void",
};

// Global logger for the compiler
// @ts-ignore
const logger = new Kipper.KipperLogger(msgHandler);

// Global compiler
// @ts-ignore
const compiler = new Kipper.KipperCompiler(logger);

// Define the handler for worker messages
onmessage = async function(event) {
  console.log("Received compilation request from main thread. Preparing compilation in Worker.");

  // Compile the code to TypeScript
  const result = (await compiler.compile(event.data, {globals: [logHandler]})).write();

  postMessage(0);

  // Transpile the code from TypeScript to JavaScript
  // @ts-ignore
  const compiledCode = Babel.transform(result, { filename: "kipper-web-script.ts", presets: ["env", "typescript"] });

  // Evaluate the code
  eval(compiledCode.code);

  // Return with exit code 0 (Success)
  postMessage(0);

  // Close the worker when we are finished
  close();
}
