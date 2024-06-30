import { Container, AnimatedSprite, Texture } from "pixi.js";

export default class Viewers extends Container {

    constructor(options) {

        super();

        // this.resource = options.resource;
        this.sceneWidth = options.width;
        this.sceneHeight = options.height;

        this.createAnim();
    }

    createAnim() {

        this.viewersTextures = [];

        for (let i = 0; i < 14; i++) {
            const val = i < 10 ? `0${i}` : i;
            const texture = new Texture.from(`crowd_lower_01000${val}`);
            this.viewersTextures.push(texture);
        }

        this.animViewers = new AnimatedSprite(this.viewersTextures);
        this.animViewers.name = 'animViewers';
        const k = this.sceneWidth / this.animViewers.width;
        // const k = this.sceneHeight / this.animViewers.height;
        this.animViewers.scale.set(k);
        this.animViewers.animationSpeed  = 0.1;
        this.animViewers.play();
        // this.position.set(this.posX, this.posY);
        // this.animViewers.anchor.set(0.5, 0.5);
        this.addChild(this.animViewers);
    }

}