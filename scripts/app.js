
import { Canvas, Input } from "../engine/qbcreates-js-engine.js";
import SnakeGameObject from "./snake/snake-game-object.js";

let snakeGameObject = new SnakeGameObject();
snakeGameObject.position= [[1, 4], [2, 4], [3, 4]];
Input.initialize();
Canvas.initialize();
Canvas.addGameObject(snakeGameObject);


window.onPlay = () => {
    dispatchEvent(new Event("play"));
} 