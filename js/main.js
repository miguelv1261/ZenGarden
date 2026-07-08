const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");

function resize() {

    canvas.width = canvas.clientWidth;

    canvas.height = canvas.clientHeight;

}

window.addEventListener("resize", resize);

resize();

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fondo papel

    ctx.fillStyle = "#efe8da";

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cuadrícula suave

    ctx.strokeStyle = "rgba(0,0,0,.04)";

    for (let x = 0; x < canvas.width; x += 100) {

        ctx.beginPath();

        ctx.moveTo(x, 0);

        ctx.lineTo(x, canvas.height);

        ctx.stroke();

    }

    for (let y = 0; y < canvas.height; y += 100) {

        ctx.beginPath();

        ctx.moveTo(0, y);

        ctx.lineTo(canvas.width, y);

        ctx.stroke();

    }

    // Texto

    ctx.fillStyle = "#82654b";

    ctx.font = "28px Segoe UI";

    ctx.fillText("Garden of Silence", 40, 60);

    requestAnimationFrame(draw);

}

draw();