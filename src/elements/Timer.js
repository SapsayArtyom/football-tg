import { Container, Text, sound } from "pixi.js";

export default class Timer extends Container {

    constructor(options) {
        super();

        this.name = 'timer';
        this.deadlineAt = options.deadlineAt;
        this.fontFamily = options.fontFamily || 'LuckiestGuy';
        this.fontSize = options.fontSize || 40;
        this.fontWeight = options.fontWeight || 'bold';
        this.strokeThickness = options.strokeThickness || 0;
        this.stroke = options.stroke || 'black';
        this.fontColor = options.fontColor || 0xffffff;
        // const beforeCounter = options.beforeCounter || false;

        this.time = -2;
        this.timeMinute = 0;
        this.countdownMinute = 0;
        this.countdownSec = 0;

        // this.createTimer();

        this.timer = new Text({text :`00:00`, 
            style: {
                fill: this.fontColor,
                fontSize: this.fontSize,
                fontFamily: this.fontFamily,
                fontWeight: this.fontWeight,
                strokeThickness: this.strokeThickness,
                stroke: this.stroke,
                letterSpacing: 3
            }});
        this.addChild(this.timer);
    }

    createTimer() {

        this.timer.style.fill = 0xff0000;
        this.timer.text = `00:0${Math.abs(this.time)}`;
        this.startTimer = setInterval(()=>{
            this.time++;
            this.updateTimer(this.time);
            if( this.time === 0 ) {
                // clearInterval(this.startTimer);
                this.removeStartTimer();
                this.countdownTimer();
            }
        }, 1000);
    }

    removeStartTimer() {

        clearInterval(this.startTimer);
    }

    updateTimer(time) {
        
        if (time === 60) {
            this.timeMinute++;
            this.time = 0;
        };
        const sec = Math.abs(this.time) < 10 ? `0${Math.abs(this.time)}` : `${Math.abs(this.time)}`;
        const minute = this.timeMinute < 10 ? `0${this.timeMinute}` : `${this.timeMinute}`;
        this.timer.text = `${minute}:${sec}`;
    }

    countdownTimer() {  
        this.downTimer = setInterval(()=>{
            const time = this.getTimeRemaining(this.deadlineAt);
            if(time.minutes >= 0 && time.seconds >= 0) {
                this.timer.style.fill = this.fontColor;
                const sec = time.seconds < 10 ? `0${time.seconds}` : `${time.seconds}`;
                const minute = time.minutes < 10 ? `0${time.minutes}` : `${time.minutes}`;
                this.timer.text = `${minute}:${sec}`;
            } else {
                this.timer.style.fill = this.fontColor;
                this.timer.text = `00:00`;
                this.removeTimer.bind(this)();
                // clearInterval(downTimer);
            }           
        }, 1000);
    }

    removeTimer() {
        clearInterval(this.downTimer);
        if(sound) sound.stopAll();
    }

    getTimeRemaining(endTime){
        var t = endTime * 1000 - new Date().getTime();
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor( t/(1000*60*60*24) );
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
}