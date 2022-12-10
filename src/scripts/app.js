// import { Canvas, Input, Vector2 } from "../engine/qbcreates-js-engine.js";
// import AppleGameObject from "./apple/apple-game-object.js";
// import { GameStateManager } from "./managers/game-state-manager.js";
// import { SnakeGameObject, SnakeMovement } from "./snake/snake-exports.js";
// import { SpriteRenderer, square } from "../engine/sprite-renderer.js";

import { GameObject, Canvas, SpriteRenderer, Vector3, Vector2, Input, Object } from "../engine/qbcreates-js-engine.js";
import { GameStateManager } from "./managers/game-state-manager.js";
import { SnakeMovement, SnakeInput, snakeHeadColor, snakeBodyColor } from "./snake/snake-exports.js";
import { square } from "../engine/sprite-renderer.js";
import { TestFollow } from "./test-follow.js";

Input.initialize();
Canvas.configureCanvas(500, 500, 25);
let b = snake();
Canvas.addGameObject(b);

// let border = new GameObject('gameBorder');
// border.transform.scale = new Vector2(19.5, 19.5);
// border.transform.position = new Vector3(0, 0, 0);
// let spriteRenderer = border.addComponent(SpriteRenderer);
// spriteRenderer.color = '#9BBA5A';
// spriteRenderer.sprite = (renderer) => {
//     square(renderer.transform.position.x, renderer.transform.position.y, renderer.color, renderer.transform.scale)
// }
// Canvas.addGameObject(border);

let enemy = new GameObject("enemy");
enemy.addGameObject(snakeBodyPrefab());
let testFollow = enemy.addComponent(TestFollow);
testFollow.target = b;
enemy.transform.position = new Vector3(5,5,1);
Canvas.addGameObject(enemy);

// let a = Object.instantiate(b);
// a.transform.position = new Vector3(6, 3, 1);
// Canvas.addGameObject(a);

// Matrix transformation
// ctx.translate(112.5, 62.5);
// ctx.rotate(Math.PI / 2);
// ctx.translate(-112.5, -62.5);
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

window.onPlay = () => {
    GameStateManager.onGameStart();
}



//Prefabs
function snake() {
    let snakeGameObject = new GameObject('snakeGameObject');
    snakeGameObject.transform.position = new Vector3(0, 0, 1);
    
    let snakeTail = snakeBodyPrefab();
    snakeTail.transform.position = new Vector3(0, 0, 1);
    snakeTail.transform.scale = new Vector2(.6, .6);
    snakeTail.getComponent(SpriteRenderer).color = snakeBodyColor;
    snakeTail.getComponent(SpriteRenderer).sprite(snakeTail.getComponent(SpriteRenderer));
    snakeGameObject.addGameObject(snakeTail);

    let snakeBody = snakeBodyPrefab();
    snakeBody.transform.position = new Vector3(1, 0, 1);
    snakeBody.transform.scale = new Vector2(.8, .8);
    snakeBody.getComponent(SpriteRenderer).color = snakeBodyColor;
    snakeBody.getComponent(SpriteRenderer).sprite(snakeBody.getComponent(SpriteRenderer));
    snakeGameObject.addGameObject(snakeBody);

    let snakeHead = snakeBodyPrefab();
    snakeHead.transform.position = new Vector3(2, 0, 1);
    snakeHead.getComponent(SpriteRenderer).color = snakeHeadColor;
    snakeHead.getComponent(SpriteRenderer).sprite(snakeHead.getComponent(SpriteRenderer));
    snakeGameObject.addGameObject(snakeHead);

    snakeGameObject.addComponent(SnakeMovement);
    snakeGameObject.addComponent(SnakeInput);

    return snakeGameObject;
}

function snakeBodyPrefab() {
    let snakeBody = new GameObject('snakeBody');
    snakeBody.transform.position = new Vector3(0, 0, 1);
    let spriteRenderer = snakeBody.addComponent(SpriteRenderer);
    spriteRenderer.color = snakeBodyColor;
    spriteRenderer.sprite = (renderer) => {
        square(renderer.transform.position.x, renderer.transform.position.y, renderer.color, renderer.transform.scale)
    }
    return snakeBody;
}