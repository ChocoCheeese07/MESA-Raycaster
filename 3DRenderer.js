import Utilities from './Util.js';
import { player, activeMap, ctx, miniMapScale } from './index.js';

// var FPCanvas = document.createElement('canvas');
// document.body.appendChild(FPCanvas);
// FPCanvas.id = "FPView";
var FPCanvas = document.getElementById('FPView');
FPCanvas.width = 640;
FPCanvas.height = 480;
var FP_ctx = FPCanvas.getContext("2d");

var PI2 = Math.PI / 2;
var PI3 = 3 * Math.PI / 2;
var deg = .01745329252;

export function FPLoop() {
    FP_ctx.fillStyle = "#54e5ff";
    FP_ctx.fillRect(0, 0, FPCanvas.width, FPCanvas.height / 2);
    FP_ctx.fillStyle = "#125e13";
    FP_ctx.fillRect(0, FPCanvas.height / 2, FPCanvas.width, FPCanvas.height / 2);

    var rx, ry, ra, xo, yo, aTan, disT; //Floats
    var r, mx, my, mp, dof; //Integers

    ra = Utilities.degToRad(player.angle) - (deg * (player.fov / 2));
    if(ra < 0) {
        ra += 2 * Math.PI;
    };
    if(ra > 2 * Math.PI) {
        ra -= 2 * Math.PI;
    };
    for(r = 0; r<player.fov; r++) {
        //Horizontal Lines Check//
        dof = 0;
        var disH = 100000, hx = player.x, hy = player.y;
        aTan = -1 / Math.tan(ra);

        //Looking Up Check//
        if(ra > Math.PI) { 
            ry = Utilities.roundToNearest(64, player.y) - .0001;
            rx = (player.y - ry) * aTan + player.x;
            yo = -64;
            xo = -yo * aTan;
        };

        //Looking Down Check//
        if(ra < Math.PI) { 
            ry = Utilities.roundToNearest(64, player.y) + 64;
            rx = (player.y - ry) * aTan + player.x;
            yo =  64;
            xo = -yo * aTan;
        };

        //Looking Sideways Check//
        if(ra == 0 || ra == Math.PI) {
            rx = player.x;
            ry = player.y;
            dof = 8;
        };

        while(dof < 8) {
            mx = Math.trunc(rx) >> 6;
            my = Math.trunc(ry) >> 6;
            mp = my * activeMap.width + mx;

            if(mp > 0 && mp < activeMap.width * activeMap.height && activeMap.data[mp] == 1) {
                hx = rx;
                hy = ry;
                disH = Utilities.distance(player.x, player.y, hx, hy);
                dof = 8;
            }else {
                rx += xo;
                ry += yo;
                dof += 1;
            };
        };

        //Vertical Lines Check//
        dof = 0;
        var disV = 1000000, vx = player.x, vy = player.y;
        var nTan = -Math.tan(ra);

        //Looking Left Check//
        if(ra > PI2 && ra < PI3) { 
            rx = Utilities.roundToNearest(64, player.x) - .0001;
            ry = (player.x - rx) * nTan + player.y;
            xo = -64;
            yo = -xo * nTan;
        };

        //Looking Right Check//
        if(ra < PI2 || ra > PI3) { 
            rx = Utilities.roundToNearest(64, player.x) + 64;
            ry = (player.x - rx) * nTan + player.y;
            xo =  64;
            yo = -xo * nTan;
        };

        //Looking Up or Down Check//
        if(ra == 0 || ra == Math.PI) {
            rx = player.x;
            ry = player.y;
            dof = 8;
        };

        while(dof < 8) {
            mx = Math.trunc(rx) >> 6;
            my = Math.trunc(ry) >> 6;
            mp = my * activeMap.width + mx;

            if(mp > 0 && mp < activeMap.width * activeMap.height && activeMap.data[mp] == 1) {
                vx = rx;
                vy = ry;
                disV = Utilities.distance(player.x, player.y, vx, vy);
                dof = 8;
            }else {
                rx += xo;
                ry += yo;
                dof += 1;
            };
        };

        var wallColor = "#ff0000"

        if(disV < disH) {
            rx = vx;
            ry = vy;
            disT = disV;
            wallColor = "#ff0000"
        };
        if(disH < disV) {
            rx = hx;
            ry = hy;
            disT = disH;
            wallColor = "#b80000"
        };

        // ctx.lineWidth = 3;
        // Utilities.drawLine(ctx, player.x, player.y, rx, ry, wallColor);

        //Draw 3D Walls//
        var ca = player.angle - Utilities.radToDeg(ra);
        if(ca < 0) {
            ca += 2 * Math.PI;
        };
        if(ca > 2 * Math.PI) {
            ca -= 2 * Math.PI;
        };

        disT = disT * Math.cos(Utilities.degToRad(ca));

        var lineH = (64 * FPCanvas.width) / disT;
        var lineW = 12;
        var lineO = 240 - (lineH / 2);
        if(lineH > FPCanvas.width) {lineH = FPCanvas.width};
        FP_ctx.beginPath();
        FP_ctx.strokeStyle = wallColor;
        FP_ctx.lineWidth = lineW;
        FP_ctx.moveTo(r * lineW, lineO);
        FP_ctx.lineTo(r * lineW, lineH + lineO);
        FP_ctx.stroke();
        FP_ctx.closePath();

        ra += deg;
        if(ra < 0) {
            ra += 2 * Math.PI;
        };
        if(ra > 2 * Math.PI) {
            ra -= 2 * Math.PI;
        };
    }
    console.log(ra);
}