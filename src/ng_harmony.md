# Ng-Harmony
============

## Development

These is the bazz-klasses for writing nice ES-Next Angular ~2 ... you'll import and utilize Angular 1 and all the Angular 1 ecosystem or whatever libraries you might have built, but you can write your ongoing/new apps in this Angular 2 (-like) style and migrate easily should you choose to.

![Harmony = 6 + 7;](logo.png "Harmony - Fire in my eyes")

## Concept

A base-class collection for OO programming in ES6 with angular.
Use it in conjunction with

* [literate-programming](http://npmjs.org/packages/literate-programming "click for npm-package-homepage") to write markdown-flavored literate JS, HTML and CSS
* [jspm](https://www.npmjs.com/package/jspm "click for npm-package-homepage") for a nice solution to handle npm-modules with ES6-Module-Format-Loading ...

## Files

This serves as literate-programming compiler-directive

[build/index.js](#Compilation "save:")

## Compilation

_Harmony_ is the ng-base-class for all other endeavours.
* It provides all _injected dependencies_ as *member-vars*
* It polyfills mixin support

```javascript
export class Harmony {
    constructor (...args) {
        for (let [i, injectee] of this.constructor.$inject.entries()) {
            this[injectee] = args[i];
        }
        for (let [key, fn] of this.iterate(this.constructor.prototype)) {
            if (typeof fn === "function" &&
                key[0] === "$") {
                this.$scope[key.slice(0, 1)] = this.$scope[key] = (...args) => {
                    return fn.apply(this, args);
                };
            }
        }
    }
```
An iterator factory allowing for easy _for .. of_ iteration es6-style
```javascript
    iterate (o) {
        return (function* (_o) {
            for (let [i, key] of Object.getOwnPropertyNames(_o).entries()) {
                yield [key, _o[key]];
            }
        })(o);
    }
```
Same thing, but static .. useful for other static utilities (eg register)
```javascript
    static iterate (o) {
        return (function* (_o) {
            for (let [i, key] of Object.getOwnPropertyNames(_o).entries()) {
                yield [key, _o[key]];
            }
        })(o);
    }
```
Getter and Setter for the static $inject variable
```javascript
    static get $inject () {
        return this._$inject || [];
    }
    static set $inject (injectees) {
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
```
Setter for the ng-registration of a service or controller
```javascript
    static set $register (descriptor) {
        for (let [module, klass] of this.iterate(descriptor)) {
            angular.module(module)[klass.type](klass.name, this);
        }
    }
```
Mixin foo to populate the prototype-chain with mixed in foos, first-come ->> immediate prototype, last ->> deeply nested
```javascript
    static mixin (...mixins) {
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
export class Controller extends Harmony {
    static set $register(descriptor) {
        for (let [module, klass] of this.iterate(descriptor)) {
            angular.module(module).controller(klass.name, this);
        };
    }
    digest () {
        try { this.$scope.$digest(); }
        catch (ngEx) { "noop"; }
    }
}
Controller.$inject = "$scope";
```
The _Service_ Class is a tiny base for Services that don't extend the more sophisticated DataServices
```javascript
export class Service extends Harmony {
    static set $register(descriptor) {
        for (let [module, klass] of this.iterate(descriptor)) {
            angular.module(module)[klass.type || "service"](klass.name, this);
        }
    }
}
Service.$inject = "$http";
```

## CHANGELOG

*0.2.1*: Add conditional initialize call to default base-constructor for better mixin-support

*0.3.2*: About to pick up development again, new logo

*<0.4*: Debuggin for [demo todo-mvc page on github.io](http://ng-harmony.github.io/ng-harmony)
