import { MonoBehaviour, SpriteRenderer, Time, Vector2 } from "../../engine/qbcreates-js-engine.js";
import { GameStateManager } from "../managers/game-state-manager.js";
import { SnakeCollision, SnakeSize, snakeHeadColor, snakeBodyColor } from "./snake-exports.js";

export class SnakeMovement extends MonoBehaviour {
    #snakeCollision = null;
    #snakeSize = null;
    #verticalAxis = 0;
    #horizontalAxis = 1;
    #movePlayerTimer = 2;
    #currentDirection = new Vector2(0, 1);

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
            let coordinates = this.gameObject.children[headIndex].transform.position;
            let headX = coordinates.x + this.#horizontalAxis;
            let headY = coordinates.y + this.#verticalAxis;

            // let collisionResult = this.#snakeCollision.checkForCollisions(headX, headY);
            let collisionResult = true;
            
            if (collisionResult) {
                this.gameObject.children[0].transform.position = new Vector2(headX, headY);
                this.gameObject.children[0].transform.scale = new Vector2(1, 1);
                this.gameObject.children[1].transform.scale = new Vector2(.8, .8);
                // Push the tail cell to the front of the array.
                this.gameObject.children.push(this.gameObject.children.shift());
                
                this.gameObject.children[headIndex].getComponent(SpriteRenderer).color = snakeHeadColor;
                this.gameObject.children[headIndex - 1].getComponent(SpriteRenderer).color = snakeBodyColor;

                this.#currentDirection = new Vector2(this.#horizontalAxis, this.#verticalAxis);
                this.#movePlayerTimer = .11;
            } else {
                GameStateManager.onGameOver();
            }
        }
    }
}