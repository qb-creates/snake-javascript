import { Time } from "./time.js";
import { Canvas } from "./canvas.js";

export class MonoBehaviour {
    #gameObject = null;
    
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

    constructor() {
        setTimeout(() => {
            this.awake();
            this.start();
            
            setInterval(() => {
                this.fixedUpdate();
            }, Time.fixedDeltaTime * 1000);

            addEventListener('canvasUpdate', () => {
                if (!this.#gameObject.isDestroyed){
                    this.update();
                }
            });
        }, 100);
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