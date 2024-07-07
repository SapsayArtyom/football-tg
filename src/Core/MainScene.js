import { Container, Graphics, Text, Ticker, Sprite, Texture, Assets } from "pixi.js";
import Score from '../UI/Score';
import StartScreen from '../UI/StartScreen';
import MultiplyBar from '../UI/MultiplyBar';
import TweenMax from 'gsap';
import SoundManager from '../UI/SoundManager';
// import sound from 'pixi-sound';
import { sound } from '@pixi/sound';
import ManagerPoints from '../UI/ManagerPoints';
import PlayScene from '../UI/PlayScene';
import Timer from '../elements/Timer';
import Ball from '../elements/Ball';
import Viewers from '../GameComponents/Viewers';
import Goal from '../GameComponents/Goal';
import LeaderBoard from "../LeaderBoardComponent/LeaderBoard";

export default class MainScene extends Container {

    constructor(option) {
        super();

        this.game = option.game;
        this.ticker = new Ticker();
        this.mainContainer = option.container;
        this.scaleScene = option.scaleScene;

        this.gameInit = false;

        this.heightHeader = 150;
        this.totalBonus = 0;
        this.time = -2;

        this.soundNow = '';
        this.username = this.game.nickName;

        this.amountBonus = 0;
        this.bonusKick = 0;
        this.baseBonus = 100;

        this.addSpecification();
    }

    addSpecification() {
        
        this.createBackground();
        this.createScore();
        this.createPlayScene();
        
        this.createTimer();
        this.createMultiplyBar();
        this.createSoundIcon();

        this.createStartScreen();
    }

    async createBackground() {

        this.bgCont = new Container();
        this.mainContainer.addChild(this.bgCont);
        this.bg = Sprite.from('bg_game');

        this.bg.name = 'background';
        this.bgCont.addChild(this.bg);        

        const topBar = Sprite.from('top_bar');
        topBar.name = 'top_bar';
        topBar.width = this.game.baseWidth;
        topBar.height = this.heightHeader;
        this.bgCont.addChild(topBar);

        const viewers = new Viewers({
            width: this.game.baseWidth,
            height: 175,
        });
        viewers.y = 270;
        this.bgCont.addChild(viewers);

        const bgPanel = Sprite.from('bg_panel');
        bgPanel.name = 'bgPanel';
        bgPanel.y = 900;
        this.bgCont.addChild(bgPanel);

        this.goal = new Goal({
            width: 500
        });
        this.goal.position.set(this.game.baseWidth / 2, 650);
        this.mainContainer.addChild(this.goal);

        this.managerPoints = new ManagerPoints({
            game: this.game,
            scene: this.bgCont
        });
        this.mainContainer.addChild(this.managerPoints);

        this.managerPoints.emitter.on('selectPoint', this.setPositionBall.bind(this));
    }

    createPlayScene() {
        this.playScene = new PlayScene({
            game: this.game,
            scene: this.bgCont,
        });
        this.playScene.y = 850;
        this.playScene.emitter.on('pushBall', this.pushBall.bind(this));
        this.playScene.emitter.on('playGame', this.startGame.bind(this));
        this.mainContainer.addChild(this.playScene);        

        this.ball = new Ball();
        this.ball.x = this.game.baseWidth / 2;
        this.ball.y = this.managerPoints.arrPosition[this.managerPoints.activePoint] - this.ball.height + 4;
        this.mainContainer.addChild(this.ball);
        this.ball.emitter.on('endRound', this.restartRound.bind(this));

        this.goalLeft = 420;
        // const graphLeft = new Graphics();
        // graphLeft.fill(0xff00ff, 0.5);
        // graphLeft.stroke(4, 0xff00ff);
        // graphLeft.moveTo(this.goalLeft, 0);
        // graphLeft.lineTo(this.goalLeft, 650 + this.game.shift);
        
        this.goalRight = 690;
        // const graphRight = new Graphics();
        // graphRight.fill(0xff00ff, 0.5);
        // graphRight.stroke(4, 0xff00ff);
        // graphRight.moveTo(this.goalRight, 0);
        // graphRight.lineTo(this.goalRight, 650 + this.game.shift);
        
        this.goalBottom = 855;
        // const graphBottom = new Graphics();
        // graphBottom.fill(0xff00ff, 0.5);
        // graphBottom.stroke(4, 0xff00ff);
        // graphBottom.moveTo(0, this.goalBottom);
        // graphBottom.lineTo(this.game.baseWidth, this.goalBottom);
    }

