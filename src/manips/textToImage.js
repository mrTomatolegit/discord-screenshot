const Jimp = require('jimp');

let cropAmount = new Map();
function textToImage_acc(font, text, width = 5000, height = 1000) {
    if (!cropAmount.has(font)) {
        cropAmount.set(font, new Jimp(500, 500).print(font, 0, 0, 'Pp').autocrop().bitmap.width);
    }
    let img = new Jimp(width, height).print(font, 0, 0, `Pp${text}`);

    img.autocrop();
    img.crop(cropAmount.get(font), 0, img.bitmap.width - cropAmount.get(font), img.bitmap.height);

    return img;
}

function textToImage(font, text, width = 5000, height = 1000) {
    let lines = text.split('\n');
    if (lines.length > 1) {
        lines = lines.map(line => textToImage_acc(font, line, width, height));

        height = lines.map(x => x.bitmap.height).reduce((a, b) => a + b) + 22 * lines.length;
        width = Array.from(lines).sort((a, b) => b.bitmap.width - a.bitmap.width)[0].bitmap.width;

        const img = new Jimp(
            width,
            lines.map(x => x.bitmap.height).reduce((p, c) => p + c + 22)
        );
        let tempTotal = 0;
        lines.forEach(line => {
            img.composite(line, 0, tempTotal);
            tempTotal += line.bitmap.height + 22;
        });

        return img;
    } else {
        return textToImage_acc(font, text, width, height);
    }
}

module.exports = textToImage;
