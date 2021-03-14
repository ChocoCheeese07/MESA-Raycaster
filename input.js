import { player } from './index.js';

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case player.keys.left:
            player.movement.left = true;
            break;
        case player.keys.right:
            player.movement.right = true;
            break;
        case player.keys.up:
            player.movement.up = true;
            break;
        case player.keys.down:
            player.movement.down = true;
            break;
    };
});

document.addEventListener('keyup', (e) => {
    switch(e.key) {
        case player.keys.left:
            player.movement.left = false;
            break;
        case player.keys.right:
            player.movement.right = false;
            break;
        case player.keys.up:
            player.movement.up = false;
            break;
        case player.keys.down:
            player.movement.down = false;
            break;
    };
});