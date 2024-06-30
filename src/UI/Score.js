import { Container, Text } from "pixi.js";

export default class Score extends Container {

    constructor(options) {
        super();

        this.name = 'score';
        this.fontSize = options.fontSize || 24;
        this.fontFamily = options.fontFamily || 'Arial';
        this.fontColor = options.fontColor || 0xffffff;
        this.fontWeight = options.fontWeight || 'normal';
        this.widthTaco = 35;
        this.creteScore();
    }

    creteScore() {

        this.scoreLabel = new Text({text :'SCORE:', 
            style: {
                fill: 0x0054a6,
                fontSize: this.fontSize,
                fontFamily:  this.fontFamily,
                fontWeight: 'bold',
                fontVariant: 'small-caps'
            }});
        this.addChild(this.scoreLabel);

        this.scoreValue = new Text({text :'0', 
            style: {
                fill: 0xcccccc,
                fontSize: this.fontSize,
                fontFamily:  this.fontFamily,
                fontWeight: 'bold'
            }});
        this.scoreValue.y = (this.scoreLabel.getBounds().height);
        this.addChild(this.scoreValue);
    }

    counterScore(amount) {
        this.scoreValue.text = amount;
    }
}