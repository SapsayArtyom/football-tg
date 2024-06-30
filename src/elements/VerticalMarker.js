import { Container, Sprite, Graphics, Texture } from "pixi.js";
import TweenMax, {Power0} from 'gsap';


export default class VerticalMarker extends Container {
    constructor(resource) {
        super();
        this.resource = resource;
        this.markerValue = 0.4;
        this.timeScale = 1.4;
        this.barTexture = new Texture.from(`${resource}_active`);
        this.barInactiveTexture = new Texture.from(`${resource}_inactive`);

        this.createMarker();
    }

    createMarker() {

        if(this.resource) {
            this.marker = new Sprite();
            this.marker.texture = this.barTexture;
            this.marker.anchor.set(0.5, 0);
            const scW = 60 / this.marker.width;
            const scH = 650 / this.marker.height;
            // const scW = 18 / this.marker.width;
            // const scH = 200 / this.marker.height;
            this.marker.scale.set(scW, scH);
            this.addChild(this.marker);
        } else {
            this.marker = new Graphics();
            this.marker.stroke({width: 2, color: 0xffffff});
            this.marker.beginTextureFill(this.getGradient(0.5));
            this.marker.rect(0, 0, 20, 250);
            this.addChild(this.marker);
        }

        this.line = new Graphics();
        this.line.moveTo(-50, 0);
        this.line.lineTo(50, 0);
        this.line.stroke({width: 10, color: 0xffffff});
        this.line.y = this.marker.getLocalBounds().height;
        this.marker.addChild(this.line);

        this.selectPower();
    }

    getGradient() {
        const canvas = document.createElement("canvas");
        canvas.width = 20;
        canvas.height = 250;
        const ctx = canvas.getContext("2d");
        const grd = ctx.createLinearGradient(0,0,0,250);
        grd.addColorStop(0, 'rgba(0, 255, 1, 1)');
        grd.addColorStop(`${this.markerValue - 0.3}`, 'rgba(0, 255, 1, 1)');
        grd.addColorStop(`${this.markerValue}`, 'rgba(255, 0, 42, 1)');
        
        grd.addColorStop(1, 'rgba(255, 0, 42, 1)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 20, 250);
        return new Texture.from(canvas);
    }

    selectPower() {
        this.tween = TweenMax.to(this.line, 1, {
            y: 0,
            yoyo: true,
            repeat: -1,
            ease: 'none'
        });
        this.tween.timeScale(this.timeScale);
    }

    activeMarker() {

        this.alpha = 1;
        if(this.resource) {
            this.marker.texture = this.barTexture;
        } else {
            this.marker.clear();
            this.marker.stroke({width: 2, color: 0xffffff, alpha: 0});
            this.marker.beginTextureFill(this.getGradient(0.5));
            this.marker.rect(0, 0, 20, 250);
        }

        this.tween.play();
    }

    inactiveMarker() {

        this.alpha = 0.8;
        if(this.resource) {
            this.marker.texture = this.barInactiveTexture;
        } else {
            this.marker.clear();
            this.marker.stroke({width: 2, color: 0xffffff, alpha: 0});
            this.marker.beginTextureFill(this.getGradient(0.5));
            this.marker.rect(0, 0, 20, 250);
        }

        this.tween.paused(true);
    }

    drawMarker(value) {
        this.tween.timeScale(this.timeScale);
        this.markerValue = value;
        // this.marker.clear();
        // this.marker.stroke(2, 0xffffff, 1);
        // this.marker.beginTextureFill(this.getGradient());
        // this.marker.rect(0, 0, 20, 250);

        if(this.resource) {
            this.barTexture = Texture.from(`vertical_bar_${value}yrds_active`);
            this.barInactiveTexture = Texture.from(`vertical_bar_${value}yrds_inactive`);
            this.marker.texture = this.barTexture;
        } else {
            this.marker.clear();
            this.marker.stroke({width: 2, color: 0xffffff, alpha: 1});
            this.marker.beginTextureFill(this.getGradient());
            this.marker.rect(0, 0, 20, 250);
        }
    }
}