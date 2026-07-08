import { GameObject } from "../core/GameObject.js";
import {
    createRng,
    watercolorFill,
    sketchStroke
} from "../render/SketchStyle.js";


export class Rock extends GameObject {


    constructor(options = {}) {


        super({

            ...options,

            name: "Rock",

            type: "rock",

            width: 60,

            height: 50

        });


    }




    drawObject(ctx) {


        const rng =
            createRng(this.id);



        const basePoints = [

            { x: -30, y: 20 },

            { x: -20, y: -10 },

            { x: 10, y: -25 },

            { x: 30, y: 5 },

            { x: 20, y: 25 }

        ];


        const points =
            basePoints.map(p => ({

                x: p.x + (rng() - 0.5) * 4,

                y: p.y + (rng() - 0.5) * 4

            }));



        watercolorFill(ctx, points, "#9b9285", rng, {

            layers: 3,

            alpha: 0.4

        });



        // sombreado tipo rayado cruzado en un lado de la roca

        ctx.save();

        ctx.beginPath();

        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {

            ctx.lineTo(points[i].x, points[i].y);

        }

        ctx.closePath();

        ctx.clip();


        ctx.strokeStyle = "rgba(70,64,55,0.25)";

        ctx.lineWidth = 1;


        for (let x = -10; x < 30; x += 5) {

            ctx.beginPath();

            ctx.moveTo(x, -25);

            ctx.lineTo(x - 12, 25);

            ctx.stroke();

        }


        ctx.restore();



        sketchStroke(ctx, points, rng, {

            closed: true,

            color: "#4d463c",

            width: 1.6,

            passes: 2

        });


    }


}
