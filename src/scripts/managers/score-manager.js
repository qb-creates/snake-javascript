export class ScoreManager {
    static #score = 0;

    static addPoint() {
        this.#score++;
        let scoreLabel = document.getElementById('score');
        scoreLabel.innerHTML = this.#score;
    }
}