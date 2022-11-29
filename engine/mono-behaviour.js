import { Time } from "./time.js";
import { Canvas } from "./canvas.js";

export class MonoBehaviour {
    #gameObject = null;

    constructor() {
        
        setTimeout(() => {
            this.awake();
            this.start();
            
            setInterval(() => {
                this.fixedUpdate();
            }, Time.fixedDeltaTime * 1000);

            addEventListener('build', () => {
                this.update();
            });
        }, 2000);
    }

    static get className() {
        return this.name;
    }

    set gameObject(gameObject) {
        if (this.#gameObject == null) {
            this.#gameObject = gameObject;
        }
    }

    get gameObject() {
        return this.#gameObject;
    }

    awake() {
    }

    start() {
    }

    update() {
    }

    fixedUpdate() {
    }
}