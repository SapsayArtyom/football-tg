import {Application, Container, Assets} from 'pixi.js';
// import sound from 'pixi-sound';
import { sound } from '@pixi/sound';
import MainScene from './MainScene';

export default class MainGame {
    
    constructor(options){

        this.initialization = false;
        this.width = options.width;
        this.height = options.height;
        this.waitAt = options.waitAt;
        this.deadlineAt = options.deadlineAt;
        this.nickName = options.nickName;
        this.isAuth = options.isAuth;
        this.isMobile = options.isMobile;
        this.baseWidth = 1125;
        this.baseHeight = 2436;

        this.mainContainer = new Container();

        // this.mainLoader = MyLoader.loader();
        this.loadMyAssets();
    }

    async loadMyAssets() {
        const assets = [ { alias:'bg_game', src: './assets/Gameplay/bg.png'},
            { alias:'bg_panel', src: './assets/Gameplay/bg_panel.png'},
            { alias:'top_bar', src: './assets/Gameplay/UI_top_bar.png'},
                
            { alias:'bg_startscreen', src: './assets/Leaderboards/leaderboard_bg_large.png'},
            { alias:'ball', src: './assets/Gameplay/ball_kick_start/ball_kick_start_00001.png'},
            { alias:'ball_blur', src: './assets/Gameplay/ball_kick_start/ball_kick_start_00002.png'},
                
            { alias:'ring', src: './assets/Gameplay/yrd_ring.png'},
            { alias:'ballStand', src: './assets/Gameplay/ballstand.png'},
            { alias:'btn_tap_active', src: './assets/Gameplay/btn_tap_active.png'},
            { alias:'btn_tap_inactive', src: './assets/Gameplay/btn_tap_inactive.png'},
                
                
            { alias:'icon_sound_on', src: './assets/Gameplay/icon_sound_on.png'},
            { alias:'icon_sound_off', src: './assets/Gameplay/icon_sound_off.png'},
            { alias:'goal', src: './assets/Gameplay/goal_post/goal.png'},
            { alias:'btn_active', src: './assets/startScreen/btn_active.png'},
            { alias:'btn_inactive', src: './assets/startScreen/btn_inactive.png'},
            { alias:'btn_sub_active', src: './assets/startScreen/btn_sub_active.png'},
            { alias:'btn_sub_inactive', src: './assets/startScreen/btn_sub_inactive.png'},
        
            // horizontal power markers
            { alias:'horizontal_bar_10yrds_active', src: './assets/Gameplay/Bars/accuracy_bar_10yrds.png'},
            { alias:'horizontal_bar_10yrds_inactive', src: './assets/Gameplay/Bars/accuracy_bar_10yrds_inactive.png'},
            { alias:'horizontal_bar_20yrds_active', src: './assets/Gameplay/Bars/accuracy_bar_20yrds.png'},
            { alias:'horizontal_bar_20yrds_inactive', src: './assets/Gameplay/Bars/accuracy_bar_20yrds_inactive.png'},
            { alias:'horizontal_bar_30yrds_active', src: './assets/Gameplay/Bars/accuracy_bar_30yrds.png'},
            { alias:'horizontal_bar_30yrds_inactive', src: './assets/Gameplay/Bars/accuracy_bar_30yrds_inactive.png'},
            { alias:'horizontal_bar_40yrds_active', src: './assets/Gameplay/Bars/accuracy_bar_40yrds.png'},
            { alias:'horizontal_bar_40yrds_inactive', src: './assets/Gameplay/Bars/accuracy_bar_40yrds_inactive.png'},
            { alias:'horizontal_bar_50yrds_active', src: './assets/Gameplay/Bars/accuracy_bar_50yrds.png'},
            { alias:'horizontal_bar_50yrds_inactive', src: './assets/Gameplay/Bars/accuracy_bar_50yrds_inactive.png'},
                
            // vertical power markers
            { alias:'vertical_bar_10yrds_active', src: './assets/Gameplay/Bars/power_bar_10yrds.png'},
            { alias:'vertical_bar_10yrds_inactive', src: './assets/Gameplay/Bars/power_bar_10yrds_inactive.png'},
            { alias:'vertical_bar_20yrds_active', src: './assets/Gameplay/Bars/power_bar_20yrds.png'},
            { alias:'vertical_bar_20yrds_inactive', src: './assets/Gameplay/Bars/power_bar_20yrds_inactive.png'},
            { alias:'vertical_bar_30yrds_active', src: './assets/Gameplay/Bars/power_bar_30yrds.png'},
            { alias:'vertical_bar_30yrds_inactive', src: './assets/Gameplay/Bars/power_bar_30yrds_inactive.png'},
            { alias:'vertical_bar_40yrds_active', src: './assets/Gameplay/Bars/power_bar_40yrds.png'},
            { alias:'vertical_bar_40yrds_inactive', src: './assets/Gameplay/Bars/power_bar_40yrds_inactive.png'},
            { alias:'vertical_bar_50yrds_active', src: './assets/Gameplay/Bars/power_bar_50yrds.png'},
            { alias:'vertical_bar_50yrds_inactive', src: './assets/Gameplay/Bars/power_bar_50yrds_inactive.png'},
        
            // sound
            { alias:'crowd_ambient', src: './assets/sound/crowd_ambient.wav'},
            { alias:'crowd_cheer', src: './assets/sound/crowd_cheer.wav'},
            { alias:'goal_fail', src: './assets/sound/goal_fail.wav'},
            { alias:'goal_success', src: './assets/sound/goal_success.wav'},
            { alias:'kick_heavy', src: './assets/sound/kick_heavy.wav'},
            { alias:'kick_light', src: './assets/sound/kick_light.wav'},

            // fonts
            { alias:'OpenSans-BoldItalic', src: './assets/fonts/OpenSans-BoldItalic.ttf'},
            { alias:'OpenSans-ExtraBold', src: './assets/fonts/OpenSans-ExtraBold.ttf'},
            { alias:'OpenSans-Bold', src: './assets/fonts/OpenSans-Bold.ttf'},
            { alias:'OpenSans-Italic', src: './assets/fonts/OpenSans-Italic.ttf'},
        ];
        
        for (let i = 0; i < 14; i++) {
            const val = i < 10 ? `0${i}` : i;
            assets.push({alias: `crowd_lower_01000${val}`, src: `./assets/Gameplay/crowd/crowd_lower_01_1125x2436_000${val}.png`});
        }
        for (let i = 0; i < 14; i++) {
            const val = i < 10 ? `0${i}` : i;
            assets.push({alias: `yard_ring_000${val}`, src: `./assets/Gameplay/yard_ring/yard_ring_000${val}.png`});
        }
        for (let i = 0; i < 9; i++) {
            const val = i < 10 ? `0${i}` : i;
            assets.push({alias: `goal_fail_000${val}`, src: `./assets/Gameplay/goal_post/goal_fail/goal_post_fail_000${val}.png`});
        }
        for (let i = 0; i < 30; i++) {
            const val = i < 10 ? `0${i}` : i;
            assets.push({alias: `goal_success_000${val}`, src: `./assets/Gameplay/goal_post/goal_success/goal_success_000${val}.png`});
        }
        for (let i = 0; i < 12; i++) {
            const val = i < 10 ? `0${i}` : i;
            assets.push({alias: `btn_yards_${val}`, src: `./assets/Gameplay/btn_yards/btn_yards_000${val}.png`});
        }
        
        await Assets.addBundle('main', assets);
        await Assets.loadBundle('main');

        this.init();
    }

