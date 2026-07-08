import { GameObject } from "../core/GameObject.js";


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



        ctx.fillStyle =
            "#8d877c";



        ctx.beginPath();


        ctx.moveTo(-30, 20);


        ctx.lineTo(-20, -10);


        ctx.lineTo(10, -25);


        ctx.lineTo(30, 5);


        ctx.lineTo(20, 25);


        ctx.closePath();


        ctx.fill();



    }


}