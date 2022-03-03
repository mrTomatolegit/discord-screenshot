const Jimp = require('jimp');

class Util extends null {
    static rgbToHex(r, g, b) {
        return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
}

Date.prototype.isSameDay = function (date) {
    return (
        this.getFullYear() === date.getFullYear() &&
        this.getMonth() === date.getMonth() &&
        this.getDate() === date.getDate()
    );
};

Date.prototype.toDiscordString = function () {
    if (this.isSameDay(new Date())) {
        return `Today at ${this.toLocaleTimeString(undefined, {
            second: undefined,
            hour: 'numeric',
            minute: 'numeric'
        })}`;
    }
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (this.isSameDay(yesterday)) {
        return `Yesterday at ${this.toLocaleTimeString(undefined, {
            second: undefined,
            hour: 'numeric',
            minute: 'numeric'
        })}`;
    }

    return `${this.toLocaleDateString()}`;
};

Jimp.prototype.resizeKeepRatio = function (width, height) {
    const ratio = this.bitmap.width / this.bitmap.height;
    if (width) {
        height = width / ratio;
        this.resize(width, height);
    } else if (height) {
        width = height * ratio;
        this.resize(width, height);
    }
    return this;
};

Jimp.prototype.recolor = function (red, green, blue) {
    this.color([
        { apply: 'red', params: 0 },
        { apply: 'green', params: 0 },
        { apply: 'blue', params: 0 }
    ]);
    this.color([{ apply: 'xor', params: [Util.rgbToHex(red, green, blue)] }]);
    return this;
};

module.exports = Util;
