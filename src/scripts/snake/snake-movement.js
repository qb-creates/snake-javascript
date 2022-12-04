import { Canvas, MonoBehaviour, Time, Cell } from "../../engine/qbcreates-js-engine.js";
import { GameStateManager } from "../managers/game-state-manager.js";
import { SnakeCollision, SnakeSize, snakeHeadColor, snakeBodyColor, snakeTailColor } from "./snake-exports.js";

export class SnakeMovement extends MonoBehaviour {
    #snakeCollision = null;
    #snakeSize = null;
    #verticalAxis = 0;
    #horizontalAxis = 1;
    #movePlayerTimer = .11;
    #currentDirection = [0, 1];

    get currentDirection() {
        return this.#currentDirection;
    }

    set horizontalAxis(newHorizontalAxis) {
        this.#horizontalAxis = newHorizontalAxis;
    }

    set verticalAxis(newVerticalAxis) {
        this.#verticalAxis = newVerticalAxis;
    }

    awake() {
        this.#snakeCollision = this.gameObject.getComponent(SnakeCollision.className);
        this.#snakeSize = this.gameObject.getComponent(SnakeSize.className);
    }

    start() {

    }

    update() {
        this.#movePlayerTimer -= Time.fixedDeltaTime;

        if (this.#movePlayerTimer <= 0 && !this.#snakeSize.isGrowing) {
            let headIndex = this.gameObject.cells.length - 1
            let coordinates = this.gameObject.cells[headIndex].position;
            let headX = coordinates.x + this.#horizontalAxis;
            let headY = coordinates.y + this.#verticalAxis;

            let collisionResult = this.#snakeCollision.checkForCollisions(headX, headY);

            if (collisionResult) {
                this.gameObject.cells[headIndex].color = snakeBodyColor;
                this.gameObject.cells[1].color = snakeTailColor;
                this.gameObject.cells[0].color = snakeHeadColor;
                this.gameObject.cells[0].position = { x: headX, y: headY };

                // Push the tail cell to the front of the array.
                this.gameObject.cells.push(this.gameObject.cells.shift());

                this.#currentDirection = [this.#horizontalAxis, this.#verticalAxis];
                this.#movePlayerTimer = .11;
            } else {
                GameStateManager.onGameOver();
            }
        }
    }
}