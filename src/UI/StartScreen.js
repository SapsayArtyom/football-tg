import { Container, Sprite, Text, Graphics } from "pixi.js";

import { EventEmitter } from "events";
// import sound from 'pixi-sound';
import { sound } from '@pixi/sound';
import Button from "../elements/Button";

export default class StartScreen extends Container {

    constructor(option) {
        super();

        this.name = 'startScreen';
        
        this.game = option.game;
        this.sceneScale = option.scale;
        this._emitter = new EventEmitter();
        
        this.countdownValue = this.game.waitAt;
        this.soundFlag = 'off';

        this.startScreen();
    }

    get emitter() {
        return this._emitter;
    }

    startScreen() {
        const bg = Sprite.from('bg_startscreen');
        const k = this.game.app.screen.width / bg.width;
        bg.scale.set(k, k);
        this.addChild(bg);

        this.screenBack = new Graphics();
        this.screenBack.label = 'screenBack';
        this.addChild(this.screenBack);

        this.screenContainer = new Container();
        this.addChild(this.screenContainer);        

        this.timerCont = new Container();
        this.screenContainer.addChild(this.timerCont);
        
        this.startGameText = new Text({text :'Game Starts In:', 
            style: {
                fontSize: 100,
                fontFamily: 'OpenSans_BoldItalic',
                fill: 0xcccccc,
                fontWeight: 'bold'
            }});
        this.startGameText.x = (this.width - this.startGameText.width) / 2;

        this.turnSound = new Text({text :'Turn Sound On?', 
            style: {
                fontSize: 100,
                fontFamily: 'OpenSans_BoldItalic',
                fill: 0xcccccc,
                fontWeight: 'bold'
            }});
        this.turnSound.position.y = 0;
        this.timerCont.addChild(this.turnSound);
        this.turnSound.x = (this.width - this.turnSound.width) / 2;

        this.btnCont = new Container();
        this.screenContainer.addChild(this.btnCont);

        this.btnYes = new Button({
            resource: 'btn_inactive',
            btnScale: 1.1,
            text: 'YES',
            fontFamily: 'OpenSans_Extrabold',
            fontSize: 120
        });
        this.btnYes.onClick(()=>{
            sound.unmuteAll();
            this.btnYes.changeTexture('btn_active');
            this.btnNo.changeTexture('btn_inactive');
            this.btnYes.interactive = false;
            this.btnNo.interactive = true;
            this.soundFlag = 'on';
        });
        this.btnCont.addChild(this.btnYes); 

        this.btnNo = new Button({
            resource: 'btn_active',
            btnScale: 1.1,
            text: 'NO',
            fontFamily: 'OpenSans_Extrabold',
            fontSize: 120
        });
        this.btnNo.onClick(()=>{
            sound.muteAll();
            this.btnYes.changeTexture('btn_inactive');
            this.btnNo.changeTexture('btn_active');
            this.btnNo.interactive = false;
            this.btnYes.interactive = true;
            this.soundFlag = 'off';
        });
        this.btnNo.x = this.btnYes.getBounds().width + 50;
        this.btnCont.addChild(this.btnNo);

        this.btnCont.x = (this.width - this.btnCont.width) / 2;
        this.btnCont.y = this.timerCont.getBounds().bottom + 100;

        if(!this.game.isAuth) {

            this.nameCont = new Container();
            this.nameCont.y = this.btnCont.getBounds().bottom + 200;
            this.screenContainer.addChild(this.nameCont);

            this.btnSubmit = new Button({
                resource: 'btn_sub_inactive',
                btnScale: 1.1,
                text: 'START',
                fontFamily: 'OpenSans_Extrabold',
                fontSize: 100
            });
            this.btnSubmit.x = ( this.width - this.btnSubmit.width) / 2;

            this.btnSubmit.onClick( ()=>{
                this.btnSubmit.interactive = false;
                this.btnSubmit.destroy();
                this.emitter.emit('countdown');
            });
            this.nameCont.addChild(this.btnSubmit);
            this.screenContainer.y = (this.game.app.screen.height - this.screenContainer.height) / 2 - this.game.shift;
            this.interactive = true;

        } else this.screenContainer.y = (this.game.app.screen.height - this.screenContainer.height) / 2 - this.game.shift;

        this.screenBack.rect(0, 0, this.screenContainer.width + 140, this.screenContainer.height + 170);
        this.screenBack.fill(0x101010);
        this.screenBack.x = (this.width - this.screenBack.getBounds().width) / 2;
        this.screenBack.y = this.screenContainer.y - 85;
        this.screenContainer.y = (this.game.app.screen.height - this.screenContainer.height) / 2 - this.game.shift;

        if(this.game.width < 270) {
            this.drawScene(0.7);
        } 
    }

    removeTimerInterval() {
        clearInterval(this.timer);
    }

    drawScene(scale) {
        this.screenContainer.scale.set(scale);
        this.screenContainer.y = (this.game.app.screen.height - this.screenContainer.getBounds().height) / 2 - this.game.shift;
        if(this.btnSubmit) this.btnSubmit.x = ((this.game.baseWidth - this.btnSubmit.getBounds().width) / 2) / scale;
        this.startGameText.x = ((this.game.baseWidth - this.startGameText.getBounds().width) / 2) / scale;
        this.turnSound.x = ((this.game.baseWidth - this.turnSound.getBounds().width) / 2) / scale;
        this.btnCont.x = ((this.game.baseWidth - this.btnCont.getBounds().width) / 2) / scale;  
        
        this.screenBack.clear();
        this.screenBack.rect(0, 0, (this.screenContainer.getBounds().width + 140), (this.screenContainer.getBounds().height + 170));
        this.screenBack.fill(0x101010);

        this.screenBack.x = (this.game.baseWidth - this.screenBack.getBounds().width) / 2;
        this.screenBack.y = this.screenContainer.y - 85;
    }
}