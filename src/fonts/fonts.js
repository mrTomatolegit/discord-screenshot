const Jimp = require('jimp');
const fs = require('fs');

const getFonts = async () => {
    let fonts = {};
    for (let folder of fs.readdirSync(`${__dirname}`)) {
        if (folder.endsWith('.js')) continue;
        fonts[folder.substring('whitney'.length)] = await Jimp.loadFont(
            `${__dirname}/${folder}/${folder}.fnt`
        );
    }
    return fonts;
};

module.exports = getFonts;
