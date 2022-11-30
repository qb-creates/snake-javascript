
import { Canvas, Input } from "../engine/qbcreates-js-engine.js";
import SnakeGameObject from "./snake/snake-game-object.js";

Input.initialize();
Canvas.initialize();

(function () {
    let snakeGameObject = new SnakeGameObject();
    snakeGameObject.position = [[1, 4], [2, 4], [3, 4]];
    Canvas.addGameObject(snakeGameObject);
})();

window.onPlay = () => {
    dispatchEvent(new Event("play"));
} 