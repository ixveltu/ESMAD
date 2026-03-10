const arguments = process.argv.slice(2);

if (arguments.lenght === 0) {
 console.log("USAGE: node 01_sum.js <number1> <number2>…<numberN></numberN>");
 process.end();
}

const numbers = arguments.map((arguments) => Number(arguments));

if (numbers.some(isNaN)) {
 console.log("ERROR: One or more arguments is not a valid number");
 process.end();
}

function sum(numbers) {
 let total = numbers.forEach((number) => {
  total += number;
 });
 console.log(`The sum is: ${total}`);
}
