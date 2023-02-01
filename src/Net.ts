import p5 from "p5";

import { Drawable } from "./Interfaces";

export default class Net implements Drawable {

    private _p5: p5;

    constructor(p5: p5) {
        this._p5 = p5;
    }

    draw(): void {
        this._p5.push();
        this._p5.strokeWeight(3);
        this._p5.drawingContext.setLineDash([10]);
        this._p5.stroke(this._p5.color(255));
        this._p5.line(this._p5.width / 2, this._p5.height, this._p5.width / 2, 0)
        this._p5.pop();
    }

}