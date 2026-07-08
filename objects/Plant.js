import { GameObject } from "../core/GameObject.js";
import {
    createRng,
    blobPoints,
    wobbleLinePoints,
    watercolorFill,
    sketchStroke
} from "../render/SketchStyle.js";


export class Plant extends GameObject {


    constructor(options = {}) {


        super({

            name: "Plant",

            type: "plant",

            width: 40,

            height: 40,

            ...options

        });



        this.growth = 0;


        this.maxGrowth = 100;


        this.water = 100;


    }





    update(delta) {


        super.update(delta);



        if (this.water > 0) {


            this.growth += delta * 2;


            this.water -= delta * 0.5;


        }


        if (this.growth > this.maxGrowth) {


            this.growth =
                this.maxGrowth;


        }


    }





    drawObject(ctx) {


        const rng =
            createRng(this.id);


        const size =
            10 +
            (this.growth / 100) * 20;



        // tallo

        const stem =
            wobbleLinePoints(rng, 0, 20, 0, -size, { segments: 4, amount: 1.6 });


        sketchStroke(ctx, stem, rng, {

            color: "#4a6b3c",

            width: 2,

            passes: 2

        });



        // hojas

        const leaves = [

            [-8, -size / 2],

            [8, -size / 1.5]

        ];


        leaves.forEach(([lx, ly]) => {


            ctx.save();

            ctx.translate(lx, ly);


            const points =
                blobPoints(rng, 7, { segments: 8, irregularity: 0.3 });


            watercolorFill(ctx, points, "#78a85c", rng, {

                layers: 2,

                alpha: 0.45

            });


            ctx.restore();


        });


    }



}