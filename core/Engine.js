import { Camera } from "./Camera.js";
import { Renderer } from "./Renderer.js";
import { Input } from "./Input.js";
import { World } from "./World.js";
import { ToolManager } from "../tools/ToolManager.js";
import { SelectTool } from "../tools/SelectTool.js";
import { PlantTool } from "../tools/PlantTool.js";
import { EraserTool } from "../tools/EraserTool.js";


export class Engine {


    constructor(canvas) {


        this.canvas = canvas;


        this.camera =
            new Camera(canvas);



        this.world =
            new World();



        this.renderer =
            new Renderer(
                canvas,
                this.camera
            );



        this.input =
            new Input(
                canvas,
                this.camera,
                null
            );



        this.lastTime = performance.now();



        this.fps = 0;

        this.frames = 0;

        this.fpsTimer = 0;



        this.resize();



        window.addEventListener(
            "resize",
            () => this.resize()
        );

        this.tools =
            new ToolManager(this);



        this.tools.register(
            "select",
            new SelectTool(this)
        );



        this.tools.register(
            "tree",
            new PlantTool(this, "tree")
        );



        this.tools.register(
            "flower",
            new PlantTool(this, "flower")
        );



        this.tools.register(
            "rock",
            new PlantTool(this, "rock")
        );



        this.tools.register(
            "sand",
            new PlantTool(this, "sand")
        );



        this.tools.register(
            "eraser",
            new EraserTool(this)
        );



        this.tools.activate(
            "select"
        );



        this.input.setToolManager(
            this.tools
        );

    }





    start() {


        requestAnimationFrame(
            (time) => this.loop(time)
        );


    }





    loop(time) {


        const delta =
            (time - this.lastTime) / 1000;



        this.lastTime = time;



        this.update(delta);



        this.render();



        requestAnimationFrame(
            (t) => this.loop(t)
        );


    }





    update(delta) {


        this.input.update();



        this.camera.update(delta);



        this.world.update(delta);



    }





    render() {


        this.renderer.render(
            this.world
        );



        this.updateStatus();


    }





    resize() {

        const rect =
            this.canvas.getBoundingClientRect();


        this.canvas.width =
            rect.width * window.devicePixelRatio;


        this.canvas.height =
            rect.height * window.devicePixelRatio;


        this.canvas.style.width =
            rect.width + "px";


        this.canvas.style.height =
            rect.height + "px";


        this.renderer.ctx.setTransform(
            window.devicePixelRatio,
            0,
            0,
            window.devicePixelRatio,
            0,
            0
        );

    }





    updateStatus() {


        const status =
            document.querySelectorAll(
                "#statusBar span"
            );



        if (status.length < 4)
            return;



        status[0].textContent =
            `X:${Math.round(this.input.worldMouse.x)}`;



        status[1].textContent =
            `Y:${Math.round(this.input.worldMouse.y)}`;



        status[2].textContent =
            `Zoom:${Math.round(this.camera.zoom * 100)}%`;



        status[3].textContent =
            `FPS:${Math.round(1 / 0.016)}`;


    }



}