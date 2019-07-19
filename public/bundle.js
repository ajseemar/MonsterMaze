/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/entities/enemy.js":
/*!*******************************!*\
  !*** ./src/entities/enemy.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { index } = __webpack_require__(/*! ../utils/utils */ \"./src/utils/utils.js\");\nconst Sprite = __webpack_require__(/*! ./sprite */ \"./src/entities/sprite.js\");\nconst A_Star = __webpack_require__(/*! ../maze/solver/a_star */ \"./src/maze/solver/a_star.js\");\nconst Cell = __webpack_require__(/*! ../maze/cell */ \"./src/maze/cell.js\");\n\nclass Enemy extends Sprite {\n    constructor(name, sprite, size, cells, endIdx) {\n        super(sprite, size);\n        this.name = name\n        this.cellCount = Math.sqrt(cells.length);\n        const row = Math.floor(Math.random() * this.cellCount);\n        const col = Math.floor(Math.random() * this.cellCount);\n\n        this.position = {\n            x: col * size.w + this.sprite.width / 2,\n            y: row * size.h + this.sprite.height / 2\n        }\n\n        // let solverCells = cells.map(cell => new Cell(cell.row, cell.col, cell.size));\n        let startIdx = index(row, col, this.cellCount);\n        // let start = Object.assign(Object.create(Object.getPrototypeOf(cell)), cell);\n        // debugger\n        // cells = cells.map(cell => Object.assign(Object.create(Object.getPrototypeOf(cell)), cell));\n        // debugger\n        this.solver = new A_Star(\n            startIdx,\n            endIdx,\n            cells\n        );\n        // this.cells = cells;\n    }\n\n    resize(size) {\n        this.aspectRatio = size.h / size.w * 0.75;\n        // console.log(this.sprite);\n        // console.log(this.sprite.width, this.sprite.height);\n        // this.sprite.width = this.size.width / this.aspectRatio;\n        // this.sprite.height = this.size.height / this.aspectRatio;\n        if (this.solver.finished) this.solver.path.resize();\n    }\n    updateSolver(endIdx) {\n        let row = Math.floor(this.position.y / this.size.h);\n        let col = Math.floor(this.position.x / this.size.w);\n        // let start = this.cells[index(row, col, this.cellCount)];\n\n        // this.solver.start = start;\n        // this.solver.end = end;\n        // this.solver.openSet.push(this.solver.start);\n        // this.solver.closedSet = [];\n        // this.solver.finished = false;\n        // this.solver.path.clear();\n        // this.solver.initialTime = Date.now();\n\n        // this.solver.updateSolver(start, end);\n        // console.log(this.name, this.solver.path);\n        this.solver.updateSolver(index(row, col, this.cellCount), endIdx);\n    }\n\n    update() {\n        this.solver.update();\n    }\n\n    render(ctx, offsetX, offsetY) {\n        ctx.save();\n        ctx.translate(this.position.x, this.position.y)\n        ctx.rotate(this.angle);\n        ctx.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);\n        ctx.restore();\n\n        // if (this.solver.finished) this.solver.render(ctx);\n        this.solver.render(ctx);\n    }\n}\n\nmodule.exports = Enemy;\n\n//# sourceURL=webpack:///./src/entities/enemy.js?");

/***/ }),

/***/ "./src/entities/entity.js":
/*!********************************!*\
  !*** ./src/entities/entity.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Entity {\n    constructor(size) {\n        // this.sprite = sprite;\n        // this.size = size / 3;\n\n        this.position = {\n            x: 0,\n            y: 0\n        };\n\n        this.velocity = {\n            x: 0,\n            y: 0\n        };\n\n        this.size = size;\n        this.angle = 0;\n        this.speed = 0;\n        this.radius = size.w > size.h ? size.h / 2 : size.w / 2;\n    }\n}\n\nmodule.exports = Entity;\n\n//# sourceURL=webpack:///./src/entities/entity.js?");

/***/ }),

