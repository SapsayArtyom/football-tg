import { Container, Sprite, TilingSprite, Text } from "pixi.js";

export default class LeaderBoard extends Container {

    constructor(option) {
        super();

        this.game = option.game;
        
        this.createBG();
        this.createBoard();
    }

    createBG() {
        const bg = Sprite.from('bg');
        bg.name = 'background';
        bg.width = this.game.baseWidth;
        bg.height = this.game.baseHeight;
        this.addChild(bg);

        // const tileCloud = new TilingSprite.from('clouds_bottom').texture, this.game.app.screen.width, 600 );
        // // const tileCloud = new TilingSprite.from('clouds_bottom').texture, this.game.app.screen.width, this.game.app.screen.height );
        // tileCloud.position.y = this.game.app.screen.height - tileCloud.height;
        // this.addChild(tileCloud);
    }

    createBoard() {
        this.boardCont = new Container();
        this.addChild(this.boardCont);
        const board = Sprite.from('leaderBoard');
        board.name = 'leaderBoard';
        const scaleSet = 900 / board.width;
        // const scaleSet = 251 / board.width;
        board.scale.set(scaleSet, scaleSet);
        this.boardCont.addChild(board);
        this.boardCont.x = (this.game.baseWidth - this.boardCont.getBounds().width) / 2;
        this.boardCont.y = Math.floor(this.game.baseHeight - this.boardCont.getBounds().height) / 2;
        this.scoreCont = new Container();
        this.addChild(this.scoreCont);

        const label = new Text({text :`Leaderboards`, 
            style: {
                fontFamily: 'OpenSans_BoldItalic',
                fill: 0xcccccc,
                fontSize: 100,
                letterSpacing: 1,
            }});
        label.x = (this.game.baseWidth - label.width) / 2;
        label.y = this.boardCont.y + 5;
        this.addChild(label);

        this.scoreCont.y = label.height;

        this.showScores(this.game.scores);
    }

    showScores(value) {
        console.log('draw updated scores :', value);
        this.scoreCont.removeChildren();
        const scores = value;
        const posX =  this.boardCont.x;
        const posY =  this.boardCont.y;
        for (let i = 0; i < scores.length; i++) {
            if(i === 24) break;
            const element = scores[i];
            const lineScore = new Container();
            this.scoreCont.addChild(lineScore);
            const name = new Text({text :`${i+1}. ${element.username}`, 
                style: {
                    fontFamily: 'OpenSans_Italic',
                    fill: 0x59B1FF,
                    fontSize: 55,
                    letterSpacing: 1,
                }});
            name.x = Math.floor(posX) + 95;
            lineScore.addChild(name);
            const score = new Text({text :`${element.score}`, 
                style: {
                    fontFamily: 'OpenSans_Italic',
                    fill: 0x59B1FF,
                    fontSize: 55,
                    letterSpacing: 0.5,
                }});
            score.x = this.game.baseWidth - score.width - Math.floor(posX) - 95;
            lineScore.addChild(score);
            lineScore.y = (name.height + 10) * i + 45 + Math.floor(posY);
            // lineScore.y = 29 * i + 45 + Math.floor(posY);
        }
    }
}