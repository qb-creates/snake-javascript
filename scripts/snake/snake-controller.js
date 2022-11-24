export default class SnakeController {
    constructor(snake) {
        this.snakeMovement = snake;
        addEventListener('keypress', (event) => {
            if(event.key == 'w') {
                snake.up = 1;
                snake.left = 0;
            } else if (event.key == 's'){            
                snake.up = -1;
                snake.left = 0;
            }if(event.key == 'a') {
                snake.up = 0;
                snake.left = -1;
            } else if (event.key == 'd'){
                snake.up = 0;
                snake.left = 1;
            }
        });
    }
}