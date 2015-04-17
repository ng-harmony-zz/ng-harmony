"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Harmony = (function () {
    function Harmony() {
        var _this = this;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _classCallCheck(this, Harmony);

        this.constructor.$inject = ["$scope"];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.constructor.$inject.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _step$value = _slicedToArray(_step.value, 2);

                var i = _step$value[0];
                var injectee = _step$value[1];

                this[injectee] = args[i];
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator["return"]) {
                    _iterator["return"]();
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
            var _loop = function () {
                _step2$value = _slicedToArray(_step2.value, 2);
                var key = _step2$value[0];
                var fn = _step2$value[1];

                if (typeof fn !== "function" || key === "constructor" || key[0] === "_" || key.match("::")) {
                    return "continue";
                }
                _this.$scope[key] = function () {
                    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                        args[_key2] = arguments[_key2];
                    }

                    return fn.apply(_this, args);
                };
            };

            for (var _iterator2 = this.iterate(this.constructor.prototype)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _step2$value;

                var _ret = _loop();

                if (_ret === "continue") continue;
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                    _iterator2["return"]();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    }

    _createClass(Harmony, [{
        key: "toString",
        value: function toString() {
            return this.name || _get(Object.getPrototypeOf(Harmony.prototype), "toString", this).call(this).match(/function\s*(.*?)\(/)[1];
        }
    }], [{
        key: "$inject",
        get: function () {
            return this._$inject || [];
        },
        set: function (injectees) {
            this._$inject = this.$inject.concat(injectees);
        }
    }, {
        key: "$register",
        set: function (descriptor) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.iterate(descriptor)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _step3$value = _slicedToArray(_step3.value, 2);

                    var _module2 = _step3$value[0];
                    var klass = _step3$value[1];

                    angular.module(_module2)[klass.type](klass.name, this);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                        _iterator3["return"]();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }, {
        key: "iterate",
        value: function iterate(o) {
            return regeneratorRuntime.mark(function callee$2$0(_o) {
                var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, key;

                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            _iteratorNormalCompletion4 = true;
                            _didIteratorError4 = false;
                            _iteratorError4 = undefined;
                            context$3$0.prev = 3;
                            _iterator4 = Object.keys(_o)[Symbol.iterator]();

                        case 5:
                            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                                context$3$0.next = 12;
                                break;
                            }

                            key = _step4.value;
                            context$3$0.next = 9;
                            return [key, _o[key]];

                        case 9:
                            _iteratorNormalCompletion4 = true;
                            context$3$0.next = 5;
                            break;

                        case 12:
                            context$3$0.next = 18;
                            break;

                        case 14:
                            context$3$0.prev = 14;
                            context$3$0.t0 = context$3$0["catch"](3);
                            _didIteratorError4 = true;
                            _iteratorError4 = context$3$0.t0;

                        case 18:
                            context$3$0.prev = 18;
                            context$3$0.prev = 19;

                            if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
                                _iterator4["return"]();
                            }

                        case 21:
                            context$3$0.prev = 21;

                            if (!_didIteratorError4) {
                                context$3$0.next = 24;
                                break;
                            }

                            throw _iteratorError4;

                        case 24:
                            return context$3$0.finish(21);

                        case 25:
                            return context$3$0.finish(18);

                        case 26:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this, [[3, 14, 18, 26], [19,, 21, 25]]);
            })(o);
        }
    }, {
        key: "mixin",
        value: function mixin() {
            for (var _len3 = arguments.length, mixins = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                mixins[_key3] = arguments[_key3];
            }

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = mixins.entries()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var _step5$value = _slicedToArray(_step5.value, 2);

                    var i = _step5$value[0];
                    var mixin = _step5$value[1];
                    var _iteratorNormalCompletion6 = true;
                    var _didIteratorError6 = false;
                    var _iteratorError6 = undefined;

                    try {
                        for (var _iterator6 = this.iterate(mixin)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                            var _step6$value = _slicedToArray(_step6.value, 2);

                            var k = _step6$value[0];
                            var v = _step6$value[1];

                            var p = this.prototype;
                            while (p[k] !== undefined && p[k] !== null) {
                                p = p.prototype;
                            }
                            Object.defineProperty(p, k, {
                                value: v,
                                enumerable: true
                            });
                        }
                    } catch (err) {
                        _didIteratorError6 = true;
                        _iteratorError6 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion6 && _iterator6["return"]) {
                                _iterator6["return"]();
                            }
                        } finally {
                            if (_didIteratorError6) {
                                throw _iteratorError6;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
                        _iterator5["return"]();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        }
    }]);

    return Harmony;
})();

exports.Harmony = Harmony;

var Ctrl = (function (_Harmony) {
    function Ctrl() {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
        }

        _classCallCheck(this, Ctrl);

        _get(Object.getPrototypeOf(Ctrl.prototype), "constructor", this).apply(this, args);
    }

    _inherits(Ctrl, _Harmony);

    _createClass(Ctrl, [{
        key: "_digest",
        value: function _digest() {
            try {
                this.$scope.$digest();
            } catch (ng_ex) {
                "noop";
            }
        }
    }], [{
        key: "$register",
        set: function (descriptor) {
            descriptor.type = "controller";
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = this.iterate(descriptor)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var _step7$value = _slicedToArray(_step7.value, 2);

                    var _module3 = _step7$value[0];
                    var klass = _step7$value[1];

                    angular.module(_module3)[klass.type](klass.name, this);
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7["return"]) {
                        _iterator7["return"]();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }
        }
    }]);

    return Ctrl;
})(Harmony);

exports.Ctrl = Ctrl;

Ctrl.$inject = "$element";

var Srvc = (function (_Harmony2) {
    function Srvc() {
        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
        }

        _classCallCheck(this, Srvc);

        _get(Object.getPrototypeOf(Srvc.prototype), "constructor", this).apply(this, args);
    }

    _inherits(Srvc, _Harmony2);

    _createClass(Srvc, null, [{
        key: "$register",
        set: function (descriptor) {
            descriptor.type = "service";
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = this.iterate(descriptor)[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var _step8$value = _slicedToArray(_step8.value, 2);

                    var _module4 = _step8$value[0];
                    var klass = _step8$value[1];

                    angular.module(_module4)[klass.type](klass.name, this);
                }
            } catch (err) {
                _didIteratorError8 = true;
                _iteratorError8 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion8 && _iterator8["return"]) {
                        _iterator8["return"]();
                    }
                } finally {
                    if (_didIteratorError8) {
                        throw _iteratorError8;
                    }
                }
            }
        }
    }]);

    return Srvc;
})(Harmony);

exports.Srvc = Srvc;

//# sourceMappingURL=common_module.js.map