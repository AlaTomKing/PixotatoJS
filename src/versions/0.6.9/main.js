// sekret testing version of pixotato.js
// pixotato sounds like a cryptocurrency scam that contains cringey content
// pixotato provides some tools and maybe its a bloatware cuz there too much features you dont need

'use strict';
var mod = {
    testLog: () => {
        console.log('test')
    }
}

// It might not be necessary but I made this function to save your fingers extra buttons and why would someone put a function inside a quotation mark
var rgb = (r, g, b) => {
    return `rgb(${r},${g},${b})`
}

var pTato = class {
    constructor(canvas, filter, scaling) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        this.aspectRatio = { 'w': 4, 'h': 3 }
        this.resolution = { 'w': 200, 'h': 150}

        this.canvas.width = this.resolution.w
        this.canvas.height = this.resolution.h

        this.pixelImageData = this.context.createImageData(canvas.width, canvas.height);

        this.scaling = ['fit', 'fill', 'stretch', 'manual'].some(txt => { return txt == scaling }) ? scaling : 'fit'

        this.setFilter(filter);

        addEventListener('resize', () => this.resize());

        this.resize();
    }

    setPixel(x, y, color) {
        let roundedX = Math.round(x);
        let roundedY = Math.round(y);

        let index = 4 * (this.canvas.width * roundedY + roundedX);

        var cArray = color.substring(4, color.length - 1).split(',')
        this.pixelImageData.data[index] = cArray[0];
        this.pixelImageData.data[index + 1] = cArray[1];
        this.pixelImageData.data[index + 2] = cArray[2];
        this.pixelImageData.data[index + 3] = 255;

        this.swapBuffer()
    }

    setRectangle(x, y, width, height, color) {
        let roundedX = Math.round(x);
        let roundedY = Math.round(y);

        for (let x1 = 0; x1 < Math.min(Math.max(width, 0), this.canvas.width - roundedX); x1++) {
            for (let y1 = 0; y1 < Math.min(Math.max(height, 0), this.canvas.height - roundedY); y1++) {
                let index = 4 * (this.canvas.width * (roundedY + y1) + (roundedX + x1));

                let cArray = color.substring(4, color.length - 1).split(',')
                this.pixelImageData.data[index] = cArray[0];
                this.pixelImageData.data[index + 1] = cArray[1];
                this.pixelImageData.data[index + 2] = cArray[2];
                this.pixelImageData.data[index + 3] = 255;
            }
        }

        this.swapBuffer()
    }

    setResolution(w, h) {
        this.resolution = { 'w': w, 'h': h }

        this.canvas.w = w;
        this.canvas.height = h;
    }

    setCanvasScaling(text) { 
        this.scaling = ['fit', 'fill', 'stretch', 'manual'].some(txt => { return txt == text }) ? text : this.scaling
        if (!['fit', 'fill', 'stretch', 'none'].some(txt => { return txt == text }))
            console.log('invalid input for canvas scaling')
    }

    setFilter(filter) {
        this.canvas.style.imageRendering = filter == 'pixel' ? 'pixelated' : ('nearest' ? 'crisp-edges' : 'auto');
    }

    testRender() {
        this.context.fillStyle = rgb(40, 40, 40)
        this.context.fillRect(0, 0, canvas.width, canvas.height)

        this.context.fillStyle = "red"
        this.context.fillRect(20, 20, 100, 100)
    }

    render() {
        this.context.putImageData(this.pixelImageData, 0, 0);
    }

    resize() {
        switch (this.scaling) {
            case 'fit':
                if (innerHeight > this.aspectRatio.h * innerWidth / this.aspectRatio.w) {
                    this.canvas.style.width = innerWidth + 'px';
                    this.canvas.style.height = (this.aspectRatio.h * innerWidth / this.aspectRatio.w) + 'px';
                    break;
                }

                this.canvas.style.width = (this.aspectRatio.w * innerHeight / this.aspectRatio.h) + 'px';
                this.canvas.style.height = innerHeight + 'px';
                break;
            case 'fill':
                if (innerWidth < (this.aspectRatio.w * innerHeight / this.aspectRatio.h)) {
                    console.log("YES")
                    this.canvas.style.width = (this.aspectRatio.w * innerHeight / this.aspectRatio.h) + 'px';
                    this.canvas.style.height = innerHeight + 'px';
                    break;
                }

                console.log("NO")
                this.canvas.style.width = innerWidth + 'px';
                this.canvas.style.height = (this.aspectRatio.h * innerWidth / this.aspectRatio.w) + 'px';
                break;
            case 'stretch':
                this.canvas.style.width = innerWidth + 'px';
                this.canvas.style.height = innerHeight + 'px';
                break;
        }
    }

    swapBuffer() {
        this.context.putImageData(this.pixelImageData, 0, 0);
    }
}
