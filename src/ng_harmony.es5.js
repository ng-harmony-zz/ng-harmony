"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Harmony = exports.Harmony = (function () {
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
            for (var _iterator2 = this.iterate(this.constructor.prototype)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _step2$value;

                var _ret = (function () {
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
                })();

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

    _createClass(Harmony, {
        toString: {
            value: function toString() {
                return this.name || _get(Object.getPrototypeOf(Harmony.prototype), "toString", this).call(this).match(/function\s*(.*?)\(/)[1];
            }
        }
    }, {
        $inject: {
            get: function () {
                return this._$inject || [];
            },
            set: function (injectees) {
                this._$inject = this.$inject.concat(injectees);
            }
        },
        $register: {
            set: function (descriptor) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.iterate(descriptor)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _step$value = _slicedToArray(_step.value, 2);

                        var _module2 = _step$value[0];
                        var klass = _step$value[1];

                        angular.module(_module2)[klass.type](klass.name, this);
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
            }
        },
        iterate: {
            value: function iterate(o) {
                return regeneratorRuntime.mark(function callee$2$0(_o) {
                    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key;

                    return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                        while (1) switch (context$3$0.prev = context$3$0.next) {
                            case 0:
                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                context$3$0.prev = 3;
                                _iterator = Object.keys(_o)[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                    context$3$0.next = 12;
                                    break;
                                }

                                key = _step.value;
                                context$3$0.next = 9;
                                return [key, _o[key]];

                            case 9:
                                _iteratorNormalCompletion = true;
                                context$3$0.next = 5;
                                break;

                            case 12:
                                context$3$0.next = 18;
                                break;

                            case 14:
                                context$3$0.prev = 14;
                                context$3$0.t0 = context$3$0["catch"](3);
                                _didIteratorError = true;
                                _iteratorError = context$3$0.t0;

                            case 18:
                                context$3$0.prev = 18;
                                context$3$0.prev = 19;

                                if (!_iteratorNormalCompletion && _iterator["return"]) {
                                    _iterator["return"]();
                                }

                            case 21:
                                context$3$0.prev = 21;

                                if (!_didIteratorError) {
                                    context$3$0.next = 24;
                                    break;
                                }

                                throw _iteratorError;

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
        },
        mixin: {
            value: function mixin() {
                for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
                    mixins[_key] = arguments[_key];
                }

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = mixins.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _step$value = _slicedToArray(_step.value, 2);

                        var i = _step$value[0];
                        var mixin = _step$value[1];
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = this.iterate(mixin)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
            }
        }
    });

    return Harmony;
})();

var bean = _interopRequire(require("bean"));

var zest = _interopRequire(require("zest"));

var Ctrl = exports.Ctrl = (function (_Harmony) {
    function Ctrl() {
        var _this = this;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _classCallCheck(this, Ctrl);

        _get(Object.getPrototypeOf(Ctrl.prototype), "constructor", this).apply(this, args);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.iterate(this.constructor.prototype)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _step$value = _slicedToArray(_step.value, 2);

                var key = _step$value[0];
                var fn = _step$value[1];

                if (typeof fn !== "function" || !! ~["constructor", "initialize"].indexOf(key) || key[0] === "_") {
                    continue;
                }
                if (key.match("::")) {
                    var _iteratorNormalCompletion2;

                    var _didIteratorError2;

                    var _iteratorError2;

                    var _iterator2, _step2;

                    var _step2$value;

                    (function () {
                        var tokens = key.split("::");
                        if (tokens[2] !== undefined && tokens[2] !== null && !! ~tokens[2].indexOf(">")) {
                            tokens = tokens.splice(0, 2).concat(tokens[0].split(">"));
                        }
                        el = _this.$element ? _this.$element.context : zest("[ng-app]", document.body)[0];
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;

                        try {
                            for (_iterator2 = (tokens[0] ? zest(tokens[0], el).entries() : [el].entries())[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
                    })();
                }
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
    }

    _inherits(Ctrl, _Harmony);

    _createClass(Ctrl, {
        _digest: {
            value: function _digest() {
                try {
                    this.$scope.$digest();
                } catch (ng_ex) {
                    "noop";
                }
            }
        }
    }, {
        $register: {
            set: function (descriptor) {
                descriptor.type = "controller";
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.iterate(descriptor)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _step$value = _slicedToArray(_step.value, 2);

                        var _module2 = _step$value[0];
                        var klass = _step$value[1];

                        angular.module(_module2)[klass.type](klass.name, this);
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
            }
        }
    });

    return Ctrl;
})(Harmony);

Ctrl.$inject = "$element";

var Service = exports.Service = (function (_Harmony2) {
    function Service() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _classCallCheck(this, Service);

        _get(Object.getPrototypeOf(Service.prototype), "constructor", this).apply(this, args);
    }

    _inherits(Service, _Harmony2);

    _createClass(Service, null, {
        $register: {
            set: function (descriptor) {
                descriptor.type = "service";
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.iterate(descriptor)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _step$value = _slicedToArray(_step.value, 2);

                        var _module2 = _step$value[0];
                        var klass = _step$value[1];

                        angular.module(_module2)[klass.type](klass.name, this);
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
            }
        }
    });

    return Service;
})(Harmony);

var DataService = exports.DataService = (function (_Service) {
    function DataService() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _classCallCheck(this, DataService);

        _get(Object.getPrototypeOf(DataService.prototype), "constructor", this).apply(this, args);
    }

    _inherits(DataService, _Service);

    _createClass(DataService, {
        _db: {
            value: function _db(api, _ref) {
                var _this = this;

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
                        _this.oneshot === true ? _this.q.reject() : _this.q.notify(false);
                    }, 0);
                }
                if (this.oneshot === false) {
                    this.q.promise.then(function () {
                        true;
                    }, function (notification) {
                        _this.$timeout(_this._api, _this.interval);
                    }, function () {
                        false;
                    });
                }
                this._api();
                this.q.promise();
            }
        },
        _api: {
            value: function _api() {
                var _this = this;

                if (this.db.busy === true) {
                    return null;
                }
                this.db.busy = true;
                this.db.handle.get().$promise.then(function (data) {
                    console.info("" + new Date().toLocaleTimeString("en-US") + ": API/" + _this.name + ": success");
                    _this._store(data[_this.name] || data);
                    _this.db.busy = false;
                    if (_this.oneshot !== false) {
                        _this.q && _this.q.resolve();
                        _this.q = _this.$q.defer();
                    } else {
                        _this.q.notify(true);
                    }
                })["catch"](function (err) {
                    console.warn("" + new Date().toLocaleTimeString("en-US") + ": API/" + _this.name + ": " + err.toString());
                    if (_this.oneshot !== false) {
                        _this.q && _this.q.reject();
                        _this.q = _this.$q.defer();
                    } else {
                        _this.q.notify(false);
                    }
                });
            }
        },
        _store: {
            value: function _store(data) {
                var _this = this;

                var _data = Object.prototype.toString.call(data) === "[object Array]" ? data : [data];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.db.store.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _step$value = _slicedToArray(_step.value, 2);

                        var i = _step$value[0];
                        var o = _step$value[1];

                        o.deleted = true;
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
                    for (var _iterator2 = this.db.store.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _step2$value;

                        var _iteratorNormalCompletion3;

                        var _didIteratorError3;

                        var _iteratorError3;

                        var _iterator3, _step3;

                        var _step3$value;

                        (function () {
                            _step2$value = _slicedToArray(_step2.value, 2);
                            var i = _step2$value[0];
                            var o = _step2$value[1];

                            var current = null;
                            if (current = _data.filter(function (el, i, arr) {
                                return el.id === o.id;
                            })[0]) {
                                _iteratorNormalCompletion3 = true;
                                _didIteratorError3 = false;
                                _iteratorError3 = undefined;

                                try {
                                    for (_iterator3 = _this.constructor.iterate(current)[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                        _step3$value = _slicedToArray(_step3.value, 2);
                                        var k = _step3$value[0];
                                        var v = _step3$value[1];

                                        _this.db.store[i][k] = v;
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

                                _this.db.store[i].deleted = false;
                            }
                        })();
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

                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = _data.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var _step4$value;

                        (function () {
                            _step4$value = _slicedToArray(_step4.value, 2);
                            var i = _step4$value[0];
                            var o = _step4$value[1];

                            var current = null;
                            if (_this.db.store.filter(function (el, i, arr) {
                                return el.id === o.id;
                            }).length === 0) {
                                _this.db.store.push(o);
                                _this.db.store[_this.db.store.length - 1].deleted = false;
                            }
                        })();
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
                            _iterator4["return"]();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }
            }
        }
    });

    return DataService;
})(Service);

DataService.$inject = ["$resource", "$interval", "$q", "$timeout"];

var DynamicDataService = exports.DynamicDataService = (function (_DataService) {
    function DynamicDataService() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _classCallCheck(this, DynamicDataService);

        _get(Object.getPrototypeOf(DynamicDataService.prototype), "constructor", this).apply(this, args);
    }

    _inherits(DynamicDataService, _DataService);

    _createClass(DynamicDataService, {
        subscribe: {
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
        },
        aspects: {
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
        },
        getData: {
            value: function getData(matcher) {
                var _this = this;

                return this.db.store.filter(function (el, i, arr) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = _this.constructor.iterate(matcher)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var _step$value = _slicedToArray(_step.value, 2);

                            var k = _step$value[0];
                            var v = _step$value[1];

                            if (!(typeof v === "function" && v(el[k]) || el[k] === v)) {
                                return false;
                            }
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

                    return true;
                });
            }
        },
        setData: {
            value: function setData(opts) {
                if (! ~opts.i) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = this.db.store.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var _step$value = _slicedToArray(_step.value, 2);

                            var doc = _step$value[0];
                            var i = _step$value[1];

                            doc[opts.prop] = typeof opts.val === "function" ? opts.val(this.db, doc.id) : opts.val;
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
                } else {
                    var foo = this.db.store[typeof opts.i === "function" ? opts.i(this.db) : opts.i];
                    if (foo !== undefined && foo !== null) {
                        foo[opts.prop] = typeof opts.val === "function" ? opts.val(this.db, this.db.store[typeof opts.i === "function" ? opts.i(this.db) : opts.i]) : opts.val;
                    }
                }
            }
        },
        digest: {
            value: function digest() {
                if (this.db.ready === false) {
                    return null;
                }
                if (this.db.resolved === undefined || this.db.resolved === null) {
                    this.db.resolved = false;
                }
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.once_aspects.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _step$value = _slicedToArray(_step.value, 2);

                        var i = _step$value[0];
                        var once_aspect = _step$value[1];

                        typeof once_aspect === "function" && once_aspect(this.db);
                        this.once_aspects[i] = null;
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

                this.once_aspects = [];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this.aspects.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _step2$value = _slicedToArray(_step2.value, 2);

                        var i = _step2$value[0];
                        var aspect = _step2$value[1];

                        aspect(this.db);
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

                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = this.db.store.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var _step3$value = _slicedToArray(_step3.value, 2);

                        var i = _step3$value[0];
                        var d = _step3$value[1];

                        if (d.deleted === true) {
                            d.selected = false;
                        } else if (d.selected === true) {
                            this.db.current = d;
                        } else if (d.selected === undefined || d.selected === null) {
                            d.selected = false;
                        }
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

                this.db.resolved = true;
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = this.once_subscribers.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var _step4$value = _slicedToArray(_step4.value, 2);

                        var i = _step4$value[0];
                        var once_cb = _step4$value[1];

                        typeof once_cb === "function" && once_cb(this.db);
                        this.once_subscribers[i] = null;
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
                            _iterator4["return"]();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }

                this.once_subscribers = [];
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = this.subscribers.entries()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var _step5$value = _slicedToArray(_step5.value, 2);

                        var i = _step5$value[0];
                        var cb = _step5$value[1];

                        cb(this.db);
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

                return true;
            }
        }
    });

    return DynamicDataService;
})(DataService);

