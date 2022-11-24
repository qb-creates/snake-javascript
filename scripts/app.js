
import Canvas from "./canvas.js";
import SnakeMovement from "./snake/snake-movement.js";
let stageGrid = [];
const emptyCell = 'empty-cell';
const snakeBodyCell = 'snake-body-cell';

let snake = [[7, 7], [8, 7], [9, 7]];
let headIndex = 2;
let tailIndex = 0;

// // Draw Player
// for (let i = 0; i < snake.length; i++) {
//     stageGrid[snake[i][0]][snake[i][1]].classList.remove("empty-cell");
//     stageGrid[snake[i][0]][snake[i][1]].classList.add("snake-body-cell");
// }
let up = 0;
let down = 0;
let right = 0;
let left = 1;
Canvas.initialize();
let sss = new SnakeMovement();
// addEventListener('keypress', (event) => {
//     if(event.key == 'w') {
//         up = 1;
//         left = 0;
//     } else if (event.key == 's'){
//         up = -1;
//         left = 0;
//     }if(event.key == 'a') {
//         up = 0;
//         left = -1;
//     } else if (event.key == 'd'){
//         up = 0;
//         left = 1;
//     }
// });