const ROWS = 50;
const COLS = 100;
const SCALE = 10;

let grid;
let gen = 0;
let genElement;

function createGrid(rows, cols) {
  return Array(rows)
    .fill(0)
    .map(() => Array(cols || rows).fill(0));
}

function countNeighbors(array, x, y) {
  // Count only neighbors (not the cell itself)
  let neighbors = -array[y][x];

  for (let row = -1; row <= 1; row++) {
    for (let col = -1; col <= 1; col++) {
      // Ensure no out of bounds as edges are stitched together
      neighbors += array[(y + row + ROWS) % ROWS][(x + col + COLS) % COLS];
    }
  }

  return neighbors;
}

function computeNextGrid(previous) {
  const next = createGrid(ROWS, COLS);

  // Determine next state for each cells
  for (let row = 0; row < previous.length; row++) {
    for (let col = 0; col < previous[row].length; col++) {
      const cell = previous[row][col];
      const neighbors = countNeighbors(previous, col, row);

      if (!cell && neighbors === 3) {
        next[row][col] = 1;
      } else if (cell && (neighbors < 2 || neighbors > 3)) {
        next[row][col] = 0;
      } else {
        next[row][col] = cell;
      }
    }
  }

  gen++;

  return next;
}

function setup() {
  // Ensure animation is not too fast
  frameRate(10);

  // Create the canvas (add 1 for the stroke line)
  createCanvas(COLS * SCALE + 1, ROWS * SCALE + 1);

  // Create the grid and randomize content
  grid = createGrid(ROWS, COLS);
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      grid[row][col] = floor(random(2));
    }
  }

  genElement = document.getElementById('gen');
}

function draw() {
  // Draw each cell: black for living cells, white for dead ones
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      fill(!grid[row][col] * 255);
      stroke(128);
      rect(col * SCALE, row * SCALE, SCALE, SCALE);
    }
  }

  // Compute next grid state
  grid = computeNextGrid(grid);
  genElement.innerText = gen;
}
