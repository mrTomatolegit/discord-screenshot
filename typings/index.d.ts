import Jimp from 'jimp';
import { Font } from 'jimp';

class Location {
    constructor(image: Jimp, x: number = 0, y: number = 0);
    public x: number;
    public y: number;
    public get width(): number;
    public get height(): number;
    public getCenter(): { x: number; y: number };
    public getMiddleX(): number;
    public getMiddleY(): number;
    public getBottomY(): number;
    public getRightX(): number;
    public getTopRight(): { x: number; y: number };
    public getBottomRight(): { x: number; y: number };
    public getBottomLeft(): { x: number; y: number };
}

type BuiltInFonts = {
    bold: Font;
    book: Font;
    bookitalic: Font;
    light: Font;
    lightitalic: Font;
    medium: Font;
    mediumitalic: Font;
    semibold: Font;
    semibolditalic: Font;
};

export = class DiscordScreenshot {
    constructor(width?: number, height?: number);
    public WIDTH: number;
    public HEIGHT: number;
    public pfp?: Jimp;
    public pfpLocation?: Location;
    public username?: Jimp;
    public usernameLocation?: Location;
    public timestamp?: Jimp;
    public timestampLocation?: Location;
    public content?: Jimp;
    public contentLocation?: Location;

    public setPfp(image: Jimp | string): Promise<this>;
    public setUsername(text: string, font: Font | Promise<Font>): Promise<this>;
    public setTimestamp(textOrDate: Date | string, font: Font | Promise<Font>): Promise<this>;
    public setContent(text: string, font: Font | Promise<Font>): Promise<this>;
    public construct(): Jimp;

    public static getFonts(): Promise<BuiltInFonts>;
};
