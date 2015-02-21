    export class Harmony {
        constructor(...args) {
            this.constructor.$inject = ["$scope"]
            for (let [i, injectee] of this.constructor.$inject.entries()) {
                this[injectee] = args[i];
            }
            for (let [key, fn] of this.iterate(this.constructor.prototype)) {
                if (typeof fn !== "function" || ["constructor", "initialize"].indexOf(key) !== -1 ||
                    key[0] === "_") {
                    continue;
                }
                if (!key.match("::")) {
                    this.$scope[key] = (...args) => {
                        return fn.apply(this, args);
                    }
                }
            }
            this.initialize && typeof this.initialize === "function" && this.initialize();
            return this;
        }
        static get $inject() {
            return this._$inject || [];
        }
        static set $inject(injectees) {
            this._$inject = this.$inject.concat(injectees);
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
    }
    import bean from 'bean';
    import zest from 'zest';
    export class Controller extends Harmony {
        constructor(...args) {
            super(...args);
            for (let [key, fn] of this.iterate(this.constructor.prototype)) {
                if (typeof fn !== "function" || ["constructor", "initialize"].indexOf(key) !== -1 ||
                    key[0] === "_") {
                    continue;
                }
                if (key.match("::")) {
                    let tokens = key.split("::");
                    if ((tokens[2] !== undefined && tokens[2] !== null) && tokens[2].indexOf(">") !== -1) {
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
        _digest() {
            try {
                this.$scope.$digest();
            } catch (ng_ex) {
                "noop";
            }
        }
    }
    Controller.$inject = "$element";