// ============================================================================
// Silence Engine
// main.js
// Garden of Silence
// Version 0.2 Alpha
// ============================================================================

import { Engine } from "../core/Engine.js";



class GardenOfSilence {


    constructor() {


        this.engine = null;


    }





    //==========================================================================
    // INICIAR APLICACIÓN
    //==========================================================================

    start() {


        const canvas =
            document.getElementById(
                "gameCanvas"
            );



        if (!canvas) {


            console.error(
                "Canvas gameCanvas no encontrado"
            );


            return;


        }





        this.engine =
            new Engine(canvas);



        this.engine.start();
        this.bindTools();


        console.log(

            "🌿 Garden of Silence iniciado"

        );


    }





    //==========================================================================
    // CONECTAR BOTONES DE HERRAMIENTAS
    //==========================================================================

    bindTools() {


        const buttons =
            document.querySelectorAll(
                "#leftPanel button[data-tool]"
            );


        buttons.forEach(button => {


            button.addEventListener(
                "click",
                () => {


                    const tool =
                        button.dataset.tool;


                    this.engine.tools.activate(tool);


                    buttons.forEach(b =>
                        b.classList.remove("active")
                    );


                    button.classList.add("active");


                }
            );


        });


    }




    //==========================================================================
    // ACCESO AL MOTOR
    //==========================================================================

    getEngine() {


        return this.engine;


    }


}





// ============================================================================
// BOOT
// ============================================================================

window.addEventListener(

    "DOMContentLoaded",

    () => {


        window.Garden =
            new GardenOfSilence();



        window.Garden.start();


    }

);