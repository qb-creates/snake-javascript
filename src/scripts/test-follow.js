
import { MonoBehaviour, Canvas, Time, Input, KeyCode, Vector2 } from "../engine/qbcreates-js-engine.js";
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
        if (true) {
            let step = this.speed * Time.deltaTime;
            let myTarg = this.#target.children[0];
            let placeholder = Vector2.subtract(myTarg.transform.position, this.transform.position).normalize();
            this.transform.position = Vector2.add(this.transform.position, Vector2.multiply(placeholder, step));
        }
    }
}