/***/ "./src/entities/player.js":
/*!********************************!*\
  !*** ./src/entities/player.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const KEYS = __webpack_require__(/*! ../utils/keys */ \"./src/utils/keys.js\");\nconst Sprite = __webpack_require__(/*! ./sprite */ \"./src/entities/sprite.js\");\n// const Bullet = require('./bullet');\n\nclass Player extends Sprite {\n    constructor(sprite, cellSize, inputHandler) {\n        super(sprite, cellSize);\n        // this.size = size / 3;\n        // this.radius = this.size * 3 / 2;\n\n        this.position = {\n            x: this.sprite.width - this.sprite.width / 2,\n            y: this.sprite.height - this.sprite.height / 2\n        };\n\n        this.speed = 250;\n\n        this.ih = inputHandler;\n\n        this.size = cellSize;\n\n        // this.bullets = {};\n\n        // const debounce = (func, delay) => {\n        //     let inDebounce\n        //     return function () {\n        //         const context = this\n        //         const args = arguments\n        //         clearTimeout(inDebounce)\n        //         inDebounce = setTimeout(() => func.apply(context, args), delay)\n        //     }\n        // }\n\n        // const throttle = (func, limit) => {\n        //     let lastFunc\n        //     let lastRan\n        //     return function () {\n        //         const context = this\n        //         const args = arguments\n        //         if (!lastRan) {\n        //             func.apply(context, args)\n        //             lastRan = Date.now()\n        //         } else {\n        //             clearTimeout(lastFunc)\n        //             lastFunc = setTimeout(function () {\n        //                 if ((Date.now() - lastRan) >= limit) {\n        //                     func.apply(context, args)\n        //                     lastRan = Date.now()\n        //                 }\n        //             }, limit - (Date.now() - lastRan))\n        //         }\n        //     }\n        // }\n\n        // // this.shoot = debounce(this.shoot, 10);\n        // this.shoot = throttle(this.shoot, 100);\n        // document.addEventListener('mousemove', this.handleRotation.bind(this));\n    }\n\n    handleRotation(delta) {\n        this.angle = Math.atan2(delta.dy, delta.dx) * 180 / Math.PI;\n        // console.log(e.clientY, e.clientX);\n        if (this.angle < 0) {\n\n            this.angle = 360 + this.angle;\n\n        }\n    }\n\n    handleInput() {\n        // debugger\n        if (this.ih.isPressed(KEYS.UP)) {\n            this.velocity.y = -this.speed;\n        } else if (this.ih.isPressed(KEYS.DOWN)) {\n            this.velocity.y = this.speed;\n        } else {\n            this.velocity.y = 0;\n        }\n\n        if (this.ih.isPressed(KEYS.RIGHT)) {\n            this.velocity.x = this.speed;\n        } else if (this.ih.isPressed(KEYS.LEFT)) {\n            this.velocity.x = -this.speed;\n        } else {\n            this.velocity.x = 0;\n        }\n    }\n\n    // shoot(delta) {\n    //     const bullet = new Bullet(this.bulletSprite, this.position);\n    //     let x, y;\n    //     if (navigator.getGamepads()[0]) {\n    //         x = this.delta.x;\n    //         y = this.delta.y;\n    //     } else {\n    //         x = delta.x;\n    //         y = delta.y;\n    //     }\n    //     const magnitude = Math.sqrt(x * x + y * y);\n\n    //     x /= magnitude;\n    //     y /= magnitude;\n\n    //     bullet.updateVelocity(x, y);\n    //     this.bullets[bullet.id] = bullet;\n    // }\n\n    update(dt, collisionDetector) {\n        this.handleInput();\n        this.position.x += this.velocity.x * dt;\n        this.position.y += this.velocity.y * dt;\n        // console.log(this.velocity);\n\n        // Bullet.update(this.bullets, collisionDetector, dt);\n    }\n\n    render(ctx, offset) {\n\n        ctx.save();\n        ctx.translate(this.position.x + offset.x, this.position.y + offset.y);\n        ctx.rotate(this.angle * Math.PI / 180);\n        ctx.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);\n        ctx.restore();\n\n        // Bullet.render(this.bullets, ctx, offset);\n\n    }\n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack:///./src/entities/player.js?");

/***/ }),

