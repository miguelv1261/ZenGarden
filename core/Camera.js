// ============================================================================
// Silence Engine
// Camera.js
// Garden of Silence
// Version 0.2 Alpha
// ============================================================================

export class Camera {

    constructor(canvas) {

        this.canvas = canvas;

        // ---------------------------------------------------------------------
        // Posición actual
        // ---------------------------------------------------------------------

        this.x = 0;
        this.y = 0;

        // ---------------------------------------------------------------------
        // Posición objetivo (suavizado)
        // ---------------------------------------------------------------------

        this.targetX = 0;
        this.targetY = 0;

        // ---------------------------------------------------------------------
        // Velocidad
        // ---------------------------------------------------------------------

        this.velocityX = 0;
        this.velocityY = 0;

        // ---------------------------------------------------------------------
        // Zoom
        // ---------------------------------------------------------------------

        this.zoom = 1;
        this.targetZoom = 1;

        this.minZoom = 0.25;
        this.maxZoom = 5;

        // ---------------------------------------------------------------------
        // Suavizado
        // ---------------------------------------------------------------------

        this.positionLerp = 0.18;
        this.zoomLerp = 0.18;

        // ---------------------------------------------------------------------
        // Límites del mundo
        // ---------------------------------------------------------------------

        this.useBounds = false;

        this.bounds = {

            left: -5000,
            top: -5000,
            right: 5000,
            bottom: 5000

        };

        // ---------------------------------------------------------------------
        // Shake (para futuras animaciones)
        // ---------------------------------------------------------------------

        this.shakeX = 0;
        this.shakeY = 0;

        this.shakeTime = 0;
        this.shakeStrength = 0;

    }

    //==========================================================================
    // UPDATE
    //==========================================================================

    update(delta = 0) {

        this.x += (this.targetX - this.x) * this.positionLerp;
        this.y += (this.targetY - this.y) * this.positionLerp;

        this.zoom += (this.targetZoom - this.zoom) * this.zoomLerp;

        if (this.useBounds) {

            this.x = Math.max(
                this.bounds.left,
                Math.min(this.bounds.right, this.x)
            );

            this.y = Math.max(
                this.bounds.top,
                Math.min(this.bounds.bottom, this.y)
            );

        }

        if (this.shakeTime > 0) {

            this.shakeTime -= delta;

            this.shakeX =
                (Math.random() - 0.5) *
                this.shakeStrength;

            this.shakeY =
                (Math.random() - 0.5) *
                this.shakeStrength;

        } else {

            this.shakeX = 0;
            this.shakeY = 0;

        }

    }

    //==========================================================================
    // MOVER CÁMARA
    //==========================================================================

    move(dx, dy) {

        this.targetX += dx;
        this.targetY += dy;

    }

    setPosition(x, y) {

        this.x = x;
        this.y = y;

        this.targetX = x;
        this.targetY = y;

    }

    moveTo(x, y) {

        this.targetX = x;
        this.targetY = y;

    }

    //==========================================================================
    // ZOOM
    //==========================================================================

    setZoom(value) {

        this.targetZoom = this.clamp(
            value,
            this.minZoom,
            this.maxZoom
        );

    }

    zoomIn(step = 0.1) {

        this.setZoom(this.targetZoom * (1 + step));

    }

    zoomOut(step = 0.1) {

        this.setZoom(this.targetZoom * (1 - step));

    }

    zoomAt(screenX, screenY, delta) {

        const before =
            this.screenToWorld(screenX, screenY);

        if (delta < 0)
            this.targetZoom *= 1.1;
        else
            this.targetZoom *= 0.9;

        this.targetZoom = this.clamp(
            this.targetZoom,
            this.minZoom,
            this.maxZoom
        );

        // Calculamos usando el nuevo zoom
        const tempZoom = this.zoom;
        this.zoom = this.targetZoom;

        const after =
            this.screenToWorld(screenX, screenY);

        this.zoom = tempZoom;

        this.targetX += before.x - after.x;
        this.targetY += before.y - after.y;

    }

    //==========================================================================
    // CONVERSIONES
    //==========================================================================

    screenToWorld(screenX, screenY) {

        return {

            x:
                (screenX - this.canvas.width / 2) /
                this.zoom +
                this.x,

            y:
                (screenY - this.canvas.height / 2) /
                this.zoom +
                this.y

        };

    }

    worldToScreen(worldX, worldY) {

        return {

            x:
                (worldX - this.x) *
                this.zoom +
                this.canvas.width / 2,

            y:
                (worldY - this.y) *
                this.zoom +
                this.canvas.height / 2

        };

    }

    //==========================================================================
    // VISIBILIDAD
    //==========================================================================

    isVisible(x, y, width, height) {

        const left =
            this.x -
            this.canvas.width / 2 / this.zoom;

        const right =
            this.x +
            this.canvas.width / 2 / this.zoom;

        const top =
            this.y -
            this.canvas.height / 2 / this.zoom;

        const bottom =
            this.y +
            this.canvas.height / 2 / this.zoom;

        return !(
            x + width < left ||
            x > right ||
            y + height < top ||
            y > bottom
        );

    }

    //==========================================================================
    // SHAKE
    //==========================================================================

    shake(strength = 10, duration = 0.3) {

        this.shakeStrength = strength;
        this.shakeTime = duration;

    }

    //==========================================================================
    // RESET
    //==========================================================================

    reset() {

        this.x = 0;
        this.y = 0;

        this.targetX = 0;
        this.targetY = 0;

        this.zoom = 1;
        this.targetZoom = 1;

    }

    //==========================================================================
    // GET VIEWPORT
    //==========================================================================

    getViewport() {

        return {

            left:
                this.x -
                this.canvas.width / 2 / this.zoom,

            right:
                this.x +
                this.canvas.width / 2 / this.zoom,

            top:
                this.y -
                this.canvas.height / 2 / this.zoom,

            bottom:
                this.y +
                this.canvas.height / 2 / this.zoom

        };

    }

    //==========================================================================
    // HELPERS
    //==========================================================================

    clamp(value, min, max) {

        return Math.max(min, Math.min(max, value));

    }

}