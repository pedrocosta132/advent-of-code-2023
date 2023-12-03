//read input
const fs = require('node:fs');
const input = fs.readFileSync('./test.txt', 'utf8');

const digitRegex = new RegExp("^[0-9]$");

//solution

function isDigit(str) {
  return digitRegex.test(str);
}

const lines = input.split(/\r?\n/);

let sum = 0;
lines.forEach(word => {
  const digits = [];
  word.split("").forEach(c => {
    if(isDigit(c)) {
      digits.push(Number(c));
    }
  });
  sum += digits[0] * 10 + digits[digits.length - 1];
})

console.log(sum); //56049