import { Time } from "./time.js";
import { Component } from "./component.js";
import { Canvas } from "./canvas.js";

export class MonoBehaviour extends Component {
    #fixedUpdateInterval = null;
    #canvasUpdateSubscription = null;

    constructor(gameObject) {
        super(gameObject);

        setTimeout(() => {
            this.awake();
            this.start();

            this.#fixedUpdateInterval = setInterval(() => {
                if (this.gameObject.isActive) {
                    this.fixedUpdate();
                }
            }, Time.fixedDeltaTime * 1000);


            this.#canvasUpdateSubscription = Canvas.canvasUpdate.subscribe(isStarted => {
                if (!this.gameObject.isDestroyed) {
                    this.update();
                }
            });
        });
    }
    destroy() {
        this.#canvasUpdateSubscription.unsubscribe();
        clearInterval(this.#fixedUpdateInterval);
    }
    awake() {
    }

    start() {
    }

    update() {
    }

    fixedUpdate() {
    }

    onTriggerEnter() {
    }

    onTriggerExit() {
    }

    clone() {
    }
}