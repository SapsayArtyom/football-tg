import * as PIXI from 'pixi.js';
import MyLoader from '../Core/MyLoader';
import LeaderBoard from './LeaderBoard';

export default class BoardManager {
    
    constructor(options){

        this.width = options.width;
        this.height = options.height;
        this.scores = options.scores;
        this.isMobile = options.isMobile;
        this.baseWidth = 1125;
        this.baseHeight = 2436;

        console.log('BoardManager init', options);
        this.mainContainer = new PIXI.Container();

        this.mainLoader = MyLoader.loader();

        this.createGame();
    }

    async createGame() {

        this.mainLoader
        // .add('bg', './assets/bg.png')
            .add('bg', './assets/leaderboard_bg_large.png')
            .add('leaderBoard', './assets/leaderboard_bg.png');

        await MyLoader.loadAssets(this.mainLoader);

        this.init();
    }

    updateBoard(score) {
        console.log('update leaderboard', score);
        this.sceneLeaderBoard.showScores(score);
    }

    init() {

        this.app = new PIXI.Application({ 
            width: 1125, 
            height: 2436, 
            antialias: true,
        });

        const div = document.createElement('div');

        if(this.isMobile) {
            const ratio = +(300 / 540).toFixed(2);
            div.style.width = `${document.documentElement.clientHeight * ratio}px`;
            div.style.height = `${document.documentElement.clientHeight}px`;
            // document.body.style.background = `#007A5A`;
            document.body.style.background = `#000000`;
        } else {
            div.style.width = `${this.width}px`;
            div.style.height = `${this.height}px`;
        }

        // div.style.width = `${this.width}px`;
        // div.style.height = `${this.height}px`;
        div.style.position = 'relative';
        document.body.append(div);
        div.append(this.app.view);

        const canvas = document.getElementsByTagName("canvas");
        canvas[0].style.position = "absolute";
        canvas[0].style.transform = "translate(-50%, -50%)";
        canvas[0].style.top = "50%";
        canvas[0].style.left = "50%";
        canvas[0].style.maxHeight = "unset";
        canvas[0].style.maxWidth = "100%";
        
        this.mainContainer.name = 'mainContainer';
        this.app.stage.addChild(this.mainContainer);
        this.sceneLeaderBoard = new LeaderBoard({
            game: this,
            container: this.mainContainer
        });
        this.mainContainer.addChild(this.sceneLeaderBoard);
    }

    destroyBoard() {
        this.mainContainer.destroy();
        this.app.destroy(true);
    }
}