    startGame() {
        this.managerPoints.interactiveChildren = false;
    }

    restartRound() {
        this.showBonus(this.bonusKick);
        this.totalBonus += +this.amountBonus * this.multiplyBar.value;
        this.updateCounter(this.totalBonus);
        this.ball.restartBall();
        this.ball.scale.set(this.managerPoints.valuePoints[this.managerPoints.activePoint].ballScale);
        this.ball.x = this.game.baseWidth / 2;
        this.multiplyBar.amountMultiply(this.bonusKick);

        this.playScene.restartMarkers();
        this.managerPoints.interactiveChildren = true;
    }

    pushBall() {

        const pos = this.ball.getGlobalPosition();
        const power = pos.y - this.playScene.heightPower * this.ball.scale.x;
        const activeBonus = this.managerPoints.valuePoints[this.managerPoints.activePoint].multiply;

        if( this.goalBottom > power) {
            if(this.goalLeft < (pos.x + this.playScene.widthPower * this.ball.scale.x) - (this.ball.width * this.ball.scale.x) / 10 && 
                this.goalRight > (this.playScene.widthPower * this.ball.scale.x + pos.x) + (this.ball.width * this.ball.scale.x) / 10) {
                this.bonusKick = activeBonus * this.baseBonus;
            } 
            else {
                this.bonusKick = 0;
                this.amountBonus = 0;
                this.multiplyBar.reloadMultiply();
            } 
        } else {
            this.bonusKick = 0;
            this.amountBonus = 0;
            this.multiplyBar.reloadMultiply();
        } 

        this.amountBonus += this.bonusKick;
        
        this.ball.pushBall(this.playScene.widthPower, this.playScene.heightPower , this.bonusKick);
    }

    async setPositionBall() {

        const activePoint = this.managerPoints.valuePoints[this.managerPoints.activePoint];
        const posX = this.game.baseWidth / 2;
        const posY = this.managerPoints.arrPosition[this.managerPoints.activePoint] - (this.ball.getLocalBounds().height * activePoint.ballScale) + 4;
        await this.ball.moveBall(posX, posY, activePoint.ballScale); 

        this.playScene.horizontalMarker.timeScale = activePoint.timeScale;
        this.playScene.verticalMarker.timeScale = activePoint.timeScale;
        this.playScene.horizontalMarker.drawMarker(activePoint.yrds);
        this.playScene.verticalMarker.drawMarker(activePoint.yrds);
        this.playScene.bottomLine = activePoint.bottomLine;
        this.playScene.ratioVertMarker = activePoint.ratioVertMarker;
        this.playScene.ratioHorizonMarker = activePoint.ratioHorizonMarker;
        if(activePoint.multiply === 5) this.playScene.topLine = 1300;
        else this.playScene.topLine = 1500;

        this.ball.curve = activePoint.curve;
        this.ball.timeout = activePoint.timeout;
    }

