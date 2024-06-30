import { Container, Sprite, Texture } from "pixi.js";

import TweenMax, {Power4} from 'gsap';
import { EventEmitter } from "events";

export default class Ball extends Container {

    constructor() {
        super();

        this.ballWidth = 100;
        this.curve = 3;
        this.timeout = 1;
        this._emitter = new EventEmitter();
        this.ballTexture = new Texture.from('ball');
        this.moveTexture = new Texture.from('ball_blur');

        this.createBall();
    }

    get emitter() {
        return this._emitter;
    }

    createBall() {
        this.ball = new Sprite();
        this.ball.anchor.set(0.5, 0);
        this.ball.texture = this.ballTexture;
        this.scBall = this.ballWidth / this.ball.width;
        this.ball.scale.set(this.scBall, this.scBall);
        this.addChild(this.ball);

        
        this.ballStand = Sprite.from('ballStand');
        const sc = 55 / this.ball.width;
        this.ballStand.anchor.set(0.5, 0);
        this.ballStand.scale.set(sc, sc);
        this.ballStand.y = Math.round(this.ball.getBounds().bottom - 30);
        this.addChild(this.ballStand);
    }

    pushBall(x, y, bonus) {
        TweenMax.to(this.ball, this.timeout, {
            x: x,
            y: -y,
            ease: `back.out(${this.curve})`,
            onComplete: ()=> {
                this.emitter.emit('showBonus');
            }
        });

        TweenMax.to(this.ball.scale, this.timeout, {
            x: 0.18,
            y: 0.18,
        });

        TweenMax.to(this.ball, this.timeout, {
            alpha: 0,
            ease:"power4.in",
            onComplete: ()=>{this.emitter.emit('endRound');}
        });
    }

    async moveBall(x, y, scale) {
        this.ball.texture = this.moveTexture;
        await new Promise((resolve)=>{
            TweenMax.to(this.scale, .3, {
                x: scale,
                y: scale,
            });
            TweenMax.to(this, .3, {
                x: x,
                y: y,
                onComplete: ()=>{
                    this.ball.texture = this.ballTexture;
                    resolve();
                }
            });
        });
    }

    restartBall() {
        this.ball.x = 0;
        this.ball.y = 0;
        this.ball.alpha = 1;
        this.ball.scale.set(this.scBall, this.scBall);
    }
}