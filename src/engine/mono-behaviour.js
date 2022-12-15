import { Time } from "./time.js";
import { Component } from "./component.js";
import { Canvas } from "./canvas.js";
import { GameObject } from "./game-object.js";

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
                    this.#CheckForDestroyedReferences();
                    this.update();
                }
            });
        });
    }
    #CheckForDestroyedReferences() {
        Object.entries(Object.getOwnPropertyDescriptors(this)).forEach(descriptor => {
            let key = descriptor[0];
            let value = descriptor[1].value;

            if (value instanceof GameObject && value.isDestroyed) {
                Reflect.set(this, key, null)
            }
        })
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