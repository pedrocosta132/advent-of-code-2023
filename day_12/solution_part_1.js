//read input
const fs = require("node:fs");
const input = fs.readFileSync("./input.txt", "utf8");
var startTime = performance.now();
const lines = input.split(/\r?\n/);

//solution

function isCombinationValid(str, key) {
  const arr = str.split(/[.]+/).filter((value) => value);
  if (arr.length !== key.length) return false;
  return (
    arr.filter((value, index) => value.length === key[index]).length ===
    key.length
  );
}

function recursive(curr, i, arr, key) {
  if (i === arr.length) {
    return isCombinationValid(curr, key) ? 1 : 0;
  }

  if (arr[i] === "?") {
    return (
      recursive(curr + ".", i + 1, arr, key) +
      recursive(curr + "#", i + 1, arr, key)
    );
  }

  return recursive(curr + arr[i], i + 1, arr, key);
}

let sum = 0;
lines.forEach((line) => {
  const [value, key] = line.split(" ");
  sum += recursive(
    "",
    0,
    value.split(""),
    key.split(",").map((value) => +value)
  );
});

// console.log("##.##.###", isCombinationValid("##.#.###", [1, 2, 3]));

//======== results
var endTime = performance.now();
console.log(`Took ${Math.round(endTime - startTime)} milliseconds`);
console.log("Result:", sum);
