import { Container, Sprite, Graphics } from "pixi.js";

// import sound from 'pixi-sound';
import { sound } from '@pixi/sound';
import VerticalMarker from "../elements/VerticalMarker";
import HorizontalMarker from "../elements/HorizontalMarker";
import TweenMax from 'gsap';
import { EventEmitter } from "events";
import Button from "../elements/Button";

export default class PlayScene extends Container {

    constructor(options) {
        super();

        this.game = options.game;
        this.scene = options.scene;
        this.ringWidth = 90;
        // this.topLine = 300;
        this.topLine = 1300;
        this.bottomLine = 345;
        // this.bottomLine = 145;
        // this.valueMarkerH = 2;
        this.scalePosition = 1;
        this.ratioVertMarker = 2.5;
        this.ratioHorizonMarker = 0;
        // this.ratioHorizonMarker = 15;
        this._emitter = new EventEmitter();
        

        this.createPlayScene();
    }

    get emitter() {
        return this._emitter;
    }

    createPlayScene() {

        this.ringCont = new Container();
        this.scene.addChild(this.ringCont);

        this.markerCont = new Container();
        this.addChild(this.markerCont);

        this.horizontalMarker = new HorizontalMarker('horizontal_bar_50yrds');
        this.horizontalMarker.y = -20;
        this.horizontalMarker.x = (this.game.baseWidth - this.horizontalMarker.getBounds().width) / 2 - 5;
        this.addChild(this.horizontalMarker);

        this.btnTapHor = new Button({
            resource: 'btn_tap_active',
            btnScale: 0.5,
            text: 'TAP',
            fontFamily: 'OpenSans_Bold',
            fontSize: 60
        });
        this.btnTapHor.alpha = 0;
        this.btnTapHor.onClick(()=>{
            // 10yrd 155 - 770
            // 20yrd 245 - 680
            // 30yrd 295 - 630
            // 40yrd 340 - 590
            // 50yrd 370 - 555
            // this.horizontalMarker.line.x = 585;
            this.powerKick();
            this.btnTapHor.interactive = false;
            this.horizontalMarker.inactiveMarker();
            TweenMax.to(this.btnTapHor, .5, {
                alpha: 0,
                onComplete: ()=>{
                    this.emitter.emit('pushBall');
                    if(this.verticalMarker.line.y > this.verticalMarker.marker.getLocalBounds().height / 2) sound.play('kick_light');
                    else sound.play('kick_heavy');
                }
            });
        });
        this.btnTapHor.interactive = false;
        this.btnTapHor.x = (this.game.baseWidth - this.btnTapHor.width) / 2;
        this.btnTapHor.y = this.horizontalMarker.getBounds().height - 50;
        this.addChild(this.btnTapHor);

        this.verticalMarker = new VerticalMarker('vertical_bar_50yrds');
        this.markerCont.addChild(this.verticalMarker); 

        this.btnTapVert = new Button({
            resource: 'btn_tap_active',
            btnScale: 0.5,
            text: 'TAP',
            fontFamily: 'OpenSans_Bold',
            fontSize: 60
        });
        this.btnTapVert.x = 20;
        this.btnTapVert.onClick(()=> {
            // 770 10yrds
            // 640 20yrds
            // 490 30yrds
            // 285 40yrds
            // 90 50yrds
            // this.verticalMarker.line.y = 80;
            this.emitter.emit('playGame');
            
            this.btnTapVert.interactive = false;
            this.verticalMarker.inactiveMarker();
            this.horizontalMarker.activeMarker();
            TweenMax.to(this.btnTapVert, .5, {
                alpha: 0,
                onComplete: ()=>{
                    this.btnTapHor.alpha = 1;
                    this.btnTapHor.interactive = true;
                }
            });
        });
        this.addChild(this.btnTapVert);

        this.verticalMarker.x = this.btnTapVert.width / 2 + this.btnTapVert.x;
        this.verticalMarker.y = this.horizontalMarker.height + 50;
        this.btnTapVert.y = this.verticalMarker.getBounds().bottom - 10;
    }

    powerKick() {

        const arrPoints = [];
        const colPoints = this.verticalMarker.marker.getLocalBounds().height;
        const y1 = 0;
        const y2 = colPoints / this.ratioVertMarker;
        const y3 = colPoints;

        for (let t = 0; t < colPoints; t++) {
            const a = (1 - t / colPoints) ;
            const wayY = Math.sqrt(a) * y1 + 2 * (a) * (t / colPoints) * y2 + Math.sqrt(t / colPoints) *y3;

            arrPoints.push({ y: wayY});
        }

        const pos = Math.floor(this.verticalMarker.line.y);
        const valuePos = arrPoints[pos].y > 950 ? 950 : arrPoints[pos].y;
        const heightKick = this.topLine - this.bottomLine;
        const valueStep = heightKick / this.verticalMarker.marker.getLocalBounds().height;
        const valY = valuePos * valueStep;
        this.heightPower = this.topLine - valY;    

        const heightKickX = this.topLine - this.bottomLine;
        const valueStepX = heightKickX / this.horizontalMarker.marker.getLocalBounds().width;
        if(this.horizontalMarker.line.getGlobalPosition().x < this.game.baseWidth / 2) {
            this.widthPower = -1 * ((this.game.baseWidth / 2) - this.horizontalMarker.line.getGlobalPosition().x + ((35 + this.ratioHorizonMarker) * valueStepX));
        } 
        else {
            this.widthPower = (this.horizontalMarker.line.getGlobalPosition().x - (this.game.baseWidth / 2) + ((20+this.ratioHorizonMarker) * valueStepX));
        } 
    }

    restartMarkers() {
        this.btnTapVert.alpha = 1;
        this.btnTapVert.interactive = true;
        this.verticalMarker.activeMarker();
    }

}