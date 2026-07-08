// ============================================================================
// Silence Engine
// main.js
// Garden of Silence
// Version 0.2 Alpha
// ============================================================================

import { Engine } from "./core/Engine.js";



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