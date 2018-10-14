const ROWS = 50;
const COLS = 100;
const SCALE = 10;

let currentGrid;
let nextGrid;
let gen = 0;
let livingCells = 0;
let genElement;
let livingElement;

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

function computeNextGrid() {
  livingCells = 0;

  // Determine next state for each cells
  for (let row = 0; row < currentGrid.length; row++) {
    for (let col = 0; col < currentGrid[row].length; col++) {
      const cell = currentGrid[row][col];
      const neighbors = countNeighbors(currentGrid, col, row);

      if (!cell && neighbors === 3) {
        nextGrid[row][col] = 1;
      } else if (cell && (neighbors < 2 || neighbors > 3)) {
        nextGrid[row][col] = 0;
      } else {
        nextGrid[row][col] = cell;
      }

      livingCells += nextGrid[row][col];
    }
  }

  gen++;
}

function setup() {
  // Ensure animation is not too fast
  frameRate(10);

  // Create the canvas (add 1 for the stroke line)
  createCanvas(COLS * SCALE + 1, ROWS * SCALE + 1);

  // Create the grids and randomize content of the first one
  currentGrid = createGrid(ROWS, COLS);
  nextGrid = createGrid(ROWS, COLS);

  for (let row = 0; row < currentGrid.length; row++) {
    for (let col = 0; col < currentGrid[row].length; col++) {
      const cell = floor(random(2));
      currentGrid[row][col] = cell;
      livingCells += cell;
    }
  }

  genElement = document.getElementById('gen');
  livingElement = document.getElementById('living');
}

function draw() {
  // Draw each cell: black for living cells, white for dead ones
  for (let row = 0; row < currentGrid.length; row++) {
    for (let col = 0; col < currentGrid[row].length; col++) {
      fill(!currentGrid[row][col] * 255);
      stroke(128);
      rect(col * SCALE, row * SCALE, SCALE, SCALE);
    }
  }

  // Compute next currentGrid state
  computeNextGrid();
  [currentGrid, nextGrid] = [nextGrid, currentGrid];
  genElement.innerText = gen;
  livingElement.innerText = livingCells;
}
