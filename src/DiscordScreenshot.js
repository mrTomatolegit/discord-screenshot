require('./util/Util');
const Jimp = require('jimp');
const getFonts = require('./fonts/fonts');
const preparePfp = require('./manips/preparePfp');
const getTextOnImage = require('./manips/textToImage');
const factors = require('./factors');
const Location = require('./util/Location');
const constants = require('./constants');

let fonts = getFonts();

class DiscordScreenshot {
    constructor(width = constants.WidthMeasuredWith, height = constants.HeightMeasuredWith) {
        this.WIDTH = width;
        this.HEIGHT = height;

        this.pfp = null;
        this.pfpLocation = null;
        this.username = null;
        this.usernameLocation = null;
        this.timestamp = null;
        this.timestampLocation = null;
        this.content = null;
        this.contentLocation = null;
    }

    async setPfp(image) {
        this.pfp = await preparePfp(image, this.HEIGHT / 2);
        this.pfpLocation = new Location(
            this.pfp,
            this.pfp.bitmap.height * factors.PFP_LEFT_MARGIN,
            this.HEIGHT / 2 - this.pfp.bitmap.height / 2 // Center pfp vertically
        );
        return this;
    }

    async setUsername(text, font = fonts.then(x => x.semibold)) {
        if (font instanceof Promise) font = await font;
        this.username = getTextOnImage(font, text);

        this.username.resizeKeepRatio(
            null,
            this.pfpLocation.height * factors.USERNAME_HEIGHT +
                (5 * this.HEIGHT) / constants.HeightMeasuredWith
        );

        this.usernameLocation = new Location(
            this.username,
            this.pfpLocation.getRightX() + this.pfpLocation.height * factors.PFP_RIGHT_MARGIN,
            this.pfpLocation.y + this.pfpLocation.height * factors.PFP_USERNAME_VERTICAL_DISTANCE
        );
        return this;
    }

    async setTimestamp(textOrDate, font = fonts.then(x => x.medium)) {
        if (font instanceof Promise) font = await font;
        if (!this.username) throw new Error('Username must be set for timestamp');
        if (textOrDate instanceof Date) textOrDate = textOrDate.toDiscordString();

        this.timestamp = getTextOnImage(font, textOrDate);
        this.timestamp.resizeKeepRatio(
            null,
            this.pfpLocation.height * factors.TIMESTAMP_HEIGHT +
                (5 * this.HEIGHT) / constants.HeightMeasuredWith
        );
        this.timestamp.recolor(114, 118, 125);

        this.timestampLocation = new Location(
            this.timestamp,
            this.usernameLocation.getRightX() +
                this.pfpLocation.height * factors.USERNAME_TIMESTAMP_HORIZONTAL_DISTANCE,
            this.usernameLocation.y +
                this.pfpLocation.height * factors.PFP_USERNAME_VERTICAL_DISTANCE -
                (4 * this.HEIGHT) / constants.HeightMeasuredWith
        );
        return this;
    }

    async setContent(text, font = fonts.then(x => x.medium)) {
        if (font instanceof Promise) font = await font;
        this.content = getTextOnImage(font, text);
        this.content.recolor(220, 221, 222);

        const lineCount = text.split('\n').length;
        this.content.resizeKeepRatio(
            null,
            (this.pfpLocation.height * factors.CONTENT_HEIGHT +
                (5 * this.HEIGHT) / constants.HeightMeasuredWith) *
                lineCount +
                ((10 * this.HEIGHT) / constants.HeightMeasuredWith) * (lineCount - 1)
        );

        this.contentLocation = new Location(
            this.content,
            this.pfpLocation.getRightX() + this.pfpLocation.height * factors.PFP_RIGHT_MARGIN,
            this.pfpLocation.getBottomY() -
                this.pfpLocation.height * factors.PFP_CONTENT_VERTICAL_DISTANCE
        );
        return this;
    }

    construct() {
        const img = new Jimp(this.WIDTH, this.HEIGHT, constants.DiscordChatColor);
        if (!this.pfp) throw new Error('Pfp not set');
        img.composite(this.pfp, this.pfpLocation.x, this.pfpLocation.y);
        if (this.username) {
            img.composite(this.username, this.usernameLocation.x, this.usernameLocation.y);
            if (this.timestamp) {
                img.composite(this.timestamp, this.timestampLocation.x, this.timestampLocation.y);
            }
        }
        if (this.content)
            img.composite(this.content, this.contentLocation.x, this.contentLocation.y);

        return img;
    }
}

DiscordScreenshot.getFonts = getFonts;

module.exports = DiscordScreenshot;
