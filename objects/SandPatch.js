import { GameObject } from "../core/GameObject.js";


export class SandPatch extends GameObject {


    constructor(options = {}) {


        super({

            ...options,

            name: "Sand",

            type: "sand",

            width: 300,

            height: 200

        });


    }





    drawObject(ctx) {


        ctx.fillStyle =
            "#d8c28f";


        ctx.beginPath();


        ctx.ellipse(

            0,

            0,

            150,

            100,

            0,

            0,

            Math.PI * 2

        );


        ctx.fill();




        // líneas de arena

        ctx.strokeStyle =
            "#bfa875";


        ctx.lineWidth =
            2;



        for (let y = -60; y <= 60; y += 20) {


            ctx.beginPath();


            ctx.moveTo(-100, y);


            ctx.bezierCurveTo(

                -30,

                y - 10,

                30,

                y + 10,

                100,

                y

            );


            ctx.stroke();


        }



    }


}