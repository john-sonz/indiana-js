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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/Entity.js":
/*!**************************!*\
  !*** ./src/js/Entity.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _math = __webpack_require__(/*! ./math */ "./src/js/math.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function Entity() {
    _classCallCheck(this, Entity);

    this.pos = new _math.Vec2(0, 0);
    this.vel = new _math.Vec2(0, 0);
};

exports.default = Entity;

/***/ }),

/***/ "./src/js/Game.js":
/*!************************!*\
  !*** ./src/js/Game.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entities = __webpack_require__(/*! ./entities.js */ "./src/js/entities.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(spriteSheet) {
        _classCallCheck(this, Game);

        var indie = (0, _entities.createIndie)(spriteSheet);
        var gravity = 0.3;
        this.play = function (images, ctx, canvas) {
            var this_ = this;
            indie.vel.x = 3;
            indie.vel.y = -5;
            function render() {
                ctx.drawImage(images.bg, 0, 270, 320, 200, 0, 0, canvas.width, 250);
                ctx.drawImage(images.score, 10, 260, 620, 130);
                indie.update();
                indie.vel.y += gravity;
                indie.draw(ctx);
                requestAnimationFrame(render);
            }
            render();
        };
    }

    _createClass(Game, [{
        key: "start",
        value: function start(images, ctx, canvas) {
            this.play(images, ctx, canvas);
        }
    }]);

    return Game;
}();

exports.default = Game;

/***/ }),

/***/ "./src/js/SpriteSet.js":
/*!*****************************!*\
  !*** ./src/js/SpriteSet.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpriteSet = function () {
    function SpriteSet(image, width, height) {
        _classCallCheck(this, SpriteSet);

        this.image = image;
        this.width = width;
        this.height = height;
        this.sprites = new Map();
    }

    _createClass(SpriteSet, [{
        key: "define",
        value: function define(name, x, y, width, height) {
            var buffer = document.createElement("canvas");
            buffer.width = width;
            buffer.height = height;
            buffer.getContext("2d").drawImage(this.image, x, y, width, height, 0, 0, width, height);
            this.sprites.set(name, buffer);
        }
    }, {
        key: "draw",
        value: function draw(name, context, x, y) {
            var buffer = this.sprites.get(name);
            context.drawImage(buffer, x, y);
        }
    }]);

    return SpriteSet;
}();

exports.default = SpriteSet;

/***/ }),

/***/ "./src/js/entities.js":
/*!****************************!*\
  !*** ./src/js/entities.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createIndie = createIndie;

var _Entity = __webpack_require__(/*! ./Entity */ "./src/js/Entity.js");

var _Entity2 = _interopRequireDefault(_Entity);

var _SpriteSet = __webpack_require__(/*! ./SpriteSet.js */ "./src/js/SpriteSet.js");

var _SpriteSet2 = _interopRequireDefault(_SpriteSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createIndie(image) {
    var indie = new _Entity2.default();
    indie.pos.set(50, 50);
    var sprites = new _SpriteSet2.default(image, 30, 50);
    sprites.define("idle", 0, 0, 30, 50);

    indie.update = function () {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    };
    indie.draw = function (ctx) {
        sprites.draw("idle", ctx, this.pos.x, this.pos.y);
    };
    console.log(indie);
    return indie;
}

/***/ }),

/***/ "./src/js/loaders.js":
/*!***************************!*\
  !*** ./src/js/loaders.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadImage = loadImage;
function loadImage(url) {
    return new Promise(function (resolve) {
        var image = new Image();
        image.addEventListener('load', function () {
            resolve(image);
        });
        image.src = "images/" + url;
    });
}

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _loaders = __webpack_require__(/*! ./loaders.js */ "./src/js/loaders.js");

var _Game = __webpack_require__(/*! ./Game.js */ "./src/js/Game.js");

var _Game2 = _interopRequireDefault(_Game);

var _SpriteSet = __webpack_require__(/*! ./SpriteSet.js */ "./src/js/SpriteSet.js");

var _SpriteSet2 = _interopRequireDefault(_SpriteSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IMAGES = ["logo.png", "mapa.png", "sprites.png", "scoreboard.jpg"];

document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("screen");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var imgs = [];
    IMAGES.forEach(function (url) {
        imgs.push((0, _loaders.loadImage)(url));
    });
    Promise.all(imgs).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 4),
            logo = _ref2[0],
            map = _ref2[1],
            spriteSheet = _ref2[2],
            scoreboard = _ref2[3];

        ctx.drawImage(logo, 120, 30, 400, 126);
        ctx.font = "40px Cousine, monospace";
        ctx.textAlign = "center";
        var text = false;
        var start = false;

        function startScreen() {
            if (text) {
                ctx.fillStyle = "#d0dc71";
                ctx.fillText("PRESS ENTER TO START", canvas.width / 2, canvas.height * 0.65);
            } else {
                ctx.fillStyle = "black";
                ctx.fillRect(0, 200, canvas.width, canvas.height);
            }
            if (!start) {
                requestAnimationFrame(startScreen);
            } else {
                ctx.fillStyle = "black";
                ctx.fillRect(0, 200, canvas.width, canvas.height);
            }
        };
        setInterval(function () {
            return text = !text;
        }, 1000);
        var ts = requestAnimationFrame(startScreen);
        var game = new _Game2.default(spriteSheet);
        var gameImgs = {
            bg: map,
            score: scoreboard
        };

        window.addEventListener("keydown", function (e) {
            if (e.key == "Enter") {
                start = true;
                cancelAnimationFrame(ts);
                game.start(gameImgs, ctx, canvas);
            }
        });
    });
});

/***/ }),

/***/ "./src/js/math.js":
/*!************************!*\
  !*** ./src/js/math.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vec2 = exports.Vec2 = function () {
    function Vec2(x, y) {
        _classCallCheck(this, Vec2);

        this.x = x;
        this.y = y;
    }

    _createClass(Vec2, [{
        key: "set",
        value: function set(x, y) {
            this.x = x;
            this.y = y;
        }
    }]);

    return Vec2;
}();

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map