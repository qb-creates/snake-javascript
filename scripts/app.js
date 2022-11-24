
import { Canvas, Input, KeyCode } from "../engine/qbcreates-js-engine.js";
import SnakeController from "./snake/snake-controller.js";
import SnakeMovement from "./snake/snake-movement.js";

Canvas.initialize();
Input.initialize();

let snakeMovement = new SnakeMovement();
//let snakeController = new SnakeController(snakeMovement);
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