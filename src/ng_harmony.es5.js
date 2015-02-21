"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Harmony = exports.Harmony = (function () {
    function Harmony() {
        var _this = this;
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _classCallCheck(this, Harmony);

        this.constructor.$inject = ["$scope"];
        for (var _iterator = this.constructor.$inject.entries()[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
            var _step$value = _slicedToArray(_step.value, 2);

            var i = _step$value[0];
            var injectee = _step$value[1];
            this[injectee] = args[i];
        }
        for (var _iterator2 = this.iterate(this.constructor.prototype)[Symbol.iterator](), _step2; !(_step2 = _iterator2.next()).done;) {
            var _step2$value;
            var _ret = (function () {
                _step2$value = _slicedToArray(_step2.value, 2);
                var key = _step2$value[0];
                var fn = _step2$value[1];
                if (typeof fn !== "function" || ["constructor", "initialize"].indexOf(key) !== -1 || key[0] === "_") {
                    return "continue";
                }
                if (!key.match("::")) {
                    _this.$scope[key] = function () {
                        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                            args[_key2] = arguments[_key2];
                        }

                        return fn.apply(_this, args);
                    };
                }
            })();

            if (_ret === "continue") continue;
        }
        this.initialize && typeof this.initialize === "function" && this.initialize();
        return this;
    }

    _prototypeProperties(Harmony, {
        $inject: {
            get: function () {
                return this._$inject || [];
            },
            set: function (injectees) {
                this._$inject = this.$inject.concat(injectees);
            },
            configurable: true
        },
        iterate: {
            value: function iterate(o) {
                return regeneratorRuntime.mark(function callee$2$0(_o) {
                    var _iterator, _step, key;
                    return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                        while (1) switch (context$3$0.prev = context$3$0.next) {
                            case 0:
                                _iterator = Object.keys(_o)[Symbol.iterator]();
                            case 1:
                                if ((_step = _iterator.next()).done) {
                                    context$3$0.next = 7;
                                    break;
                                }
                                key = _step.value;
                                context$3$0.next = 5;
                                return [key, _o[key]];
                            case 5:
                                context$3$0.next = 1;
                                break;
                            case 7:
                            case "end":
                                return context$3$0.stop();
                        }
                    }, callee$2$0, this);
                })(o);
            },
            writable: true,
            configurable: true
        },
        mixin: {
            value: function mixin() {
                for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
                    mixins[_key] = arguments[_key];
                }

                for (var _iterator = mixins.entries()[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
                    var _step$value = _slicedToArray(_step.value, 2);

                    var i = _step$value[0];
                    var mixin = _step$value[1];
                    for (var _iterator2 = this.iterate(mixin)[Symbol.iterator](), _step2; !(_step2 = _iterator2.next()).done;) {
                        var _step2$value = _slicedToArray(_step2.value, 2);

                        var k = _step2$value[0];
                        var v = _step2$value[1];
                        var p = this.prototype;
                        while (p[k] !== undefined && p[k] !== null) {
                            p = p.prototype;
                        }
                        Object.defineProperty(p, k, {
                            value: v,
                            enumerable: true
                        });
                    }
                }
            },
            writable: true,
            configurable: true
        }
    });

    return Harmony;
})();
var bean = _interopRequire(require("bean"));

var zest = _interopRequire(require("zest"));

var Controller = exports.Controller = (function (Harmony) {
    function Controller() {
        var _this = this;
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _classCallCheck(this, Controller);

        _get(Object.getPrototypeOf(Controller.prototype), "constructor", this).apply(this, args);
        for (var _iterator = this.iterate(this.constructor.prototype)[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
            var _step$value = _slicedToArray(_step.value, 2);

            var key = _step$value[0];
            var fn = _step$value[1];
            if (typeof fn !== "function" || ["constructor", "initialize"].indexOf(key) !== -1 || key[0] === "_") {
                continue;
            }
            if (key.match("::")) {
                var _iterator2, _step2;
                var _step2$value;
                (function () {
                    var tokens = key.split("::");
                    if (tokens[2] !== undefined && tokens[2] !== null && tokens[2].indexOf(">") !== -1) {
                        tokens = tokens.splice(0, 2).concat(tokens[0].split(">"));
                    }
                    el = _this.$element ? _this.$element.context : zest("[ng-app]", document.body)[0];
                    for (_iterator2 = (tokens[0] ? zest(tokens[0], el).entries() : [el].entries())[Symbol.iterator](); !(_step2 = _iterator2.next()).done;) {
                        _step2$value = _slicedToArray(_step2.value, 2);
                        var i = _step2$value[0];
                        var _el = _step2$value[1];
                        (function (_i, _el, _fn) {
                            __fn = function (ev) {
                                for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                                    args[_key2 - 1] = arguments[_key2];
                                }

                                if (tokens[2] !== undefined && tokens[2] !== null) {
                                    if (tokens[3] !== undefined && tokens[3] !== null) {
                                        var __el = ev.currentTarget.parentNode;
                                        while (!zest.matches(__el, tokens[3])) {
                                            __el = __el.parentNode;
                                        }
                                        var list = Array.prototype.slice.call(__el.parentNode.childNodes);
                                        _this.$scope.i = list.indexOf(__el);
                                    } else {
                                        var __el = ev.currentTarget;
                                        var list = Array.prototype.slice.call(__el.parentNode.childNodes);
                                        _this.$scope.i = list.indexOf(__el);
                                    }
                                }
                                _fn.call.apply(_fn, [_this, ev].concat(args));
                                _this._digest();
                            };
                            bean.on(_el, tokens[1], tokens[2] || __fn, tokens[2] ? __fn : null);
                        })(i, _el, fn);
                    }
                })();
            }
        }
    }

    _inherits(Controller, Harmony);

    _prototypeProperties(Controller, null, {
        _digest: {
            value: function _digest() {
                try {
                    this.$scope.$digest();
                } catch (ng_ex) {
                    "noop";
                }
            },
            writable: true,
            configurable: true
        }
    });

    return Controller;
})(Harmony);
Controller.$inject = "$element";
Object.defineProperty(exports, "__esModule", {
    value: true
});
