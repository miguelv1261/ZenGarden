// ============================================================================
// Silence Engine
// main.js
// Garden of Silence
// Version 0.2 Alpha
// ============================================================================

import { Engine } from "../core/Engine.js";
import { Inspector } from "../ui/Inspector.js";
import { Ambience } from "../audio/Ambience.js";


const SAVE_KEY = "zengarden-save";


class GardenOfSilence {


    constructor() {


        this.engine = null;


        this.inspector = null;


        this.ambience =
            new Ambience();


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

        this.inspector =
            new Inspector(this.engine);

        this.bindHeader();

        this.loadAutosave();


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
    // CONECTAR BOTONES DEL HEADER (Nuevo / Abrir / Guardar / Exportar)
    //==========================================================================

    bindHeader() {


        document.getElementById("btnNew")
            .addEventListener("click", () => {


                const confirmed =
                    confirm(
                        "¿Crear un jardín nuevo? Se perderá lo que no hayas guardado."
                    );


                if (confirmed) {

                    this.engine.world.clear();

                }


            });



        document.getElementById("btnSave")
            .addEventListener("click", () => {


                this.saveToStorage();


            });



        document.getElementById("btnOpen")
            .addEventListener("click", () => {


                const raw =
                    localStorage.getItem(SAVE_KEY);


                if (!raw) {

                    alert("Todavía no hay ningún jardín guardado.");

                    return;

                }


                this.engine.world.load(
                    JSON.parse(raw)
                );


            });



        document.getElementById("btnExport")
            .addEventListener("click", () => {


                this.exportPNG();


            });



        document.getElementById("btnSound")
            .addEventListener("click", async (event) => {


                const playing =
                    await this.ambience.toggle();


                event.currentTarget.textContent =
                    playing ? "🔊" : "🔇";


            });



        window.addEventListener(
            "beforeunload",
            () => this.saveToStorage()
        );


        setInterval(

            () => this.saveToStorage(),

            30000

        );


    }




    //==========================================================================
    // GUARDAR EN LOCALSTORAGE
    //==========================================================================

    saveToStorage() {


        localStorage.setItem(

            SAVE_KEY,

            JSON.stringify(
                this.engine.world.serialize()
            )

        );


    }




    //==========================================================================
    // AUTOCARGAR EL ÚLTIMO JARDÍN GUARDADO
    //==========================================================================

    loadAutosave() {


        const raw =
            localStorage.getItem(SAVE_KEY);


        if (!raw)
            return;


        try {


            this.engine.world.load(
                JSON.parse(raw)
            );


        } catch (error) {


            console.warn(
                "No se pudo restaurar el autoguardado",
                error
            );


        }


    }




    //==========================================================================
    // EXPORTAR EL JARDÍN COMO IMAGEN PNG
    //==========================================================================

    exportPNG() {


        const renderer =
            this.engine.renderer;


        const canvas =
            this.engine.canvas;


        const previousGrid =
            renderer.showGrid;

        const previousOrigin =
            renderer.showOrigin;


        renderer.showGrid = false;

        renderer.showOrigin = false;


        renderer.render(
            this.engine.world
        );


        canvas.toBlob(blob => {


            const url =
                URL.createObjectURL(blob);


            const link =
                document.createElement("a");


            link.href = url;

            link.download = "zen-garden.png";

            link.click();


            URL.revokeObjectURL(url);


            renderer.showGrid = previousGrid;

            renderer.showOrigin = previousOrigin;


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