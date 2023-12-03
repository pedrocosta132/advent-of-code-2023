//read input
const fs = require("node:fs");
const input = fs.readFileSync("./input.txt", "utf8");

const digitRegex = new RegExp("^[0-9]$");

//solution

//get lines from text
const lines = input.split(/\r?\n/);

//check if string is number
function isDigit(str) {
  return digitRegex.test(str);
}

//check if string includes written digit
//if true return the digit
function getNumber(word) {
  if (word.includes("one")) {
    return 1;
  } else if (word.includes("two")) {
    return 2;
  } else if (word.includes("three")) {
    return 3;
  } else if (word.includes("four")) {
    return 4;
  } else if (word.includes("five")) {
    return 5;
  } else if (word.includes("six")) {
    return 6;
  } else if (word.includes("seven")) {
    return 7;
  } else if (word.includes("eight")) {
    return 8;
  } else if (word.includes("nine")) {
    return 9;
  } else {
    return -1;
  }
}

let sum = 0;
lines.forEach((word) => {
  let first = -1,
    last = -1,
    count = 0;
  while ((first === -1 || last === -1) && count < word.length) {
    first =
      first > -1
        ? first
        : isDigit(word[count])
        ? Number(word[count])
        : getNumber(word.slice(0, count + 1));
    last =
      last > -1
        ? last
        : isDigit(word[word.length - count - 1])
        ? Number(word[word.length - count - 1])
        : getNumber(word.slice(word.length - count - 1, word.length));
    count++;
  }
  sum += first * 10 + last;
});

console.log(sum);
