import { GameObject } from "../core/GameObject.js";


export class Plant extends GameObject {


    constructor(options = {}) {


        super({

            ...options,

            name: "Plant",

            type: "plant",

            width: 40,

            height: 40

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



        const size =
            10 +
            (this.growth / 100) * 20;



        // tallo

        ctx.strokeStyle =
            "#557a45";


        ctx.lineWidth =
            4;



        ctx.beginPath();


        ctx.moveTo(0, 20);


        ctx.lineTo(0, -size);


        ctx.stroke();





        // hojas

        ctx.fillStyle =
            "#78a85c";



        ctx.beginPath();


        ctx.arc(

            -8,

            -size / 2,

            8,

            0,

            Math.PI * 2

        );


        ctx.fill();




        ctx.beginPath();


        ctx.arc(

            8,

            -size / 1.5,

            8,

            0,

            Math.PI * 2

        );


        ctx.fill();



    }



}