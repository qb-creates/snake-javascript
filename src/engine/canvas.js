import { Time } from "./time.js";

const gridContainerStyle = 'margin: 0 auto; width: fit-content; height: fit-content; overflow: hidden; background-color: #9BBA5A;'
const gridColumnStyle = 'float: left; width: fit-content; height: fit-content; background-color: transparent;';
const gridCellStyle = 'width: 25px; height: 25px; border: 3px solid transparent; border-radius:5px;';

export class Canvas {
    static #stageGrid = [];
    static #gameObjectList = [];
    static #gridSizeX = 18;
    static #gridSizeY = 16

    static get gridSizeX() {
        return this.#gridSizeX;
    }

    static set gridSizeX(newX) {
        this.#gridSizeX = newX;
    }

    static get gridSizeY() {
        return this.#gridSizeY;
    }

    static set gridSizeY(newY) {
        this.#gridSizeY = newY;
    }

    static initialize() {
        let gridContainerElement = document.createElement('div');
        gridContainerElement.style = gridContainerStyle;

        for (let i = 0; i < this.#gridSizeX + 1; i++) {
            let gridColumnElement = document.createElement("div");
            gridColumnElement.style = gridColumnStyle;

            let divColumn = []

            for (let j = 0; j < this.#gridSizeY + 1; j++) {
                const gridCellElement = document.createElement("div");
                gridCellElement.style = gridCellStyle;
                gridColumnElement.appendChild(gridCellElement);
                divColumn.unshift(gridCellElement);
            }
            this.#stageGrid.push(divColumn);
            gridContainerElement.appendChild(gridColumnElement);
        }
        document.body.appendChild(gridContainerElement);

        addEventListener('play', () => {
            let event = new Event('canvasUpdate');

            setInterval(() => {
                this.#updatePixel();
                dispatchEvent(event);
            }, Time.deltaTime * 1000);
        });
    }

    static getGameObject(coordinates) {
        return this.#gameObjectList.filter((object) => {
            let result = false; 
            object.position.forEach(p => {
                if (p[0] == coordinates[0] && p[1] == coordinates[1]) {
                    result = true;
                }
            });
            return result;
        })
    }

    static addGameObject(gameObject) {
        this.#gameObjectList.push(gameObject);
        this.#updatePixel();
    }

    static removeGameObject(gameObject) {
        let index = this.#gameObjectList.indexOf(gameObject);
        this.#gameObjectList[index] = null;
        this.#gameObjectList.splice(index, 1);
    }

    static #updatePixel() {
        try {
            for (let i = 0; i < 19; i++) {
                for (let j = 0; j < 17; j++) {
                    this.#stageGrid[i][j].style.backgroundImage = 'radial-gradient(transparent 100%, transparent)';
                }
            }

            this.#gameObjectList.forEach(object => {
                object.position.forEach(p => {           
                    this.#stageGrid[p[0]][p[1]].style.backgroundImage = p[2];
                });
            });
        }
        catch (error) {
            //console.log(error);
        }
    }
}