/***/ "./src/entities/sprite.js":
/*!********************************!*\
  !*** ./src/entities/sprite.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Entity = __webpack_require__(/*! ./entity */ \"./src/entities/entity.js\");\n\nclass Sprite extends Entity {\n    constructor(sprite, size) {\n        super(size);\n        this.sprite = sprite;\n        this.aspectRatio = size.w / size.h;\n        // console.log(this.sprite);\n        // console.log(this.sprite.width, this.sprite.height);\n        this.sprite.width = this.size.width / this.aspectRatio;\n        this.sprite.height = this.size.height / this.aspectRatio;\n        // console.log(this.sprite.width, this.sprite.height);\n    }\n\n    resize(size) {\n        this.aspectRatio = size.h / size.w * 0.75;\n        // console.log(this.sprite);\n        // console.log(this.sprite.width, this.sprite.height);\n        this.sprite.width = this.size.width / this.aspectRatio;\n        this.sprite.height = this.size.height / this.aspectRatio;\n    }\n}\n\nmodule.exports = Sprite;\n\n//# sourceURL=webpack:///./src/entities/sprite.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { index } = __webpack_require__(/*! ./utils/utils */ \"./src/utils/utils.js\");\nconst Grid = __webpack_require__(/*! ./maze/grid */ \"./src/maze/grid.js\");\nconst Maze = __webpack_require__(/*! ./maze/maze */ \"./src/maze/maze.js\");\nconst Player = __webpack_require__(/*! ./entities/player */ \"./src/entities/player.js\");\nconst InputManager = __webpack_require__(/*! ./utils/input */ \"./src/utils/input.js\");\nconst Enemy = __webpack_require__(/*! ./entities/enemy */ \"./src/entities/enemy.js\");\nconst Cell = __webpack_require__(/*! ./maze/cell */ \"./src/maze/cell.js\");\n\n\nclass Game {\n    constructor(size, rm) {\n        this.canvas = document.getElementById('canvas');\n        this.ctx = this.canvas.getContext('2d');\n\n        this.cellCount = size;\n        window.addEventListener('resize', this.resize.bind(this), false);\n        window.addEventListener('orientationchange', this.resize.bind(this), false);\n        this.resize();\n\n        this.rm = rm;\n        this.grid = new Grid(this.cellCount, this.width, this.height, this.cellSize);\n        this.maze = new Maze(this.cellCount, this.cellSize, this.width, this.height, this.grid);\n\n        this.ih = new InputManager();\n        this.player = new Player(rm.get('player_standing'), this.cellSize, this.ih);\n\n        // let row = Math.floor(this.maze.height / this.player.position.y);\n        // let col = Math.floor(this.maze.width / this.player.position.x);\n\n        let row = Math.floor(this.player.position.y / this.player.size.h);\n        let col = Math.floor(this.player.position.x / this.player.size.w);\n        let end = this.grid.cells[index(row, col, this.cellCount)];\n\n        // window.addEventListener('mousemove', this.handleRotation.bind(this));\n        // window.addEventListener('click', this.handleClick.bind(this));\n        // window.setInterval(this.updateSolver.bind(this), 500);\n        window.setInterval(this.spawnEnemy.bind(this), 1000);\n        window.zombies = this.zombies = [];\n\n        // for (let i = 0; i < 3; i++) this.spawnEnemy();\n        this.initialTime = Date.now();\n    }\n\n    spawnEnemy() {\n        if (this.zombies.length > 5) return;\n        let row = Math.floor(this.player.position.y / this.player.size.h);\n        let col = Math.floor(this.player.position.x / this.player.size.w);\n        let end = index(row, col, this.cellCount);\n        // this.zombies.push(new Enemy(`zombie_${this.zombies.length + 1}`, this.rm.get('zombie'), this.cellSize, this.grid.cells, end));\n        // let cells = this.grid.cells.map(cell => new Cell(cell.row, cell.col, cell.size));\n        let cells = Array.from(this.grid.cells);\n        cells.forEach((cell, idx) => {\n            cells[idx] = Object.assign({}, Object.create(Object.getPrototypeOf(cell)), cell);\n            // cells[idx] = new Cell(cell.row, cell.col, cell.size);\n        });\n        let zombie = new Enemy(`zombie_${this.zombies.length + 1}`, this.rm.get('zombie'), this.cellSize, this.grid.cells, end)\n        this.zombies.push(zombie);\n        window.setInterval(this.updateSolver.bind(this, zombie), 1000);\n    }\n\n    updateSolver(zombie) {\n\n        let row = Math.floor(this.player.position.y / this.player.size.h);\n        let col = Math.floor(this.player.position.x / this.player.size.w);\n        // let end = this.grid.cells[index(row, col, this.cellCount)];\n        // let end = this.grid.cells[index(row, col, this.cellCount)];\n        let end = index(row, col, this.cellCount);\n        // let end2 = this.enemy.solver.cells[index(row, col, this.cellCount)];\n        // this.zombies.forEach(zombie => zombie.updateSolver(end));\n        zombie.updateSolver(end);\n    }\n\n    resize() {\n        const ratio = 16 / 9;\n        this.canvas.width = window.innerWidth;\n        this.canvas.height = window.innerHeight;\n        // if (this.canvas.width > this.canvas.height / ratio) this.canvas.width = this.canvas.height * ratio;\n        // else if (this.canvas.height > this.canvas.width / ration) this.canvas.height = this.canvas.width * ratio;\n        this.width = this.canvas.width;\n        this.height = this.canvas.height;\n        this.cellSize = {\n            w: this.width / this.cellCount,\n            h: this.height / this.cellCount\n        };\n        if (this.grid) {\n            this.grid.cells.forEach(cell => {\n                cell.size = this.cellSize;\n                cell.resize();\n            });\n        }\n        if (this.player) this.player.sprite.resize(this.cellSize);\n        if (this.zombies && this.zombies.length > 0) {\n            this.zombies.forEach(zombie => zombie.resize(this.cellSize));\n        }\n        // if (this.enemy) this.enemy.resize(this.cellSize);\n        // if (this.enemy2) this.enemy2.resize(this.cellSize);\n        // if (this.solver && this.solver.finished) {\n        //     this.solver.path.resize();\n        // }\n        // const widthToHeight = 4 / 3;\n        // let width = window.innerWidth - 5;\n        // let height = window.innerHeight - 5;\n        // this.canvas.width = width;\n        // this.canvas.height = height;\n        // const fwidthToHeight = width / height;\n\n        // const gameContent = document.getElementById('main-content');\n        // // debugger\n        // if (fwidthToHeight > widthToHeight) {\n        //     width = height * widthToHeight;\n        //     gameContent.style.height = height + 'px';\n        //     gameContent.style.width = width + 'px';\n        // } else {\n        //     height = width / widthToHeight;\n        //     gameContent.style.height = height + 'px';\n        //     gameContent.style.width = width + 'px';\n        // }\n\n        // gameContent.style.marginTop = (-height / 2) + 'px';\n        // gameContent.style.marginLeft = (-width / 2) + 'px';\n\n        // this.canvas.width = innerWidth;\n        // this.canvas.height = innerHeight;\n    }\n\n    handleRotation(e) {\n        // e.preventDefault();\n        const delta = {\n            dx: e.clientX,\n            dy: e.clientY\n        };\n        this.player.handleRotation(delta);\n    }\n\n    handleClick(e) {\n\n    }\n\n    // spawnEnemy() {\n\n    // }\n\n    updateGamepad() {\n        this.gamepad = navigator.getGamepads()[0];\n        if (!this.gamepad) return false; // no gamepad to update. Use key states from inputHandler\n\n        // handle shooting bullets\n        if (this.gamepad.axes[4] > 0) {\n            // console.log('Right Trigger Pressed');\n            this.player.shoot();\n        }\n\n        // handle velocity\n        this.player.velocity.x = this.gamepad.axes[0] * this.player.speed;\n        this.player.velocity.y = this.gamepad.axes[1] * this.player.speed;\n\n        // handle rotation\n        if (this.gamepad.axes[2] !== 0 && this.gamepad.axes[3] !== 0) {\n            this.player.delta = {\n                x: this.gamepad.axes[2],\n                y: this.gamepad.axes[3]\n            };\n            this.player.angle = Math.atan2(this.gamepad.axes[3], this.gamepad.axes[2]) * 180 / Math.PI;\n        }\n\n        if (this.player.angle < 0) {\n\n            this.player.angle = 360 + this.player.angle;\n\n        }\n\n        // successfully updated gamepad\n        return true;\n    }\n\n    update(dt) {\n        // this.solver.update();\n        if (!this.updateGamepad()) {\n            this.player.handleInput();\n            // this.player.handleRotation(this.mousePos);\n        }\n        // this.enemy.update();\n        this.zombies.forEach(zombie => {\n            zombie.update();\n        });\n        // this.enemy2.update();\n        this.player.update(dt);\n    }\n\n    render() {\n        this.ctx.clearRect(0, 0, this.width, this.height);\n        this.maze.render(this.ctx);\n        // this.solver.render(this.ctx);\n        this.player.render(this.ctx, { x: 0, y: 0 });\n        // this.enemy.render(this.ctx);\n        // this.enemy2.render(this.ctx);\n        this.zombies.forEach(zombie => {\n            zombie.render(this.ctx);\n        });\n    }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst ResourceManager = __webpack_require__(/*! ./utils/resource_manager */ \"./src/utils/resource_manager.js\");\n\nconst assets = {\n    'baseball_bat': 'assets/images/baseball_bat.png',\n    'blue_foot': 'assets/images/blue_foot.png',\n    'blue_shoulder': 'assets/images/blue_shoulder.png',\n    'bottom_wall': 'assets/images/bottom_wall.png',\n    'bullet': 'assets/images/bullet.png',\n    'end_flag': 'assets/images/end_flag.png',\n    'green_foot': 'assets/images/green_foot.png',\n    'green_shoulder': 'assets/images/green_shoulder.png',\n    'helmet': 'assets/images/helmet.png',\n    'left_wall': 'assets/images/left_wall.png',\n    'limb': 'assets/images/limb.png',\n    'machine_gun': 'assets/images/machine_gun.png',\n    'metal_bat': 'assets/images/metal_bat.png',\n    'pistol_reload': 'assets/images/pistol_reload.png',\n    'pistol': 'assets/images/pistol.png',\n    'player_gun': 'assets/images/player_gun.png',\n    'player_hold': 'assets/images/player_hold.png',\n    'player_machine_gun_reload': 'assets/images/player_machine_gun_reload.png',\n    'player_machine_gun': 'assets/images/player_machine_gun.png',\n    'player_standing': 'assets/images/player_standing.png',\n    'right_wall': 'assets/images/right_wall.png',\n    'start_flag': 'assets/images/start_flag.png',\n    'zombie': 'assets/images/zombie.png',\n    'zombie_hit': 'assets/images/zombie_hit.png',\n};\n\nvar rm = new ResourceManager();\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    // const canvas = document.getElementById('canvas');\n    // const ctx = canvas.getContext('2d');\n    rm.load(assets);\n    const game = new Game(20, rm);\n    const start = () => {\n        let time = Date.now();\n        let dt = (time - game.initialTime) / 1000.0;\n        game.update(dt);\n        game.render();\n        game.initialTime = time;\n        requestAnimationFrame(start);\n    }\n    rm.onReady(start);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/maze/cell.js":
