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

/***/ "./src/js/Camera.js":
/*!**************************!*\
  !*** ./src/js/Camera.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _math = __webpack_require__(/*! ./math */ "./src/js/math.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Camera = function () {
    function Camera() {
        _classCallCheck(this, Camera);

        this.pos = new _math.Vec2(0, 0);
        this.size = new _math.Vec2(2115 - 320, 709 - 125);
    }

    _createClass(Camera, [{
        key: "focus",
        value: function focus(pos, dir) {
            if (dir.x > 0) {
                if (pos.x - this.pos.x >= 200) this.pos.x = pos.x - 200;
            } else if (dir.x < 0) {
                if (pos.x - this.pos.x <= 100) this.pos.x = pos.x - 100;
            }
            this.pos.y = pos.y - 25;
        }
    }, {
        key: "check",
        value: function check() {
            if (this.pos.x > this.size.x) this.pos.x = this.size.x;
            if (this.pos.y > this.size.y) this.pos.y = this.size.y;
            if (this.pos.x < 0) this.pos.x = 0;
            if (this.pos.y < 0) this.pos.y = 0;
        }
    }]);

    return Camera;
}();

exports.default = Camera;

/***/ }),

/***/ "./src/js/Collider.js":
/*!****************************!*\
  !*** ./src/js/Collider.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Collider = function () {
    function Collider(imgsrc) {
        _classCallCheck(this, Collider);

        this.collisionMap = document.createElement("canvas");
        var img = new Image();
        img.src = "images/" + imgsrc;
        this.collisionMap.width = img.width;
        this.collisionMap.height = img.height;
        console.log(this.collisionMap.width, this.collisionMap.height);
        this.collisionMap.getContext("2d").drawImage(img, 0, 0, this.collisionMap.width, this.collisionMap.height);
        this.context = this.collisionMap.getContext("2d");
    }

    _createClass(Collider, [{
        key: "check",
        value: function check(positions) {
            var vert = false;
            var hori = false;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = positions.y[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var pos = _step.value;

                    var p = this.context.getImageData(pos.x, pos.y, 1, 1).data;
                    var color = p[0] + " " + p[1] + " " + p[2] + " " + p[3];
                    if (color === "0 0 0 255") {
                        vert = true;
                        break;
                    }
                    if (color === "237 119 15 255") {
                        vert = true;
                        break;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = positions.x[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _pos = _step2.value;

                    var p = this.context.getImageData(_pos.x, _pos.y, 1, 1).data;
                    var color = p[0] + " " + p[1] + " " + p[2] + " " + p[3];
                    if (color === "0 0 0 255") {
                        hori = true;
                        break;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return {
                x: hori,
                y: vert
            };
        }
    }]);

    return Collider;
}();

exports.default = Collider;

/***/ }),

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

var _Camera = __webpack_require__(/*! ./Camera.js */ "./src/js/Camera.js");

var _Camera2 = _interopRequireDefault(_Camera);

var _Collider = __webpack_require__(/*! ./Collider.js */ "./src/js/Collider.js");

