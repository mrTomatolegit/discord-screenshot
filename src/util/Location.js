class Location {
    constructor(image, x = 0, y = 0) {
        this.image = image;
        this.x = x;
        this.y = y;
    }

    get width() {
        return this.image.bitmap.width;
    }

    get height() {
        return this.image.bitmap.height;
    }

    getCenter() {
        return {
            x: this.getMiddleX(),
            y: this.getMiddleY()
        };
    }

    getMiddleX() {
        return this.x + this.width / 2;
    }

    getMiddleY() {
        return this.y + this.height / 2;
    }

    getBottomY() {
        return this.y + this.height;
    }

    getRightX() {
        return this.x + this.width;
    }

    getTopRight() {
        return {
            x: this.getRightX(),
            y: this.y
        };
    }

    getBottomRight() {
        return {
            x: this.getRightX(),
            y: this.getBottomY()
        };
    }

    getBottomLeft() {
        return {
            x: this.x,
            y: this.getBottomY()
        };
    }
}

module.exports = Location;
