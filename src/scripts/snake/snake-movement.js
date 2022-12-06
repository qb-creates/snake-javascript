import { Canvas, MonoBehaviour, Time, Vector2 } from "../../engine/qbcreates-js-engine.js";
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
        //this.#snakeCollision = this.gameObject.getComponent(SnakeCollision.className);
        //this.#snakeSize = this.gameObject.getComponent(SnakeSize.className);
    }

    start() {

    }

    update() {
        this.#movePlayerTimer -= Time.fixedDeltaTime;

        // if (this.#movePlayerTimer <= 0 && !this.#snakeSize.isGrowing) {
        if (this.#movePlayerTimer <= 0) {
            let headIndex = this.gameObject.children.length - 1
            let coordinates = this.gameObject.children[headIndex].position;
            let headX = coordinates.x + this.#horizontalAxis;
            let headY = coordinates.y + this.#verticalAxis;

            // let collisionResult = this.#snakeCollision.checkForCollisions(headX, headY);
            let collisionResult = true;
            
            if (collisionResult) {
                // this.gameObject.children[headIndex].color = snakeBodyColor;
                // this.gameObject.children[1].color = snakeTailColor;
                // this.gameObject.children[0].color = snakeHeadColor;
                this.gameObject.children[0].position = new Vector2(headX, headY);

                // Push the tail cell to the front of the array.
                this.gameObject.children.push(this.gameObject.children.shift());

                this.#currentDirection = [this.#horizontalAxis, this.#verticalAxis];
                this.#movePlayerTimer = .11;
            } else {
                GameStateManager.onGameOver();
            }
        }
    }
}