//read input
const fs = require("node:fs");
const input = fs.readFileSync("./input.txt", "utf8");
const lines = input.split(/\r?\n/);

//solution

var startTime = performance.now();

//get seed itervals
const seeds = toIntArr(lines[0].split(":")[1]);
const initialIntervals = [];
for (let i = 0; i < seeds.length; i = i + 2) {
  initialIntervals.push([seeds[i], seeds[i] + seeds[i + 1] - 1]);
}
const chart = [[], [], [], [], [], [], []];

//build intervals convertion per step
let section = 0;
for (let i = 3; i < lines.length; i++) {
  if (lines[i] === "") {
    i++;
    section++;
    continue;
  }
  chart[section].push(toIntArr(lines[i]));
}

//convert the intervals on every step
let intervals = initialIntervals;
for (let i = 0; i < chart.length; i++) {
  intervals = buildIntervals(intervals, chart[i]);
}

var endTime = performance.now();

//======== results
console.log(`Took ${Math.round(endTime - startTime)} milliseconds`);
console.log("Result: ", intervals[0][0]);

//helpers

//get group of intervals and convert acording to step rules
function buildIntervals(intervals, matrix) {
  let currIntervals = [...intervals];
  let nextIntervals = [];

  for (let i = 0; i < currIntervals.length; i++) {
    const [x, y] = currIntervals[i];
    let usedIntervals = [];

    matrix.forEach((arr) => {
      const dif = arr[1] - arr[0];
      const z = arr[1];
      const t = arr[1] + arr[2] - 1;

      if (x >= z && x <= t) {
        usedIntervals.push([x, Math.min(y, t), dif]);
        if (Math.min(y, t) > t) currIntervals.push([t + 1, y]);
      } else if (y >= z && y <= t) {
        usedIntervals.push([Math.max(x, z), y, dif]);
        if (Math.max(x, z) < z) currIntervals.push([x, z - 1]);
      } else if (x < z && y > t) {
        usedIntervals.push([z, t, dif]);
        currIntervals.push([x, z - 1], [t + 1, y]);
      }
    });
    nextIntervals.push(
      ...usedIntervals.map((item) => [item[0] - item[2], item[1] - item[2]]),
      ...findLeftoverIntervals([x, y], usedIntervals)
    );
  }

  return removeOverlap(nextIntervals);
}

//remove overlap on intervals
function removeOverlap(intervals) {
  if (intervals.length <= 1) {
    return intervals;
  }

  intervals.sort((a, b) => a[0] - b[0]);
  let result = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    let currentInterval = intervals[i];
    let lastResultInterval = result[result.length - 1];

    if (currentInterval[0] <= lastResultInterval[1]) {
      lastResultInterval[1] = Math.max(
        lastResultInterval[1],
        currentInterval[1]
      );
    } else if (currentInterval[0] > lastResultInterval[1]) {
      result.push(currentInterval);
    } else {
      lastResultInterval[1] = currentInterval[1];
    }
  }
  return result;
}

//calculate unused subintervals of interval
function findLeftoverIntervals(interval, subintervals) {
  const [x, y] = interval;
  subintervals.sort((a, b) => a[0] - b[0]);
  let result = [[x, y]];
  for (let i = 0; i < subintervals.length; i++) {
    const currentInterval = subintervals[i];
    const lastResultInterval = result[result.length - 1];
    if (currentInterval[0] <= lastResultInterval[1]) {
      result.pop();
      if (currentInterval[0] > lastResultInterval[0]) {
        result.push([lastResultInterval[0], currentInterval[0] - 1]);
      }
      if (currentInterval[1] + 1 <= lastResultInterval[1]) {
        result.push([currentInterval[1] + 1, lastResultInterval[1]]);
      }
    }
  }
  return result;
}

//convert string to array of ints
function toIntArr(arr) {
  return arr
    .trim()
    .split(/\s+/)
    .map((x) => Number(x));
}
