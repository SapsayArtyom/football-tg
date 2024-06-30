import { Container, Graphics, Sprite } from "pixi.js"
import { EventEmitter } from "events";



export default class SliderH extends Container {

    get emitter() {
        return this._emitter;
    }

    constructor(options) {
        super();

        this.colorBack = options.colorBack || 0xffffff;
        this.colorBorder = options.colorBorder || 0xcccccc;
        this.colorFill = options.colorFill || 0xbbbb00;
        this.sliderWidth = options.sliderWidth || 100;
        this.sliderHeight = options.sliderHeight || 10;
        this.radiusBorder = options.radiusBorder || false;
        this.weightBorder = options.weightBorder || 0;
        this.radiusButton = options.radiusButton || 10;
        this.colorButton = options.colorButton || 0xccbbcc;
        this.colorButtonBorder = options.colorButtonBorder || 0xcccccc;
        this.minPercent = options.minPercent || 0;
        this.maxPercent = options.maxPercent || 30;
        this.sliderBtnRes = options.sliderBtnRes || 'btn_bar_tab';
        this.percent = this.maxPercent / 2;
        this.startPosition = this.getPosition(this.percent);
        this.value = this.getPercent(this.startPosition);

        this._emitter = new EventEmitter();

        this.createSlider();
        this.emitter.emit('drawSlider');
    }

    createSlider() {
        const sliderBack = new Graphics();
        sliderBack.name = 'sliderBack';

        if(this.radiusBorder) {
            sliderBack
                .stroke(this.weightBorder, this.colorBorder)
                .fill(this.colorBack, 1)
                .drawRoundedRect(0, 0, this.sliderWidth, this.sliderHeight, this.radiusBorder);
            this.addChild(sliderBack);
            
            this.sliderFill = new Graphics();
            this.sliderFill.name = 'this.sliderFill';
            this.sliderFill
                .fill(this.colorFill, 1)
                .drawRoundedRect(0, 0, this.startPosition, this.sliderHeight, this.radiusBorder);
            this.addChild(this.sliderFill);
        } else {
            sliderBack
                .stroke(this.weightBorder, this.colorBorder)
                .fill(this.colorBack, 1)
                .drawRoundedRect(0, 0, this.sliderWidth, this.sliderHeight, this.radiusBorder);
            this.addChild(sliderBack);
            
            this.sliderFill = new Graphics();
            this.sliderFill.name = 'this.sliderFill';
            this.sliderFill
                .fill(this.colorFill, 1)
                .drawRoundedRect(0, 0, this.startPosition, this.sliderHeight, this.radiusBorder);
            this.addChild(this.sliderFill);
        }
        

        this.sliderBtn = Sprite.from('btn_bar_tab');
        this.sliderBtn.name = 'this.sliderBtn';
        this.sliderBtn.anchor.set(0.5, 0);
        const scaleBtn = 40 / this.sliderBtn.width;
        this.sliderBtn.scale.set(scaleBtn, scaleBtn);
        this.sliderBtn.x = this.startPosition;
        this.sliderBtn.y = (sliderBack.height - this.sliderBtn.height) / 2;
        this.addChild(this.sliderBtn);

        sliderBack.interactive = true;
        sliderBack.buttonMode = true;
        sliderBack.on('pointerdown', (event) => {
            this.draw(event.data.getLocalPosition(sliderBack));
            sliderBack.on('pointermove', (event) => {
                this.draw(event.data.getLocalPosition(sliderBack))
            });
        });
        sliderBack.on('pointerup', (event) => {
            this.draw(event.data.getLocalPosition(sliderBack))
            sliderBack.off('pointermove');
        });
        sliderBack.on('pointerout', (event) => {
            sliderBack.off('pointermove');
        });
        sliderBack.on('mouseout', (event) => {
            sliderBack.off('pointermove');
        });
    }

    draw(point) {
        this.sliderBtn.x = point.x;

        this.sliderFill.clear();
        this.sliderFill
            .fill(this.colorFill, 1)
            .drawRoundedRect(0, 0, point.x, this.sliderHeight, this.radiusBorder);

        this.value = this.getPercent(point.x);
        this.emitter.emit('drawSlider');
    }

    getPercent(value) {
        let val = (this.maxPercent * value) / this.sliderWidth;
        if(val < this.minPercent) val = this.minPercent
        return val;
    }

    getPosition(value) {
        const pos = (this.sliderWidth * value) / this.maxPercent;
        return pos;
    }
}