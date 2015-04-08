function Directive(val) {
    return function decorator(target) {
        angular.module(val.module).directive(val.tag, () => {
            return {
                controller: target,
                restrict: val.restrict || "A",
                replace: val.replace || false,
                templateUrl: val.templateUrl || null,
                template: val.template || null,
                scope: val.scope === true ? {} : (val.scope || null)
            };
        })
    }
}

function Controller(val) {
    return function decorator(target) {
        let r = {};
        r[val.module] = {
            type: "controller",
            name: val.name
        }
        target.$register = r;
    }
}

function Service(val) {
    return function decorator(target) {
        let r = {};
        r[val.module] = {
            type: "service",
            name: val.name
        }
        target.$register = r;
    }
}
class Harmony {
    constructor(...args) {
        this.constructor.$inject = ["$scope"]
        for (let [i, injectee] of this.constructor.$inject.entries()) {
            this[injectee] = args[i];
        }
        for (let [key, fn] of this.iterate(this.constructor.prototype)) {
            if (typeof fn !== "function" ||
                key === "constructor" ||
                key[0] === "_" ||
                key.match("::")) {
                continue;
            }
            this.$scope[key] = (...args) => {
                return fn.apply(this, args);
            }
        }
    }
    static get $inject() {
        return this._$inject || [];
    }
    static set $inject(injectees) {
        this._$inject = this.$inject.concat(injectees);
    }
    static set $register(descriptor) {
        for (let [module, klass] of this.iterate(descriptor)) {
            angular.module(module)[klass.type](klass.name, this);
        }
    }
    static iterate(o) {
        return (function*(_o) {
            for (let key of Object.keys(_o)) {
                yield [key, _o[key]];
            }
        })(o);
    }
    static mixin(...mixins) {
        for (let [i, mixin] of mixins.entries()) {
            for (let [k, v] of this.iterate(mixin)) {
                let p = this.prototype;
                while (p[k] !== undefined && p[k] !== null) {
                    p = p.prototype;
                }
                Object.defineProperty(p, k, {
                    value: v,
                    enumerable: true
                });
            }
        }
    }
    toString() {
        return this.name || super.toString().match(/function\s*(.*?)\(/)[1];
    }
}
class Ctrl extends Harmony {
    constructor(...args) {
        super(...args);
        for (let [key, fn] of this.iterate(this.constructor.prototype)) {
            if (typeof fn !== "function" ||
                !!~["constructor", "initialize"].indexOf(key) ||
                key[0] === "_") {
                continue;
            }
            if (key.match("::")) {
                let tokens = key.split("::");
                if ((tokens[2] !== undefined && tokens[2] !== null) && !!~tokens[2].indexOf(">")) {
                    tokens = tokens.splice(0, 2).concat(tokens[0].split(">"));
                }
                el = this.$element ? this.$element.context : zest("[ng-app]", document.body)[0];
                for (let [i, el] of(tokens[0] ?
                        zest(tokens[0], el).entries() : [el].entries())) {
                    ((_i, _el, _fn) => {
                        __fn = (ev, ...args) => {
                            if (tokens[2] !== undefined && tokens[2] !== null) {
                                if (tokens[3] !== undefined && tokens[3] !== null) {
                                    let __el = ev.currentTarget.parentNode;
                                    while (!zest.matches(__el, tokens[3])) {
                                        __el = __el.parentNode;
                                    }
                                    let list = Array.prototype.slice.call(__el.parentNode.childNodes);
                                    this.$scope.i = list.indexOf(__el);
                                } else {
                                    let __el = ev.currentTarget;
                                    let list = Array.prototype.slice.call(__el.parentNode.childNodes);
                                    this.$scope.i = list.indexOf(__el);
                                }
                            }
                            _fn.call(this, ev, ...args);
                            this._digest();
                        }
                        bean.on(_el, tokens[1], tokens[2] || __fn, tokens[2] ? __fn : null);
                    })(i, el, fn);
                }
            }
        }
    }
    static set $register(descriptor) {
        descriptor.type = "controller";
        for (let [module, klass] of this.iterate(descriptor)) {
            angular.module(module)[klass.type](klass.name, this);
        }
    }
    _digest() {
        try {
            this.$scope.$digest();
        } catch (ng_ex) {
            "noop";
        }
    }
}
Ctrl.$inject = "$element";
class Srvc extends Harmony {
    constructor(...args) {
        super(...args);
    }
    static set $register(descriptor) {
        descriptor.type = "service";
        for (let [module, klass] of this.iterate(descriptor)) {
            angular.module(module)[klass.type](klass.name, this);
        }
    }
}
class DataService extends Srvc {
    constructor(...args) {
        super(...args);
    }
    _db(api, {
        name, oneshot, interval
    }) {
        this.name = name;
        this.oneshot = oneshot === true || !(interval !== undefined && interval !== null);
        this.interval = interval || null;
        this.q = this.$q.defer();
        if (this.db === undefined || this.db === null) {
            this.db = {
                busy: false,
                ready: false,
                handle: (api !== undefined && api !== null) ? this.$resource(api) : null,
                store: []
            }
        }
        if (this.db.busy === true) {
            this.$timeout(() => {
                (this.oneshot === true) ?
                this.q.reject():
                    this.q.notify(false);
            }, 0);
        }
        if (this.oneshot === false) {
            this.q.promise.then(
                () => {
                    true;
                }, (notification) => {
                    this.$timeout(this._api, this.interval);
                }, () => {
                    false;
                }
            )
        }
        this._api();
        this.q.promise();
    }
    _api() {
        if (this.db.busy === true) {
            return null;
        }
        this.db.busy = true;
        this.db.handle.get().$promise
            .then((data) => {
                console.info(`${(new Date()).toLocaleTimeString('en-US')}: API/${this.name}: success`);
                this._store(data[this.name] || data);
                this.db.busy = false;
                if (this.oneshot !== false) {
                    this.q && this.q.resolve();
                    this.q = this.$q.defer();
                } else {
                    this.q.notify(true);
                }
            }).catch((err) => {
                console.warn(`${(new Date()).toLocaleTimeString('en-US')}: API/${this.name}: ${err.toString()}`);
                if (this.oneshot !== false) {
                    this.q && this.q.reject();
                    this.q = this.$q.defer();
                } else {
                    this.q.notify(false);
                }
            });
    }
    _store(data) {
        let _data = Object.prototype.toString.call(data) === "[object Array]" ? data : [data];
        for (let [i, o] of this.db.store.entries()) {
            o.deleted = true;
        }
        for (let [i, o] of this.db.store.entries()) {
            let current = null;
            if (current = _data.filter((el, i, arr) => {
                    return (el.id === o.id);
                })[0]) {
                for (let [k, v] of this.constructor.iterate(current)) {
                    this.db.store[i][k] = v;
                }
                this.db.store[i].deleted = false;
            }
        }
        for (let [i, o] of _data.entries()) {
            let current = null;
            if (this.db.store.filter((el, i, arr) => {
                    return el.id === o.id;
                }).length === 0) {
                this.db.store.push(o);
                this.db.store[this.db.store.length - 1].deleted = false;
            }
        }
    }
}
DataService.$inject = ["$resource", "$interval", "$q", "$timeout"];
class DynamicDataService extends DataService {
    constructor(...args) {
        super(...args);
    }
    subscribe(callback, oneshot = false) {
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
    aspects(injection, oneshot = false) {
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
    getData(matcher) {
        return this.db.store.filter((el, i, arr) => {
            for (let [k, v] of this.constructor.iterate(matcher)) {
                if (!(typeof v === "function" && v(el[k]) || (el[k] === v))) {
                    return false;
                }
            }
            return true;
        })
    }
    setData(opts) {
        if (!~opts.i) {
            for (let [doc, i] of this.db.store.entries()) {
                doc[opts.prop] = typeof opts.val === "function" ? opts.val(this.db, doc.id) : opts.val;
            }
        } else {
            let foo = this.db.store[typeof opts.i === "function" ? opts.i(this.db) : opts.i];
            if (foo !== undefined && foo !== null) {
                foo[opts.prop] = typeof opts.val === "function" ?
                    opts.val(this.db, this.db.store[
                        typeof opts.i === "function" ?
                        opts.i(this.db) :
                        opts.i
                    ]) :
                    opts.val
            }
        }
    }
    digest() {
        if (this.db.ready === false) {
            return null;
        }
        if (this.db.resolved === undefined || this.db.resolved === null) {
            this.db.resolved = false;
        }
        for (let [i, once_aspect] of this.once_aspects.entries()) {
            typeof once_aspect === "function" && once_aspect(this.db);
            this.once_aspects[i] = null;
        }
        this.once_aspects = [];
        for (let [i, aspect] of this.aspects.entries()) {
            aspect(this.db);
        }
        for (let [i, d] of this.db.store.entries()) {
            if (d.deleted === true) {
                d.selected = false;
            } else if (d.selected === true) {
                this.db.current = d;
            } else if (d.selected === undefined || d.selected === null) {
                d.selected = false;
            }
        }
        this.db.resolved = true;
        for (let [i, once_cb] of this.once_subscribers.entries()) {
            typeof once_cb === "function" && once_cb(this.db);
            this.once_subscribers[i] = null;
        }
        this.once_subscribers = [];
        for (let [i, cb] of this.subscribers.entries()) {
            cb(this.db);
        }
        return true;
    }
}
class Component extends Ctrl {
    constructor(...args) {
        super(...args);
        this.$scope.model = {};
        this.transform = [{
            descriptor: "Name", //of DataService without the DataService-suffix
            init: [
                // i is the id ... 0 - length-1 ... or -1 for all datasets
                //{ i: 0, prop: "loading", val: false },
                //{ i: -1, prop: "selected", val: (db, id) => { return id is 0; } }
            ],
            digest: [
                //{ i: -1, prop: "selected", val: (db, id) -> (db.store.find((el, i, arr) => { return el.id is id; }).special is this.$scope.someConditional }
            ]
        }];
        this.$scope.state = {
            loading: true,
            selected: null,
            busy: null,
            error: null
        };
        for (let [i, dataset] of this.transform.entries()) {
            let Service = this[`${dataset.descriptor[0].toUpperCase()}${dataset.descriptor.substr(1)}DataService`];
            for (let [i, rule] of dataset.init.entries()) {
                Service.aspects(() => {
                    Service.set(rule)
                }, true);
            }
            for (let [i, rule] of dataset.digest.entries()) {
                Service.aspects(() => {
                    Service.set(rule)
                });
            }
        }
        for (let [key, Service] of this.constructor.iterate(this)) {
            if (!/DataService/.test(key)) {
                continue;
            }
            descriptor = key.remove("DataService").toLowerCase();
            Service.subscribe(this._transform.bind(this, descriptor));
            if (Service.db && Service.db.ready === true) {
                Service.digest();
            }
        }
        for (let [k, v] of this.constructor.iterate(this.$scope.state)) {
            let className = this.$element.className.split(/\s+/);
            let hasClass = !!~className.indexOf(k);
            if (v === true && !hasClass) {
                this.$element.addClass(k);
            }
            ((_k, _v, _hasClass, _className) => {
                this.$scope.$watch(`state.${_k}`, (after, before) => {
                    if (after === true && !_hasClass) {
                        this.$element.className += ` ${_k}`;
                    } else if (_hasClass) {
                        this.$element.className = _className.filter((el, i, arr) => {
                            return el !== _k
                        }).join(" ");
                    }
                    if (before === after || ((before === undefined || before === null) && (after === undefined || after === null))) {
                        return null;
                    }
                    this.$scope.$emit(`state.${_k}`, {
                        obj: this.toString(),
                        val: after
                    });
                })
            })(k, v, hasClass, className);
        }
    }
    _transform(descriptor, db) {
        if (this.$scope.model[descriptor] === undefined || this.$scope.model[descriptor] === null) {
            this.$scope.model[descriptor] = this[descriptor[1].toUpperCase() + descriptor.substring(1) + "DataService"].db.store;
        }
        if (this.$scope.model.current === undefined || this.$scope.model.current === null) {
            this.$scope.model.current = {};
        }
        this.$scope.model.current[descriptor] = db.current || null;
        if (this.$scope.model[descriptor] === undefined || this.$scope.model[descriptor] === null || this.$scope.model[descriptor].length === 0) {
            console.warn(`${this.toString()}::_transform: the dataset of ${descriptor} was empty`)
            return false;
        } else {
            return true;
        }
    }
}
Component.$inject = "$element";