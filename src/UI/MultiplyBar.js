import { Container, Text } from "pixi.js";

export default class MultiplyBar extends Container {

    constructor(options) {
        super();

        this.fontSize = options.fontSize || 24;
        this.fontFamily = options.fontFamily || 'Arial';
        this.fontColor = options.fontColor || 0xffffff;
        this.fontWeight = options.fontWeight || 'normal';
        this.fontVariant = options.fontVariant || 'normal';

        this.name = 'multiplyBar';
        this.value = 1;
        this.creteBar();
    }

    creteBar() {
        this.multiplyLabel = new Text({text :`x${this.value}`, 
            style: {
                fill: this.fontColor,
                fontSize: this.fontSize,
                fontWeight: this.fontWeight,
                fontFamily: this.fontFamily,
            }});

        this.addChild(this.multiplyLabel);
    }

    setMultiply(value) {
        this.multiplyLabel.text = `${value}`;
    }

    amountMultiply(value) {
        value > 0 ? this.increaseMultiply() : this.reloadMultiply();
    }

    increaseMultiply() {
        this.value += 1;
        if (this.value >= 11) this.value = 1;
        this.multiplyLabel.text = `X${this.value}`;
    }

    reloadMultiply() {
        this.value = 1;
        this.multiplyLabel.text = `X${this.value}`;
    }
}
