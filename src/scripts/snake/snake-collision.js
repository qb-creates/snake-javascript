import { MonoBehaviour, Input, KeyCode, Canvas } from "../../engine/qbcreates-js-engine.js";
import { GameStateManager } from "../managers/game-state-manager.js";
export class SnakeCollision extends MonoBehaviour{
    #canGoLeft = true;
    #canGoRight = true;
    #canGoUp = true;
    #canGoDown = true;

    awake() {
    }

    start() {
    }
7
    update() {
        let headIndex = this.gameObject.cells.length - 1;
        let headCoordinates = this.gameObject.cells[headIndex].position;

        let collisionList = Canvas.checkForCollisions({ x: headCoordinates.x, y: headCoordinates.y });
        let snakeGameObject = collisionList.filter(object => object instanceof (SnakeGameObject));

        if (snakeGameObject.length > 1) {
            GameStateManager.onGameOver();
        }

        for (let i = 0; i < headIndex - 1; i++) {
            let asdf = this.gameObject.cells[i].position;

            if (asdf.x == headCoordinates.x && asdf.y == headCoordinates.y) {
                GameStateManager.onGameOver();
                return;
            }
        }

        if (headCoordinates.x >= Canvas.canvasWidth - 1) {
            this.#canGoRight = false;
        } else {
            this.#canGoRight = true;
        }

        if (headCoordinates.x <= 0) {
            this.#canGoLeft = false;
        } else {
            this.#canGoLeft = true;
        }

        if (headCoordinates.y >= Canvas.canvasHeight - 1) {
            this.#canGoUp = false;
        } else {
            this.#canGoUp = true;
        }

        if (headCoordinates.y <= 0) {
            this.#canGoDown = false;
        } else {
            this.#canGoDown = true;
        }
    }

    checkForCollisions(horizontalAxis, verticalAxis) {
        if (horizontalAxis > Canvas.canvasWidth - 1) {
            return false;
        } 

        if (horizontalAxis < 0) {
            return false;
        } 

        if (verticalAxis > Canvas.canvasHeight - 1) {
            return false;
        } 
        
        if (verticalAxis < 0) {
            return false;
        } 
        return true;
    }
}