var Component = exports.Component = (function (_Ctrl) {
    function Component() {
        var _this = this;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
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
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.transform.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _step$value;

                var _iteratorNormalCompletion2;

                var _didIteratorError2;

                var _iteratorError2;

                var _iterator2, _step2;

                var _step2$value;

                var _iteratorNormalCompletion3;

                var _didIteratorError3;

                var _iteratorError3;

                var _iterator3, _step3;

                var _step3$value;

                (function () {
                    _step$value = _slicedToArray(_step.value, 2);
                    var i = _step$value[0];
                    var dataset = _step$value[1];

                    var Service = _this["" + dataset.descriptor[0].toUpperCase() + "" + dataset.descriptor.substr(1) + "DataService"];
                    _iteratorNormalCompletion2 = true;
                    _didIteratorError2 = false;
                    _iteratorError2 = undefined;

                    try {
                        for (_iterator2 = dataset.init.entries()[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            (function () {
                                _step2$value = _slicedToArray(_step2.value, 2);
                                var i = _step2$value[0];
                                var rule = _step2$value[1];

                                Service.aspects(function () {
                                    Service.set(rule);
                                }, true);
                            })();
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

                    _iteratorNormalCompletion3 = true;
                    _didIteratorError3 = false;
                    _iteratorError3 = undefined;

                    try {
                        for (_iterator3 = dataset.digest.entries()[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            (function () {
                                _step3$value = _slicedToArray(_step3.value, 2);
                                var i = _step3$value[0];
                                var rule = _step3$value[1];

                                Service.aspects(function () {
                                    Service.set(rule);
                                });
                            })();
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
                })();
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

        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = this.constructor.iterate(this)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var _step4$value = _slicedToArray(_step4.value, 2);

                var key = _step4$value[0];
                var _Service2 = _step4$value[1];

                if (!/DataService/.test(key)) {
                    continue;
                }
                descriptor = key.remove("DataService").toLowerCase();
                _Service2.subscribe(this._transform.bind(this, descriptor));
                if (_Service2.db && _Service2.db.ready === true) {
                    _Service2.digest();
                }
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
                    _iterator4["return"]();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = this.constructor.iterate(this.$scope.state)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var _step5$value = _slicedToArray(_step5.value, 2);

                var k = _step5$value[0];
                var v = _step5$value[1];

                var className = this.$element.className.split(/\s+/);
                var hasClass = !! ~className.indexOf(k);
                if (v === true && !hasClass) {
                    this.$element.addClass(k);
                }
                (function (_k, _v, _hasClass, _className) {
                    _this.$scope.$watch("state." + _k, function (after, before) {
                        if (after === true && !_hasClass) {
                            _this.$element.className += " " + _k;
                        } else if (_hasClass) {
                            _this.$element.className = _className.filter(function (el, i, arr) {
                                return el !== _k;
                            }).join(" ");
                        }
                        if (before === after || (before === undefined || before === null) && (after === undefined || after === null)) {
                            return null;
                        }
                        _this.$scope.$emit("state." + _k, {
                            obj: _this.toString(),
                            val: after
                        });
                    });
                })(k, v, hasClass, className);
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

    _inherits(Component, _Ctrl);

    _createClass(Component, {
        _transform: {
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
        }
    });

    return Component;
})(Ctrl);

Component.$inject = "$element";

// i is the id ... 0 - length-1 ... or -1 for all datasets
//{ i: 0, prop: "loading", val: false },
//{ i: -1, prop: "selected", val: (db, id) => { return id is 0; } }

//{ i: -1, prop: "selected", val: (db, id) -> (db.store.find((el, i, arr) => { return el.id is id; }).special is this.$scope.someConditional }
