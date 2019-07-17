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

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Game {\n    constructor() {\n\n    }\n\n    update() {\n\n    }\n\n    render() {\n\n    }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst ResourceManager = __webpack_require__(/*! ./utils/resource_manager */ \"./src/utils/resource_manager.js\");\n\nconst assets = {\n    'baseball_bat': 'assets/images/baseball_bat.png',\n    'blue_foot': 'assets/images/blue_foot.png',\n    'blue_shoulder': 'assets/images/blue_shoulder.png',\n    'bottom_wall': 'assets/images/bottom_wall.png',\n    'bullet': 'assets/images/bullet.png',\n    'end_flag': 'assets/images/end_flag.png',\n    'green_foot': 'assets/images/green_foot.png',\n    'green_shoulder': 'assets/images/green_shoulder.png',\n    'helmet': 'assets/images/helmet.png',\n    'left_wall': 'assets/images/left_wall.png',\n    'limb': 'assets/images/limb.png',\n    'machine_gun': 'assets/images/machine_gun.png',\n    'metal_bat': 'assets/images/metal_bat.png',\n    'pistol_reload': 'assets/images/pistol_reload.png',\n    'pistol': 'assets/images/pistol.png',\n    'player_gun': 'assets/images/player_gun.png',\n    'player_hold': 'assets/images/player_hold.png',\n    'player_machine_gun_reload': 'assets/images/player_machine_gun_reload.png',\n    'player_machine_gun': 'assets/images/player_machine_gun.png',\n    'player_standing': 'assets/images/player_standing.png',\n    'right_wall': 'assets/images/right_wall.png',\n    'start_flag': 'assets/images/start_flag.png',\n};\n\nvar rm = new ResourceManager();\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    rm.load(assets);\n    const game = new Game(25, rm);\n    const start = () => {\n        let time = Date.now();\n        let dt = (time - game.initialTime) / 1000.0;\n        game.update(dt);\n        game.render();\n        game.initialTime = time;\n        requestAnimationFrame(start);\n    }\n    rm.onReady(start);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/utils/resource_manager.js":
/*!***************************************!*\
  !*** ./src/utils/resource_manager.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class ResourceManager {\n    constructor() {\n        this.resourceCache = {};\n        this.loading = [];\n        this.callbacks = [];\n    }\n\n    load(resource) {\n        if (resource instanceof Object) {\n            Object.keys(resource).forEach(key => this._load(key, resource[key]));\n        } else this._load(resource);\n    }\n\n    _load(key, url) {\n        if (this.resourceCache[key]) return this.resourceCache[key];\n        else {\n            this.loading.push(url);\n\n            const img = new Image();\n            img.onload = () => {\n                this.resourceCache[key] = img;\n                if (this.isReady()) this.callbacks.forEach(cb => cb());\n            }\n            img.src = url;\n            this.resourceCache[key] = img;\n        }\n    }\n\n    get(url) {\n        return this.resourceCache[url];\n    }\n\n    isReady() {\n        let ready = true;\n        for (let k in this.resourceCache) {\n            if (this.resourceCache.hasOwnProperty(k) && !(this.resourceCache[k]))\n                ready = false;\n        };\n        return ready;\n    }\n\n    onReady(func) {\n        this.callbacks.push(func);\n    }\n}\n\nmodule.exports = ResourceManager;\n\n//# sourceURL=webpack:///./src/utils/resource_manager.js?");

/***/ })

/******/ });