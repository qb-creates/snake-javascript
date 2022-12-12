
import { MonoBehaviour, Canvas, Time, Input, KeyCode, Vector2 } from "../engine/qbcreates-js-engine.js";
import { GameStateManager } from "./managers/game-state-manager.js";

export class TestFollow extends MonoBehaviour{
    #target = null;
    speed = 1;
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
            let myTarg = this.#target.children[this.#target.children.length - 1];
            let placeholder = Vector2.subtract(myTarg.transform.position, this.transform.position).normalize();
            let xDistance = Math.abs(this.transform.position.x - myTarg.transform.position.x);
            let yDistance = Math.abs(this.transform.position.y - myTarg.transform.position.y);
            
            if (xDistance <= 0.02 && yDistance <= 0.02) {
                this.transform.position = new Vector2(myTarg.transform.position.x, this.transform.position.y);
            } else {
                this.transform.position = Vector2.add(this.transform.position, Vector2.multiply(placeholder, step));
            }
        }
    }

    onTriggerEnter(colliders) {
       
    }

    onTriggerExit(colliders) {
        // console.log('exit', colliders)
    }
}