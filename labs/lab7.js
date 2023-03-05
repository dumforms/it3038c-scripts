const sudokubox = require('sudokubox');


const box1 = new sudokubox();

const puzzleConfig = {level: 'HARD'};
const {puzzle, board, totalCellsFilled, performance} = box1.generate(puzzleConfig);

const result = box1.solve(puzzle);

console.log(result);
