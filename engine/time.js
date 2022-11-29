export class Time {
    static #fixedDeltaTime = 0.02;
    
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