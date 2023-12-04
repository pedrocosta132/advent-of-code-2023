//read input
const fs = require("node:fs");
const input = fs.readFileSync("./input.txt", "utf8");
const lines = input.split(/\r?\n/);

//solution

let sum = 0;
const cardMap = new Map(); //track n of cards
for (let i = 0; i < lines.length; i++) {
  //parse game like part 1
  const game = lines[i].split(": ")[1];
  const [winners, numbers] = game.split("|");
  const winnersArr = [
    ...winners
      .trim()
      .split(/\s+/)
      .map((value) => Number(value)),
  ];
  let total = 0; //total of matching numbers
  numbers.split(/\s+/).forEach((number) => {
    if (winnersArr.includes(Number(number))) total++;
  });

  //number of copies of current card
  const currNScratchs = (cardMap.get(i) || 0) + 1;

  //add 1 card for the next j cards for every current card
  for (let j = 1; j <= total; j++) {
    cardMap.set(i + j, (cardMap.get(i + j) || 0) + currNScratchs);
  }

  //add current copies to total pile
  sum += currNScratchs;
}

console.log(sum); //13261850
