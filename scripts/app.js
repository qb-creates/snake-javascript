let stageGrid = [
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
];
const emptyCell = 'empty-cell';
const snakeBodyCell = 'snake-body-cell';

let snake = [[7, 7], [8, 7], [9, 7]];
let headIndex = 2;
let tailIndex = 0;

// Draw Stage
for (let i = 0; i < 19; i++) {
    const stageColumn = document.createElement("div");
    stageColumn.classList.add("stage-column");

    for (let j = 0; j < 17; j++) {
        const stageCell = document.createElement("div");
        stageCell.classList.add("empty-cell");
        stageColumn.appendChild(stageCell);
        stageGrid[i][17 - j] = stageCell;
    }
    document.getElementById("stage-background").appendChild(stageColumn);
}

// Draw Player
for (let i = 0; i < snake.length; i++) {
    stageGrid[snake[i][0]][snake[i][1]].classList.remove("empty-cell");
    stageGrid[snake[i][0]][snake[i][1]].classList.add("snake-body-cell");
}
let up = 0;
let down = 0;
let right = 0;
let left = 1;
setInterval(() => {
    try {
        let tailX = snake[tailIndex][0];
        let tailY = snake[tailIndex][1];

        stageGrid[tailX][tailY].classList.remove(snakeBodyCell);
        stageGrid[tailX][tailY].classList.add(emptyCell);

      
        snake[tailIndex][0] = snake[headIndex][0] + left;
        snake[tailIndex][1] = snake[headIndex][1] + up;
        let headX = snake[headIndex][0];
        let headY = snake[headIndex][1];

        stageGrid[headX][snake[tailIndex][1]].classList.remove(emptyCell);
        stageGrid[snake[tailIndex][0]][snake[tailIndex][1]].classList.add(snakeBodyCell);
        headIndex = tailIndex;
        tailIndex = tailIndex + 1;
        if (tailIndex == snake.length) {
            tailIndex = 0;
        }
        
    }
    catch (error ) {
        console.log(error);
    }
}, 100);
addEventListener('keypress', (event) => {
    if(event.key == 'w') {
        up = 1;
        left = 0;
    } else if (event.key == 's'){
        up = -1;
        left = 0;
    }if(event.key == 'a') {
        up = 0;
        left = -1;
    } else if (event.key == 'd'){
        up = 0;
        left = 1;
    }
});