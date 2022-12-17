import { GameObject } from "./game-object.js";
import { Vector2 } from "./vector2.js";
import { Component } from "./component.js";
import { Transform } from "./transform.js";
import { Canvas } from "./canvas.js";
import { MonoBehaviour } from "./mono-behaviour.js";

export class QObject {
    /**
     * @param {GameObject} originalGameObject 
     * @param {GameObject} parent 
     * @param {Vector2} position 
     * @returns 
     */
    static instantiate(originalGameObject, parent, position) {
        // let underscorIndex = originalGameObject.objectName.lastIndexOf('_');
        // let newName = originalGameObject.objectName + '_1';

        // if (underscorIndex != -1) {
        //     cloneNumber = '_' + Number(originalGameObject.objectName.substring(underscorIndex + 1)) + 1;
        //     newName = originalGameObject.objectName.
        //     let a ='sdf'
        //     a.
        // }
        let clonedObject = new GameObject(originalGameObject.objectName);
        clonedObject.layer = originalGameObject.layer;
        clonedObject.transform.position = new Vector2(originalGameObject.transform.position.x, originalGameObject.transform.position.y);
        clonedObject.transform.scale = new Vector2(originalGameObject.transform.scale.x, originalGameObject.transform.scale.y);

        originalGameObject.children.forEach(child => {
            QObject.instantiate(child, clonedObject);
        });

        originalGameObject.getComponents(Component).forEach(script => {
            if (!(script instanceof Transform)) {
                let clonedScript = clonedObject.addComponent(script.constructor);
                let propertyDescriptors = Object.getOwnPropertyDescriptors(script);
  
                Object.entries(propertyDescriptors).forEach(descriptor => {
                    let key = descriptor[0];
                    let value = descriptor[1].value;                    
                    Reflect.set(clonedScript, key, value)
                })
            }
        });

        if (typeof (parent) != 'undefined') {
            if (parent instanceof GameObject) {
                parent.addGameObject(clonedObject);
            } else {
                throw new Error(`Error instantiating ${typeof (originalGameObject.objectName)}. ${parent} is not of type gameObject.`)
            }
        }

        if (typeof (position) != 'undefined') {
            clonedObject.transform.position = position;
        }

        Canvas.addGameObject(clonedObject);
        return clonedObject;
    }


    static instantiatePrefabObject(prefabObject) {
        let gameObject = new GameObject(prefabObject.objectName);
        gameObject.layer = prefabObject.layer;
        gameObject.transform.position = prefabObject.position;
        gameObject.transform.scale = prefabObject.scale;

        prefabObject.children.forEach(childObject => {
            let child = QObject.instantiatePrefabObject(childObject);
            child.parent = gameObject;
            gameObject.children.push(child);
        });

        prefabObject.components.forEach(componentObject => {
            let component = gameObject.addComponent(componentObject.component);

            for (var key in componentObject.properties) {
                if (gameObject[key] != 'undefined') {
                    Reflect.set(component, key, componentObject.properties[key])
                }
            }
        });
        Canvas.addGameObject(gameObject);
        return gameObject;
    }

    /**
     * 
     * @param {GameObject | Component} object 
     */
    static destroy(object) {
        Canvas.removeGameObject(object);
        object.getComponents(MonoBehaviour).forEach(component => {
            component.destroy();
        });
        object.destroy();
    }
}