    async init() {

        this.initialization = true;
        // this.app = new PIXI.Application({ 
        //     width: this.baseWidth,
        //     height: this.baseHeight, 
        //     antialias: true});
        // document.body.appendChild(this.app.view);

        this.app = new Application();
        await this.app.init({
            width: this.baseWidth,
            height: this.baseHeight,
            backgroundColor: 0x0070e7
        });
        // document.getElementById('game').appendChild(this.app.canvas);
        // document.body.appendChild(this.app.canvas);

        globalThis.__PIXI_APP__ = this.app;

        const div = document.createElement('div');

        if(this.isMobile) {
            const ratio = +(300 / 540).toFixed(2);
            div.style.width = `${document.documentElement.clientHeight * ratio}px`;
            div.style.height = `${document.documentElement.clientHeight}px`;
            document.body.style.background = `#000000`;
            const clientWidth = document.documentElement.clientHeight * ratio;
            const clientHeight = document.documentElement.clientHeight;
            const screenProportions = clientHeight / clientWidth;
            this.screenHeight = this.baseWidth * screenProportions;
            this.shift = (this.baseHeight - this.screenHeight) / 2;
            this.width = document.documentElement.clientHeight * ratio;
            this.height = document.documentElement.clientHeight;
        } else {
            div.style.width = `${this.width}px`;
            div.style.height = `${this.height}px`;
            const clientWidth = this.width;
            const clientHeight = this.height;
            const screenProportions = clientHeight / clientWidth;
            this.screenHeight = this.baseWidth * screenProportions;
            this.shift = (this.baseHeight - this.screenHeight) / 2;
        }

        div.style.position = 'relative';
        document.body.append(div);
        div.appendChild(this.app.canvas);
        // document.body.append(div);
        // div.append(this.app.view);

        // const canvas = document.getElementsByTagName("canvas");
        // canvas[0].style.position = "absolute";
        // canvas[0].style.transform = "translate(-50%, 0)";
        // canvas[0].style.top = "0";
        // canvas[0].style.left = "50%";
        // canvas[0].style.maxHeight = "unset";
        // canvas[0].style.maxWidth = "100%";

        // this.defineScreenSize();
        
        this.mainContainer.name = 'mainContainer';
        this.app.stage.addChild(this.mainContainer);
        sound.muteAll();
        this.game = new MainScene({
            game: this,
            container: this.mainContainer,
        });

        window.onblur = () => {
            if(this.game && this.game.gameInit) {
                sound.stop('crowd_ambient');
            }
        };
        window.onfocus = () => {
            if(this.game && this.game.gameInit) {
                sound.play('crowd_ambient', { loop: true });
            }
        };
    }

