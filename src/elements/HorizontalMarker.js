import { Container, Sprite, Graphics, Texture } from "pixi.js";
import TweenMax, {Power0} from 'gsap';


export default class HorizontalMarker extends Container {
    constructor(resource) {
        super();

        this.alpha = 0.8;
        this.markerValue = 0;
        this.timeScale = 1.4 + 0.1;
        this.resource = resource;
        this.barTexture = new Texture.from(`${resource}_active`);
        this.barInactiveTexture = new Texture.from(`${resource}_inactive`);

        this.createMarker();
    }

    createMarker() {
        
        if(this.resource) {
            this.marker = new Sprite();
            this.marker.texture = this.barInactiveTexture;
            const scW = 950 / this.marker.width;
            const scH = 220 / this.marker.height;
            this.marker.scale.set(scW, scH);
            this.addChild(this.marker);
        } else {
            this.marker = new Graphics();
            this.marker.rect(0, 0, 250, 20);
            this.marker.stroke({width: 2, color: 0xffffff, alpha: 0});
            this.marker.beginTextureFill(this.getGradient());
            this.addChild(this.marker);
        }

        this.line = new Graphics();
        this.line.moveTo(0, 55);
        this.line.lineTo(0, 120);
        this.line.stroke({width: 10, color: 0xffffff});
        this.line.x =  70;
        this.marker.addChild(this.line);

        this.selectPower();
    }

    getGradient() {
        const canvas = document.createElement("canvas");
        canvas.width = 250;
        canvas.height = 20;
        const ctx = canvas.getContext("2d");
        const grd = ctx.createLinearGradient(0, 0, 250, 0);
        grd.addColorStop(0, 'rgba(255, 0, 42, 1)');
        grd.addColorStop(`${0.2 - this.markerValue}`, 'rgba(255, 0, 42, 1)');
        grd.addColorStop(`${0.5 - this.markerValue}`, 'rgba(0, 255, 1, 1)');
        grd.addColorStop(`${0.55 + this.markerValue}`, 'rgba(0, 255, 1, 1)');
        grd.addColorStop(`${0.8 + this.markerValue}`, 'rgba(255, 0, 42, 1)');
        grd.addColorStop(1, 'rgba(255, 0, 42, 1)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 250, 20);
        return new Texture.from(canvas);
    }

    selectPower() {
        this.tween = TweenMax.to(this.line, 1, {
            x: this.marker.getLocalBounds().width - 65,
            yoyo: true,
            repeat: -1,
            ease: 'none'
        });
        this.tween.timeScale(this.timeScale);
        this.tween.paused(true);
    }

    activeMarker() {

        this.alpha = 1;

        if(this.resource) {
            this.marker.texture = this.barTexture;
        } else {
            this.marker.clear();
            this.marker.rect(0, 0, 250, 20);
            this.marker.stroke({width: 2, color: 0xffffff, alpha: 1});
            this.marker.beginTextureFill(this.getGradient());
        }

        this.tween.play();
    }

    inactiveMarker() {

        this.alpha = 0.8;
        if(this.resource) {
            this.marker.texture = this.barInactiveTexture;
        } else {
            this.marker.clear();
            this.marker.rect(0, 0, 250, 20);
            this.marker.stroke({width: 2, color: 0xffffff, alpha: 0});
            this.marker.beginTextureFill(this.getGradient());
        }

        this.tween.paused(true);
    }

    drawMarker(value) {
        this.tween.timeScale(this.timeScale+0.1);
        this.markerValue = value;
        // this.marker.clear();
        // this.marker.stroke(2, 0xffffff, 0);
        // this.marker.beginTextureFill(this.getGradient());
        // this.marker.rect(0, 0, 250, 20);

        if(this.resource) {
            this.barTexture = new Texture.from(`horizontal_bar_${value}yrds_active`);
            this.barInactiveTexture = new Texture.from(`horizontal_bar_${value}yrds_inactive`);
            this.marker.texture = this.barInactiveTexture;
        } else {
            this.marker.clear();
            this.marker.rect(0, 0, 250, 20);
            this.marker.stroke({width: 2, color: 0xffffff, alpha: 0});
            this.marker.beginTextureFill(this.getGradient());
        }
    }
}