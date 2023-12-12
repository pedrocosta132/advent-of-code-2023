//read input
const fs = require("node:fs");
const input = fs.readFileSync("./input.txt", "utf8");
var startTime = performance.now();
const lines = input.split(/\r?\n/);

//======== solution

const points = [],
  emptyLines = [],
  emptyColumns = [],
  emptySpaceValue = 1000000;

//Initialize with all columns
for (let i = 0; i < lines[0].length; i++) {
  emptyColumns.push(i);
}

lines.forEach((line, i) => {
  let hasPoint = false; //true if line has a point in it
  line.split("").forEach((char, j) => {
    //checks if it's point
    if (char === "#") {
      points.push([i, j]); //add point to array
      hasPoint = true; //flags point exists
      let x = emptyColumns.indexOf(j); //checks if point column is in array of empty columns
      if (x > -1) emptyColumns.splice(x, 1); //if column exists in array removes it since it has a point in it
    }
  });

  if (!hasPoint) emptyLines.push(i); //if has not points in it, adds line to empty lines array
});

let sum = 0; //sum of all shortest paths
for (let i = 0; i < points.length; i++) {
  const [x1, y1] = points[i];
  for (let j = i + 1; j < points.length; j++) {
    const [x2, y2] = points[j];
    //verify if how many empty lines intercept the path between the 2 points
    emptyLines.forEach((l) => {
      if ((l > x1 && l < x2) || (l > x2 && l < x1)) sum += emptySpaceValue - 1;
    });
    //verify if how many empty columns intercept the path between the 2 points
    emptyColumns.forEach((c) => {
      if ((c > y1 && c < y2) || (c > y2 && c < y1)) sum += emptySpaceValue - 1;
    });
    //add the real distance (without the empty space)
    sum += Math.abs(x2 - x1) + Math.abs(y2 - y1);
  }
}

//======== results
var endTime = performance.now();
console.log(`Took ${Math.round(endTime - startTime)} milliseconds`);
console.log("Result: ", sum);
