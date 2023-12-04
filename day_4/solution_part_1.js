//read input
const fs = require("node:fs");
const input = fs.readFileSync("./input.txt", "utf8");
const lines = input.split(/\r?\n/);

//solution

let sum = 0;
lines.forEach((line) => {
  const game = line.split(": ")[1];
  const [winners, numbers] = game.split("|");
  const winnersArr = [
    ...winners
      .trim()
      .split(/\s+/)
      .map((value) => Number(value)),
  ];
  let total = 0;
  numbers.split(/\s+/).forEach((number) => {
    if (winnersArr.includes(Number(number))) total++;
  });
  sum += total > 0 ? Math.pow(2, total - 1) : 0;
});

console.log(sum);
