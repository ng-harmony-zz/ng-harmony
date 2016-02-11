export class Harmony {
    constructor(...args) {
        for (let [i, injectee] of this.constructor.$inject.entries()) {
            this[injectee] = args[i];
        }
        for (let [key, fn] of this.iterate(this.constructor.prototype)) {
            if (typeof fn === "function" && key[0] === "$") {
                this.$scope[key.slice(0, 1)] = this.$scope[key] = (...args) => {
                    return fn.apply(this, args);
                };
            }
        }
    }
    iterate(o) {
        return function* (_o) {
            for (let [i, key] of Object.getOwnPropertyNames(_o).entries()) {
                yield [key, _o[key]];
            }
        }(o);
    }
    static iterate(o) {
        return function* (_o) {
            for (let [i, key] of Object.getOwnPropertyNames(_o).entries()) {
                yield [key, _o[key]];
            }
        }(o);
    }
    static get $inject() {
        return this._$inject || [];
    }
    static set $inject(injectees) {
        let _injectees = [];
        if (!Array.isArray(injectees)) {
            injectees = [injectees];
        }
        for (let [i, injecteeStr] of injectees.entries()) {
            let truthy = true;
            for (let [j, _injecteeStr] of this.$inject.entries()) {
                if (injecteeStr === _injecteeStr) {
                    truthy = false;
                }
            }
            if (truthy) {
                _injectees.push(injecteeStr);
            }
        }
        this._$inject = this.$inject.concat(injectees);
    }
    static set $register(descriptor) {
        for (let [module, klass] of Harmony.iterate(descriptor)) {
            angular.module(module)[klass.type](klass.name, this);
        }
    }
    static mixin(...mixins) {
        for (let [i, mixin] of mixins.entries()) {
            for (let [k, v] of Harmony.iterate(mixin)) {
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
export class Controller extends Harmony {
    static set $register(descriptor) {
        for (let [module, klass] of Harmony.iterate(descriptor)) {
            angular.module(module).controller(klass.name, this);
        };
    }
    digest() {
        try {
            this.$scope.$digest();
        } catch (ngEx) {
            "noop";
        }
    }
}
Controller.$inject = "$scope";
export class Service extends Harmony {
    static set $register(descriptor) {
        for (let [module, klass] of Harmony.iterate(descriptor)) {
            angular.module(module)[klass.type || "service"](klass.name, this);
        }
    }
}
Service.$inject = "$http";

//# sourceMappingURL=common_module.js.map