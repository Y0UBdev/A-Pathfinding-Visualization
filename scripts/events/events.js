/* =========================
Evenements réalisés par ChatGPT-4
========================= */

import { Coordinate } from "../models/coordinate.js";

export function applyEvent(func) {
    const startBtn = document.getElementById("start-btn");
    startBtn.addEventListener("click", () => {
        const balise = document.getElementById("info");
        try {
            func();
            balise.innerHTML = "load...";
        } catch (e) {
            balise.innerHTML = e;
            console.error(e);
        }
    });
}

export function bindGridEvents(grid) {
    const canvas = document.getElementById("canvas");

    let currentTool = "block";
    let isPainting = false;
    let lastCell = null;
    let blockWidth = 1;
    let blockHeight = 1;

    const blockWidthSlider = document.getElementById("blockWidth");
    const blockHeightSlider = document.getElementById("blockHeight");
    const blockWidthValue = document.getElementById("blockWidthValue");
    const blockHeightValue = document.getElementById("blockHeightValue");

    blockWidthSlider.addEventListener("input", e => {
        blockWidth = Number(e.target.value);
        blockWidthValue.textContent = blockWidth;
    });

    blockHeightSlider.addEventListener("input", e => {
        blockHeight = Number(e.target.value);
        blockHeightValue.textContent = blockHeight;
    });

    /* =========================
       Sélection du mode (radio)
       ========================= */
    document.querySelectorAll('input[name="tool"]').forEach(radio => {
        radio.addEventListener("change", e => {
            currentTool = e.target.value;
        });
    });

    /* =========================
       Slider taille cellules
       ========================= */
    const sizeSlider = document.getElementById("cellSize");
    const sizeLabel = document.getElementById("cellSizeValue");

    sizeSlider.addEventListener("input", e => {
        grid.size = Number(e.target.value);
        sizeLabel.textContent = `${grid.size} px`;
        grid.render();
    });

    /* =========================
       Utils
       ========================= */
    function getCellFromEvent(e) {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / grid.size);
        const y = Math.floor((e.clientY - rect.top) / grid.size);
        return { x, y };
    }

    function sameCell(a, b) {
        return a && b && a.x === b.x && a.y === b.y;
    }

    function applyTool(x, y) {
        if (currentTool === "start") {
            grid.start = new Coordinate(x, y);
            grid.init();
            grid.render();
            return;
        }

        if (currentTool === "end") {
            grid.end = new Coordinate(x, y);
            grid.init();
            grid.render();
            return;
        }

        for (let dy = 0; dy < blockHeight; dy++) {
            for (let dx = 0; dx < blockWidth; dx++) {

                const bx = x + dx;
                const by = y + dy;

                if (bx < 0 || by < 0 || bx >= grid.width || by >= grid.height)
                    continue;

                const coord = new Coordinate(bx, by);

                if (currentTool === "block") {
                    if (!grid.isIn(grid.blocks, coord)) {
                        grid.blocks.push(coord);
                    }
                }

                if (currentTool === "erase") {
                    grid.blocks = grid.blocks.filter(
                        c => c.x !== bx || c.y !== by
                    );
                }
            }
        }

        grid.init();
        grid.render();
    }

    /* =========================
       Mouse events
       ========================= */
    canvas.addEventListener("mousedown", e => {
        isPainting = true;
        const cell = getCellFromEvent(e);
        applyTool(cell.x, cell.y);
        lastCell = cell;
    });

    canvas.addEventListener("mousemove", e => {
        if (!isPainting) return;

        const cell = getCellFromEvent(e);
        if (sameCell(cell, lastCell)) return;

        applyTool(cell.x, cell.y);
        lastCell = cell;
    });

    window.addEventListener("mouseup", () => {
        isPainting = false;
        lastCell = null;
    });

    canvas.addEventListener("mouseleave", () => {
        isPainting = false;
        lastCell = null;
    });
}
