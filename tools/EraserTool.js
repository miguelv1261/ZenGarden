// ============================================================================
// Silence Engine
// EraserTool.js
// Garden of Silence
// ============================================================================


export class EraserTool {


    constructor(engine) {


        this.engine = engine;


        this.name =
            "eraser";


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
            this.engine.world.getObjectAt(

                world.x,

                world.y

            );



        if (object) {


            this.engine.world.remove(
                object
            );


        }


    }





    mouseMove() {



    }





    mouseUp() {



    }


}