import { GameObject, Vector2, Component, Transform, Canvas } from "./qbcreates-js-engine.js";

export class Object {
    /**
     * @param {GameObject} originalGameObject 
     * @param {GameObject} parent 
     * @param {Vector2} position 
     * @returns 
     */
    static instantiate(originalGameObject, parent, position) {
        let clonedObject = new GameObject(originalGameObject.objectName + " (clone)");
        clonedObject.layer = originalGameObject.layer;
        clonedObject.transform.position = new Vector2(originalGameObject.transform.position.x, originalGameObject.transform.position.y);
        clonedObject.transform.scale = new Vector2(originalGameObject.transform.scale.x, originalGameObject.transform.scale.y);
        originalGameObject.children.forEach(child => {
            Object.instantiate(child, clonedObject);
        });

        originalGameObject.getComponents(Component).forEach(script => {
            if (!(script instanceof Transform)) {
                let clonedScript = clonedObject.addComponent(script.constructor);
                script.clone(clonedScript);
            }
        });

        if (typeof(parent) != 'undefined') {
            if (parent instanceof GameObject) {
                parent.addGameObject(clonedObject);
            } else {
                throw new Error(`Error instantiating ${typeof(originalGameObject.objectName)}. ${parent} is not of type gameObject.`)
            }
        }

        if (typeof (position) != 'undefined') {
            clonedObject.transform.position = position;
        }
        Canvas.addGameObject(clonedObject);
        originalGameObject.destroy();
        return clonedObject;
    }
}