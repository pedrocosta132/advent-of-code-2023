//read input
const fs = require("node:fs");
const input = fs.readFileSync("./input.txt", "utf8");
const lines = input.split(/\r?\n/);

//solution

const data = []; //matrix with data
lines.forEach((line) => {
  data.push(line.split(""));
});

let sum = 0;
for (let i = 0; i < data.length; i++) {
  let number = 0,
    goingOnNumber = false;

  for (let j = 0; j < data[i].length; j++) {
    //check if is digit
    if (isDigit(data[i][j])) {
      number = goingOnNumber
        ? number * 10 + Number(data[i][j])
        : Number(data[i][j]);
      goingOnNumber = true;
      if (j < data[i].length - 1) continue; //if not last column continue
      j++; //if last position is a digit move 1 position to correct check it
    }

    //if current is not a digit and there's no going number to check, move to next
    if (!goingOnNumber) continue;

    //if current position is not a digit and there's a number going on, it's time to validate if number is valid (there's a special char around)
    const numberLength = getNumberLength(number);

    let isValid = false;
    for (
      let k = Math.max(0, i - 1);
      k <= Math.min(data.length - 1, i + 1);
      k++
    ) {
      for (
        let l = Math.max(0, j - numberLength - 1);
        l <= Math.min(data[i].length - 1, j);
        l++
      ) {
        if (isSpecial(data[k][l])) {
          isValid = true;
          break;
        }
      }
      if (isValid) break;
    }
    if (isValid) sum += number;
    number = 0;
    goingOnNumber = false;
    continue;
  }
}

console.log(sum);

//helpers

//verify if is digit
function isDigit(str) {
  return new RegExp("^[0-9]$").test(str);
}
function isSpecial(str) {
  return new RegExp("^[^0-9.]$").test(str);
}

function getNumberLength(n) {
  return (Math.log(n) * Math.LOG10E + 1) | 0;
}
