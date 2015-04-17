# Ng-Harmony
============

[![Join the chat at https://gitter.im/joehannes/ng_harmony](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/joehannes/ng_harmony?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Development
>>>>>>> 630bb295adc30f31c1b2e197db7e20e3785fbb5c

These is the bazz-klasses for writing nice ES-Next Angular 2.0 --- right now!

But not only that ...

This org was created with the thought in mind, that one might want to create reusable abstractions,
class libs ... and publish them as (private??? hahaha ... did you know you can do that now on npm?) npm-modules.

Behold, the dist folder holds the treasure ...

![Harmony = 6 + 7;](logo.png "Harmony - Fire in my eyes")

## Concept

A base-class collection for OO programming in ES6 with angular.
Use it in conjunction with

* [literate-programming](http://npmjs.org/packages/literate-programming "click for npm-package-homepage") to write markdown-flavored literate JS, HTML and CSS
* [jspm](https://www.npmjs.com/package/jspm "click for npm-package-homepage") for a nice solution to handle npm-modules with ES6-Module-Format-Loading ...

* * *

## Files

This serves as literate-programming compiler-directive

[./dist/raw/ng_harmony.js](#Compilation "save:")

## Compilation

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
                if (typeof fn !== 'function' ||
                    key === "constructor" ||
                    key[0] === '_' ||
                    key.match('::')) {
                    continue;
                }
                this.$scope[key] = (...args) => { return fn.apply(this, args); }
            }
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

Setter for the ng-registration of a service or controller
```javascript
        static set $register (descriptor) {
            for (let [module, klass] of this.iterate(descriptor)) {
                angular.module(module)[klass.type](klass.name, this);
            }
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
```
A nice toString foo that should in theory pretty nicely return the Classe's name as declared
```javascript
        toString () {
            return this.name || super.toString().match(/function\s*(.*?)\(/)[1];
        }
    }
```

The Controller Base-Class is a starting point for all ng-controllers.
```javascript
    export class Ctrl extends Harmony {
        constructor (...args) {
            super(...args);
        }
        static set $register(descriptor) {
            descriptor.type = "controller";
            for (let [module, klass] of this.iterate(descriptor)) {
                 angular.module(module)[klass.type](klass.name, this);
            }
        }
        _digest () {
            try { this.$scope.$digest(); }
            catch (ng_ex) { "noop"; }
        }
    }
    Ctrl.$inject = "$element";
```
The _Service_ Class is a tiny base for Services that don't extend the more sophisticated DataServices

```javascript
    export class Srvc extends Harmony {
        constructor(...args) { super(...args); }

        static set $register(descriptor) {
            descriptor.type = "service";
            for (let [module, klass] of this.iterate(descriptor)) {
                angular.module(module)[klass.type](klass.name, this);
            }
        }
    }
