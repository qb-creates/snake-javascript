import { MonoBehaviour, Time } from "../../engine/qbcreates-js-engine.js";

export default class SnakeMovement extends MonoBehaviour {
    #verticalAxis = 0;
    #horizontalAxis = 1;
    #tailIndex = 0;
    #headIndex = 2;
    #playerMoveTime = .1;
    #movePlayerTimer = 0;
    
    set horizontalAxis(newHorizontalAxis) {
        this.#horizontalAxis = newHorizontalAxis
    }
    
    set verticalAxis(newVerticalAxis) {
        this.#verticalAxis = newVerticalAxis;
    }

    awake() {
        
    }

    start() {

    }

    update() {
        this.#movePlayerTimer += Time.fixedDeltaTime;

        if (this.#movePlayerTimer >= this.#playerMoveTime) {
            let headX = this.gameObject.position[this.#headIndex][0] + this.#horizontalAxis;
            let headY = this.gameObject.position[this.#headIndex][1] + this.#verticalAxis;

            this.gameObject.position[this.#tailIndex][0] = headX;
            this.gameObject.position[this.#tailIndex][1] = headY;
            
            this.#headIndex = this.#tailIndex;
            this.#tailIndex = this.#tailIndex + 1;

            if (this.#tailIndex == this.gameObject.position.length) {
                this.#tailIndex = 0;
            }

            this.#movePlayerTimer = 0;
        }
    }
}