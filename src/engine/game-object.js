import { Canvas, Component, Transform, SpriteRenderer, Vector3 } from "./qbcreates-js-engine.js";

export class GameObject {
    #objectName = '';
    #scriptList = [];
    #children = [];
    #isDestroyed = false;
    #transform = null;

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

    get transform() {
        return this.#transform;
    }
    static asdf() {
        console.log("quent");
    }
    constructor(objectName) {
        this.#objectName = objectName;
        this.#transform = new Transform(this)
        this.#scriptList.push(this.#transform);
    }

    addGameObject(gameObject) {
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
        return component
    }

    destroy() {
        this.#isDestroyed = true;
        this.#scriptList.forEach(component => {
            component = null;
        });
        Canvas.removeGameObject(this);
    }

    clone() {
        let clonedObject = new GameObject(this.objectName + " (clone)");
        
        clonedObject.transform.position = new Vector3(this.#transform.position.x, this.#transform.position.y, this.#transform.position.z);
        this.#children.forEach(child => {
            let clonedChild = child.clone();
            clonedObject.addGameObject(clonedChild);
        });

        this.#scriptList.forEach(script => {
            if (script instanceof SpriteRenderer) {
                let clonedScript = clonedObject.addComponent(script.constructor);
                script.clone(clonedScript);
            }
        });
        
        return clonedObject;
    }
} 