import { QObject } from "./qbcreates-js-engine.js";

export class Component  extends QObject{
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
        super();
        this.#gameObject = gameObject;
        this.#transform = gameObject.transform;
    }
}