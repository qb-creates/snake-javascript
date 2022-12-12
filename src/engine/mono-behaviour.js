import { Time } from "./time.js";
import { Component } from "./component.js";

export class MonoBehaviour extends Component {

    constructor(gameObject) {
        super(gameObject);

        setTimeout(() => {
            this.awake();
            this.start();
            
            setInterval(() => {
                if (this.gameObject.isActive) {
                    this.fixedUpdate();
                }
            }, Time.fixedDeltaTime * 1000);

            addEventListener('canvasUpdate', () => {
                if (!this.gameObject.isDestroyed ){
                    this.update();
                }
            });
        });
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