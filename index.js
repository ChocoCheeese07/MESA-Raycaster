import Player from './Player.js';
import Map from './MapClass.js';
import { FPLoop } from './3DRenderer.js';
import Utilities from './Util.js';

import testMap from './Maps/Test.js';

export var miniMapScale = 1;

//MiniMap Canvas Creation
var MiniMap = document.createElement("canvas");
document.body.appendChild(MiniMap);
MiniMap.width = miniMapScale * 640;
MiniMap.height = miniMapScale * 640;
MiniMap.id = "TopDownView";
export var ctx = MiniMap.getContext("2d");

var TestMap = new Map(testMap.data, 10, 10);

export var activeMap = TestMap;

export var player = new Player(MiniMap.width / 2, 414, 0, 0);
player.angle = 230;

console.clear();

function miniMapUpdate() {
    ctx.clearRect(0, 0, MiniMap.width, MiniMap.height);

    TestMap.draw();

    player.detectInput();
    FPLoop();
    player.drawDirectionLine();
    player.draw();
    //console.log("X: " + Math.round(player.x) + " Y: " + Math.round(player.y) + " Ang: " + Math.round(player.angle) + '\n' + "X Tile: " + Utilities.roundToNearest(miniMapScale * 64, player.x) / (miniMapScale * 64) + " Y Tile: " + Utilities.roundToNearest(miniMapScale * 64, player.y) / (miniMapScale * 64));

    requestAnimationFrame(miniMapUpdate);
};
requestAnimationFrame(miniMapUpdate);