    defineScreenSize() {
        const { clientWidth } = document.documentElement;
        const clientHeight = window.innerHeight;
        const assetsProportion = this.height / this.width;
        const screenProportions = clientHeight / clientWidth;
        // debugger;
        if (clientWidth <= 1024 /* 414 */ && Math.abs(assetsProportion - screenProportions) > 0.1) { // proportions are different
            this.screenHeight = this.width * screenProportions;
            // if (gameData.positionLayout === 'bottom') {
            //     settings.shift = (this.height - this.screenHeight);
            //     const canvas = document.getElementsByTagName('canvas');
            //     canvas[0].style.position = 'fixed';
            //     canvas[0].style.bottom = '0';
            //     canvas[0].style.transform = 'translate(-50%, 0)';
            //     canvas[0].style.top = 'unset';
            // } else settings.shift = (this.height - this.screenHeight) / 2;
            settings.shift = (this.height - this.screenHeight) / 2;
        } else if (clientHeight > 812) {
            const height = clientHeight * window.devicePixelRatio; // multiply by devisePixel Ratio iPoneX - default
            this.screenHeight = clientWidth * screenProportions * window.devicePixelRatio; // multiply by devisePixel Ratio iPoneX - default
            const screenHH = clientWidth * assetsProportion * window.devicePixelRatio; // multiply by devisePixel Ratio iPoneX - default

            // if (gameData.positionLayout === 'bottom') {
            //     settings.shift = (screenHH - height) - 10;
            //     const canvas = document.getElementsByTagName('canvas');
            //     canvas[0].style.position = 'fixed';
            //     canvas[0].style.bottom = '0';
            //     canvas[0].style.transform = 'translate(-50%, 0)';
            //     canvas[0].style.top = 'unset';
            // } else settings.shift = Math.abs((screenHH - height) / 2) - 10;
            settings.shift = Math.abs((screenHH - height) / 2) - 10;
            settings.outsideShift = settings.shift * 2;
        } else {
            this.screenHeight = this.height;
        }
        this.screenWidth = this.width;
        settings.screenHeight = this.screenHeight;
    }

    destroyGame() {
        console.log('destroyGame');
        sound.stopAll();
        this.mainContainer.destroy();
        this.app.destroy(true);

        this.game = null;
        this.initialization = false;
    }

    getPlayerValue() {
        return this.game.getPlayerValue();
    }

    // checkSize() {
    //     let scaleScene = 1;
    //     if (this.width < 380) scaleScene = 0.8;

    //     return scaleScene;
    // }
}