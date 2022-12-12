
import { MonoBehaviour, Canvas, Time, Input, KeyCode, Object, Vector2 } from "../../engine/qbcreates-js-engine.js";
import { snakeBodyColor } from "./snake-exports.js";

export class SnakeSize extends MonoBehaviour {
    #isGrowing = false;
    #isGrowingTimer = 0;

    get isGrowing() {
        return this.#isGrowing;
    }

    awake() {
    }

    start() {
    }

    update() {
        if (this.#isGrowingTimer > 0) {
            this.#isGrowingTimer -= Time.deltaTime;
            if (this.#isGrowingTimer <= 0) {
                this.#isGrowing = false;
            }
        }
    }

    grow() {
        this.#isGrowing = true;
        let tailCoordinates = this.gameObject.children[0].transform.position;
        Object.instantiate(this.gameObject.children[0], this.gameObject, new Vector2(tailCoordinates.x, tailCoordinates.y));
        this.#isGrowingTimer = .09;
    }
}