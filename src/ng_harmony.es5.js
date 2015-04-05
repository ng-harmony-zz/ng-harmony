"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bean = require("bean");

var _bean2 = _interopRequireWildcard(_bean);

var _zest = require("zest");

var _zest2 = _interopRequireWildcard(_zest);

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

var Controller = (function (_Harmony) {
    function Controller() {
        var _this2 = this;

        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
        }

        _classCallCheck(this, Controller);

        _get(Object.getPrototypeOf(Controller.prototype), "constructor", this).apply(this, args);
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
            for (var _iterator7 = this.iterate(this.constructor.prototype)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                var _step7$value = _slicedToArray(_step7.value, 2);

                var key = _step7$value[0];
                var fn = _step7$value[1];

                if (typeof fn !== "function" || !! ~["constructor", "initialize"].indexOf(key) || key[0] === "_") {
                    continue;
                }
                if (key.match("::")) {
                    var _iteratorNormalCompletion8;

                    var _didIteratorError8;

                    var _iteratorError8;

                    var _iterator8, _step8;

                    var _step8$value;

                    (function () {
                        var tokens = key.split("::");
                        if (tokens[2] !== undefined && tokens[2] !== null && !! ~tokens[2].indexOf(">")) {
                            tokens = tokens.splice(0, 2).concat(tokens[0].split(">"));
                        }
                        el = _this2.$element ? _this2.$element.context : _zest2["default"]("[ng-app]", document.body)[0];
                        _iteratorNormalCompletion8 = true;
                        _didIteratorError8 = false;
                        _iteratorError8 = undefined;

                        try {
                            for (_iterator8 = (tokens[0] ? _zest2["default"](tokens[0], el).entries() : [el].entries())[Symbol.iterator](); !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                                _step8$value = _slicedToArray(_step8.value, 2);
                                var i = _step8$value[0];
                                var _el = _step8$value[1];

                                (function (_i, _el, _fn) {
                                    __fn = function (ev) {
                                        for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
                                            args[_key5 - 1] = arguments[_key5];
                                        }

                                        if (tokens[2] !== undefined && tokens[2] !== null) {
                                            if (tokens[3] !== undefined && tokens[3] !== null) {
                                                var __el = ev.currentTarget.parentNode;
                                                while (!_zest2["default"].matches(__el, tokens[3])) {
                                                    __el = __el.parentNode;
                                                }
                                                var list = Array.prototype.slice.call(__el.parentNode.childNodes);
                                                _this2.$scope.i = list.indexOf(__el);
                                            } else {
                                                var __el = ev.currentTarget;
                                                var list = Array.prototype.slice.call(__el.parentNode.childNodes);
                                                _this2.$scope.i = list.indexOf(__el);
                                            }
                                        }
                                        _fn.call.apply(_fn, [_this2, ev].concat(args));
                                        _this2._digest();
                                    };
                                    _bean2["default"].on(_el, tokens[1], tokens[2] || __fn, tokens[2] ? __fn : null);
                                })(i, _el, fn);
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
                    })();
                }
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

    _inherits(Controller, _Harmony);

    _createClass(Controller, [{
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
            _get(Object.getPrototypeOf(Controller), "$register", this).call(this, descriptor);
        }
    }]);

    return Controller;
})(Harmony);

exports.Controller = Controller;

Controller.$inject = "$element";

var Service = (function (_Harmony2) {
    function Service() {
        for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
        }

        _classCallCheck(this, Service);

        _get(Object.getPrototypeOf(Service.prototype), "constructor", this).apply(this, args);
    }

    _inherits(Service, _Harmony2);

    _createClass(Service, null, [{
        key: "$register",
        set: function (descriptor) {
            descriptor.type = "service";
            _get(Object.getPrototypeOf(Service), "$register", this).call(this, descriptor);
        }
    }]);

    return Service;
})(Harmony);

exports.Service = Service;

