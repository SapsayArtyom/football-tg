import { Container, Sprite, Text, Graphics } from "pixi.js";


export default class Button extends Container {

    constructor(options) {
        super();

        

        this.btnWidth = options.btnWidth || 100;
        this.btnHeight = options.btnHeight || 50;
        this.btnColor = options.btnColor || 0xffffff;
        this.borderColor = options.borderColor;
        this.borderWidth = options.borderWidth || 2;
        this.btnScale = options.btnScale || 1;
        this.resource = options.resource;
        this.btnName = options.btnName || 'btn';
        this.text = options.text || '';
        this.fontSize = options.fontSize || 24;
        this.fontFamily = options.fontFamily || 'Arial';
        this.fontColor = options.fontColor || 0xffffff;
        this.fontWeight = options.fontWeight || 'normal';


        this.createBtn();
    }

    createBtn() {
        if(this.resource) {
            this.btn = Sprite.from(`${this.resource}`);
            this.btn.scale.set(this.btnScale);
        } else {
            this.btn = new Graphics();
            if(this.borderColor) this.btn.stroke(this.borderWidth, this.borderColor);
            this.btn.rect(0, 0, this.btnWidth, this.btnHeight);
            this.btn.fill({color: this.btnColor, alpha: 1});
        }
        this.btn.name = `${this.btnName}`;

        this.addChild(this.btn);

        if(this.text) {
            this.label = new Text({text :this.text, 
                style: {
                    fill: this.fontColor,
                    fontSize: this.fontSize,
                    fontFamily: this.fontFamily,
                    fontWeight: this.fontWeight,
                }});

            this.label.x = (this.btn.getBounds().width - this.label.width) / 2;
            this.label.y = (this.btn.getBounds().height - this.label.height) / 2;

            this.addChild(this.label);
        }
    }

    onClick(callback, context) {

        this.interactive = true;
        this.buttonMode = true;

        if (context) {
            this.on("pointerdown", callback, context);
        } else {
            this.on("pointerdown", callback);
        }
    }

    changeTexture(textureName) {
        const texture = new Texture.from(textureName);
        this.btn.texture = texture;
    }

}