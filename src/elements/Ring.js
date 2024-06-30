import { Container, Sprite } from "pixi.js";

import AnimationFrame from "./AnimationFrame";

export default class Ring extends Container {

    constructor(options) {
        super();

        // this.createRing();
        this.Ring();
    }

    Ring() {
        this.animRing = new AnimationFrame({
            nameFrame: 'yard_ring_000',
            countFrame: 14
        });
        this.animRing.speed = 0.2;
        const scRing = 120 / this.animRing.width;
        this.animRing.scale.set(scRing);
        // this.animRing.play();
        this.addChild(this.animRing);
    }

    play() {
        this.animRing.play();
    }

    stop() {
        this.animRing.setFrame();
    }

    showRing() {
        // this.animRing.alpha = 1;
        this.animRing.play();
    }

    hideRing() {
        // this.animRing.alpha = 0.65;
        this.animRing.setFrame();
    }

}