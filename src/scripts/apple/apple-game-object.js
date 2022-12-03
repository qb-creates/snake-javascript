import { Canvas } from "../../engine/canvas.js";
import AppleBehaviour from "./apple-behaviour.js";

const appleColor = 'radial-gradient(red 45%, #9BBA5A 45%)';

export default class AppleGameObject {
    #scriptList = new Map();
    #cells = [];
    #isDestroyed = false;

    static get className() {
        return this.name;
    }

    get isDestroyed() {
        return this.#isDestroyed;
    }

    set cells(newCells) {
        this.#cells = newCells;
    }

    get cells() {
        return this.#cells;
    }

    constructor() {
        let appleBehaviour = new AppleBehaviour();
        appleBehaviour.gameObject = this;

        this.#scriptList.set(AppleBehaviour.className, appleBehaviour);
    }

    addComponent(key, component) {
        component.gameObject = this;
        this.#scriptList.set(key, component);
    }

    getComponent(component) {
        return this.#scriptList.get(component);
    }

    destroy() {
        this.#isDestroyed = true;
        this.#scriptList.forEach(component => {
            component = null;
        });
        Canvas.removeGameObject(this);
    }
} 