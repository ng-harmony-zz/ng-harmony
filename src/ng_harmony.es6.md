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

Import bean, a dependency-less eventing lib, and zest, a tiny and fast selector-engine.
```javascript
    import bean from 'bean';
    import zest from 'zest';

    export class Controller extends Harmony {
        constructor (...args) {
            super(...args)
```
Iterating over the prototype, filtering private properties and initialization, we look for evented methods and hook em up using bean, the eventing lib, and zest, the selector engine
```javascript
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
The _DataService_ Class is a starting point for API-consuming Services, that provide linkable Data-Objects
```javascript
    export class DataService extends Harmony {
```
Initiate and trigger
```javascript
        _db (api, { name, oneshot, interval }) {
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
                        this.q.reject() :
                        this.q.notify(false);
                }, 0);
            }
            if (this.oneshot === false) {
                this.q.promise.then(
                    () => { true; },
                    (notification) => { this.$timeout(this._api, @this.interval); },
                    () => { false; }
                )
            }

            this._api();
            this.q.promise();
        }
```
AJAX Mechanism
```javascript
        _api () {
            if (@db.busy === true) { return null; }
            this.db.busy = true;
            this.db.handle.get().$promise
                .then((data) =>
                    console.info(`${(new Date()).toLocaleTimeString('en-US')}: API/${this.name}: success`);
                    this._store(data[this.name] || data);
                    this.db.busy = false;
                    if (this.oneshot !== false) {
                        this.q && this.q.resolve();
                        this.q = this.$q.defer();
                    } else { this.q.notify(true); }
                ).catch((err) =>
                    console.warn(`${(new Date()).toLocaleTimeString('en-US')}: API/${this.name}: ${err.toString()}`);
                    if (this.oneshot !== false) {
                        this.q && this.q.reject();
                        this.q = this.$q.defer();
                    } else {
                        this.q.notify(false);
                    }
                );
        }
```
Storage Mechanism
```javascript
        _store (data) {
```
Usually the API returns an Array of n datasets
Should your API return an Object instead, it is "arrayified"
```javascript
            let _data = Object.prototype.toString.call(data) === "[object Array]" ? data : [data];
```
Before we update the existing in-memory database to the newly returned API values we want to clean up all outdated datasets
```javascript
            for (let [i, o] of this.db.store.entries()) {
                o.deleted = true;
            }
```
Iterating over the new datasets we
* invalidate the deleted prop for the now newly existing props
* via this mech will not loose special ng-hash-vals and possibly some of your personal special data
```javascript
            for (let [i, o] of this.db.store.entries()) {
                let current = null;
                if (current = _data.filter((el, i, arr) => { return (el.id === o.id); })[0]) {
                    for (let [k, v] of this.constructor.iterate(current)) { this.db.store[i][k] = v; }
                    this.db.store[i].deleted = false;
                }
            }
            for (let [i, o] of _data.entries()) {
                let current = null;
                if (this.db.store.filter((el, i, arr) => { return el.id === o.id; }).length === 0) {
                    this.db.store.push(o);
                    this.db.store[this.db.store.length - 1].deleted = false;
                }
            }
        }
    }
    DataService.$inject = ["$resource", "$interval", "$q", "$timeout"]
```
The DynamicDataService provides some convenience mechanisms for cooperation of DataServices and Controllers
* Event Subscription
* Auto Notification on Ajax-Data
* Pre-Configuration of Ajax-Data
* Getter and Setter to the in-memory db
```javascript
    export class DynamicDataService extends DataService {
        subscribe
    }
```
