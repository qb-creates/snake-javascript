import { Time } from "./time.js";

const emptyCell = 'empty-cell';
const snakeBodyCell = 'snake-body-cell';

export class Canvas {
    static #stageGrid = [];
    static #gameObjectList = [];
    static pixelPositions = [];
    static initialize() {
        // Draw Stage
        for (let i = 0; i < 19; i++) {
            const stageColumn = document.createElement("div");
            stageColumn.classList.add("stage-column");

            let test = []
            for (let j = 0; j < 17; j++) {
                const stageCell = document.createElement("div");
                stageCell.classList.add(emptyCell);
                stageColumn.appendChild(stageCell);
                test.unshift(stageCell);
            }
            this.#stageGrid.push(test);
            document.getElementById("stage-background").appendChild(stageColumn);
        }
        
        addEventListener('play', () => {
            let event = new Event('build');
    
            setInterval(() => {
                this.#updatePixel();
                dispatchEvent(event);
            }, Time.deltaTime * 1000);
        });
    }

    static addGameObject(gameObject) {
        this.#gameObjectList.push(gameObject);
        this.#updatePixel();
    }

    static #updatePixel() {
        try {
            for (let i = 0; i < 19; i++) {
                for (let j = 0; j < 17; j++) {
                    this.#stageGrid[i][j].className = emptyCell;
                }
            }

            this.#gameObjectList.forEach(object => {
                object.position.forEach(p => {
                    this.#stageGrid[p[0]][p[1]].className = snakeBodyCell;
                });
            });
        }
        catch (error) {
            //console.log(error);
        }
    }
}