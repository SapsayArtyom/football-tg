import { Container, Sprite } from "pixi.js";

import AnimationFrame from "../elements/AnimationFrame";


export default class Goal extends Container {

    constructor(options) {

        super();

        this.widthGoal = options.width;

        this.createGoal();
    }

    createGoal() {
        this.goal = Sprite.from('goal');
        const scGoal = this.widthGoal / this.goal.width;
        this.goal.scale.set(scGoal);
        this.goal.anchor.set(0.5);
        this.addChild(this.goal);
    }

    // createAnim() {
    //     this.animRing = new AnimationFrame({
    //         nameFrame: 'yard_ring_000',
    //         countFrame: 14
    //     });
    //     this.animRing.speed = 0.2;
    //     const scRing = 120 / this.animRing.width;
    //     this.animRing.scale.set(scRing);
    //     this.addChild(this.animRing);
    // }

    goalSuccess() {
        this.goal.alpha = 0;
        const animRing = new AnimationFrame({
            nameFrame: 'goal_success_000',
            countFrame: 30
        });
        animRing.speed = 1;
        // animRing.play();
        const scGoal = this.widthGoal / animRing.width;
        animRing.scale.set(scGoal);
        animRing.playCounter(3, false, ()=>{this.goal.alpha = 1;});
        this.addChild(animRing);
    }

    goalFail() {
        this.goal.alpha = 0;
        const animRing = new AnimationFrame({
            nameFrame: 'goal_fail_000',
            countFrame: 9
        });
        const scGoal = this.widthGoal / animRing.width;
        animRing.scale.set(scGoal);
        animRing.speed = 0.3;
        animRing.playCounter(3, false, ()=>{this.goal.alpha = 1;});
        // animRing.play();
        this.addChild(animRing);
    }
}