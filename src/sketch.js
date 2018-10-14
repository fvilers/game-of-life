const ROWS = 20;
const COLS = 10;
const SCALE = 10;

let grid;

function createGrid(rows, cols) {
  return Array(rows)
    .fill(0)
    .map(x => Array(cols || rows).fill(0));
}

function setup() {
  createCanvas(ROWS * SCALE, COLS * SCALE);

  grid = createGrid(ROWS, COLS);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {}
