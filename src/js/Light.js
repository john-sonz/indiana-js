export default class Light {
    constructor() {
        this.alpha = 0;
        this.timeout = 0;
    }
    updateAlpha() {
        this.alpha += 0.15;
        this.timeout = setTimeout(() => this.updateAlpha(), 10000);
    }
    resetAlpha() {
        this.alpha = 0;
    }
    resetTimeout() {        
        this.resetAlpha();        
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.updateAlpha(), 10000);
    }
}