//read input
const fs = require("node:fs");
const input = fs.readFileSync("./input.txt", "utf8");
var startTime = performance.now();
const lines = input.split(/\r?\n/);

//solution

const times = toIntArr(lines[0].split(":")[1].trim());
const distances = toIntArr(lines[1].split(":")[1].trim());

let sum = 1;
for (let i = 0; i < times.length; i++) {
  let min = 0;
  while (min * (times[i] - min) <= distances[i]) {
    min++;
  }
  sum *= times[i] + 1 - 2 * min;
}

//======== results
var endTime = performance.now();
console.log(`Took ${Math.round(endTime - startTime)} milliseconds`);
console.log("Result: ", sum);

//helpers

//convert string to array of ints
function toIntArr(arr) {
  return arr
    .trim()
    .split(/\s+/)
    .map((x) => Number(x));
}
