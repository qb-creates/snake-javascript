export class Component {
    #enabled = true;
    #gameObject = null;

    get enabled() {
        return this.#enabled;
    }

    set enabled(value) {
        this.#enabled = value;
    }

    get gameObject() {
        return this.#gameObject;
    }

    constructor(gameObject) {
        this.#gameObject = gameObject;
    }
}