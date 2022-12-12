import { Canvas, Component, Transform, SpriteRenderer, Vector2, BoxCollider } from "./qbcreates-js-engine.js";

export class GameObject {
    #objectName = '';
    #scriptList = [];
    #children = [];
    #isDestroyed = false;
    #transform = null;
    #layer = 0;

    get objectName() {
        return this.#objectName;
    }

    set objectName(value) {
        this.#objectName = value;
    }

    get layer() {
        return this.#layer;
    }

    set layer(value) {
        this.#layer = value;
    }
    
    get isDestroyed() {
        return this.#isDestroyed;
    }

    get children() {
        return this.#children;
    }

    get transform() {
        return this.#transform;
    }
    
    constructor(objectName) {
        this.#objectName = objectName;
        this.#transform = new Transform(this)
        this.#scriptList.push(this.#transform);
    }

    addGameObject(gameObject) {
        gameObject.transform.position = Vector2.add(gameObject.transform.position, this.transform.position);
        this.#children.push(gameObject);
    }

    getComponentInChildren() {

    }

    getComponent(componentClass) {
        return this.#scriptList.find(component => component instanceof componentClass);
    }

    getComponents(componentClass) {
        return this.#scriptList.filter(component => component instanceof componentClass);
    }

    /**
     * This method will create a new instance of a component and attach it to this gameObject.
     * @param {Component} T - Class type of the component you want to created and add to this gameObject.
     * @returns {Component} Returns the newly created component.
     */
    addComponent(T) {
        if (T === Transform) {
            throw new Error(`Can not add another transform to ${this.#objectName}.`);
        }

        if (T === SpriteRenderer && this.#scriptList.find(component => component instanceof SpriteRenderer)) {
            throw new Error(`Can not add another SpriteRenderer to ${this.#objectName}.`);
        }

        let component = new T(this);
        this.#scriptList.push(component);

        if (component instanceof BoxCollider) {
            Canvas.addCollider(component);
        }
        return component
    }

    destroy() {
        this.#isDestroyed = true;
        this.#scriptList.forEach(component => {
            component = null;
        });
        Canvas.removeGameObject(this);
    }
} 