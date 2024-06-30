import { Assets } from 'pixi.js';

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
];

function createAssets() {        

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
}

createAssets();

export const bundle = Assets.addBundle('main', assets);
