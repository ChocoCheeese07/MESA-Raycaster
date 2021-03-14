import { miniMapScale } from './index.js';

export default class Map{
    constructor(mapData, width, height) {
        this.data = mapData;
        this.tileSize = miniMapScale * 64;
        this.width = width;
        this.height = height;
        this.ctx = document.getElementById("TopDownView").getContext("2d");
    };

    draw() {
        for(var y = 0; y < this.height; y++) {
            for(var x = 0; x < this.width; x++) {
                var wall = this.data[y * this.width + x];

                switch(wall) {
                    case 0:
                        this.ctx.fillStyle = "#ececec";
                        break;
                    case 1:
                        this.ctx.fillStyle = "#000000";
                }

                this.ctx.fillRect(
                    x * this.tileSize,
                    y * this.tileSize,
                    this.tileSize, this.tileSize
                );
                // this.ctx.lineWidth = .1;
                // this.ctx.strokeStyle = "#ffff00";
                // this.ctx.strokeRect(
                //     x * this.tileSize,
                //     y * this.tileSize,
                //     this.tileSize, this.tileSize
                // );
            };
        }
    }
};