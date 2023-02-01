import p5 from "p5";

import { Paddle } from "./Paddle";
import Court from "./Court";
import { Ball } from "./Ball";
import { BoundingBox } from "./Interfaces";
import Net from "./Net";

const sketch = (p5: p5) => {

    let court: Court;

    p5.setup = () => {
        court = new Court(p5);

        const boundingBox: BoundingBox = {
            width: court.width(),
            height: court.height()
        }

        const playerOne = new Paddle({
            boundingBox: boundingBox,
            startingPosition: {
                x: 0,
                y: 0
            },
            controls: {
                up: p5.unchar('W'),
                down: p5.unchar('S')
            },
            p5: p5
        });
        court.addPlayer(playerOne);

        const playerTwo = new Paddle({
            boundingBox: boundingBox,
            startingPosition: {
                x: court.width() - 20,
                y: 0
            },
            controls: {
                up: p5.UP_ARROW,
                down: p5.DOWN_ARROW
            },
            p5: p5
        });
        court.addPlayer(playerTwo);

        court.addBall(new Ball({
            boundingBox: boundingBox,
            p5: p5,
            awareOf: {
                playerOne: playerOne,
                playerTwo: playerTwo
            }
        }));

        court.addNet(new Net(p5));
    };


    p5.draw = () => {
        court.render();
    };
};

new p5(sketch);
