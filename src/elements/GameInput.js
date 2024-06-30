import { Container, Text, Graphics, utils } from "pixi.js";

export default class GameInput extends Container {

    constructor(options) {
        
        super();

        this.options = options;
        this.game = options.game;
        this.fontFamily = options.fontFamily || 'Arial';
        this.fontSize = options.fontSize || 24;
        this.fontColor = options.fontColor || 0xffffff;
        this.fontWeight = options.fontWeight || 'normal';
        this.inputColor = options.inputColor || 0xffffff;
        this.inputFocusColor = options.inputFocusColor || 0xcccccc;
        this.borderColor = options.borderColor || 0xA8A8A8;
        this.borderWidth = options.borderWidth || 0;
        this.borderRadius = options.borderRadius || 0;

        this.ratioWidth = this.game.app.renderer.width / this.game.width;
        this.ratioHeight = this.game.app.renderer.height / this.game.height;

        this.createInput();
    }

    createInput() {       
  
        this.pixiObject = new Container();
        this.text = new Text({text :this.options.placeholder, 
            style: {
                fill: this.fontColor,
                fontSize: this.fontSize,
                fontFamily: this.fontFamily,
                fontWeight: this.fontWeight
            }});
        this.text.x = 5;
        this.background = new Graphics();
        this.background
            .stroke(this.borderWidth, this.borderColor)
            .drawRoundedRect(0,0,this.options.width * this.ratioWidth, this.options.height * this.ratioWidth, this.borderRadius)
            .fill(this.inputColor)
            .endFill();
        this.background.cacheAsBitmap = true;
        
        this.backgroundFocused = new Graphics();
        this.backgroundFocused
            .stroke(this.borderWidth, this.borderColor)
            .fill(this.inputFocusColor)
            .drawRoundedRect(0,0,this.options.width * this.ratioWidth, this.options.height * this.ratioWidth, this.borderRadius)
            .endFill();
        this.backgroundFocused.cacheAsBitmap = true;
        this.backgroundFocused.visible = false;
        
        this.domField = document.createElement("input");
        this.domField.type = "text";
        this.domField.style.position = "absolute";
        document.body.appendChild(this.domField);
        this.domField.style.width = `${this.options.width}px`;
        this.domField.style.height = `${this.options.height}px`;
        this.domField.style.top = 0;
        this.domField.style.left = 0;
        this.domField.style.opacity = 1;
        this.domField.style.fontSize = this.options.fontSize + 'px';
        this.domField.style.fontFamily = this.fontFamily;
        this.domField.style.textAlign = 'center';
        this.domField.style.border = '1px solid #A8A8A8';
        this.domField.style.background = '#000000';
        this.domField.style.color = utils.hex2string(this.fontColor);
        this.domField.zIndex = -1;
        
        this.focused = false;
        
        this.pixiObject.addChild(this.background);
        this.pixiObject.addChild(this.backgroundFocused);
        // this.pixiObject.addChild(this.text);
        
        this.background.interactive = true;
        this.backgroundFocused.interactive = true;
        this.pixiObject.interactive = true;
        
        this.maskPixiObject = new Graphics();
        this.maskPixiObject
            .fill(0xff00ff, 0.2)
            .drawRoundedRect(0, 0, this.options.width, this.options.height, this.borderRadius);
        
        // this.pixiObject.mask = this.maskPixiObject;
        // this.pixiObject.addChild(this.maskPixiObject);
        
        var _this = this;
        
        function click() {
            _this.domField.focus();
        }
        function onFocus() {
            _this.backgroundFocused.visible = true;
            _this.domField.style.background = '#282727';
            // if(_this.text.text === 'First name') _this.text.text = '';
        }
        function onBlur() {
            _this.backgroundFocused.visible = false;
            _this.domField.style.background = '#000000';
            // if(_this.text.text === '') _this.text.text = 'First name';
        }
        
        this.background.mousedown = click;
        this.background.touchstart = click;
        
        _this.domField.onfocus = onFocus;
        _this.domField.onblur = onBlur;
        
        _this.domField.onkeyup = function() {
            _this.text.text = _this.domField.value;
        };
        _this.domField.onkeydown = function() {
            _this.text.text = _this.domField.value;
        };
    }

    setInactive() {
        this.domField.disabled = true;
    }

    setPosition(x, y) {
        const canvas = document.getElementsByTagName('canvas')[0];
        // this.domField.style.top = canvas.offsetTop + y / this.ratioWidth + 'px';
        // this.domField.style.left = canvas.offsetLeft - (this.game.width / 2) + x / this.ratioWidth + 'px';
        const div = document.getElementsByTagName('canvas')[0];
        this.domField.style.top = div.getBoundingClientRect().y + y / this.ratioWidth + 'px';
        this.domField.style.left = div.getBoundingClientRect().x + x / this.ratioWidth + 'px';
    }

    checkLength() {
        const el = this.text.text.split('');
        let word = '';
        this.text.text = word;
        el.forEach((item)=>{

            if( this.text.width < this.options.width-60) {
                word = word + item;
                this.text.text = word;
                
            } else {
                this.text.text = word + '...';
            }
        });
    }

    drawInput(scale) {
        this.domField.style.width = `${this.options.width * scale}px`;
        this.domField.style.height = `${this.options.height * scale}px`;        
    }
}