var DataService = (function (_Service) {
    function DataService() {
        for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            args[_key7] = arguments[_key7];
        }

        _classCallCheck(this, DataService);

        _get(Object.getPrototypeOf(DataService.prototype), "constructor", this).apply(this, args);
    }

    _inherits(DataService, _Service);

    _createClass(DataService, [{
        key: "_db",
        value: function _db(api, _ref) {
            var _this3 = this;

            var name = _ref.name;
            var oneshot = _ref.oneshot;
            var interval = _ref.interval;

            this.name = name;
            this.oneshot = oneshot === true || !(interval !== undefined && interval !== null);
            this.interval = interval || null;
            this.q = this.$q.defer();
            if (this.db === undefined || this.db === null) {
                this.db = {
                    busy: false,
                    ready: false,
                    handle: api !== undefined && api !== null ? this.$resource(api) : null,
                    store: []
                };
            }
            if (this.db.busy === true) {
                this.$timeout(function () {
                    _this3.oneshot === true ? _this3.q.reject() : _this3.q.notify(false);
                }, 0);
            }
            if (this.oneshot === false) {
                this.q.promise.then(function () {
                    true;
                }, function (notification) {
                    _this3.$timeout(_this3._api, _this3.interval);
                }, function () {
                    false;
                });
            }
            this._api();
            this.q.promise();
        }
    }, {
        key: "_api",
        value: function _api() {
            var _this4 = this;

            if (this.db.busy === true) {
                return null;
            }
            this.db.busy = true;
            this.db.handle.get().$promise.then(function (data) {
                console.info("" + new Date().toLocaleTimeString("en-US") + ": API/" + _this4.name + ": success");
                _this4._store(data[_this4.name] || data);
                _this4.db.busy = false;
                if (_this4.oneshot !== false) {
                    _this4.q && _this4.q.resolve();
                    _this4.q = _this4.$q.defer();
                } else {
                    _this4.q.notify(true);
                }
            })["catch"](function (err) {
                console.warn("" + new Date().toLocaleTimeString("en-US") + ": API/" + _this4.name + ": " + err.toString());
                if (_this4.oneshot !== false) {
                    _this4.q && _this4.q.reject();
                    _this4.q = _this4.$q.defer();
                } else {
                    _this4.q.notify(false);
                }
            });
        }
    }, {
        key: "_store",
        value: function _store(data) {
            var _this5 = this;

            var _data = Object.prototype.toString.call(data) === "[object Array]" ? data : [data];
            var _iteratorNormalCompletion9 = true;
            var _didIteratorError9 = false;
            var _iteratorError9 = undefined;

            try {
                for (var _iterator9 = this.db.store.entries()[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                    var _step9$value = _slicedToArray(_step9.value, 2);

                    var i = _step9$value[0];
                    var o = _step9$value[1];

                    o.deleted = true;
                }
            } catch (err) {
                _didIteratorError9 = true;
                _iteratorError9 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion9 && _iterator9["return"]) {
                        _iterator9["return"]();
                    }
                } finally {
                    if (_didIteratorError9) {
                        throw _iteratorError9;
                    }
                }
            }

            var _iteratorNormalCompletion10 = true;
            var _didIteratorError10 = false;
            var _iteratorError10 = undefined;

            try {
                var _loop2 = function () {
                    _step10$value = _slicedToArray(_step10.value, 2);
                    var i = _step10$value[0];
                    var o = _step10$value[1];

                    var current = null;
                    if (current = _data.filter(function (el, i, arr) {
                        return el.id === o.id;
                    })[0]) {
                        _iteratorNormalCompletion12 = true;
                        _didIteratorError12 = false;
                        _iteratorError12 = undefined;

                        try {
                            for (_iterator12 = _this5.constructor.iterate(current)[Symbol.iterator](); !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                                _step12$value = _slicedToArray(_step12.value, 2);
                                var k = _step12$value[0];
                                var v = _step12$value[1];

                                _this5.db.store[i][k] = v;
                            }
                        } catch (err) {
                            _didIteratorError12 = true;
                            _iteratorError12 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion12 && _iterator12["return"]) {
                                    _iterator12["return"]();
                                }
                            } finally {
                                if (_didIteratorError12) {
                                    throw _iteratorError12;
                                }
                            }
                        }

                        _this5.db.store[i].deleted = false;
                    }
                };

                for (var _iterator10 = this.db.store.entries()[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                    var _step10$value;

                    var _iteratorNormalCompletion12;

                    var _didIteratorError12;

                    var _iteratorError12;

                    var _iterator12, _step12;

                    var _step12$value;

                    _loop2();
                }
            } catch (err) {
                _didIteratorError10 = true;
                _iteratorError10 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion10 && _iterator10["return"]) {
                        _iterator10["return"]();
                    }
                } finally {
                    if (_didIteratorError10) {
                        throw _iteratorError10;
                    }
                }
            }

            var _iteratorNormalCompletion11 = true;
            var _didIteratorError11 = false;
            var _iteratorError11 = undefined;

            try {
                var _loop3 = function () {
                    _step11$value = _slicedToArray(_step11.value, 2);
                    var i = _step11$value[0];
                    var o = _step11$value[1];

                    var current = null;
                    if (_this5.db.store.filter(function (el, i, arr) {
                        return el.id === o.id;
                    }).length === 0) {
                        _this5.db.store.push(o);
                        _this5.db.store[_this5.db.store.length - 1].deleted = false;
                    }
                };

                for (var _iterator11 = _data.entries()[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                    var _step11$value;

                    _loop3();
                }
            } catch (err) {
                _didIteratorError11 = true;
                _iteratorError11 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion11 && _iterator11["return"]) {
                        _iterator11["return"]();
                    }
                } finally {
                    if (_didIteratorError11) {
                        throw _iteratorError11;
                    }
                }
            }
        }
    }]);

    return DataService;
})(Service);

