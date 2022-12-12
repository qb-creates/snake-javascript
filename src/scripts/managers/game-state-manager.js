export class GameStateManager {
    static #gameStateEvent = new rxjs.Subject();
    static #isStarted = false;

    static get gameStateEvent() {
        return this.#gameStateEvent;
    }

    static onGameStart() {
        this.#isStarted = !this.#isStarted;
        this.#gameStateEvent.next(this.#isStarted);
    }

    static onGameOver() {
        console.log('gameover')
        this.#isStarted = false;
        this.#gameStateEvent.next(this.#isStarted);
    }
}