// ============================================================================
// Silence Engine
// PlantTool.js
// Garden of Silence
// ============================================================================

import { ObjectFactory }
    from "../factory/ObjectFactory.js";


export class PlantTool {


    constructor(engine, type = "plant") {


        this.engine = engine;


        this.type = type;


        this.name =
            "plant";


    }





    enter() {



    }





    exit() {



    }





    update() {



    }





    mouseDown() {


        const world =
            this.engine.input.getMouseWorld();



        const object =
            ObjectFactory.create(

                this.type,

                {

                    x: world.x,

                    y: world.y

                }

            );



        if (object) {


            this.engine.world.add(
                object
            );


        }



    }





    mouseMove() {



    }





    mouseUp() {



    }



}