const ROWS = 100; // Number of grid rows
const COLS = 120; // Number of grid columns
const SCALE = 10; // Grid scale (higher the bigger)

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

function computeNextGeneration() {
  livingCells = 0;

  // Determine next state for each cells
  for (let row = 0; row < currentGrid.length; row++) {
    for (let col = 0; col < currentGrid[row].length; col++) {
      const cell = currentGrid[row][col];
      const neighbors = countNeighbors(currentGrid, col, row);

      // Apply Conway's Game of Life rules
      // https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules
      if (!cell && neighbors === 3) {
        nextGrid[row][col] = 1; // cell is born
      } else if (cell && (neighbors < 2 || neighbors > 3)) {
        nextGrid[row][col] = 0; // cell dies
      } else {
        nextGrid[row][col] = cell; // cell lives
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

  // Keep a reference of HTML elements
  genElement = document.getElementById('gen');
  livingElement = document.getElementById('living');
}

function draw() {
  // Draw each cell: black for living cells, white for dead ones
  for (let row = 0; row < currentGrid.length; row++) {
    for (let col = 0; col < currentGrid[row].length; col++) {
      fill(!currentGrid[row][col] * 255);
      stroke(225);
      rect(col * SCALE, row * SCALE, SCALE, SCALE);
    }
  }

  // Compute next generation and swap grids
  computeNextGeneration();
  [currentGrid, nextGrid] = [nextGrid, currentGrid];

  // Update HTML elements
  genElement.innerText = gen;
  livingElement.innerText = livingCells;
}
