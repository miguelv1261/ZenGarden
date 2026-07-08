import { Plant } from "./Plant.js";
import {
    createRng,
    blobPoints,
    wobbleLinePoints,
    watercolorFill,
    sketchStroke
} from "../render/SketchStyle.js";


export class Flower extends Plant {


    constructor(options = {}) {


        super({

            ...options,

            name: "Flower",

            type: "flower",

            width: 30,

            height: 40

        });


        this.color =
            options.color ??
            "#d9829b";


    }





    serialize() {


        return {

            ...super.serialize(),

            color: this.color

        };


    }




    drawObject(ctx) {


        const rng =
            createRng(this.id);



        const stem =
            wobbleLinePoints(rng, 0, 20, 0, -14, { segments: 4, amount: 2 });


        sketchStroke(ctx, stem, rng, {

            color: "#4c7340",

            width: 2,

            passes: 2

        });



        for (let i = 0; i < 5; i++) {


            const angle =
                i * Math.PI * 2 / 5 + rng() * 0.2;


            const petalX =
                Math.cos(angle) * 9;

            const petalY =
                -15 + Math.sin(angle) * 9;


            ctx.save();

            ctx.translate(petalX, petalY);


            const points =
                blobPoints(rng, 6.5, { segments: 9, irregularity: 0.3 });


            watercolorFill(ctx, points, this.color, rng, {

                layers: 2,

                alpha: 0.5

            });


            ctx.restore();


        }



        // centro de la flor

        ctx.beginPath();

        ctx.fillStyle = "#f2c94c";

        ctx.arc(0, -15, 3, 0, Math.PI * 2);

        ctx.fill();


    }



}