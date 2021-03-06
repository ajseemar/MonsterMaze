const Game = require('./game');
const Menu = require('./utils/splash_menu');

const ResourceManager = require('./utils/resource_manager');

const assets = {
    'baseball_bat': 'assets/images/baseball_bat.png',
    'blue_foot': 'assets/images/blue_foot.png',
    'blue_shoulder': 'assets/images/blue_shoulder.png',
    'bottom_wall': 'assets/images/bottom_wall.png',
    'bullet': 'assets/images/bullet.png',
    'end_flag': 'assets/images/end_flag.png',
    'green_foot': 'assets/images/green_foot.png',
    'green_shoulder': 'assets/images/green_shoulder.png',
    'helmet': 'assets/images/helmet.png',
    'left_wall': 'assets/images/left_wall.png',
    'limb': 'assets/images/limb.png',
    'machine_gun': 'assets/images/machine_gun.png',
    'metal_bat': 'assets/images/metal_bat.png',
    'pistol_reload': 'assets/images/pistol_reload.png',
    'pistol': 'assets/images/pistol.png',
    'player_gun': 'assets/images/player_gun.png',
    'player_hold': 'assets/images/player_hold.png',
    'player_machine_gun_reload': 'assets/images/player_machine_gun_reload.png',
    'player_machine_gun': 'assets/images/player_machine_gun.png',
    'player_standing': 'assets/images/player_standing.png',
    'right_wall': 'assets/images/right_wall.png',
    'start_flag': 'assets/images/start_flag.png',
    'zombie': 'assets/images/zombie.png',
    'zombie_hit': 'assets/images/zombie_hit.png',
    'blueK': 'assets/images/key_blue.png',
    'redK': 'assets/images/key_red.png',
    'greenK': 'assets/images/key_green.png',
    'grayK': 'assets/images/key_gray.png'
};

var rm = new ResourceManager();
var game, menu;
const initGame = () => {
    game = new Game(20, rm);
    menu = new Menu(game);
};

document.addEventListener("DOMContentLoaded", () => {
    // const canvas = document.getElementById('canvas');
    // const ctx = canvas.getContext('2d');
    rm.load(assets);

    const start = () => {
        let time = Date.now();
        let dt = (time - game.initialTime) / 1000.0;
        menu.update(dt);
        // game.update(dt);
        // game.render();
        menu.game.initialTime = time;
        requestAnimationFrame(start);
    }

    rm.onReady(initGame);
    rm.onReady(start);
});