export default class Keyboard {
    constructor() {
        this.keyStates = new Map();

    }
    handleEvent(e) {
        const key = e.code;
        if (!this.keyStates.has(key)) {
            return;
        }
        e.preventDefault();        
        const keyState = e.type === 'keydown' ? 1 : 0;
        if (this.keyStates.get(key) === keyState) return;
        this.keyStates.set(key, keyState);

    }
    listenTo(window) {
        ['keydown', 'keyup'].forEach(eName => {
            window.addEventListener(eName, e => {
                this.handleEvent(e);
            });
        });
        ["KeyA","KeyW","KeyD","KeyS"].forEach(key => this.keyStates.set(key,0));

    }
}