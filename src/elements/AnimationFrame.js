import { Container, AnimatedSprite, Texture, Assets } from "pixi.js";


export default class AnimationFrame extends Container {

    constructor(options) {
        super();
        this.name = 'animFrames';
        this.nameFrame = options.nameFrame;
        this.countFrame = options.countFrame;        

        this.createAnim();
    }

    set speed(value) {
        this.anim.animationSpeed = value;
    };
    
    set anchor(value) {
        this.anim.anchor.set(value);
    };

    createAnim() {
        const arr = [];
        for (let i = 0; i < this.countFrame; i++) {
            const val = i < 10 ? `0${i}` : i;
            arr.push(Texture.from(`${this.nameFrame + val}`));
        };
        
        this.anim = new AnimatedSprite(arr);
        this.anim.anchor.set(0.5);
        this.anim.animationSpeed = 1;
        this.addChild(this.anim);
    }

    play() {
        this.anim.play();
    }

    playCounter(count, boolean, fun) {
        let t = 0;
        this.anim.play();
        this.anim.onLoop = () => {
            t++;
            if(t === count) {
                boolean ? this.anim.stop() : this.anim.destroy();
                if(fun) fun();
            } 
        };
    }

    playNumFrame(number, start = false) {
        // this.anim.loop = true;
        this.anim.play();
        let t = 0;
        this.anim.onFrameChange = () => {
            t++;
            if(t === number) {
                this.anim.stop();
                if(start) this.anim.gotoAndStop(0);
            }
        };
    }

    stop() {
        this.anim.stop();
    }

    destroy() {
        this.anim.destroy();
    }

    setFrame(value = 0) {
        this.anim.gotoAndStop(value);
    }

}