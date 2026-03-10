const math = require("./module/math.js");

const operator = process.argv[2];
const number1 = parseFloat(process.argv[3]);
const number2 = parseFloat(process.argv[4]);

if (!operator || isNaN(number1) || isNaN(number2)) {
 console.log(
  "ERROR: Not enough operators! USAGE: node ex3 <operation> <number1><number2>"
 );
 process.end(1);
}

let result;

try {
 if (operator === "+") {
  result = math.adition(number1, number2);
 } else if (operator === "-") {
  result = math.subtraction(number1, number2);
 } else if (operator === "*") {
  result = math.multiply(number1, number2);
 } else if (operator === "/") {
  result = math.division(number1, number2);
 } else {
  console.log(`The operator used, ${operator} isnt valid `);
  process.end(1);
 }

 console.log(`${number1} ${operator} ${number2} = ${result}`);
} catch (e) {
 console.log(`Erros ${e.message}`);
}
