import { Canvas, Component, Transform, SpriteRenderer } from "./qbcreates-js-engine.js";

export class GameObject {
    #objectName = '';
    #scriptList = [];
    #children = [];
    #isDestroyed = false;

    get objectName() {
        return this.#objectName;
    }

    set objectName(value) {
        this.#objectName = value;
    }

    get isDestroyed() {
        return this.#isDestroyed;
    }

    get children() {
        return this.#children;
    }

    constructor(objectName) {
        this.#objectName = objectName;
        this.#scriptList.push(new Transform(this));
    }

    addGameObject(gameObject) {
        this.#children.push(gameObject);
    }

    getComponentInChildren() {

    }

    getComponent(componentClass) {
        return this.#scriptList.filter(component => component instanceof componentClass);
    }

    /**
     * This method will create a new instance of a component and attach it to this gameObject.
     * @param {Component} T - Class type of the component you want to created and add to this gameObject.
     */
    addComponent(T) {
        if (T === Transform) {
            throw new Error(`Can not add another transform to ${this.#objectName}.`);
        }
        this.#scriptList.push(new T(this));
    }

    destroy() {
        this.#isDestroyed = true;
        this.#scriptList.forEach(component => {
            component = null;
        });
        Canvas.removeGameObject(this);
    }
} 