export default class MonoBehaviour {
    constructor() {
        setTimeout(() => {
            this.Start();            
        }, 1000);
        setTimeout(() => {
            setInterval(() => {
                this.Update();
            }, 100);
        }, 3000);
    }

    Start() {

    }

    Update() {
        console.log("This is a test");
    }
}