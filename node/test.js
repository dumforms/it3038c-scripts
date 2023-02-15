const path = require("path");

const hello = "Hello from Node JS!"

console.log(`Printing the variable hello: ${hello}`);

console.log("Directory name: " + __dirname);
console.log("Directory and file name: " + __filename);

console.log(`Hello from file ${path.basename(__filename)}`);

console.log(`Process args: ${process.argv}`);
