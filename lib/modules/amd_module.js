define(['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var Harmony = (function () {
        function Harmony() {
            var _this = this;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            _classCallCheck(this, Harmony);

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
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
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
                    var _step2$value = _slicedToArray(_step2.value, 2);

                    var key = _step2$value[0];
                    var fn = _step2$value[1];

                    if (typeof fn === 'function' && key[0] === '$') {
                        _this.$scope[key.slice(0, 1)] = _this.$scope[key] = function () {
                            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                                args[_key2] = arguments[_key2];
                            }

                            return fn.apply(_this, args);
                        };
                    }
                };

                for (var _iterator2 = this.iterate(this.constructor.prototype)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    _loop();
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                        _iterator2['return']();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            if (typeof this.initialize === "function") {
                this.initialize();
            }
        }

        _createClass(Harmony, [{
            key: 'toString',
            value: function toString() {
                return this.name || _get(Object.getPrototypeOf(Harmony.prototype), 'toString', this).call(this).match(/function\s*(.*?)\(/)[1];
            }
        }], [{
            key: 'iterate',
            value: function iterate(o) {
                return regeneratorRuntime.mark(function callee$2$0(_o) {
                    var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _step3$value, i, key;

                    return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                        while (1) switch (context$3$0.prev = context$3$0.next) {
                            case 0:
                                _iteratorNormalCompletion3 = true;
                                _didIteratorError3 = false;
                                _iteratorError3 = undefined;
                                context$3$0.prev = 3;
                                _iterator3 = Object.getOwnPropertyNames(_o).entries()[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                                    context$3$0.next = 14;
                                    break;
                                }

                                _step3$value = _slicedToArray(_step3.value, 2);
                                i = _step3$value[0];
                                key = _step3$value[1];
                                context$3$0.next = 11;
                                return [key, _o[key]];

                            case 11:
                                _iteratorNormalCompletion3 = true;
                                context$3$0.next = 5;
                                break;

                            case 14:
                                context$3$0.next = 20;
                                break;

                            case 16:
                                context$3$0.prev = 16;
                                context$3$0.t0 = context$3$0['catch'](3);
                                _didIteratorError3 = true;
                                _iteratorError3 = context$3$0.t0;

                            case 20:
                                context$3$0.prev = 20;
                                context$3$0.prev = 21;

                                if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                                    _iterator3['return']();
                                }

                            case 23:
                                context$3$0.prev = 23;

                                if (!_didIteratorError3) {
                                    context$3$0.next = 26;
                                    break;
                                }

                                throw _iteratorError3;

                            case 26:
                                return context$3$0.finish(23);

                            case 27:
                                return context$3$0.finish(20);

                            case 28:
                            case 'end':
                                return context$3$0.stop();
                        }
                    }, callee$2$0, this, [[3, 16, 20, 28], [21,, 23, 27]]);
                })(o);
            }
        }, {
            key: 'mixin',
            value: function mixin() {
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _len3 = arguments.length, mixins = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                        mixins[_key3] = arguments[_key3];
                    }

                    for (var _iterator4 = mixins.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var _step4$value = _slicedToArray(_step4.value, 2);

                        var i = _step4$value[0];
                        var mixin = _step4$value[1];
                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5 = undefined;

                        try {
                            for (var _iterator5 = this.iterate(mixin)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                var _step5$value = _slicedToArray(_step5.value, 2);

                                var k = _step5$value[0];
                                var v = _step5$value[1];

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
                            _didIteratorError5 = true;
                            _iteratorError5 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion5 && _iterator5['return']) {
                                    _iterator5['return']();
                                }
                            } finally {
                                if (_didIteratorError5) {
                                    throw _iteratorError5;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                            _iterator4['return']();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }
            }
        }, {
            key: '$inject',
            get: function get() {
                return this._$inject || ["$scope"];
            },
            set: function set(injectees) {
                var _injectees = [];
                if (!Array.isArray(injectees)) {
                    injectees = [injectees];
                }
                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                    for (var _iterator6 = injectees.entries()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                        var _step6$value = _slicedToArray(_step6.value, 2);

                        var i = _step6$value[0];
                        var injecteeStr = _step6$value[1];

                        var truthy = true;
                        var _iteratorNormalCompletion7 = true;
                        var _didIteratorError7 = false;
                        var _iteratorError7 = undefined;

                        try {
                            for (var _iterator7 = this.$inject.entries()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                var _step7$value = _slicedToArray(_step7.value, 2);

                                var j = _step7$value[0];
                                var _injecteeStr = _step7$value[1];

                                if (injecteeStr === _injecteeStr) {
                                    truthy = false;
                                }
                            }
                        } catch (err) {
                            _didIteratorError7 = true;
                            _iteratorError7 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion7 && _iterator7['return']) {
                                    _iterator7['return']();
                                }
                            } finally {
                                if (_didIteratorError7) {
                                    throw _iteratorError7;
                                }
                            }
                        }

                        if (truthy) {
                            _injectees.push(injecteeStr);
                        }
                    }
                } catch (err) {
                    _didIteratorError6 = true;
                    _iteratorError6 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion6 && _iterator6['return']) {
                            _iterator6['return']();
                        }
                    } finally {
                        if (_didIteratorError6) {
                            throw _iteratorError6;
                        }
                    }
                }

                this._$inject = this.$inject.concat(injectees);
            }
        }, {
            key: '$register',
            set: function set(descriptor) {
                var _iteratorNormalCompletion8 = true;
                var _didIteratorError8 = false;
                var _iteratorError8 = undefined;

                try {
                    for (var _iterator8 = this.iterate(descriptor)[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                        var _step8$value = _slicedToArray(_step8.value, 2);

                        var _module2 = _step8$value[0];
                        var klass = _step8$value[1];

                        angular.module(_module2)[klass.type](klass.name, this);
                    }
                } catch (err) {
                    _didIteratorError8 = true;
                    _iteratorError8 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion8 && _iterator8['return']) {
                            _iterator8['return']();
                        }
                    } finally {
                        if (_didIteratorError8) {
                            throw _iteratorError8;
                        }
                    }
                }
            }
        }]);

        return Harmony;
    })();

    exports.Harmony = Harmony;

    var Controller = (function (_Harmony) {
        _inherits(Controller, _Harmony);

        function Controller() {
            _classCallCheck(this, Controller);

            _get(Object.getPrototypeOf(Controller.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(Controller, [{
            key: 'digest',
            value: function digest() {
                try {
                    this.$scope.$digest();
                } catch (ng_ex) {
                    "noop";
                }
            }
        }], [{
            key: '$register',
            set: function set(descriptor) {
                var _iteratorNormalCompletion9 = true;
                var _didIteratorError9 = false;
                var _iteratorError9 = undefined;

                try {
                    for (var _iterator9 = this.iterate(descriptor)[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                        var _step9$value = _slicedToArray(_step9.value, 2);

                        var _module3 = _step9$value[0];
                        var klass = _step9$value[1];

                        angular.module(_module3).controller(klass.name, this);
                    }
                } catch (err) {
                    _didIteratorError9 = true;
                    _iteratorError9 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion9 && _iterator9['return']) {
                            _iterator9['return']();
                        }
                    } finally {
                        if (_didIteratorError9) {
                            throw _iteratorError9;
                        }
                    }
                }
            }
        }]);

        return Controller;
    })(Harmony);

    exports.Controller = Controller;

    Controller.$inject = "$element";

    var Service = (function (_Harmony2) {
        _inherits(Service, _Harmony2);

        function Service() {
            _classCallCheck(this, Service);

            _get(Object.getPrototypeOf(Service.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(Service, null, [{
            key: '$register',
            set: function set(descriptor) {
                var _iteratorNormalCompletion10 = true;
                var _didIteratorError10 = false;
                var _iteratorError10 = undefined;

                try {
                    for (var _iterator10 = this.iterate(descriptor)[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                        var _step10$value = _slicedToArray(_step10.value, 2);

                        var _module4 = _step10$value[0];
                        var klass = _step10$value[1];

                        angular.module(_module4)[klass.type || "service"](klass.name, this);
                    }
                } catch (err) {
                    _didIteratorError10 = true;
                    _iteratorError10 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion10 && _iterator10['return']) {
                            _iterator10['return']();
                        }
                    } finally {
                        if (_didIteratorError10) {
                            throw _iteratorError10;
                        }
                    }
                }
            }
        }]);

        return Service;
    })(Harmony);

    exports.Service = Service;

    Service.$inject = "$http";
});

//# sourceMappingURL=amd_module.js.map