    showBonus(value) {
        const activePoint = this.managerPoints.valuePoints[this.managerPoints.activePoint];
        let text;
        let subtext;
        const globPos = this.ball.ball.getGlobalPosition();
        if(value > 0) {
            text = `+${value}`;
            subtext = `x${activePoint.multiply}`;
            this.goal.goalSuccess();
            sound.play('crowd_cheer', {complete: ()=>{
                sound.play('crowd_ambient', {loop: true, volume: 0.75});
                this.soundNow = 'crowd_ambient';
            }});
            this.soundNow = 'crowd_cheer';
        } 
        else {
            this.goal.goalFail();
            sound.play('goal_fail', {complete: ()=>{
                sound.play('crowd_ambient', {loop: true, volume: 0.75});
                this.soundNow = 'crowd_ambient';
            }});
            this.soundNow = 'goal_fail';
        } 
        const bonusCont = new Container();
        this.mainContainer.addChild(bonusCont);
        const labelBonus = new Text({text : text, 
            style: {
                fill: 0xffffff,
                fontSize: 80,
                fontFamily: 'OpenSans_BoldItalic',
            }});
        bonusCont.addChild(labelBonus);
        const subLabelBonus = new Text({text : subtext, 
            style: {
                fill: 0x78f1ff,
                fontSize: 80,
                fontFamily: 'OpenSans_BoldItalic',
            }});
        subLabelBonus.x = (bonusCont.width - subLabelBonus.width) / 2;
        subLabelBonus.y = labelBonus.getBounds().bottom;
        bonusCont.position.x = globPos.x;
        bonusCont.position.y = globPos.y;
        
        bonusCont.addChild(subLabelBonus);
        TweenMax.to(bonusCont, .7, {
            y: globPos.y - 100,
            onComplete: () => {
                bonusCont.destroy();
            }
        });
    }

    createStartScreen() {
        // const tintCont = new Container();
        // tintCont.interactive = true;

        // const graph = new Graphics();
        // graph.rect(0, 0, this.game.app.screen.width, this.game.app.screen.height);
        // graph.fill({color: 0x000000, alpha: 1});
        // graph.label = 'tint cont';
        // tintCont.addChild(graph);

        this.startScreen = new StartScreen({
            game: this.game
        });
        // tintCont.addChild(this.startScreen);
        this.startScreen.emitter.on('countdown', () => {
            this.gameInit = true;
            this.managerPoints.startPositionBall();
            this.username = this.startScreen.valueInputName;
            // tintCont.interactive = false;
            // this.createSoundIcon();
            this.startScreen.hide();
            sound.play('crowd_ambient', {loop: true, volume: 0.75});
            this.soundNow = 'crowd_ambient';
            this.timer.countdownTimer(5000, () => this.restartGame());
            // this.timer.createTimer(15000);
        });
        // tintCont.x = -(tintCont.width - this.game.app.screen.width) / 2;
        this.mainContainer.addChild(this.startScreen);
    }

    createLeaderBoard() {
        this.leaderboard = new LeaderBoard({
            game: this.game
        });
    }

    createSoundIcon() {
        this.sound = new SoundManager({
            width: 110,
            // flag: this.startScreen.soundFlag
            flag: 'off'
        });
        this.sound.position.set(this.game.baseWidth - this.sound.width - 25, 25);
        this.mainContainer.addChild(this.sound);
    }

    createScore() {
        this.score = new Score({
            fontSize: 60,
            fontFamily: 'OpenSans_BoldItalic',
        });
        this.score.y = 5;
        this.score.x = 20;
        this.mainContainer.addChild(this.score);
    }

    createMultiplyBar() {
        this.multiplyBar = new MultiplyBar({
            fontSize: 58,
            fontColor: 0x78f1ff,
            fontFamily: 'OpenSans_BoldItalic',
            fontVariant: 'small-caps'
        });
        this.multiplyBar.x = this.score.x + this.score.width + 10;
        this.multiplyBar.y = this.score.y;
        this.mainContainer.addChild(this.multiplyBar);
        this.multiplyBar.setMultiply(`x1`);
    }

    createTimer() {
        this.timer = new Timer({
            // deadlineAt: 10000,
            fontFamily: 'OpenSans_BoldItalic',
            fontSize: 100,
            fontWeight: 'normal',
            fontColor: '0xcccccc'
        });
        this.timer.x = Math.floor(this.game.app.screen.width - this.timer.width) / 2;
        this.timer.y = Math.floor(this.heightHeader - this.timer.height) / 2;
        this.mainContainer.addChild(this.timer);
        // this.timer.countdownTimer();
    }

    updateCounter(value) {
        this.score.counterScore(`${value}`);
    }

    getPlayerValue() {
        return { 
            username: this.username, 
            score: this.totalBonus
        };
    }

    restartGame() {
        this.game.setScore(null, 500);
        this.startScreen.show();
        this.totalBonus = 0;
        this.updateCounter(this.totalBonus);
    }
}