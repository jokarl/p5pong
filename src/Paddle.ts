import p5 from "p5";

import { Shape, Coordinate, BoundingBox } from "./Interfaces"

export interface Controls {
	up: number
	down: number
}

export interface PaddleConfig {
	startingPosition: Coordinate;
	boundingBox: BoundingBox;
	controls: Controls
	p5: p5;
}

export class Paddle implements Shape {

	private readonly _speed: number = 10;

	private _p5: p5;

	private _x: number;
	private _y: number;

	private _courtWidth: number;
	private _courtHeight: number;

	private _height: number;
	private _width: number;

	private _controls: Controls;

	constructor(config: PaddleConfig) {
		this._p5 = config.p5;

		this._x = config.startingPosition.x;
		this._y = config.startingPosition.y;

		this._courtWidth = config.boundingBox.width;
		this._courtHeight = config.boundingBox.height;

		this._height = this.calculateHeight();
		this._width = this.calculateWidth();

		this._controls = config.controls;

		console.log(`Initiated paddle with WxH ${this._width}x${this._height} at position ${this._x},${this._y} with controls: ${JSON.stringify(config.controls)}`)
	}

	draw() {
		const p5 = this._p5;

		if (p5.keyIsDown(this._controls.down)) {
			const newYPosition = this._y + this._speed;
			if (newYPosition + this._height < this._courtHeight) {
				this._y = newYPosition;
			}
		}

		if (p5.keyIsDown(this._controls.up)) {
			const newYPosition = this._y - this._speed;
			if (newYPosition >= 0) {
				this._y = newYPosition;
			}
		}

		p5.push();

		p5.noStroke();
		p5.fill("white");
		p5.rect(
			this._x,
			this._y,
			this._width,
			this._height
		);

		p5.pop();
	}

	private calculateWidth(): number {
		return this.toClosestTen(this._courtWidth / 100);
	}

	private calculateHeight(): number {
		return this.toClosestTen((this._courtHeight / 100) * 10);
	}

	private toClosestTen(n: number): number {
		return Math.floor(n / 10) * 10;
	}

	public x(): number {
		return this._x;
	}

	public y(): number {
		return this._y;
	}

	public width(): number {
		return this._width;
	}

	public height(): number {
		return this._height;
	}
}