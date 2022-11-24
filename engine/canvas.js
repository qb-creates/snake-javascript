export class Canvas {
    static stageGrid = [];

    static initialize() {

        // Draw Stage
        for (let i = 0; i < 19; i++) {
            const stageColumn = document.createElement("div");
            stageColumn.classList.add("stage-column");

            let test = []
            for (let j = 0; j < 17; j++) {
                const stageCell = document.createElement("div");
                stageCell.classList.add("empty-cell");
                stageColumn.appendChild(stageCell);
                test.unshift(stageCell);
            }
            this.stageGrid.push(test);
            document.getElementById("stage-background").appendChild(stageColumn);
        }
    }

    static updatePixel(x, y, cell) {
        try {
            this.stageGrid[x][y].className = cell;
        }
        catch (error) {
            //console.log(error);
        }
    }
}