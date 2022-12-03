export class ScoreManager {
    static #score = 0;

    static addPoint() {
        this.#score++;
        let asdf = document.getElementById('score');
        asdf.innerHTML = this.#score;
    }
}