exports.DataService = DataService;

DataService.$inject = ["$resource", "$interval", "$q", "$timeout"];

var DynamicDataService = (function (_DataService) {
    function DynamicDataService() {
        for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            args[_key8] = arguments[_key8];
        }

        _classCallCheck(this, DynamicDataService);

        _get(Object.getPrototypeOf(DynamicDataService.prototype), "constructor", this).apply(this, args);
    }

    _inherits(DynamicDataService, _DataService);

    _createClass(DynamicDataService, [{
        key: "subscribe",
        value: function subscribe(callback) {
            var oneshot = arguments[1] === undefined ? false : arguments[1];

            if (this.subscribers === undefined || this.subscribers === null) {
                this.subscribers = [];
            }
            if (this.once_subscribers === undefined || this.once_subscribers === null) {
                this.once_subscribers = [];
            }
            if (onehost === true) {
                this.once_subscribers.push(callback);
            } else {
                this.subscribers.push(callback);
            }
        }
    }, {
        key: "aspects",
        value: function aspects(injection) {
            var oneshot = arguments[1] === undefined ? false : arguments[1];

            if (this.aspects === undefined || this.aspects === null) {
                this.aspects = [];
            }
            if (this.once_aspects === undefined || this.once_aspects === null) {
                this.once_aspects = [];
            }
            if (onehost === true) {
                this.once_aspects.push(injection);
            } else {
                this.aspects.push(injection);
            }
        }
    }, {
        key: "getData",
        value: function getData(matcher) {
            var _this6 = this;

            return this.db.store.filter(function (el, i, arr) {
                var _iteratorNormalCompletion13 = true;
                var _didIteratorError13 = false;
                var _iteratorError13 = undefined;

                try {
                    for (var _iterator13 = _this6.constructor.iterate(matcher)[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                        var _step13$value = _slicedToArray(_step13.value, 2);

                        var k = _step13$value[0];
                        var v = _step13$value[1];

                        if (!(typeof v === "function" && v(el[k]) || el[k] === v)) {
                            return false;
                        }
                    }
                } catch (err) {
                    _didIteratorError13 = true;
                    _iteratorError13 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion13 && _iterator13["return"]) {
                            _iterator13["return"]();
                        }
                    } finally {
                        if (_didIteratorError13) {
                            throw _iteratorError13;
                        }
                    }
                }

                return true;
            });
        }
    }, {
        key: "setData",
        value: function setData(opts) {
            if (! ~opts.i) {
                var _iteratorNormalCompletion14 = true;
                var _didIteratorError14 = false;
                var _iteratorError14 = undefined;

                try {
                    for (var _iterator14 = this.db.store.entries()[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                        var _step14$value = _slicedToArray(_step14.value, 2);

                        var doc = _step14$value[0];
                        var i = _step14$value[1];

                        doc[opts.prop] = typeof opts.val === "function" ? opts.val(this.db, doc.id) : opts.val;
                    }
                } catch (err) {
                    _didIteratorError14 = true;
                    _iteratorError14 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion14 && _iterator14["return"]) {
                            _iterator14["return"]();
                        }
                    } finally {
                        if (_didIteratorError14) {
                            throw _iteratorError14;
                        }
                    }
                }
            } else {
                var foo = this.db.store[typeof opts.i === "function" ? opts.i(this.db) : opts.i];
                if (foo !== undefined && foo !== null) {
                    foo[opts.prop] = typeof opts.val === "function" ? opts.val(this.db, this.db.store[typeof opts.i === "function" ? opts.i(this.db) : opts.i]) : opts.val;
                }
            }
        }
    }, {
        key: "digest",
        value: function digest() {
            if (this.db.ready === false) {
                return null;
            }
            if (this.db.resolved === undefined || this.db.resolved === null) {
                this.db.resolved = false;
            }
            var _iteratorNormalCompletion15 = true;
            var _didIteratorError15 = false;
            var _iteratorError15 = undefined;

            try {
                for (var _iterator15 = this.once_aspects.entries()[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                    var _step15$value = _slicedToArray(_step15.value, 2);

                    var i = _step15$value[0];
                    var once_aspect = _step15$value[1];

                    typeof once_aspect === "function" && once_aspect(this.db);
                    this.once_aspects[i] = null;
                }
            } catch (err) {
                _didIteratorError15 = true;
                _iteratorError15 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion15 && _iterator15["return"]) {
                        _iterator15["return"]();
                    }
                } finally {
                    if (_didIteratorError15) {
                        throw _iteratorError15;
                    }
                }
            }

            this.once_aspects = [];
            var _iteratorNormalCompletion16 = true;
            var _didIteratorError16 = false;
            var _iteratorError16 = undefined;

            try {
                for (var _iterator16 = this.aspects.entries()[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                    var _step16$value = _slicedToArray(_step16.value, 2);

                    var i = _step16$value[0];
                    var aspect = _step16$value[1];

                    aspect(this.db);
                }
            } catch (err) {
                _didIteratorError16 = true;
                _iteratorError16 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion16 && _iterator16["return"]) {
                        _iterator16["return"]();
                    }
                } finally {
                    if (_didIteratorError16) {
                        throw _iteratorError16;
                    }
                }
            }

            var _iteratorNormalCompletion17 = true;
            var _didIteratorError17 = false;
            var _iteratorError17 = undefined;

            try {
                for (var _iterator17 = this.db.store.entries()[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
                    var _step17$value = _slicedToArray(_step17.value, 2);

                    var i = _step17$value[0];
                    var d = _step17$value[1];

                    if (d.deleted === true) {
                        d.selected = false;
                    } else if (d.selected === true) {
                        this.db.current = d;
                    } else if (d.selected === undefined || d.selected === null) {
                        d.selected = false;
                    }
                }
            } catch (err) {
                _didIteratorError17 = true;
                _iteratorError17 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion17 && _iterator17["return"]) {
                        _iterator17["return"]();
                    }
                } finally {
                    if (_didIteratorError17) {
                        throw _iteratorError17;
                    }
                }
            }

            this.db.resolved = true;
            var _iteratorNormalCompletion18 = true;
            var _didIteratorError18 = false;
            var _iteratorError18 = undefined;

            try {
                for (var _iterator18 = this.once_subscribers.entries()[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                    var _step18$value = _slicedToArray(_step18.value, 2);

                    var i = _step18$value[0];
                    var once_cb = _step18$value[1];

                    typeof once_cb === "function" && once_cb(this.db);
                    this.once_subscribers[i] = null;
                }
            } catch (err) {
                _didIteratorError18 = true;
                _iteratorError18 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion18 && _iterator18["return"]) {
                        _iterator18["return"]();
                    }
                } finally {
                    if (_didIteratorError18) {
                        throw _iteratorError18;
                    }
                }
            }

            this.once_subscribers = [];
            var _iteratorNormalCompletion19 = true;
            var _didIteratorError19 = false;
            var _iteratorError19 = undefined;

            try {
                for (var _iterator19 = this.subscribers.entries()[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                    var _step19$value = _slicedToArray(_step19.value, 2);

                    var i = _step19$value[0];
                    var cb = _step19$value[1];

                    cb(this.db);
                }
            } catch (err) {
                _didIteratorError19 = true;
                _iteratorError19 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion19 && _iterator19["return"]) {
                        _iterator19["return"]();
                    }
                } finally {
                    if (_didIteratorError19) {
                        throw _iteratorError19;
                    }
                }
            }

            return true;
        }
    }]);

    return DynamicDataService;
})(DataService);