/*!**************************!*\
  !*** ./src/maze/cell.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Node = __webpack_require__(/*! ./solver/node */ \"./src/maze/solver/node.js\");\nconst Wall = __webpack_require__(/*! ./wall */ \"./src/maze/wall.js\");\nconst Vector = __webpack_require__(/*! ../utils/vector */ \"./src/utils/vector.js\");\n\nclass Cell {\n    constructor(row, col, size) {\n        this.row = row;\n        this.col = col;\n        this.size = size;\n        this.visited = false;\n        this.node = new Node(row, col, size);\n        this.neighbors = [];\n        this.walls = {\n            \"north\": new Wall(\n                new Vector(this.col * this.size.w, this.row * this.size.h),\n                new Vector((this.col * this.size.w) + this.size.w, this.row * this.size.h)\n            ),\n            \"east\": new Wall(\n                new Vector((this.col * this.size.w) + this.size.w, this.row * this.size.h),\n                new Vector((this.col * this.size.w) + this.size.w, (this.row * this.size.h) + this.size.h)\n            ),\n            \"south\": new Wall(\n                new Vector((this.col * this.size.w), (this.row * this.size.h) + this.size.h),\n                new Vector((this.col * this.size.w) + this.size.w, (this.row * this.size.h) + this.size.h)\n            ),\n            \"west\": new Wall(\n                new Vector(this.col * this.size.w, this.row * this.size.h),\n                new Vector(this.col * this.size.w, (this.row * this.size.h) + this.size.h)\n            )\n        };\n    }\n\n    resize() {\n        Object.keys(this.walls).forEach(dir => {\n            switch (dir) {\n                case \"north\":\n                    this.walls[dir].p1.x = this.col * this.size.w;\n                    this.walls[dir].p1.y = this.row * this.size.h;\n                    this.walls[dir].p2.x = (this.col * this.size.w) + this.size.w\n                    this.walls[dir].p2.y = this.row * this.size.h;\n                    break;\n                case \"east\":\n                    this.walls[dir].p1.x = (this.col * this.size.w) + this.size.w;\n                    this.walls[dir].p1.y = this.row * this.size.h;\n                    this.walls[dir].p2.x = (this.col * this.size.w) + this.size.w\n                    this.walls[dir].p2.y = (this.row * this.size.h) + this.size.h;\n                    break;\n                case \"south\":\n                    this.walls[dir].p1.x = (this.col * this.size.w);\n                    this.walls[dir].p1.y = (this.row * this.size.h) + this.size.h;\n                    this.walls[dir].p2.x = (this.col * this.size.w) + this.size.w\n                    this.walls[dir].p2.y = (this.row * this.size.h) + this.size.h;\n                    break;\n                case \"west\":\n                    this.walls[dir].p1.x = (this.col * this.size.w);\n                    this.walls[dir].p1.y = (this.row * this.size.h);\n                    this.walls[dir].p2.x = (this.col * this.size.w);\n                    this.walls[dir].p2.y = (this.row * this.size.h) + this.size.h;\n                    break;\n                default:\n                    break;\n            }\n            this.node.size = this.size;\n            this.node.resize();\n        });\n    }\n\n    render(ctx, color, offsetX, offsetY) {\n        // DEBUG\n        if (color) {\n            ctx.fillStyle = color;\n            ctx.fillRect(this.col * this.size.w, this.row * this.size.h, this.size.w, this.size.h);\n        }\n        else {\n            ctx.strokeStyle = \"#53A1F3\";\n            Object.values(this.walls).forEach(({ p1, p2 }) => {\n                ctx.beginPath();\n                ctx.moveTo(p1.x + offsetX, p1.y + offsetY);\n                ctx.lineTo(p2.x + offsetX, p2.y + offsetY);\n                ctx.closePath();\n                ctx.stroke();\n            });\n        }\n\n        // OFFICIAL \n        // Object.values(this.walls).forEach(({ p1, p2 }) => {\n        //     ctx.beginPath();\n        //     ctx.moveTo(p1.x + offsetX, p1.y + offsetY);\n        //     ctx.lineTo(p2.x + offsetX, p2.y + offsetY);\n        //     ctx.closePath();\n        //     ctx.stroke();\n        // });\n    }\n}\n\nmodule.exports = Cell;\n\n//# sourceURL=webpack:///./src/maze/cell.js?");

