const Jimp = require('jimp');

async function preparePfp(pfp, dimensions) {
    if (typeof pfp == 'string') pfp = await Jimp.read(pfp);
    const base = new Jimp(dimensions, dimensions, '#36393f'); // Transparent image support

    pfp.resize(dimensions, dimensions);
    base.composite(pfp, 0, 0);

    return base.circle();
}

module.exports = preparePfp;
