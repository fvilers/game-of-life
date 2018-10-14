let grid;

function createGrid(rows, cols) {
  return Array(rows)
    .fill(0)
    .map(x => Array(cols || rows).fill(0));
}

function setup() {
  grid = createGrid(10);
}

function draw() {}
