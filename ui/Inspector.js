// ============================================================================
// Silence Engine
// Inspector.js
// Garden of Silence
// Panel de edición del objeto seleccionado
// ============================================================================

export class Inspector {


    constructor(engine) {


        this.engine = engine;


        this.panel =
            document.getElementById("inspector");

        this.title =
            document.getElementById("inspectorTitle");

        this.rotation =
            document.getElementById("inspRotation");

        this.scale =
            document.getElementById("inspScale");

        this.opacity =
            document.getElementById("inspOpacity");

        this.colorRow =
            document.getElementById("inspColorRow");

        this.color =
            document.getElementById("inspColor");

        this.duplicateBtn =
            document.getElementById("inspDuplicate");

        this.deleteBtn =
            document.getElementById("inspDelete");


        this.current = null;


        this.bind();


        engine.world.onSelectionChange =
            (object) => this.onSelect(object);


    }




    //==========================================================================
    // EVENTOS DE LOS CONTROLES
    //==========================================================================

    bind() {


        this.rotation.addEventListener("input", () => {

            if (!this.current) return;

            this.current.rotation =
                (parseFloat(this.rotation.value) * Math.PI) / 180;

        });


        this.scale.addEventListener("input", () => {

            if (!this.current) return;

            this.current.scale =
                parseFloat(this.scale.value);

        });


        this.opacity.addEventListener("input", () => {

            if (!this.current) return;

            this.current.opacity =
                parseFloat(this.opacity.value);

        });


        this.color.addEventListener("input", () => {

            if (!this.current) return;

            if ("color" in this.current) {

                this.current.color =
                    this.color.value;

            }

        });


        this.duplicateBtn.addEventListener("click", () => {

            this.engine.duplicateSelected();

        });


        this.deleteBtn.addEventListener("click", () => {

            this.engine.deleteSelected();

        });


    }




    //==========================================================================
    // SINCRONIZAR PANEL CON EL OBJETO SELECCIONADO
    //==========================================================================

    onSelect(object) {


        this.current = object;


        if (!object) {

            this.panel.classList.add("hidden");

            return;

        }


        this.panel.classList.remove("hidden");


        this.title.textContent =
            object.name ?? object.type;


        this.rotation.value =
            Math.round((object.rotation * 180) / Math.PI) % 360;

        this.scale.value =
            object.scale;

        this.opacity.value =
            object.opacity;


        const hasColor =
            "color" in object;


        this.colorRow.style.display =
            hasColor ? "flex" : "none";


        if (hasColor) {

            this.color.value = object.color;

        }


    }


}
