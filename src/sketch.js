const ROWS = 5;
const COLS = 10;
const SCALE = 10;

let grid;

function createGrid(rows, cols) {
  return Array(rows)
    .fill(0)
    .map(x => Array(cols || rows).fill(0));
}

function setup() {
  // Create the canvas (add 1 for the stroke line)
  createCanvas(COLS * SCALE + 1, ROWS * SCALE + 1);

  // Create the grid and randomize content
  grid = createGrid(ROWS, COLS);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  // Draw each cell: black for living cells, white for dead ones
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      fill(!grid[i][j] * 255);
      stroke(128);
      rect(j * SCALE, i * SCALE, SCALE, SCALE);
    }
  }
}
