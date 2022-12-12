export class Component {
    #transform = null;
    #enabled = true;
    #gameObject = null;

    get gameObject() {
        return this.#gameObject;
    }

    get enabled() {
        return this.#enabled;
    }

    set enabled(value) {
        this.#enabled = value;
    }

    get transform() {
        return this.#transform;
    }

    set transform(value) {
        this.#transform = value;
    }

    constructor(gameObject) {
        this.#gameObject = gameObject;
        this.#transform = gameObject.transform;
    }
}