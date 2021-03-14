import { miniMapScale } from './index.js';
import Utilities from './Util.js';

function toRadian(angle) {
    angle * Math.PI / 180;
};

export default class Player {
    constructor(x, y, vx, vy) {
        this.canvas = document.getElementById("TopDownView");
        this.ctx = document.getElementById("TopDownView").getContext("2d");

        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.fov = 60;
        this.angle = 270;
        this.moveSpeed = 2;
        this.rotSpeed = 0;
        this.size = miniMapScale * (.6 * (this.canvas.width / 10));

        this.movement = {
            left: false,
            right: false,
            up: false,
            down: false
        };

        this.keys = {
            left: "ArrowLeft",
            right: "ArrowRight",
            up: "ArrowUp",
            down: "ArrowDown",
            control: "Control"
        };
    };
    drawDirectionLine() {
        this.ctx.lineWidth = 1;
        Utilities.drawLine(
            this.ctx, 
            this.x, this.y, 
            this.x + 150 * Math.cos(this.angle * Math.PI / 180), 
            this.y + 150 * Math.sin(this.angle * Math.PI / 180), 
            "#ffffff"
            );
    };
    draw() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.rotSpeed;
        this.ctx.fillStyle = "#fff000";
        this.ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    };
    detectInput() {
        //Changing player angle.
        if(this.movement.left == true) {
            this.rotSpeed = -(4);
        }else if(this.movement.right == true) {
            this.rotSpeed = 4;
        }else { this.rotSpeed = 0; };
        
        //Moving player forward and backwards.
        if(this.movement.up == true) {
            this.vx = this.moveSpeed * Math.cos(Math.PI / 180 * this.angle);
            this.vy = this.moveSpeed * Math.sin(Math.PI / 180 * this.angle);
        }else if(this.movement.down == true) {
            this.vx = -(this.moveSpeed * Math.cos(Math.PI / 180 * this.angle));
            this.vy = -(this.moveSpeed * Math.sin(Math.PI / 180 * this.angle));
        }else { this.vy = 0; this.vx = 0; };

        if (this.angle > 360) { this.angle = 0 + .001 };
        if (this.angle < 0) { this.angle = 360 - .001 };
    };
;}