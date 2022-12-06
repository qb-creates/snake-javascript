import { Canvas, Input, Vector2 } from "../engine/qbcreates-js-engine.js";
import AppleGameObject from "./apple/apple-game-object.js";
import { GameStateManager } from "./managers/game-state-manager.js";
import { SnakeGameObject, SnakeMovement } from "./snake/snake-exports.js";
import { Sprite, square } from "../engine/sprites.js";

Canvas.configureCanvas(500, 500, 25);

let snakeGameObject = new SnakeGameObject();

snakeGameObject.addGameObject(makeImage(0, 0, 'red'));
snakeGameObject.addGameObject(makeImage(1, 0, 'green'));
snakeGameObject.addGameObject(makeImage(2, 0, 'purple'));
snakeGameObject.addComponent(new SnakeMovement());
Canvas.addGameObject(snakeGameObject);
function makeImage(x, y, color) {
    let body = new SnakeGameObject();
    let sprite = new Sprite();
    body.position = new Vector2(x, y);
    sprite.color = color;
    sprite.image = () => { square(body.position.x, body.position.y, sprite.color); }
    body.addComponent(sprite);
    return body;
}
// // Matrix transformation
// // ctx.translate(112.5, 62.5);
// // ctx.rotate(Math.PI / 2);
// // ctx.translate(-112.5, -62.5);
// let n = 25;
// ctx.strokeStyle = '#FFFF0022';
// ctx.fillStyle = '#00FF0022';
// ctx.beginPath();
// ctx.moveTo((3-.5) * n, (2-.5) * n);
// ctx.lineTo((4-.5) * n, (2-.5) * n);
// ctx.lineTo((4-.5) * n, (1-.5) * n);
// ctx.lineTo((5-.5) * n, (1-.5) * n);
// ctx.lineTo((5-.5) * n, (2-.5) * n);
// ctx.lineTo((6-.5) * n, (2-.5) * n);
// ctx.lineTo((6-.5) * n, (3-.5) * n);
// ctx.lineTo((3-.5) * n, (3-.5) * n);
// ctx.fill();

// ctx.strokeStyle = '#FFFF0022';
// ctx.fillStyle = '#00FF0022';
// ctx.beginPath();
// ctx.moveTo((6-.5) * n, (2-.5) * n);
// ctx.lineTo((6-.5) * n, (3-.5) * n);
// ctx.lineTo((9-.5) * n, (3-.5) * n);
// ctx.lineTo((9-.5) * n, (2-.5) * n);
// ctx.lineTo((8-.5) * n, (2-.5) * n);
// ctx.lineTo((8-.5) * n, (1-.5) * n);
// ctx.lineTo((7-.5) * n, (1-.5) * n);
// ctx.lineTo((7-.5) * n, (2-.5) * n);
// ctx.fill();

// // collider 1
// ctx.beginPath();
// ctx.strokeStyle = 'red';
// ctx.moveTo(3 * n, 2 * n);
// ctx.lineTo(3 * n, 3 * n);
// ctx.lineTo(4 * n, 3 * n);
// ctx.lineTo(4 * n, 2 * n);
// ctx.lineTo(3 * n, 2 * n);
// ctx.stroke();
// ctx.beginPath();
// ctx.strokeStyle = 'green';
// ctx.moveTo(4 * n, 2 * n);
// ctx.lineTo(4 * n, 3 * n);
// ctx.lineTo(5 * n, 3 * n);
// ctx.lineTo(5 * n, 2 * n);
// ctx.lineTo(4 * n, 2 * n);
// ctx.stroke();
// ctx.beginPath();
// ctx.strokeStyle = 'yellow';
// ctx.moveTo(5 * n, 2 * n);
// ctx.lineTo(5 * n, 3 * n);
// ctx.lineTo(6 * n, 3 * n);
// ctx.lineTo(6 * n, 2 * n);
// ctx.lineTo(5 * n, 2 * n);
// ctx.stroke();

// let w = 25;
// let h = 25;
// let x = 0;
// let y = 0;
// ctx.fillRect(x - (w/2), y - (h/2), w, h);
// collider 1
// ctx.beginPath();
// ctx.strokeStyle = 'green';
// ctx.moveTo(3.5 * n, 2.5 * n);
// ctx.lineTo(3.5 * n, 3.5 * n);
// ctx.lineTo(8.5 * n, 3.5 * n);
// ctx.lineTo(8.5 * n, 2.5 * n);
// ctx.lineTo(3.5 * n, 2.5 * n);
// ctx.stroke();


// starts at 100, 50 ends at 25, 25
// width
// center 4,2

// ctx.translate(112.5, 62.5);
// ctx.rotate(-Math.PI / 2);
// ctx.translate(-112.5, -62.5);

// ctx.translate(162.5, 87.5);
// ctx.rotate(Math.PI / 2);
// ctx.translate(-162.5, -87.5);
// ctx.fillStyle='red';
// ctx.fillRect(75, 75, 175, 25);

/** Round Rect code
 ctx.strokeStyle = 'yellow';
 ctx.fillStyle ='yellow';
 ctx.beginPath();
 ctx.roundRect(62.5, 37.5, 75, 75, [10]);
 ctx.stroke();
 ctx.fill();
 */




// Canvas.pixelScale = 30;
// Canvas.gridSizeY = window.innerHeight / 30;


// Input.initialize();
// Canvas.initialize();
// (function () {
//     let snakeGameObject = new SnakeGameObject();
//     Canvas.addGameObject(snakeGameObject);

//     let appleGameObject = new AppleGameObject();
//     Canvas.addGameObject(appleGameObject);
// })();

window.onPlay = () => {
    GameStateManager.onGameStart();
} 