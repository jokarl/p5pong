import p5 from "p5";

import { BoundingBox, Shape } from "./Interfaces";
import { Paddle } from "./Paddle";
import ScoreKeeper from "./ScoreKeeper";

export interface BallConfig {
    boundingBox: BoundingBox;
    p5: p5;
    awareOf: {
        playerOne: Paddle
        playerTwo: Paddle
    }
}

export class Ball implements Shape {

    private _maxSpeed: number = 12;
    private _minSpeed: number = 6;

    private _p5: p5;

    private _courtWidth: number;
    private _courtHeight: number;

    private _x: number;
    private _y: number;
    private _size: number;

    private _speedX: number;
    private _speedY: number;

    private _awareOf: { playerOne: Paddle; playerTwo: Paddle; };

    constructor(config: BallConfig) {
        this._p5 = config.p5;

        this._courtWidth = config.boundingBox.width;
        this._courtHeight = config.boundingBox.height;

        this._size = (this._courtWidth * this._courtHeight) / 100000;

        this._awareOf = config.awareOf;

        this.reset();
    }

    draw(): void {
        const p5 = this._p5;
        p5.push();

        this._x += this._speedX;
        this._y += this._speedY;

        if (this.isTouchingPlayerOnePaddle()) {
            console.log("Touching player one paddle")
            this.reverseHorizontalDirection();
        }

        if (this.isTouchingPlayerTwoPaddle()) {
            console.log("Touching player two paddle")
            this.reverseHorizontalDirection();
        }

        if (this.isTouchingUpperBound()) {
            console.log(`Touching upper at ${this._x},${this._y} with speed ${this._speedX},${this._speedY}`);
            this.reverseVerticalDirection();
        }

        if (this.isTouchingLowerBound()) {
            console.log(`Touching lower at ${this._x},${this._y} with speed ${this._speedX},${this._speedY}`);
            this.reverseVerticalDirection();
        }

        // console.log(`Ball: ${this._x},${this._y}`)
        p5.translate(p5.createVector(this._x, this._y));
        p5.noStroke();
        p5.fill("white");
        p5.square(0, 0, this._size);
        p5.pop();
    }

    private isTouchingPlayerOnePaddle(): boolean {
        const paddleHeightEndsAt = this._awareOf.playerOne.y() + this._awareOf.playerOne.height();
        const paddleWidthEndsAt = this._awareOf.playerOne.x() + this._awareOf.playerOne.width();
        
        const verticalMatch = this._y >= this._awareOf.playerOne.y() && this._y <= paddleHeightEndsAt;
        const horizontalMatch = this._x <= paddleWidthEndsAt - Math.abs(this._speedX)

        if (verticalMatch && horizontalMatch) {
            // Ball at 11,287 with speed -8,5 touched paddle that spanned 0,250 to 20,330
            console.log(`Ball at ${this._x},${this._y} with speed ${this._speedX},${this._speedY} touched paddle that spanned ${this._awareOf.playerOne.x()},${this._awareOf.playerOne.y()} to ${paddleWidthEndsAt},${paddleHeightEndsAt}`)
        }

        return verticalMatch && horizontalMatch;
    }

    private isTouchingPlayerTwoPaddle(): boolean {
        const paddleHeightEndsAt = this._awareOf.playerTwo.y() + this._awareOf.playerTwo.height();
        const paddleWidthEndsAt = this._awareOf.playerTwo.x();
        
        const verticalMatch = this._y >= this._awareOf.playerTwo.y() && this._y <= paddleHeightEndsAt;
        const horizontalMatch = this._x + Math.abs(this._speedX) >= paddleWidthEndsAt;

        if (verticalMatch && horizontalMatch) {
            // Ball at 11,287 with speed -8,5 touched paddle that spanned 0,250 to 20,330
            console.log(`Ball at ${this._x},${this._y} with speed ${this._speedX},${this._speedY} touched paddle that spanned ${this._awareOf.playerOne.x()},${this._awareOf.playerOne.y()} to ${paddleWidthEndsAt},${paddleHeightEndsAt}`)
        }

        return verticalMatch && horizontalMatch;
    }

    private reverseVerticalDirection() {
        this._speedY = this._speedY * -1;
        this._y += this._speedY;
    }

    private reverseHorizontalDirection() {
        this._speedX = this._speedX * -1;
        this._x += this._speedX;
    }

    private isTouchingLowerBound(): boolean {
        return this._y >= this._courtHeight - this._size;
    }

    private isTouchingUpperBound(): boolean {
        return this._y <= 0;
    }

    reset(): void {
        // Start in the middle (approximately)
        this._x = Math.floor(this._courtWidth / 2);
        this._y = Math.floor(this._courtHeight / 2);

        // Randomize speed and direction
        this._speedX = Math.ceil((this.randomSpeed() * this.randomDirection() / 10) * 10);
        this._speedY = Math.ceil((this.randomSpeed() * this.randomDirection() / 10) * 10);
        console.log(`Ball has vector ${this._speedX},${this._speedY}`);
    }

    private randomSpeed(): number {
        return Math.random() * (this._maxSpeed - this._minSpeed) + this._minSpeed;
    }

    private randomDirection(): number {
        // Randomly returns +/- 1
        return Math.round(Math.random()) * 2 - 1;
    }

    public x(): number {
		return this._x;
	}

	public y(): number {
		return this._y;
	}

    public width(): number {
		return this._size;
	}

	public height(): number {
		return this._size;
	}
}