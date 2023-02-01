import p5 from "p5";

export default class ScoreKeeper {

    private _p5: p5;

    private _playerOneScore: number;
    private _playerTwoScore: number;

    private _playerOneScoreBox: p5.Element;
    private _playerTwoScoreBox: p5.Element;

    constructor(p5: p5) {
        this._p5 = p5;
        this._playerOneScore = 0;
        this._playerTwoScore = 0;

        this._playerOneScoreBox = this.createScoreBox(1);
        this._playerTwoScoreBox = this.createScoreBox(3);
    }

    private createScoreBox(offset: number) {
        const div = this._p5.createDiv('00');
        div.position((this._p5.width / 4) * offset, 20);
        div.addClass('scorebox');
        return div;
    }

    addPlayerOneScore() {
        this._playerOneScoreBox.html(this.scoreToString(++this._playerOneScore));
    }

    addPlayerTwoScore() {
        this._playerTwoScoreBox.html(this.scoreToString(++this._playerTwoScore));
    }

    private scoreToString(score: number): string {
        if (score <= 9) {
            return `0${score}`;
        }
        return score.toString();
    }
}