//read input
const fs = require("node:fs");
const input = fs.readFileSync("./input.txt", "utf8");
const lines = input.split(/\r?\n/);

//solution

let sum = 0;
lines.forEach((line) => {
  const [, plays] = line.split(":");
  const max = {
    red: 0,
    green: 0,
    blue: 0,
  };
  plays.split(";").forEach((play) => {
    play
      .trim()
      .split(", ")
      .forEach((color) => {
        const [n, key] = color.split(" ");
        max[key] = n > max[key] ? Number(n) : Number(max[key]);
      });
  });
  sum += max["red"] * max["green"] * max["blue"];
});

console.log(sum); //72227
