import { MonoBehaviour, Time } from "../../engine/qbcreates-js-engine.js";

export default class SnakeMovement extends MonoBehaviour {
    #up = 0;
    #left = 1;
    #tailIndex = 0;
    #headIndex = 2;
    #playerMoveTime = .1;
    #movePlayerTimer = 0;
    
    set left(newLeft) {
        this.#left = newLeft
    }
    
    set up(newUp) {
        this.#up = newUp;
    }

    awake() {
        
    }

    start() {

    }

    fixedUpdate() {
        this.#movePlayerTimer += Time.fixedDeltaTime;

        if (this.#movePlayerTimer >= this.#playerMoveTime) {
            let headX = this.gameObject.position[this.#headIndex][0] + this.#left;
            let headY = this.gameObject.position[this.#headIndex][1] + this.#up;

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