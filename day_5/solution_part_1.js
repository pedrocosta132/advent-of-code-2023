//read input
const fs = require("node:fs");
const input = fs.readFileSync("./input.txt", "utf8");
const lines = input.split(/\r?\n/);

//solution

const seeds = toIntArr(lines[0].split(":")[1]).map((seed) => ({ seed }));
const chart = [[], [], [], [], [], [], []];

let section = 0;
for (let i = 3; i < lines.length; i++) {
  if (lines[i] === "") {
    i++;
    section++;
    continue;
  }
  chart[section].push(toIntArr(lines[i]));
}

const res = seeds.map((seed) => {
  seed["soil"] = findInMatrix(seed.seed, chart[0]);
  seed["fertilizer"] = findInMatrix(seed.soil, chart[1]);
  seed["water"] = findInMatrix(seed.fertilizer, chart[2]);
  seed["light"] = findInMatrix(seed.water, chart[3]);
  seed["temperature"] = findInMatrix(seed.light, chart[4]);
  seed["humidity"] = findInMatrix(seed.temperature, chart[5]);
  seed["location"] = findInMatrix(seed.humidity, chart[6]);
  return seed;
});

let min = res[0].location;
for (let i = 0; i < res.length; i++) {
  if (res[i].location < min) min = res[i].location;
}

console.log(min);

//helpers
function findInMatrix(value, matrix) {
  let result;
  matrix.forEach((arr) => {
    if (value >= arr[1] && value <= arr[1] + arr[2] - 1) {
      result = value - arr[1] + arr[0];
      return;
    }
  });
  return result || value;
}

function toIntArr(arr) {
  return arr
    .trim()
    .split(/\s+/)
    .map((x) => Number(x));
}
