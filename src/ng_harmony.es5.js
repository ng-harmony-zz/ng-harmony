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
                if (typeof fn !== "function" || !! ~["constructor", "initialize"].indexOf(key) || key[0] === "_") {
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
    }, {
        toString: {
            value: function toString() {
                return this.name || this.constructor.toString().match(/function\s*(.*?)\(/)[1];
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
            if (typeof fn !== "function" || !! ~["constructor", "initialize"].indexOf(key) || key[0] === "_") {
                continue;
            }
            if (key.match("::")) {
                var _iterator2, _step2;
                var _step2$value;
                (function () {
                    var tokens = key.split("::");
                    if (tokens[2] !== undefined && tokens[2] !== null && !! ~tokens[2].indexOf(">")) {
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
var DataService = exports.DataService = (function (Harmony) {
    function DataService() {
        _classCallCheck(this, DataService);

        if (Harmony != null) {
            Harmony.apply(this, arguments);
        }
    }

    _inherits(DataService, Harmony);

    _prototypeProperties(DataService, null, {
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
            },
            writable: true,
            configurable: true
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
            },
            writable: true,
            configurable: true
        },
        _store: {
            value: function _store(data) {
                var _this = this;
                var _data = Object.prototype.toString.call(data) === "[object Array]" ? data : [data];
                for (var _iterator = this.db.store.entries()[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
                    var _step$value = _slicedToArray(_step.value, 2);

                    var i = _step$value[0];
                    var o = _step$value[1];
                    o.deleted = true;
                }
                for (var _iterator2 = this.db.store.entries()[Symbol.iterator](), _step2; !(_step2 = _iterator2.next()).done;) {
                    var _step2$value;
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
                            for (_iterator3 = _this.constructor.iterate(current)[Symbol.iterator](); !(_step3 = _iterator3.next()).done;) {
                                _step3$value = _slicedToArray(_step3.value, 2);
                                var k = _step3$value[0];
                                var v = _step3$value[1];
                                _this.db.store[i][k] = v;
                            }
                            _this.db.store[i].deleted = false;
                        }
                    })();
                }
                for (var _iterator4 = _data.entries()[Symbol.iterator](), _step4; !(_step4 = _iterator4.next()).done;) {
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
            },
            writable: true,
            configurable: true
        }
    });

    return DataService;
})(Harmony);
DataService.$inject = ["$resource", "$interval", "$q", "$timeout"];
var DynamicDataService = exports.DynamicDataService = (function (DataService) {
    function DynamicDataService() {
        _classCallCheck(this, DynamicDataService);

        if (DataService != null) {
            DataService.apply(this, arguments);
        }
    }

    _inherits(DynamicDataService, DataService);

    _prototypeProperties(DynamicDataService, null, {
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
            },
            writable: true,
            configurable: true
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
            },
            writable: true,
            configurable: true
        },
        getData: {
            value: function getData(matcher) {
                var _this = this;
                return this.db.store.filter(function (el, i, arr) {
                    for (var _iterator = _this.constructor.iterate(matcher)[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
                        var _step$value = _slicedToArray(_step.value, 2);

                        var k = _step$value[0];
                        var v = _step$value[1];
                        if (!(typeof v === "function" && v(el[k]) || el[k] === v)) {
                            return false;
                        }
                    }
                    return true;
                });
            },
            writable: true,
            configurable: true
        },
        setData: {
            value: function setData(opts) {
                if (! ~opts.i) {
                    for (var _iterator = this.db.store.entries()[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
                        var _step$value = _slicedToArray(_step.value, 2);

                        var doc = _step$value[0];
                        var i = _step$value[1];
                        doc[opts.prop] = typeof opts.val === "function" ? opts.val(this.db, doc.id) : opts.val;
                    }
                } else {
                    var foo = this.db.store[typeof opts.i === "function" ? opts.i(this.db) : opts.i];
                    if (foo !== undefined && foo !== null) {
                        foo[opts.prop] = typeof opts.val === "function" ? opts.val(this.db, this.db.store[typeof opts.i === "function" ? opts.i(this.db) : opts.i]) : opts.val;
                    }
                }
            },
            writable: true,
            configurable: true
        },
        digest: {
            value: function digest() {
                if (this.db.ready === false) {
                    return null;
                }
                if (this.db.resolved === undefined || this.db.resolved === null) {
                    this.db.resolved = false;
                }
                for (var _iterator = this.once_aspects.entries()[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
                    var _step$value = _slicedToArray(_step.value, 2);

                    var i = _step$value[0];
                    var once_aspect = _step$value[1];
                    typeof once_aspect === "function" && once_aspect(this.db);
                    this.once_aspects[i] = null;
                }
                this.once_aspects = [];
                for (var _iterator2 = this.aspects.entries()[Symbol.iterator](), _step2; !(_step2 = _iterator2.next()).done;) {
                    var _step2$value = _slicedToArray(_step2.value, 2);

                    var i = _step2$value[0];
                    var aspect = _step2$value[1];
                    aspect(this.db);
                }
                for (var _iterator3 = this.db.store.entries()[Symbol.iterator](), _step3; !(_step3 = _iterator3.next()).done;) {
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
                this.db.resolved = true;
                for (var _iterator4 = this.once_subscribers.entries()[Symbol.iterator](), _step4; !(_step4 = _iterator4.next()).done;) {
                    var _step4$value = _slicedToArray(_step4.value, 2);

                    var i = _step4$value[0];
                    var once_cb = _step4$value[1];
                    typeof once_cb === "function" && once_cb(this.db);
                    this.once_subscribers[i] = null;
                }
                this.once_subscribers = [];
                for (var _iterator5 = this.subscribers.entries()[Symbol.iterator](), _step5; !(_step5 = _iterator5.next()).done;) {
                    var _step5$value = _slicedToArray(_step5.value, 2);

                    var i = _step5$value[0];
                    var cb = _step5$value[1];
                    cb(this.db);
                }
                return true;
            },
            writable: true,
            configurable: true
        }
    });

    return DynamicDataService;
})(DataService);
var Component = (function (Controller) {
    function Component() {
        _classCallCheck(this, Component);

        if (Controller != null) {
            Controller.apply(this, arguments);
        }
    }

    _inherits(Component, Controller);

    _prototypeProperties(Component, null, {
        initialize: {
            value: function initialize() {
                var _this = this;
                this.$scope.model = {};
                this.transform = {
                    init: [],
                    digest: []
                };
                this.$scope.state = {
                    loading: true,
                    selected: null,
                    busy: null,
                    error: null
                };
                for (var _iterator = this.constructor.iterate(this.transform)[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
                    var _step$value;
                    var _iterator2, _step2;
                    var _step2$value;
                    var _iterator3, _step3;
                    var _step3$value;
                    (function () {
                        _step$value = _slicedToArray(_step.value, 2);
                        var i = _step$value[0];
                        var dataset = _step$value[1];
                        var Service = _this["" + dataset.descriptor[0].toUpperCase() + "DataService"];
                        for (_iterator2 = dataset.init.entries()[Symbol.iterator](); !(_step2 = _iterator2.next()).done;) {
                            (function () {
                                _step2$value = _slicedToArray(_step2.value, 2);
                                var i = _step2$value[0];
                                var rule = _step2$value[1];
                                Service.aspects(function () {
                                    Service.set(rule);
                                }, true);
                            })();
                        }
                        for (_iterator3 = dataset.digest.entries()[Symbol.iterator](); !(_step3 = _iterator3.next()).done;) {
                            (function () {
                                _step3$value = _slicedToArray(_step3.value, 2);
                                var i = _step3$value[0];
                                var rule = _step3$value[1];
                                Service.aspects(function () {
                                    Service.set(rule);
                                });
                            })();
                        }
                    })();
                }
                for (var _iterator4 = this.constructor.iterate(this)[Symbol.iterator](), _step4; !(_step4 = _iterator4.next()).done;) {
                    var _step4$value = _slicedToArray(_step4.value, 2);

                    var key = _step4$value[0];
                    var Service = _step4$value[1];
                    if (!/DataService/.test(key)) {
                        continue;
                    }
                    descriptor = key.remove("DataService").toLowerCase();
                    Service.subscribe(this._transform.bind(this, descriptor));
                    if (Service.db && Service.db.ready === true) {
                        Service.digest();
                    }
                }
                for (var _iterator5 = this.constructor.iterate(this.$scope.state)[Symbol.iterator](), _step5; !(_step5 = _iterator5.next()).done;) {
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
            },
            writable: true,
            configurable: true
        },
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
            },
            writable: true,
            configurable: true
        }
    });

    return Component;
})(Controller);

Component.$inject = "$element";
Object.defineProperty(exports, "__esModule", {
    value: true
});
