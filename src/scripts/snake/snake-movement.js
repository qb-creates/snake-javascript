import { MonoBehaviour, SpriteRenderer, Time, Vector3, Vector2 } from "../../engine/qbcreates-js-engine.js";
import { GameStateManager } from "../managers/game-state-manager.js";
import { SnakeCollision, SnakeSize, snakeHeadColor, snakeBodyColor } from "./snake-exports.js";

export class SnakeMovement extends MonoBehaviour {
    #play = false;
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
        GameStateManager.gameStateEvent.subscribe(isStarted => {
            this.#play = true;
        });
    }

    start() {

    }

    update() {
        if (this.#play) {
            this.#movePlayerTimer -= Time.fixedDeltaTime;
    
            // if (this.#movePlayerTimer <= 0 && !this.#snakeSize.isGrowing) {
            if (this.#movePlayerTimer <= 0) {
                let headIndex = this.gameObject.children.length - 1
                let coordinates = this.gameObject.children[headIndex].transform.position;
                console.log(coordinates.x, "   ", coordinates.y)
                let headX = coordinates.x + this.#horizontalAxis;
                let headY = coordinates.y + this.#verticalAxis;
    
                // let collisionResult = this.#snakeCollision.checkForCollisions(headX, headY);
                let collisionResult = true;
                
                if (collisionResult) {
                    let tailTransform = this.gameObject.children[0].transform;
                 
                    tailTransform.position = new Vector3(headX, headY, tailTransform.position.z);
                    // Push the tail cell to the front of the array.
                    this.gameObject.children.push(this.gameObject.children.shift());
                    
                    // Adjust snake head and body color
                    this.gameObject.children[headIndex].getComponent(SpriteRenderer).color = snakeHeadColor;
                    this.gameObject.children[headIndex - 1].getComponent(SpriteRenderer).color = snakeBodyColor;
    
                    // Adjust snake scale;
                    this.gameObject.children[headIndex].transform.scale = new Vector2(1, 1);
                    this.gameObject.children[headIndex - 1].transform.scale = new Vector2(.8, .8);
                    this.gameObject.children[0].transform.scale = new Vector2(.6, .6);
                    
                    this.#currentDirection = new Vector2(this.#horizontalAxis, this.#verticalAxis);
                    this.#movePlayerTimer = .11;
                } else {
                    GameStateManager.onGameOver();
                }
            }
        }
    }
}