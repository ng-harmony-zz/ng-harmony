# Ng-Harmony
============

![Harmony = 6 + 7;](logo.png "Harmony - Fire in my eyes")

## Concept

A base-class collection for OO programming in ES6 with angular.
Use it in conjunction with

* [sweet-at-angular](http://npmjs.org/packages/sweet-at-angular "click for npm-package-homepage") to write Angular 2.0 AtScript-styled code and your own class-libs
* [literate-programming](http://npmjs.org/packages/literate-programming "click for npm-package-homepage") to write markdown-flavored literate JS, HTML and CSS
* [generator-ng-harmony](http://npmjs.org/packages/slush-generator-ng-harmony "click for npm-package-homepage") to have it all auto-configured for you

* * *

## Files

This serves as literate-programming compiler-directive

[ng_harmony.es6.js](#JS-Compilation "save:|jshint -esnext")

## JS Compilation

_Harmony_ is the ng-base-class for all other endeavours.
* It provides all _injected dependencies_ as *member-vars*
* It polyfills mixin support

```javascript
    export class Harmony {
        constructor (...args) {
            this.constructor.$inject = ["$scope"]
            for (let [i, injectee] of this.constructor.$inject.entries()) {
                this[injectee] = args[i];
            }
            for (let [key, fn] of this.iterate(this.constructor.prototype)) {
                if (typeof fn !== "function" ||
                    ["constructor", "initialize"].indexOf(key) !== -1 ||
                    key[0] === "_") {
                    continue;
                }
                if (!key.match("::")) { this.$scope[key] = (...args) => { return fn.apply(this, args); } }
            }
            this.initialize && typeof this.initialize === "function" && this.initialize();
            return this;
        }
```
Getter and Setter for the static $inject variable
```javascript
        static get $inject () {
            return this._$inject || [];
        }
        static set $inject (injectees) {
            this._$inject = this.$inject.concat(injectees);
        }
```
An iterator factory allowing for easy _for .. of_ iteration es6-style
```javascript
        static iterate (o) {
            return (function* (_o) {
                for (let key of Object.keys(_o)) {
                    yield [key, _o[key]];
                }
            })(o);
        }
```
Mixin foo to populate the prototype-chain with mixed in foos, first-come ->> immediate prototype, last ->> deeply nested
```javascript
        static mixin (...mixins) {
            for (let [i, mixin] of mixins.entries()) {
                for (let [k, v] of this.iterate(mixin)) {
                    let p = this.prototype;
                    while (p[k] !== undefined && p[k] !== null) { p = p.prototype; }
                    Object.defineProperty(p, k, {
                        value: v,
                        enumerable: true
                    });
                }
            }
        }
    }
```

The Controller Base-Class is a starting point for all ng-controllers.
* It "shims" programmatic eventing
* Provides one or two convenience methods, like triggering the ng-digest-cycle

Import bean, a dependency-less eventing lib, and zest, a super-tiny and fast selector-engine.
```javascript
    import bean from 'bean';
    import zest from 'zest';

    export class Controller extends Harmony {
        constructor (...args) {
            super(...args);
            for (let [key, fn] of this.iterate(this.constructor.prototype)) {
                if (typeof fn !== "function" ||
                    ["constructor", "initialize"].indexOf(key) !== -1 ||
                    key[0] === "_") {
                    continue;
                }
                if (key.match("::")) {
                    let tokens = key.split("::");
                    if ((tokens[2] !== undefined && tokens[2] !== null) && tokens[2].indexOf(">") !== -1) {
                        tokens = tokens.splice(0, 2).concat(tokens[0].split(">"));
                    }
                    el = this.$element ? this.$element.context : zest("[ng-app]", document.body)[0];
                    for (let [i, el] of (tokens[0] ?
                            zest(tokens[0], el).entries() :
                            [el].entries())) {
                        ((_i, _el, _fn) => {
                            __fn = (ev, ...args) => {
                                if (tokens[2] !== undefined && tokens[2] !== null) {
                                    if (tokens[3] !== undefined && tokens[3] !== null) {
                                        let __el = ev.currentTarget.parentNode;
                                        while (!zest.matches(__el, tokens[3])) { __el = __el.parentNode; }
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
        _digest () {
            try { this.$scope.$digest(); }
            catch (ng_ex) { "noop"; }
        }
    }
    Controller.$inject = "$element";
```
