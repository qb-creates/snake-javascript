export class GameStateManager {
    static #gameStateEvent = new rxjs.Subject();
    static #isStarted = false;

    get isStarted() {
        return this.#isStarted;
    }

    static get gameStateEvent() {
        return this.#gameStateEvent;
    }

    static onGameStart() {
        this.#isStarted = !this.#isStarted;
        this.#gameStateEvent.next(this.#isStarted);
    }

    static onGameOver() {
        this.#isStarted = false;
        this.#gameStateEvent.next(this.#isStarted);
    }
}