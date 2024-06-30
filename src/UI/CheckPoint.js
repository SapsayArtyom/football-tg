import { Container, Graphics, Text, Sprite } from "pixi.js";

import AnimationFrame from "../elements/AnimationFrame";

export default class CheckPoint extends Container {

    constructor(option) {
        super();
        
        this.widthBg = option.width;
        this.heightBg = option.height;
        this.value = option.value;
        this.fontSize = option.fontSize || 20;

        this.buttonMode = true;
        this.interactive = true;
        this.activeFrame = 0;
        this.active = false;

        this.createPointBtn();
    }

    createPointBtn() {

        this.bgBtn = new AnimationFrame({
            nameFrame: 'btn_yards_',
            countFrame: 12
        });
        this.bgBtn.speed = 0.5;
        this.bgBtn.width = this.widthBg;
        this.bgBtn.width = Math.round(this.bgBtn.width);
        this.bgBtn.height = this.heightBg;
        this.bgBtn.height = Math.round(this.bgBtn.height);
        // const scBgBtn = (this.widthBg / this.bgBtn.width).toFixed(4);
        // this.bgBtn.scale.set(scBgBtn, scBgBtn);
        this.addChild(this.bgBtn);

        this.label = new Text({text :`${this.value}`, 
            style: {
                fill: 0xffffff,
                fontSize: this.fontSize,
                fontFamily: 'OpenSans_BoldItalic',
            }});
        this.label.anchor.set(0.5, 0.5);
        this.label.roundPixels = true;
        if(this.value === 50) this.label.x = 50;
        else this.label.x = 4;
        this.addChild(this.label);
    }

    setOn() {
        this.bgBtn.playNumFrame(6);
        this.activeFrame = 6;
        this.active = true;
        this.label.text = `${this.value} yard`;
        if(this.value === 50 || this.value === 40) this.label.x = 50;
        else this.label.x = 47;
    }

    async setOff() {
        if(this.activeFrame === 6) {
            this.bgBtn.playNumFrame(6, true);
            this.activeFrame = 0;
            this.active = false;
            this.label.text = `${this.value}`;
            this.label.x = 3;
        } 
    }

    changeTextureBtn(texture) {
        const newTexture = new Texture.from(texture);
        this.bgBtn.texture = newTexture;
    }

    onClick(callback, context) {
        if (context) {
            this.on("pointerup", callback, context);
        } else {
            this.on("pointerup", callback);
        }
    }

}