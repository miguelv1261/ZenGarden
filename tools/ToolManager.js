// ============================================================================
// Silence Engine
// ToolManager.js
// Garden of Silence
// Commit #3
// ============================================================================


export class ToolManager {


    constructor(engine) {


        this.engine = engine;


        this.currentTool = null;


        this.tools = {};



    }





    register(name, tool) {


        this.tools[name] = tool;


        tool.manager = this;



    }





    activate(name) {


        if (this.currentTool) {


            this.currentTool.exit();


        }



        const tool =
            this.tools[name];



        if (!tool) {

            console.warn(
                "Herramienta no encontrada:",
                name
            );

            return;

        }



        this.currentTool = tool;


        tool.enter();



    }





    update(delta) {


        if (this.currentTool) {


            this.currentTool.update(delta);


        }


    }





    mouseDown(event) {


        if (this.currentTool) {


            this.currentTool.mouseDown(event);


        }


    }





    mouseMove(event) {


        if (this.currentTool) {


            this.currentTool.mouseMove(event);


        }


    }





    mouseUp(event) {


        if (this.currentTool) {


            this.currentTool.mouseUp(event);


        }


    }




    doubleClick(event) {


        if (this.currentTool && this.currentTool.doubleClick) {


            this.currentTool.doubleClick(event);


        }


    }





}