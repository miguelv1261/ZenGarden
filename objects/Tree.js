import { Plant } from "./Plant.js";


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



        // sombra

        ctx.fillStyle =
            "rgba(0,0,0,.15)";


        ctx.beginPath();


        ctx.ellipse(

            0,

            50,

            45,

            12,

            0,

            0,

            Math.PI * 2

        );


        ctx.fill();




        // tronco

        ctx.fillStyle =
            "#795548";


        ctx.fillRect(

            -10,

            0,

            20,

            50

        );




        // copa

        ctx.fillStyle =
            "#6f9e5c";



        ctx.beginPath();


        ctx.arc(

            0,

            -20,

            45,

            0,

            Math.PI * 2

        );


        ctx.fill();



    }


}