/***/ }),

/***/ "./src/maze/grid.js":
/*!**************************!*\
  !*** ./src/maze/grid.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Cell = __webpack_require__(/*! ./cell */ \"./src/maze/cell.js\");\n\nconst { index } = __webpack_require__(/*! ../utils/utils */ \"./src/utils/utils.js\");\n// debugger\nclass Grid {\n    constructor(size, w, h, cellSize) {\n        this.cells = new Array(size * size);\n        this.size = {\n            w: w,\n            h: h\n        };\n        this.cellCount = size;\n\n        this.cellSize = cellSize;\n\n        this.populateGrid();\n        this.populateCells();\n    }\n\n    populateGrid() {\n        for (let j = 0; j < this.cellCount; j++) {\n            for (let i = 0; i < this.cellCount; i++) {\n                this.cells[index(i, j, this.cellCount)] = new Cell(i, j, this.cellSize);\n            }\n        }\n    }\n\n    populateCells() {\n        for (let i = 0; i < this.cells.length; i++)\n            Grid.populateCellWithNeighbors(this.cells[i], this.cells, this.cellCount, this.ctx);\n    }\n\n    static populateCellWithNeighbors(cell, cells, size) {\n        if (cells[index(cell.row - 1, cell.col, size)]) {\n            if (cell.row - 1 >= 0) {\n                cell.neighbors.push({ 'north': cells[index(cell.row - 1, cell.col, size)] });\n            }\n        }\n        if (cells[index(cell.row, cell.col + 1, size)]) {\n            cell.neighbors.push({ 'east': cells[index(cell.row, cell.col + 1, size)] });\n        }\n        if (cells[index(cell.row + 1, cell.col, size)]) {\n            if (cell.row + 1 <= size - 1) {\n                cell.neighbors.push({ 'south': cells[index(cell.row + 1, cell.col, size)] });\n            }\n        }\n        if (cells[index(cell.row, cell.col - 1, size)]) {\n            cell.neighbors.push({ 'west': cells[index(cell.row, cell.col - 1, size)] });\n        }\n\n        // cell.neighbors.forEach(cellN => {\n        //     ctx.fillStyle = \"#9A66AC\";\n        //     ctx.fillRect(cellN.row * cellN.size, cellN.col * cellN.size, cellN.size, cellN.size);\n        // });\n    }\n\n    render(ctx) {\n        for (let j = 0; j < this.cellCount; j++) {\n            for (let i = 0; i < this.cellCount; i++) {\n                let cell = this.cells[index(j, i, this.cellCount)];\n                cell.render(ctx, null, 0, 0);\n            }\n        }\n    }\n}\n\nmodule.exports = Grid;\n\n//# sourceURL=webpack:///./src/maze/grid.js?");

/***/ }),

/***/ "./src/maze/maze.js":
/*!**************************!*\
  !*** ./src/maze/maze.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const index = __webpack_require__(/*! ../utils/utils */ \"./src/utils/utils.js\");\n\nclass Maze {\n    constructor(cellCount, cellSize, width, height, grid) {\n        this.cellCount = cellCount;\n        this.width = cellSize.w * cellCount;\n        this.height = cellSize.h * cellCount;\n        this.grid = grid;\n\n        this.generateMaze();\n    }\n\n\n    generateMaze() {\n        let currentCell = this.grid.cells[0];\n        currentCell.visited = true;\n        const stack = [currentCell];\n\n        while (stack.length !== 0) {\n            let neighbors = currentCell.neighbors.filter(obj => {\n                let cell = Object.values(obj)[0];\n                if (!cell) return null;\n                return !cell.visited;\n            });\n\n            let neighborDir;\n            let neighbor;\n\n            let neighborObj = neighbors[Math.floor(Math.random() * neighbors.length)];\n            if (neighborObj) {\n                neighborDir = Object.keys(neighborObj)[0];\n                neighbor = neighborObj[neighborDir];\n            }\n\n            if (neighborObj === undefined) {\n                currentCell = stack.pop();\n            }\n            else {\n                neighbor.visited = true;\n                switch (neighborDir) {\n                    case \"north\":\n                        delete currentCell.walls[\"north\"];\n                        delete neighbor.walls[\"south\"];\n                        currentCell.node.neighbors[\"north\"] = 1;\n                        neighbor.node.neighbors[\"south\"] = 1;\n                        break;\n                    case \"east\":\n                        delete currentCell.walls[\"east\"];\n                        delete neighbor.walls[\"west\"];\n                        currentCell.node.neighbors[\"east\"] = 1;\n                        neighbor.node.neighbors[\"west\"] = 1;\n                        break;\n                    case \"south\":\n                        delete currentCell.walls[\"south\"];\n                        delete neighbor.walls[\"north\"];\n                        currentCell.node.neighbors[\"south\"] = 1;\n                        neighbor.node.neighbors[\"north\"] = 1;\n                        break;\n                    case \"west\":\n                        delete currentCell.walls[\"west\"];\n                        delete neighbor.walls[\"east\"];\n                        currentCell.node.neighbors[\"west\"] = 1;\n                        neighbor.node.neighbors[\"east\"] = 1;\n                        break;\n                }\n                stack.push(neighbor);\n                currentCell = neighbor;\n            }\n        }\n    }\n\n    render(ctx) {\n        this.grid.render(ctx);\n    }\n}\n\nmodule.exports = Maze;\n\n//# sourceURL=webpack:///./src/maze/maze.js?");

