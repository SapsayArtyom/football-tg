import { Container, Sprite, Texture } from "pixi.js";
// import sound from 'pixi-sound';
import { sound } from '@pixi/sound';

export default class SoundManager extends Container {

    constructor(option) {
        super();

        this.widthIcon = option.width;

        this.flag = option.flag;

        this.createButton();
    }

    createButton() {
        this.soundIcon = Sprite.from(`icon_sound_${this.flag}`);
        const k = this.widthIcon / this.soundIcon.width;
        this.soundIcon.width = this.widthIcon;
        this.soundIcon.height = this.soundIcon.height * k;
        this.addChild(this.soundIcon);

        this.soundIcon.interactive = true;
        this.soundIcon.buttonMode = true;
        this.soundIcon.on('pointerup', () => {
            
            if(this.flag === 'on') this.flag = 'off';
            else this.flag = 'on';

            this.soundIcon.texture = Texture.from(`icon_sound_${this.flag}`);            
            sound.toggleMuteAll();
        });
    }
}