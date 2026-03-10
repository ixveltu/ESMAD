function adition(a, b) {
 return a + b;
}

function subtraction(a, b) {
 return a - b;
}

function multiply(a, b) {
 return a * b;
}

function division(a, b) {
 if (b === 0) {
  console.log(`Error, ${b} cant be devided`);
 }
 return a / b;
}

module.exports = {
 adition,
 subtraction,
 multiply,
 division,
};
