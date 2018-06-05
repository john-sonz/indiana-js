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

function beetween(val, start, end) {
    return val > start && val < end;
}
var map = void 0,
    sb = void 0,
    light = void 0,
    game = void 0;

var Collider = function () {
    function Collider(imgsrc, m, s, u, l, g) {
        _classCallCheck(this, Collider);

        this.update = u;
        map = m;
        sb = s;
        light = l;
        game = g;
        this.collisionMap = document.createElement("canvas");
        var img = new Image();
        img.src = "images/" + imgsrc;
        this.collisionMap.width = img.width;
        this.collisionMap.height = img.height;
        console.log(this.collisionMap.width, this.collisionMap.height);
        this.collisionMap.getContext("2d").drawImage(img, 0, 0, this.collisionMap.width, this.collisionMap.height);
        this.context = this.collisionMap.getContext("2d");
        this.flags = {
            torches: [true, true, true],
            whip: true,
            cross: true
        };
        this.torchpos = [{
            x: 550,
            y: 610
        }, {
            x: 263,
            y: 98
        }, {
            x: 1785,
            y: 675
        }];
    }

    _createClass(Collider, [{
        key: "check",
        value: function check(positions) {
            var _this = this;

            var vert = false;
            var hori = false;
            var rope = false;
            var collected = false;
            if (this.flags.whip) {
                if (beetween(positions.center.y, 675, 690)) {
                    if (beetween(positions.center.x, 450, 470)) {
                        collected = "whip";
                        map.getContext("2d").fillStyle = "black";
                        map.getContext("2d").fillRect(450, 675, 20, 20);

                        this.flags.whip = false;
                    }
                }
            }
            if (this.flags.cross) {
                if (beetween(positions.center.y, 435, 455)) {
                    if (beetween(positions.center.x, 880, 900)) {
                        collected = "cross";
                        var sbctx = sb.getContext("2d");
                        sbctx.fillStyle = "black";
                        sbctx.drawImage(map, 435, 455, 20, 20, 175, 25, 25, 25);

                        map.getContext("2d").fillStyle = "black";
                        map.getContext("2d").fillRect(435, 455, 20, 20);
                        console.log(collected);
                        this.flags.cross = false;
                        this.update.needsUpdate = true;
                    }
                }
            }
            this.flags.torches.forEach(function (flag, i) {
                if (flag) {
                    if (beetween(positions.center.y, _this.torchpos[i].y, _this.torchpos[i].y + 20)) {
                        if (beetween(positions.center.x, _this.torchpos[i].x, _this.torchpos[i].x + 20)) {
                            collected = "torch";
                            var _sbctx = sb.getContext("2d");
                            _sbctx.fillStyle = "black";
                            _sbctx.fillRect(135, 25, 20, 20);
                            _sbctx.drawImage(map, _this.torchpos[i].x, _this.torchpos[i].y, 20, 20, 135, 25, 25, 25);
                            map.getContext("2d").fillStyle = "black";
                            map.getContext("2d").fillRect(_this.torchpos[i].x, _this.torchpos[i].y, 20, 20);
                            _this.flags.torches[i] = false;
                            _this.update.needsUpdate = true;
                            light.resetTimeout();
                        }
                    }
                }
            });

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = positions.y[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var pos = _step.value;

                    var p = this.context.getImageData(parseInt(pos.x), parseInt(pos.y), 1, 1).data;
                    var color = p[0] + " " + p[1] + " " + p[2] + " " + p[3];
                    if (p[3] === 255) {
                        if (color === "255 255 255 255") {
                            return {
                                x: hori,
                                y: vert,
                                rope: true
                            };
                        }
                        if (color === "0 0 0 255") {
                            vert = true;
                            break;
                        }
                        if (color === "237 119 15 255") {
                            vert = true;
                            break;
                        }
                        if (color === "255 0 0 255") {
                            game.end();
                            break;
                        }
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
                    if (p[3] === 255) {

                        if (color === "255 255 255 255") {
                            return {
                                x: hori,
                                y: vert,
                                rope: true
                            };
                        }
                        if (color === "0 0 0 255") {
                            hori = true;
                            break;
                        }
                        if (color === "237 119 15 255") {
                            hori = true;
                            break;
                        }
                        if (color === "255 0 0 255") {
                            game.end();
                            break;
                        }
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
                y: vert,
                rope: rope,
                collected: collected
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

var _Light = __webpack_require__(/*! ./Light.js */ "./src/js/Light.js");

var _Light2 = _interopRequireDefault(_Light);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(spriteSheet, imgs) {
        _classCallCheck(this, Game);

        var indie = (0, _entities.createIndie)(spriteSheet);
        var gravity = 0.3;
        var camera = new _Camera2.default();
        var scoreboard = {
            needsUpdate: false
        };
        var light = new _Light2.default();

        var collider = new _Collider2.default("collision1-1.png", imgs.bg, imgs.score, scoreboard, light, this);
        this.playing = false;
        this.play = function (images, ctx, canvas) {
            var this_ = this;
            light.resetTimeout();
            indie.vel.set(0, 0);
            ctx.drawImage(images.score, 10, 260, 620, 130);
            this_.ctx = ctx;
            function render() {
                ctx.fillStyle = "green";
                ctx.fillRect(0, 0, 640, 250);
                ctx.drawImage(images.bg, camera.pos.x, camera.pos.y, 320, 125, 0, 0, 640, 250);
                indie.draw(ctx, camera);
                console.log(light.alpha);
                if (light.alpha > 0) {
                    ctx.fillStyle = "rgba(0,0,0," + light.alpha + ")";
                    ctx.fillRect(0, 0, 640, 250);
                }
                if (light.alpha > 0.85) {
                    this_.end();
                }
                if (scoreboard.needsUpdate) {
                    ctx.drawImage(images.score, 10, 260, 620, 130);
                    scoreboard.needsUpdate = false;
                }
                if (this_.playing) {
                    requestAnimationFrame(render);
                }
            }

            function update() {
                if (this_.playing) {
                    indie.update(collider, camera);
                }
            };
            setInterval(update, 15);
            render();
        };
    }

    _createClass(Game, [{
        key: "start",
        value: function start(images, ctx, canvas) {
            this.playing = true;
            this.play(images, ctx, canvas);
        }
    }, {
        key: "end",
        value: function end() {
            this.playing = false;
            var ctx = this.ctx;

            function endScreen() {
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, 640, 400);
                ctx.fillStyle = "#d0dc71";
                ctx.fillText("YOU LOST", 640 / 2, 400 * 0.65);
                requestAnimationFrame(endScreen);
            }
            endScreen();
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
        this.listeners = new Map();
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
            if (keyState === 1 && this.listeners.has(key)) this.listeners.get(key)();
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
    }, {
        key: 'setListener',
        value: function setListener(key, listener) {
            this.keyStates.set(key, 0);
            this.listeners.set(key, listener);
        }
    }]);

    return Keyboard;
}();

exports.default = Keyboard;

/***/ }),

/***/ "./src/js/Light.js":
/*!*************************!*\
  !*** ./src/js/Light.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Light = function () {
    function Light() {
        _classCallCheck(this, Light);

        this.alpha = 0;
        this.timeout = 0;
    }

    _createClass(Light, [{
        key: "updateAlpha",
        value: function updateAlpha() {
            var _this = this;

            this.alpha += 0.15;
            this.timeout = setTimeout(function () {
                return _this.updateAlpha();
            }, 10000);
        }
    }, {
        key: "resetAlpha",
        value: function resetAlpha() {
            this.alpha = 0;
        }
    }, {
        key: "resetTimeout",
        value: function resetTimeout() {
            var _this2 = this;

            this.resetAlpha();
            clearTimeout(this.timeout);
            this.timeout = setTimeout(function () {
                return _this2.updateAlpha();
            }, 10000);
        }
    }]);

    return Light;
}();

exports.default = Light;

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
            var _this = this;

            var t = [];
            [false, true].map(function (reverse) {
                var buffer = document.createElement("canvas");
                buffer.width = width;
                buffer.height = height;
                var context = buffer.getContext("2d");
                if (reverse) {
                    context.translate(width, 0);
                    context.scale(-1, 1);
                }
                context.drawImage(_this.image, x, y, width, height, 0, 0, width, height);
                t.push(buffer);
            });
            this.sprites.set(name, t);
        }
    }, {
        key: "defineAnim",
        value: function defineAnim(spec) {
            for (var i = 0; i < spec.frames.length; i++) {
                var f = spec.frames[i];
                this.define(spec.name + i, f.pos.x, f.pos.y, f.width, f.height);
            }
        }
    }, {
        key: "draw",
        value: function draw(name, context, x, y) {
            var reverse = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

            var buffer = this.sprites.get(name);
            context.drawImage(buffer[reverse ? 1 : 0], x, y);
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

var _specs = __webpack_require__(/*! ./specs.js */ "./src/js/specs.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createIndie(image) {
    var indie = new _Entity2.default();
    indie.pos.set(50, 330);
    indie.speed = 2.5;
    indie.size = new _math.Vec2(15, 25);
    indie.whips = 0;
    var sprites = new _SpriteSet2.default(image, 30, 50);
    sprites.define("idle", 0, 0, 30, 50);
    sprites.define("jump", 81, 68, 34, 50);
    sprites.defineAnim(_specs.specs.run);
    sprites.defineAnim(_specs.specs.climb);
    console.log(sprites);
    var input = new _Keyboard2.default();
    var ropeMode = false;
    input.listenTo(window);

    input.setListener("KeyW", function (e) {
        if (ropeMode) {
            return;
        } else if (!indie.jumping && !(input.keyStates.get("KeyA") || input.keyStates.get("KeyD"))) {
            indie.vel.y = -9.5;
            indie.jumping = true;
        }
    });
    input.setListener("KeyE", function (e) {
        if (!indie.jumping) {
            ropeMode = false;
            indie.vel.y = -9.5;
            indie.vel.x = indie.speed;
            indie.jumping = true;
            indie.update();
        }
    });
    input.setListener("KeyQ", function (e) {
        if (!indie.jumping) {
            ropeMode = false;
            indie.vel.y = -9.5;
            indie.vel.x = -indie.speed;
            indie.jumping = true;
            indie.update();
        }
    });
    var distance = 0;
    var gravity = 1;
    var resistance = 0.95;
    indie.collisionPoints = {
        y: [new _math.Vec2(), new _math.Vec2(), new _math.Vec2()],
        x: [new _math.Vec2(), new _math.Vec2(), new _math.Vec2(), new _math.Vec2()],
        center: new _math.Vec2()
    };
    indie.updateCollisionPoints = function () {
        this.collisionPoints.y[0].set(this.pos.x + this.size.x / 6 * 5, this.pos.y + this.size.y - 2);
        this.collisionPoints.y[1].set(this.pos.x + this.size.x / 6, this.pos.y + this.size.y - 2);
        this.collisionPoints.y[2].set(this.pos.x + this.size.x / 2, this.pos.y + 2);

        this.collisionPoints.x[0].set(this.pos.x + 2, this.pos.y + this.size.y / 6 * 5);
        this.collisionPoints.x[1].set(this.pos.x + 2, this.pos.y + this.size.y / 6);
        this.collisionPoints.x[2].set(this.pos.x + this.size.x - 2, this.pos.y + this.size.y / 6 * 5);
        this.collisionPoints.x[3].set(this.pos.x + this.size.x - 2, this.pos.y + this.size.y / 6);

        this.collisionPoints.center.set(this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);
    };
    indie.update = function (collider) {
        if (!ropeMode) {
            if (!this.jumping) {
                this.vel.x = (-input.keyStates.get("KeyA") + input.keyStates.get("KeyD")) * this.speed;
            } else {
                this.vel.x *= resistance;
            }
            this.vel.y += gravity;
            if (this.vel.y > 6) {
                this.vel.y = 2;
                this.jumping = true;
            }
        } else {
            this.vel.x = 0;
            this.vel.y = (-input.keyStates.get("KeyW") + input.keyStates.get("KeyS")) * 1.5;
        }
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        if (this.pos.x < 0) this.pos.x = 0;
        if (this.pos.y < gravity) this.pos.y = gravity;
        if (this.pos.x > 2115 - indie.size.x) this.pos.x = 2115 - indie.size.x;
        if (this.pos.y > 709 - indie.size.y) indie.pos.y = 709 - indie.size.y;

        if (collider) {
            this.updateCollisionPoints();
            var collision = collider.check(this.collisionPoints);
            if (collision.rope) {
                ropeMode = true;
                this.jumping = false;
                this.pos.x += 2 * this.vel.x;
            } else {
                ropeMode = false;
                if (collision.x) {
                    this.pos.x -= this.vel.x;
                } else distance += Math.abs(this.vel.x);
                if (collision.y) {
                    this.pos.y -= this.vel.y;
                    this.jumping = false;
                }
                if (collision.collected === "whip") this.whips += 5;
            }
        }
    };

    var lastDir = 0;
    var ropeDistance = 0;
    indie.resolveFrame = function (len) {
        if (ropeMode) {
            if (this.vel.y !== 0) {
                var n = Math.floor(distance / (len * 2) % _specs.specs.climb.frames.length);
                distance += 1.5;
                return "climb" + n;
            }
            return "climb0";
        }
        if (this.jumping) return "jump";
        if (this.vel.x !== 0) {
            var _n = Math.floor(distance / len % _specs.specs.run.frames.length);
            return "run" + _n;
        }
        return "idle";
    };

    indie.draw = function (ctx, camera) {
        var xDir = this.vel.x !== 0 ? parseInt(this.vel.x / Math.abs(this.vel.x)) : lastDir;
        lastDir = xDir;
        camera.focus(this.pos, {
            x: xDir,
            y: parseInt(this.vel.y)
        });
        camera.check();
        sprites.draw(this.resolveFrame(5), ctx, (this.pos.x - camera.pos.x) * 2, (this.pos.y - camera.pos.y) * 2, xDir == -1);
        if (distance > 10000) distance = 0;
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

var map = document.createElement("canvas");
var scoreboard = document.createElement("canvas");
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
            m = _ref2[1],
            spriteSheet = _ref2[2],
            scbrd = _ref2[3],
            coll = _ref2[4];

        map.width = 2115;
        map.height = 709;
        map.getContext("2d").drawImage(m, 0, 0, 2115, 709);
        scoreboard.width = 269;
        scoreboard.height = 57;
        scoreboard.getContext("2d").drawImage(scbrd, 0, 0, 269, 57);

        ctx.drawImage(logo, 120, 30, 400, 126);
        ctx.font = "40px Cousine, monospace";
        ctx.textAlign = "center";
        var text = false;
        var start = false;
        var ts = void 0;

        function startScreen() {
            if (text) {
                ctx.fillStyle = "#d0dc71";
                ctx.fillText("PRESS ENTER TO START", canvas.width / 2, canvas.height * 0.65);
            } else {
                ctx.fillStyle = "black";
                ctx.fillRect(0, 200, canvas.width, canvas.height);
            }
            if (!start) {
                ts = requestAnimationFrame(startScreen);
            } else {
                cancelAnimationFrame(ts);
            }
        };
        setInterval(function () {
            return text = !text;
        }, 1000);
        ts = requestAnimationFrame(startScreen);
        var gameImgs = {
            bg: map,
            score: scoreboard
        };
        var game = new _Game2.default(spriteSheet, gameImgs);

        window.addEventListener("keydown", function (e) {
            if (e.key == "Enter") {
                start = true;
                cancelAnimationFrame(ts);
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
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

/***/ }),

/***/ "./src/js/specs.js":
/*!*************************!*\
  !*** ./src/js/specs.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var specs = exports.specs = {
    run: {
        "name": "run",
        "frames": [{
            "pos": {
                "x": 120,
                "y": 0
            },
            "width": 25,
            "height": 50
        }, {
            "pos": {
                "x": 180,
                "y": 0
            },
            "width": 25,
            "height": 50
        }, {
            "pos": {
                "x": 240,
                "y": 0
            },
            "width": 30,
            "height": 50
        }, {
            "pos": {
                "x": 280,
                "y": 0
            },
            "width": 30,
            "height": 50
        }, {
            "pos": {
                "x": 350,
                "y": 0
            },
            "width": 25,
            "height": 50
        }, {
            "pos": {
                "x": 410,
                "y": 0
            },
            "width": 30,
            "height": 50
        }, {
            "pos": {
                "x": 449,
                "y": 0
            },
            "width": 30,
            "height": 50
        }, {
            "pos": {
                "x": 488,
                "y": 0
            },
            "width": 30,
            "height": 50
        }]
    },
    climb: {
        "name": "climb",
        "frames": [{
            "pos": {
                "x": 217,
                "y": 64
            },
            "width": 20,
            "height": 50
        }, {
            "pos": {
                "x": 250,
                "y": 64
            },
            "width": 20,
            "height": 50
        }]
    }
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map