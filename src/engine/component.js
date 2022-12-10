export class Component {
    #transform = null;
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

    get transform() {
        return this.#transform;
    }

    constructor(gameObject) {
        this.#gameObject = gameObject;
        this.#transform = this.#gameObject.transform;
    }
}