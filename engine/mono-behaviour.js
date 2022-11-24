import { Time } from "./time.js";

export class MonoBehaviour {
    constructor() {
        setTimeout(() => {
            this.Start();            
        }, 1000);
        
        setTimeout(() => {
            setInterval(() => {
                this.FixedUpdate();
            }, Time.fixedDeltaTime * 1000);
        }, 3000);
    }

    Start() {

    }

    FixedUpdate() {

    }
}