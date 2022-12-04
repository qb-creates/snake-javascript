import { Canvas, Input } from "../engine/qbcreates-js-engine.js";
import AppleGameObject from "./apple/apple-game-object.js";
import { GameStateManager } from "./managers/game-state-manager.js";
import { SnakeGameObject } from "./snake/snake-exports.js";

// Canvas.pixelScale = 30;
// Canvas.gridSizeY = window.innerHeight / 30;
Input.initialize();
Canvas.initialize();
(function () {
    let snakeGameObject = new SnakeGameObject();
    Canvas.addGameObject(snakeGameObject);

    let appleGameObject = new AppleGameObject();
    Canvas.addGameObject(appleGameObject);
})();

window.onPlay = () => {
    GameStateManager.onGameStart();
} 