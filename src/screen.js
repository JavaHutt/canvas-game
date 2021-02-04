export default class Screen {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.canvas = this.createCanvas();
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d');
    }

    createCanvas() {
        const element = document.querySelector('canvas');
        if (element) return element;

        const canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        return canvas;
    }

    fill(color) {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.width, this.height);
    }
}