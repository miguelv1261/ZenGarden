import { Plant } from "./Plant.js";


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





    drawObject(ctx) {



        ctx.strokeStyle =
            "#56834a";


        ctx.beginPath();


        ctx.moveTo(0, 20);


        ctx.lineTo(0, -15);


        ctx.stroke();




        ctx.fillStyle =
            this.color;



        for (let i = 0; i < 5; i++) {


            let angle =
                i * Math.PI * 2 / 5;



            ctx.beginPath();


            ctx.arc(

                Math.cos(angle) * 10,

                -15 +
                Math.sin(angle) * 10,

                7,

                0,

                Math.PI * 2

            );


            ctx.fill();


        }


    }



}