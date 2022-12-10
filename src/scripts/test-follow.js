
import { MonoBehaviour, Canvas, Time, Input, KeyCode, Vector3 } from "../engine/qbcreates-js-engine.js";
import { GameStateManager } from "./managers/game-state-manager.js";

export class TestFollow extends MonoBehaviour{
    #target = null;
    speed = 3;
    #play = false;
    get target() {
        return this.#target;
    } 

    set target(value) {
        this.#target = value;
    }

    awake() {
        GameStateManager.gameStateEvent.subscribe(isStarted => {
            this.#play = true;
        });
    }

    start() {
    }

    update() {
        if (this.#play) {
            let step = this.speed * Time.deltaTime;
            let myTarg = this.#target.children[this.#target.children.length - 1];
            let placeholder = Vector3.subtract(myTarg.transform.position, this.gameObject.transform.position).normalize();
            this.gameObject.transform.position = Vector3.add(this.gameObject.transform.position, Vector3.multiply(placeholder, step));
        }
    }
}