/***/ }),

/***/ "./src/maze/solver/a_star.js":
/*!***********************************!*\
  !*** ./src/maze/solver/a_star.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { heuristic, index } = __webpack_require__(/*! ../../utils/utils */ \"./src/utils/utils.js\");\nconst Path = __webpack_require__(/*! ./path */ \"./src/maze/solver/path.js\");\nconst Node = __webpack_require__(/*! ./node */ \"./src/maze/solver/node.js\");\n\nclass A_Star {\n    constructor(start, end, cells) {\n        this.cells = cells;\n        // this.cells.forEach(cell => cell.node = Object.assign({}, cell.node));\n        // this.createNodes();\n        this.cellCount = Math.sqrt(cells.length);\n        // this.nodes = nodes;\n        // this.start = start;\n        // this.end = end;\n        this.start = cells[start];\n        this.end = cells[end];\n        // console.log(this.start, this.end);\n        // debugger\n        this.openSet = [this.start];\n        this.closedSet = [];\n        this.path = new Path();\n\n        this.initialTime = Date.now();\n        // debugger\n    }\n\n    createNodes() {\n        this.cells.forEach(cell => cell.node = Object.assign({}, Object.create(Object.getPrototypeOf(cell.node)), cell.node));\n    }\n\n    // updateSolver(end) {\n    //     let row = Math.floor(this.position.y / this.size.h);\n    //     let col = Math.floor(this.position.x / this.size.w);\n    //     let start = this.cells[index(row, col, this.cellCount)];\n    //     this.solver.updateSolver(start, end);\n    // }\n\n    updateSolver(startIdx, endIdx) {\n        // debugger\n        // if (!this.finished) return;\n        // debugger\n        this.cells.forEach(cell => {\n            cell.node.f = 0;\n            cell.node.g = 0;\n            cell.node.h = 0;\n            cell.node.visited = false;\n            cell.node.parent = null;\n            // cell.node.position = Object.assign(cell.node.position);\n        });\n        // console.log(this.path, '-------------')\n\n        // this.enemy.updateSolver(end);\n        // this.start = startIdx;\n        // this.end = endIdx;\n        this.start = this.cells[startIdx];\n        this.end = this.cells[endIdx];\n        this.openSet.push(this.start);\n        this.closedSet = [];\n        this.finished = false;\n        // this.path.clear();\n        this.initialTime = Date.now();\n        // debugger\n    }\n\n    // updateSolver(start, end) {\n    //     this.start = start;\n    //     this.end = end;\n    //     this.openSet.push(this.start);\n    //     this.closedSet = [];\n    //     this.finished = false;\n    //     this.path.clear();\n    //     this.initialTime = Date.now();\n    // }\n\n    update() {\n        if (!this.start || !this.end) return;\n        if (this.openSet.length > 0) {\n            // console.log(this.openSet);\n            let winner = 0;\n            this.openSet.forEach((cell, idx) => {\n                if (!cell) { console.log(this.openSet) }\n                if (cell.node.f < this.openSet[winner].node.f) winner = idx;\n            });\n\n            const current = this.openSet[winner];\n            if (current === this.end) {\n                // console.log(`${(Date.now() - this.initialTime) / 1000.0} seconds`)\n                this.path.clear();\n                let temp = current.node;\n                this.path.addNode(temp);\n                while (temp.parent) {\n                    this.path.addNode(temp.parent);\n                    temp = temp.parent;\n                }\n                this.finished = true;\n                this.openSet = [];\n                // console.log('done');\n                return;\n            }\n            // remove current from open set\n            for (let i = this.openSet.length - 1; i >= 0; i--) {\n                if (this.openSet[i] === current) {\n                    this.openSet.splice(i, 1);\n                    break;\n                }\n            }\n            // add current to closed set \n            // const neighbors = current.neighbors.filter(obj => !Object.keys(current.walls)\n            //     .includes(Object.keys(obj)[0]))\n            const neighbors = current.neighbors.filter(obj => Object.keys(current.node.neighbors)\n                .includes(Object.keys(obj)[0]))\n                .map(obj => Object.values(obj)[0]);\n            neighbors.forEach(neighbor => {\n                if (!neighbor.node.visited) {\n                    // if (!this.closedSet.includes(neighbor)) {\n                    const tentativeG = current.node.g + 1;\n                    let newPath = false;\n                    if (this.openSet.includes(neighbor) && tentativeG < neighbor.node.g) {\n                        neighbor.node.g = tentativeG;\n                        newPath = true;\n                        neighbor.node.visited = true;\n                    } else {\n                        neighbor.node.g = tentativeG;\n                        this.openSet.push(neighbor);\n                        neighbor.node.visited = true;\n                        newPath = true;\n                    }\n\n                    if (newPath) {\n                        neighbor.node.h = heuristic(neighbor.node, this.end.node);\n                        neighbor.node.f = neighbor.node.g + neighbor.node.h;\n                        neighbor.node.parent = current.node;\n                    }\n                }\n            });\n            current.node.visited = true;\n            this.closedSet.push(current);\n            // console.log('solving...')\n        }\n    }\n\n    render(ctx) {\n        // if (!this.finished) return;\n        this.path.render(ctx);\n    }\n}\n\nmodule.exports = A_Star;\n\n//# sourceURL=webpack:///./src/maze/solver/a_star.js?");

