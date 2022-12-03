import { Time } from "./time.js";
import { GameStateManager } from "../scripts/managers/game-state-manager.js";

export class Canvas {
    static #gameObjectList = [];
    static #pixelScale = 25;
    static #gridSizeX = 18;
    static #gridSizeY = 16;
    static #updateInterval = null;

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

    static get pixelScale() {
        return this.#pixelScale;
    }

    static set pixelScale(newScale) {
        this.#pixelScale = newScale;
    }

    static get stageContainer() {
        return document.getElementById('stage-container');
    }

    static initialize() {
        let gridContainerElement = document.createElement('div');
        gridContainerElement.id = 'stage-container';
        gridContainerElement.style.position = 'relative';
        gridContainerElement.style.width = `${this.gridSizeX * this.#pixelScale}px`;
        gridContainerElement.style.height = `${this.gridSizeY * this.#pixelScale}px`;
        gridContainerElement.style.backgroundColor = '#9BBA5A';
        gridContainerElement.style.margin = '0 auto';
        document.body.appendChild(gridContainerElement);

        GameStateManager.gameStateEvent.subscribe(isStarted => {
            let event = new Event('canvasUpdate');

            if (isStarted) {
                this.#updateInterval = setInterval(() => {
                    dispatchEvent(event);
                }, Time.deltaTime * 1000);
            } else {
                clearInterval(this.#updateInterval);
            }
        });
    }

    static checkForCollisions(coordinates) {
        return this.#gameObjectList.filter((object) => {
            let result = false;
            object.cells.forEach(cell => {
                if (cell.position.x == coordinates.x && cell.position.y == coordinates.y) {
                    result = true;
                }
            });
            return result;
        })
    }

    static addGameObject(gameObject) {
        this.#gameObjectList.push(gameObject);
    }

    static removeGameObject(gameObject) {
        let index = this.#gameObjectList.indexOf(gameObject);
        this.#gameObjectList[index] = null;
        this.#gameObjectList.splice(index, 1);
        gameObject.cells.forEach(cell => {
            this.stageContainer.removeChild(cell.uiReference);
        })
    }

    /**
     * Create a new cell at a specific coordinate that can be set through the options
     * @param {{usePixelScale: boolean, x: number, y: number, color: string}} options 
     * @returns Returns the newly created cell.
     */
    static createCell(options) {
        let pixelScaleModifier = options.usePixelScale ? this.#pixelScale : 1;
        let cell = document.createElement('div');
        let size = `width: ${this.#pixelScale}px; height: ${this.#pixelScale}px; `;
        let position = `left: ${options.x * pixelScaleModifier}px; bottom: ${options.y * pixelScaleModifier}px; position: absolute; `
        let color = `background-image: ${options.color}; border-radius:5px;`
        cell.style = [size, position, color].join('');
        Canvas.stageContainer.appendChild(cell);
        return cell;
    }

    static getCellCoordinates(cell) {
        return { x: cell.offsetLeft, y: Canvas.gridSizeY - cell.offsetTop - Canvas.pixelScale };
    }
}