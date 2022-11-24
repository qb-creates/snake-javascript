export class Input {
    static #KeyDown = {
        a: {
            key: false, 
            keyDown: false, 
            keyUp: false
        },
        b:  {
            key: false, 
            keyDown: false, 
            keyUp: false
        },
        c:  {
            key: false, 
            keyDown: false, 
            keyUp: false
        },
        d:  {
            key: false, 
            keyDown: false, 
            keyUp: false
        },
        s:  {
            key: false, 
            keyDown: false, 
            keyUp: false
        },
        w:  {
            key: false, 
            keyDown: false, 
            keyUp: false
        }
    }

    static initialize() {
        addEventListener('keydown', (event) => {
            if (event.repeat) {
                return;
            }
            if (Object.hasOwn(this.#KeyDown, event.key)) {
                this.#KeyDown[event.key].keyUp = false;
                this.#KeyDown[event.key].keyDown = true;
            }
        });

        addEventListener('keyup', (event) => {
            if (Object.hasOwn(this.#KeyDown, event.key)) {
                this.#KeyDown[event.key].keyDown = false;
                this.#KeyDown[event.key].keyUp = true;
            }
        });
    }

    static getKeyDown(keyCode) {
        if (this.#KeyDown[keyCode].keyDown) {
            this.#KeyDown[keyCode].keyDown = false;
            return true;
        } 
        return false;
    }

    static getKeyUp(keyCode) {
        if (this.#KeyDown[keyCode].keyUp) {
            this.#KeyDown[keyCode].keyUp = false;
            return true;
        } 
        return false;
    }
}

export const KeyCode = {
    a: 'a',
    b: 'b',
    c: 'c',
    d: 'd',
    e: 'e',
    f: 'f',
    g: 'g',
    h: 'h',
    i: 'i',
    j: 'j',
    k: 'k',
    l: 'l',
    m: 'm',
    n: 'n',
    o: 'o',
    p: 'p',
    q: 'q',
    r: 'r',
    s: 's',
    t: 't',
    u: 'u',
    v: 'v',
    w: 'w',
    x: 'x',
    y: 'y',
    z: 'z',
    A: 'A',
    B: 'B',
    C: 'C'
}