/***/ }),

/***/ "./src/maze/solver/node.js":
/*!*********************************!*\
  !*** ./src/maze/solver/node.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Vector = __webpack_require__(/*! ../../utils/vector */ \"./src/utils/vector.js\");\n\nclass Node {\n    constructor(i, j, size) {\n        this.i = i;\n        this.j = j;\n        this.position = new Vector((j * size.w) + (size.w / 2), (i * size.h) + (size.h / 2));\n\n        // fix to empty\n        this.neighbors = {\n            // \"north\": Infinity,\n            // \"east\": Infinity,\n            // \"south\": Infinity,\n            // \"west\": Infinity\n        };\n        this.size = size;\n        this.radius = 2;\n        this.visited = false;\n    }\n\n    resize() {\n        this.position.x = (this.j * this.size.w) + (this.size.w / 2);\n        this.position.y = (this.i * this.size.h) + (this.size.h / 2);\n    }\n}\n\nmodule.exports = Node;\n\n//# sourceURL=webpack:///./src/maze/solver/node.js?");

/***/ }),

/***/ "./src/maze/solver/path.js":
/*!*********************************!*\
  !*** ./src/maze/solver/path.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Path {\n    constructor(nodes) {\n        this.nodes = nodes || [];\n        this.radius = 20;\n\n        this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);\n    }\n\n    clear() {\n        this.nodes = [];\n    }\n\n    addNode(node) {\n        this.nodes.push(node);\n    }\n\n    getStart() {\n        return this.nodes[0].position;\n    }\n\n    getEnd() {\n        return this.nodes[this.points.length - 1].position;\n    }\n\n    render(ctx) {\n        let current, next;\n        for (let i = 0; i < this.nodes.length - 1; i++) {\n            ctx.strokeStyle = this.color;\n            // ctx.strokeStyle = \"#f00\";\n            ctx.strokeWidth = 2;\n            current = this.nodes[i];\n            next = this.nodes[i + 1];\n            ctx.beginPath();\n            ctx.moveTo(current.position.x, current.position.y);\n            ctx.lineTo(next.position.x, next.position.y);\n            ctx.stroke();\n            ctx.closePath();\n        }\n    }\n}\n\nmodule.exports = Path;\n\n//# sourceURL=webpack:///./src/maze/solver/path.js?");

/***/ }),

/***/ "./src/maze/wall.js":
/*!**************************!*\
  !*** ./src/maze/wall.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Wall {\n    constructor(p1, p2) {\n        this.p1 = p1\n        this.p2 = p2\n\n        this.a = this.p2.y - this.p1.y;\n        this.b = this.p1.x - this.p2.x;\n        this.c = this.a * this.p1.x + this.b * this.p1.y;\n    }\n\n    render() {\n        ctx.beginPath();\n        ctx.moveTo(this.p1.x, this.p1.y);\n        ctx.lineTo(this.p2.x, this.p2.y);\n        ctx.closePath();\n        ctx.stroke();\n    }\n}\n\nmodule.exports = Wall;\n\n//# sourceURL=webpack:///./src/maze/wall.js?");

/***/ }),

/***/ "./src/utils/input.js":
/*!****************************!*\
  !*** ./src/utils/input.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const KEYS = __webpack_require__(/*! ./keys */ \"./src/utils/keys.js\");\n\nclass InputManager {\n    constructor() {\n        this.pressedKeys = {};\n\n        window.addEventListener('keydown', e => this.setKey(e, true));\n        window.addEventListener('keyup', e => this.setKey(e, false));\n    }\n\n    setKey(e, status) {\n        e.preventDefault();\n        let key;\n        switch (e.keyCode) {\n            case 32:\n                key = KEYS.SPACE;\n                break;\n            case 65:\n                key = KEYS.LEFT;\n                break;\n            case 87:\n                key = KEYS.UP;\n                break;\n            case 68:\n                key = KEYS.RIGHT;\n                break;\n            case 83:\n                key = KEYS.DOWN;\n                break;\n            case 37:\n                key = KEYS.LEFT;\n                break;\n            case 38:\n                key = KEYS.UP;\n                break;\n            case 39:\n                key = KEYS.RIGHT;\n                break;\n            case 40:\n                key = KEYS.DOWN;\n                break;\n            default:\n                // Convert ASCII codes to letters\n                key = String.fromCharCode(e.keyCode);\n\n        }\n\n        this.pressedKeys[key] = status;\n    }\n\n    isPressed(key) {\n        return this.pressedKeys[key];\n    }\n}\n\nmodule.exports = InputManager;\n\n//# sourceURL=webpack:///./src/utils/input.js?");

/***/ }),

/***/ "./src/utils/keys.js":
/*!***************************!*\
  !*** ./src/utils/keys.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n    SPACE: \"SPACE\",\n    LEFT: \"LEFT\",\n    UP: \"UP\",\n    RIGHT: \"RIGHT\",\n    DOWN: \"DOWN\"\n};\n\n//# sourceURL=webpack:///./src/utils/keys.js?");

/***/ }),

