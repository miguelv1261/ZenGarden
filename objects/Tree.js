import { Plant } from "./Plant.js";
import {
    createRng,
    blobPoints,
    wobbleLinePoints,
    watercolorFill,
    sketchStroke
} from "../render/SketchStyle.js";


export class Tree extends Plant {


    constructor(options = {}) {


        super({

            ...options,

            name: "Tree",

            type: "tree",

            width: 100,

            height: 120

        });


        this.growth = 100;


    }




    drawObject(ctx) {


        const rng =
            createRng(this.id);



        // sombra

        ctx.fillStyle =
            "rgba(0,0,0,.12)";


        ctx.beginPath();

        ctx.ellipse(0, 52, 42, 11, 0, 0, Math.PI * 2);

        ctx.fill();



        // tronco (trapecio ligeramente irregular, no un rectángulo perfecto)

        const trunkPoints = [

            { x: -11 + (rng() - 0.5) * 2, y: 50 + (rng() - 0.5) * 2 },

            { x: 11 + (rng() - 0.5) * 2, y: 50 + (rng() - 0.5) * 2 },

            { x: 6 + (rng() - 0.5) * 2, y: -4 + (rng() - 0.5) * 2 },

            { x: -6 + (rng() - 0.5) * 2, y: -4 + (rng() - 0.5) * 2 }

        ];


        ctx.fillStyle = "#8a6349";

        ctx.beginPath();

        ctx.moveTo(trunkPoints[0].x, trunkPoints[0].y);

        for (let i = 1; i < trunkPoints.length; i++) {

            ctx.lineTo(trunkPoints[i].x, trunkPoints[i].y);

        }

        ctx.closePath();

        ctx.fill();


        sketchStroke(ctx, trunkPoints, rng, {

            closed: true,

            color: "#5b4230",

            width: 1.6

        });



        // vetas del tronco

        const grain1 =
            wobbleLinePoints(rng, -3, 44, -1, 0, { segments: 3, amount: 2 });

        const grain2 =
            wobbleLinePoints(rng, 4, 40, 3, 2, { segments: 3, amount: 2 });


        sketchStroke(ctx, grain1, rng, { color: "#5b4230", width: 1, passes: 1 });

        sketchStroke(ctx, grain2, rng, { color: "#5b4230", width: 1, passes: 1 });



        // copa: manchas de acuarela superpuestas

        const canopyTones =
            ["#6f9e5c", "#5f8f4e", "#83b56d"];


        const centers = [

            { x: -12, y: -16, r: 30 },

            { x: 14, y: -18, r: 28 },

            { x: 0, y: -32, r: 30 }

        ];


        centers.forEach((c, i) => {

            ctx.save();

            ctx.translate(c.x, c.y);


            const points =
                blobPoints(rng, c.r, { segments: 12, irregularity: 0.3 });


            watercolorFill(

                ctx,

                points,

                canopyTones[i % canopyTones.length],

                rng,

                { layers: 3, alpha: 0.35 }

            );


            ctx.restore();


        });



        // contorno boceteado general de la copa

        ctx.save();

        ctx.translate(0, -24);


        const outline =
            blobPoints(rng, 38, { segments: 14, irregularity: 0.16 });


        sketchStroke(ctx, outline, rng, {

            closed: true,

            color: "#3f5c34",

            width: 1.4,

            passes: 2

        });


        ctx.restore();


    }


}
