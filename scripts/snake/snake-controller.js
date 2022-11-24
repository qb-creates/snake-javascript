export default class SnakeController {
    constructor() {
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
    }
}