/***/ "./src/utils/resource_manager.js":
/*!***************************************!*\
  !*** ./src/utils/resource_manager.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class ResourceManager {\n    constructor() {\n        this.resourceCache = {};\n        this.loading = [];\n        this.callbacks = [];\n    }\n\n    load(resource) {\n        if (resource instanceof Object) {\n            Object.keys(resource).forEach(key => this._load(key, resource[key]));\n        } else this._load(resource);\n    }\n\n    _load(key, url) {\n        if (this.resourceCache[key]) return this.resourceCache[key];\n        else {\n            this.loading.push(url);\n\n            const img = new Image();\n            img.onload = () => {\n                this.resourceCache[key] = img;\n                if (this.isReady()) this.callbacks.forEach(cb => cb());\n            }\n            img.src = url;\n            this.resourceCache[key] = img;\n        }\n    }\n\n    get(url) {\n        return this.resourceCache[url];\n    }\n\n    isReady() {\n        let ready = true;\n        for (let k in this.resourceCache) {\n            if (this.resourceCache.hasOwnProperty(k) && !(this.resourceCache[k]))\n                ready = false;\n        };\n        return ready;\n    }\n\n    onReady(func) {\n        this.callbacks.push(func);\n    }\n}\n\nmodule.exports = ResourceManager;\n\n//# sourceURL=webpack:///./src/utils/resource_manager.js?");

/***/ }),

/***/ "./src/utils/utils.js":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Utils {\n    static index(i, j, rows) {\n        return i + (j * rows);\n    }\n\n    static clamp(num, min, max) {\n        return Math.max(min, Math.min(num, max))\n    }\n\n    static heuristic(a, b) {\n        const dx = b.position.x - a.position.x;\n        const dy = b.position.y - a.position.y;\n        return Math.sqrt(dx * dx + dy * dy);\n        // return Math.abs(dx) + Math.abs(dy);\n    };\n\n    static map(num, x1, y1, x2, y2) {\n        return (num - x1) * (y2 - x2) / (y1 - x1) + x2;\n    }\n}\n\nmodule.exports = Utils;\n\n//# sourceURL=webpack:///./src/utils/utils.js?");

/***/ }),

/***/ "./src/utils/vector.js":
/*!*****************************!*\
  !*** ./src/utils/vector.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Vector {\n    constructor(x, y) {\n        this.x = x || 0;\n        this.y = y || 0;\n    }\n\n    // return the angle of the vector in radians\n    getDirection() {\n        return Math.atan2(this.y, this.x);\n    };\n\n    // set the direction of the vector in radians\n    setDirection(direction) {\n        var magnitude = this.getMagnitude();\n        this.x = Math.cos(direction) * magnitude;\n        this.y = Math.sin(direction) * magnitude;\n        return this;\n    };\n\n    // get the magnitude of the vector\n    getMagnitude() {\n        // use pythagoras theorem to work out the magnitude of the vector\n        return Math.sqrt(this.x * this.x + this.y * this.y);\n    };\n\n    // set the magnitude of the vector\n    setMagnitude(magnitude) {\n        var direction = this.getDirection();\n        this.x = Math.cos(direction) * magnitude;\n        this.y = Math.sin(direction) * magnitude;\n        return this;\n    };\n\n    static add(v1, v2) {\n        return new Vector(v1.x + v2.x, v1.y + v2.y);\n        // this.x += vector.x;\n        // this.y += vector.y;\n    }\n\n    static sub(v1, v2) {\n        return new Vector(v1.x - v2.x, v1.y - v2.y);\n        // this.x -= vector.x;\n        // this.y -= vectory.y;\n    }\n\n    static mult(v, scalar) {\n        return new Vector(v.x * scalar, v.y * scalar);\n        // this.x *= scalar;\n        // this.y *= scalar;\n    }\n\n    static div(v, scalar) {\n        return new Vector(v.x / scalar, v.y / scalar);\n        // this.x /= scalar;\n        // this.y /= scalar;\n    }\n\n    add(vector) {\n        // return new Vector(this.x + vector.x, this.y + vector.y);\n        // debugger\n        this.x += vector.x;\n        this.y += vector.y;\n        return this;\n    }\n\n    subtract(vector) {\n        // return new Vector(this.x - vector.x, this.y - vector.y);\n        this.x = vector.x - this.x;\n        this.y = vector.y - this.y;\n        return this;\n    }\n\n    multiply(scalar) {\n        // return new Vector(this.x * scalar, this.y * scalar);\n        this.x *= scalar;\n        this.y *= scalar;\n        return this;\n    }\n\n    divide(scalar) {\n        // return new Vector(this.x / scalar, this.y / scalar);\n        this.x /= scalar;\n        this.y /= scalar;\n        return this;\n    }\n\n    dot(vector) {\n        // debugger\n        return (this.x * vector.x) + (this.y * vector.y);\n    }\n\n    angleBetween(vector, degrees) {\n        const step = this.dot(vector) / (this.getMagnitude() * vector.getMagnitude());\n        const theta = Math.acos(step);\n        if (degrees) return theta * 180 / Math.PI;\n        else return theta;\n    }\n\n    normalize() {\n        const dist = this.getMagnitude();\n        return new Vector(this.x / dist, this.y / dist);\n    }\n\n    project(vector) {\n        const normal = vector.normalize();\n        return normal.multiply(this.dot(normal));\n    }\n\n    limit(scalar) {\n        const limited = this.normalize().multiply(Math.min(this.getMagnitude(), scalar));\n        this.x = limited.x;\n        this.y = limited.y;\n        return this;\n    }\n\n    dist(vector) {\n        const dx = vector.x - this.x;\n        const dy = vector.y - this.y;\n        return Math.sqrt((dx * dx) + (dy * dy));\n    }\n\n    copy() {\n        return new Vector(this.x, this.y);\n    }\n\n    static getNormalPoint(p, a, b) {\n        const ap = Vector.sub(p, a);\n        const ab = Vector.sub(b, a);\n\n        const abNorm = ab.normalize();\n        abNorm.multiply(ap.dot(abNorm));\n\n        return Vector.add(a, abNorm);\n    }\n}\n\nmodule.exports = Vector;\n\n//# sourceURL=webpack:///./src/utils/vector.js?");

/***/ })

/******/ });