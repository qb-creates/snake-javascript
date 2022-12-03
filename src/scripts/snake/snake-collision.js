import { MonoBehaviour, Input, KeyCode, Canvas } from "../../engine/qbcreates-js-engine.js";
import { SnakeGameObject } from "./snake-game-object.js";
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

        // let collisionList = Canvas.checkForCollisions({ x: headCoordinates.x, y: headCoordinates.y });
        // let snakeGameObject = collisionList.filter(object => object instanceof (SnakeGameObject));

        // if (snakeGameObject.length > 1) {
        //     console.log("died");
        // }

        // for (let i = 0; i < headIndex - 1; i++) {
        //     let asdf = Canvas.getCellCoordinates(this.gameObject.cells[i]);

        //     if (asdf.x == headCoordinates.x && asdf.y == headCoordinates.y) {
        //         console.log('died');
        //         return;
        //     }
        // }

        if (headCoordinates.x >= Canvas.gridSizeX - 1) {
            this.#canGoRight = false;
        } else {
            this.#canGoRight = true;
        }

        if (headCoordinates.x <= 0) {
            this.#canGoLeft = false;
        } else {
            this.#canGoLeft = true;
        }

        if (headCoordinates.y >= Canvas.gridSizeY - 1) {
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
        if (!this.#canGoRight && horizontalAxis == 1) {
            return false;
        } 
        if (!this.#canGoLeft && horizontalAxis == -1) {
            return false;
        } 
        if (!this.#canGoUp && verticalAxis == 1) {
            return false;
        } 
        if (!this.#canGoDown && verticalAxis == -1) {
            return false;
        }
        return true;
    }
}