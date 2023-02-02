import p5 from "p5";
import { Ball } from "./Ball";

import { Drawable } from "./Interfaces";
import Net from "./Net";
import { Paddle } from "./Paddle";
import ScoreKeeper from "./ScoreKeeper";

export default class Court {

    private _p5: p5;

    private _height: number;
    private _width: number;
    private _canvas: p5.Renderer;

    private _shapes: Drawable[] = [];
    private _players: Paddle[] = [];

    private _scoreKeeper: ScoreKeeper;

    private _ball: Ball;

    constructor(p5: p5) {
        this._p5 = p5;
        this._height = window.innerHeight - 20;
        this._width = window.innerWidth - 20;

        this._canvas = p5.createCanvas(this._width, this._height);
        this._canvas.parent("app");
        this._p5.background("black");

        this._scoreKeeper = new ScoreKeeper(p5);
    }

    height(): number {
        return this._height;
    }

    width(): number {
        return this._width;
    }

    addBall(ball: Ball) {
        this._ball = ball;
        this._shapes.push(ball);
    }

    addPlayer(player: Paddle) {
        this._players.push(player);
        this._shapes.push(player)
    }

    render() {
        this._p5.clear(0, 0, 0, 0);
        this._shapes.forEach(s => s.draw());
        this.verifyBallCoordinates();
    }

    addNet(net: Net) {
        this._shapes.push(net);
    }

    private verifyBallCoordinates() {
        if (this.isBallCrossingLeftSide()) {
            this._scoreKeeper.addPlayerTwoScore();
            this._ball.reset();
        } 
        else if (this.isBallCrossingRightSide()) {
            this._scoreKeeper.addPlayerOneScore();
            this._ball.reset();
        }
    }

    private isBallCrossingLeftSide(): boolean {
        return this._ball.x() <= 0;
    }

    private isBallCrossingRightSide(): boolean {
        return this._ball.x() >= this._width - this._ball.width();
    }
}