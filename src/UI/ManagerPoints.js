import { Container } from "pixi.js";
import CheckPoint from "./CheckPoint";
import Ring from "../elements/Ring";
import { EventEmitter } from "events";

export default class ManagerPoints extends Container {

    constructor(options) {
        super();

        this.game = options.game;
        this.scene = options.scene;
        this._emitter = new EventEmitter();

        this.sc = this.scene.scale.x; 
        this.activePoint = 4;       
        this.valuePoints = [
            {
                width: 350,
                height: 65,
                value: 10,
                fontSize: 46,
                curve: 1.8,
                timeout: 0.75,
                scaleRing: 1,
                // scaleRing: 0.4,
                ballScale: 0.5,
                multiply: 1,
                timeScale: 0.6,
                yrds: 10,
                bottomLine: 470,
                // bottomLine: 138,
                ratioVertMarker: 5,
                ratioHorizonMarker: -75,
            },
            {
                width: 360,
                height: 70,
                value: 20,
                fontSize: 48,
                curve: 2.1,
                timeout: 0.79,
                scaleRing: 1.4,
                // scaleRing: 0.55,
                ballScale: 0.6,
                multiply: 2,
                timeScale: 0.8,
                yrds: 20,
                bottomLine: 480,
                // bottomLine: 149,
                ratioVertMarker: 4,
                ratioHorizonMarker: -35,
            },
            {
                width: 390,
                height: 75,
                value: 30,
                fontSize: 50,
                curve: 2.4,
                timeout: 0.85,
                scaleRing: 2,
                // scaleRing: 0.7,
                ballScale: 0.7,
                multiply: 3,
                timeScale: 1,
                yrds: 30,
                bottomLine: 490,
                // bottomLine: 165,
                ratioVertMarker: 4,
                ratioHorizonMarker: -15,
            },
            {
                width: 420,
                height: 80,
                value: 40,
                fontSize: 55,
                curve: 2.7,
                timeout: 0.93,
                scaleRing: 2.6,
                ballScale: 0.85,
                multiply: 4,
                timeScale: 1.2,
                yrds: 40,
                bottomLine: 490,
                // bottomLine: 140,
                ratioVertMarker: 5,
                ratioHorizonMarker: -5,
            },
            {
                width: 450,
                height: 90,
                value: 50,
                fontSize: 60,
                curve: 3,
                timeout: 1,
                scaleRing: 3.2,
                ballScale: 1,
                multiply: 5,
                timeScale: 1.4,
                yrds: 50,
                bottomLine: 345,
                // bottomLine: 145,
                // ratioVertMarker: 3.5,
                ratioVertMarker: 2.5,
                ratioHorizonMarker: 0,
                // ratioHorizonMarker: 15,
            },
        ]
        this.arrPoints = [];
        this.arrPosition = [1175, 1265, 1400, 1635, 1900];
        // this.arrPosition = [303, 327, 362, 422, 500];
        // this.arrPosition = [344, 370, 409, 476, 600];
        this.y = 1145;

        this.createRings();
        this.createPoints();
        // this.startPositionBall();
    }

    get emitter() {
        return this._emitter;
    }

    createRings() {
        this.arrRings = [];
        for (let i = 0; i < this.arrPosition.length; i++) {
            const ring = new Ring({});
            ring.scale.set(this.valuePoints[i].scaleRing, this.valuePoints[i].scaleRing);
            ring.x = this.game.baseWidth / 2;
            ring.y = this.arrPosition[i];
            this.arrRings.push(ring);
            this.scene.addChild(ring);
        }
        this.arrRings[this.arrRings.length-1].play();
    }

    createPoints() {
        this.valuePoints.forEach((val, index) => {
            const point = new CheckPoint({
                width: val.width,
                height: val.height,
                value: val.value,
                fontSize: val.fontSize,
            });
            point.x = this.game.baseWidth / 2 + 350;
            point.y = Math.floor(this.arrPosition[index] - this.y);
            this.arrPoints.push(point);

            point.onClick(() => {
                this.arrPoints.forEach((item)=>{
                    item.setOff();
                    item.interactive = true
                });
                point.interactive = false;
                point.setOn();
                this.arrRings.forEach((item)=>{
                    item.hideRing();
                });
                this.arrRings[index].showRing();
                this.activePoint = index;
                this.emitter.emit('selectPoint');
            });

            this.addChild(point);
        });

    }

    setPosition() {
        this.arrPoints.forEach((item, index) => {
            this.arrRings[index].y = ((item.height - this.arrRings[index].height) / 2) + item.y + this.y;
        });
    }

    startPositionBall() {
        this.arrPoints[this.arrPoints.length - 1].setOn();
        this.arrRings[this.arrRings.length - 1].showRing();
        this.arrPoints[this.arrPoints.length - 1].interactive = false;
    }

}