var _Collider2 = _interopRequireDefault(_Collider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(spriteSheet) {
        _classCallCheck(this, Game);

        var indie = (0, _entities.createIndie)(spriteSheet);
        var gravity = 0.3;
        var camera = new _Camera2.default();
        var collider = new _Collider2.default("collision1-1.png");
        this.play = function (images, ctx, canvas) {
            var this_ = this;
            indie.vel.set(0, 0);

            function render() {
                ctx.fillStyle = "green";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.drawImage(images.bg, camera.pos.x, camera.pos.y, 320, 125, 0, 0, 640, 250);

                ctx.drawImage(images.score, 10, 260, 620, 130);

                indie.update(collider);
                indie.draw(ctx, camera);
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

/***/ "./src/js/Keyboard.js":
/*!****************************!*\
  !*** ./src/js/Keyboard.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Keyboard = function () {
    function Keyboard() {
        _classCallCheck(this, Keyboard);

        this.keyStates = new Map();
    }

    _createClass(Keyboard, [{
        key: 'handleEvent',
        value: function handleEvent(e) {
            var key = e.code;
            if (!this.keyStates.has(key)) {
                return;
            }
            e.preventDefault();
            var keyState = e.type === 'keydown' ? 1 : 0;
            if (this.keyStates.get(key) === keyState) return;
            this.keyStates.set(key, keyState);
        }
    }, {
        key: 'listenTo',
        value: function listenTo(window) {
            var _this = this;

            ['keydown', 'keyup'].forEach(function (eName) {
                window.addEventListener(eName, function (e) {
                    _this.handleEvent(e);
                });
            });
            ["KeyA", "KeyW", "KeyD", "KeyS"].forEach(function (key) {
                return _this.keyStates.set(key, 0);
            });
        }
    }]);

    return Keyboard;
}();

exports.default = Keyboard;

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

var _Keyboard = __webpack_require__(/*! ./Keyboard.js */ "./src/js/Keyboard.js");

var _Keyboard2 = _interopRequireDefault(_Keyboard);

var _math = __webpack_require__(/*! ./math */ "./src/js/math.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createIndie(image) {
    var indie = new _Entity2.default();
    indie.pos.set(50, 330);
    indie.speed = 2;
    indie.size = new _math.Vec2(15, 25);
    var sprites = new _SpriteSet2.default(image, 30, 50);
    sprites.define("idle", 0, 0, 30, 50);
    var input = new _Keyboard2.default();
    input.listenTo(window);
    var gravity = 3;
    indie.getCollisionPoints = function () {
        return {
            y: [new _math.Vec2(this.pos.x + this.size.x / 6 * 5, this.pos.y + this.size.y), new _math.Vec2(this.pos.x + this.size.x / 6, this.pos.y + this.size.y), new _math.Vec2(this.pos.x + this.size.x / 6 * 5, this.pos.y), new _math.Vec2(this.pos.x + this.size.x / 6, this.pos.y)],
            x: [new _math.Vec2(this.pos.x, this.pos.y + this.size.y / 6 * 5), new _math.Vec2(this.pos.x, this.pos.y + this.size.y / 6), new _math.Vec2(this.pos.x + this.size.x, this.pos.y + this.size.y / 6 * 5), new _math.Vec2(this.pos.x + this.size.x, this.pos.y + this.size.y / 6)]
        };
    };
    indie.update = function (collider) {
        this.vel.x = (-input.keyStates.get("KeyA") + input.keyStates.get("KeyD")) * this.speed;
        this.vel.y = (-input.keyStates.get("KeyW") + input.keyStates.get("KeyS")) * 5;
        this.vel.y += 0.5;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        if (this.pos.x < 0) this.pos.x = 0;
        if (this.pos.y < gravity) this.pos.y = gravity;
        if (this.pos.x > 2115 - indie.size.x) this.pos.x = 2115 - indie.size.x;
        if (this.pos.y > 709 - indie.size.y) indie.pos.y = 709 - indie.size.y;
        var collision = collider.check(this.getCollisionPoints());
        if (collision.x) this.pos.x -= this.vel.x;
        if (collision.y) this.pos.y -= this.vel.y;else {
            this.pos.y += gravity;
        }
    };
    indie.draw = function (ctx, camera) {
        camera.focus(this.pos, {
            x: parseInt(this.vel.x / this.speed),
            y: parseInt(this.vel.y / this.speed)
        });
        camera.check();
        sprites.draw("idle", ctx, (this.pos.x - camera.pos.x) * 2, (this.pos.y - camera.pos.y) * 2);
        var p = this.getCollisionPoints();
        [].concat(_toConsumableArray(p.x), _toConsumableArray(p.y)).forEach(function (pos) {
            ctx.beginPath();
            ctx.arc((pos.x - camera.pos.x) * 2, (pos.y - camera.pos.y) * 2, 2, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fillStyle = "white";
            ctx.fill();
        });
    };
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

var IMAGES = ["logo.png", "mapa.png", "sprites.png", "scoreboard.jpg", "collision1-1.png"];

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
        var _ref2 = _slicedToArray(_ref, 5),
            logo = _ref2[0],
            map = _ref2[1],
            spriteSheet = _ref2[2],
            scoreboard = _ref2[3],
            coll = _ref2[4];

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
            bg: coll,
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
    }, {
        key: "clone",
        value: function clone() {
            return new Vec2(this.x, this.y);
        }
    }]);

    return Vec2;
}();

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map