exports.DynamicDataService = DynamicDataService;

var Component = (function (_Controller) {
    function Component() {
        var _this7 = this;

        for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
            args[_key9] = arguments[_key9];
        }

        _classCallCheck(this, Component);

        _get(Object.getPrototypeOf(Component.prototype), "constructor", this).apply(this, args);
        this.$scope.model = {};
        this.transform = [{
            descriptor: "Name", //of DataService without the DataService-suffix
            init: [],
            digest: []
        }];
        this.$scope.state = {
            loading: true,
            selected: null,
            busy: null,
            error: null
        };
        var _iteratorNormalCompletion20 = true;
        var _didIteratorError20 = false;
        var _iteratorError20 = undefined;

        try {
            for (var _iterator20 = this.transform.entries()[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
                var _step20$value = _slicedToArray(_step20.value, 2);

                var i = _step20$value[0];
                var dataset = _step20$value[1];

                var _Service2 = this["" + dataset.descriptor[0].toUpperCase() + "" + dataset.descriptor.substr(1) + "DataService"];
                var _iteratorNormalCompletion23 = true;
                var _didIteratorError23 = false;
                var _iteratorError23 = undefined;

                try {
                    var _loop4 = function () {
                        _step23$value = _slicedToArray(_step23.value, 2);
                        var i = _step23$value[0];
                        var rule = _step23$value[1];

                        Service.aspects(function () {
                            Service.set(rule);
                        }, true);
                    };

                    for (var _iterator23 = dataset.init.entries()[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
                        var _step23$value;

                        _loop4();
                    }
                } catch (err) {
                    _didIteratorError23 = true;
                    _iteratorError23 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion23 && _iterator23["return"]) {
                            _iterator23["return"]();
                        }
                    } finally {
                        if (_didIteratorError23) {
                            throw _iteratorError23;
                        }
                    }
                }

                var _iteratorNormalCompletion24 = true;
                var _didIteratorError24 = false;
                var _iteratorError24 = undefined;

                try {
                    var _loop5 = function () {
                        _step24$value = _slicedToArray(_step24.value, 2);
                        var i = _step24$value[0];
                        var rule = _step24$value[1];

                        Service.aspects(function () {
                            Service.set(rule);
                        });
                    };

                    for (var _iterator24 = dataset.digest.entries()[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
                        var _step24$value;

                        _loop5();
                    }
                } catch (err) {
                    _didIteratorError24 = true;
                    _iteratorError24 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion24 && _iterator24["return"]) {
                            _iterator24["return"]();
                        }
                    } finally {
                        if (_didIteratorError24) {
                            throw _iteratorError24;
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError20 = true;
            _iteratorError20 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion20 && _iterator20["return"]) {
                    _iterator20["return"]();
                }
            } finally {
                if (_didIteratorError20) {
                    throw _iteratorError20;
                }
            }
        }

        var _iteratorNormalCompletion21 = true;
        var _didIteratorError21 = false;
        var _iteratorError21 = undefined;

        try {
            for (var _iterator21 = this.constructor.iterate(this)[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
                var _step21$value = _slicedToArray(_step21.value, 2);

                var key = _step21$value[0];
                var _Service3 = _step21$value[1];

                if (!/DataService/.test(key)) {
                    continue;
                }
                descriptor = key.remove("DataService").toLowerCase();
                _Service3.subscribe(this._transform.bind(this, descriptor));
                if (_Service3.db && _Service3.db.ready === true) {
                    _Service3.digest();
                }
            }
        } catch (err) {
            _didIteratorError21 = true;
            _iteratorError21 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion21 && _iterator21["return"]) {
                    _iterator21["return"]();
                }
            } finally {
                if (_didIteratorError21) {
                    throw _iteratorError21;
                }
            }
        }

        var _iteratorNormalCompletion22 = true;
        var _didIteratorError22 = false;
        var _iteratorError22 = undefined;

        try {
            for (var _iterator22 = this.constructor.iterate(this.$scope.state)[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
                var _step22$value = _slicedToArray(_step22.value, 2);

                var k = _step22$value[0];
                var v = _step22$value[1];

                var className = this.$element.className.split(/\s+/);
                var hasClass = !! ~className.indexOf(k);
                if (v === true && !hasClass) {
                    this.$element.addClass(k);
                }
                (function (_k, _v, _hasClass, _className) {
                    _this7.$scope.$watch("state." + _k, function (after, before) {
                        if (after === true && !_hasClass) {
                            _this7.$element.className += " " + _k;
                        } else if (_hasClass) {
                            _this7.$element.className = _className.filter(function (el, i, arr) {
                                return el !== _k;
                            }).join(" ");
                        }
                        if (before === after || (before === undefined || before === null) && (after === undefined || after === null)) {
                            return null;
                        }
                        _this7.$scope.$emit("state." + _k, {
                            obj: _this7.toString(),
                            val: after
                        });
                    });
                })(k, v, hasClass, className);
            }
        } catch (err) {
            _didIteratorError22 = true;
            _iteratorError22 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion22 && _iterator22["return"]) {
                    _iterator22["return"]();
                }
            } finally {
                if (_didIteratorError22) {
                    throw _iteratorError22;
                }
            }
        }
    }

    _inherits(Component, _Controller);

    _createClass(Component, [{
        key: "_transform",
        value: function _transform(descriptor, db) {
            if (this.$scope.model[descriptor] === undefined || this.$scope.model[descriptor] === null) {
                this.$scope.model[descriptor] = this[descriptor[1].toUpperCase() + descriptor.substring(1) + "DataService"].db.store;
            }
            if (this.$scope.model.current === undefined || this.$scope.model.current === null) {
                this.$scope.model.current = {};
            }
            this.$scope.model.current[descriptor] = db.current || null;
            if (this.$scope.model[descriptor] === undefined || this.$scope.model[descriptor] === null || this.$scope.model[descriptor].length === 0) {
                console.warn("" + this.toString() + "::_transform: the dataset of " + descriptor + " was empty");
                return false;
            } else {
                return true;
            }
        }
    }]);

    return Component;
})(Controller);

Component.$inject = "$element";

// i is the id ... 0 - length-1 ... or -1 for all datasets
//{ i: 0, prop: "loading", val: false },
//{ i: -1, prop: "selected", val: (db, id) => { return id is 0; } }

//{ i: -1, prop: "selected", val: (db, id) -> (db.store.find((el, i, arr) => { return el.id is id; }).special is this.$scope.someConditional }
