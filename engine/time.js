export class Time {
    static #fixedDeltaTime = 0.02;

    static get fixedDeltaTime() {
        return this.#fixedDeltaTime;
    }

    static set fixedDeltaTime(time) {
        this.#fixedDeltaTime = time;
    }
}