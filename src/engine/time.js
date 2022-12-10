import { Canvas } from "./canvas.js";

export class Time extends Canvas{
    static #fixedDeltaTime = 0.02;
    static #previousTimeStamp = 0;
    static #currentTimeStamp = 0;
    
    static get deltaTime() {
        return 1/60;
    }

    static get fixedDeltaTime() {
        return this.#fixedDeltaTime;
    }

    static set fixedDeltaTime(time) {
        this.#fixedDeltaTime = time;
    }
}