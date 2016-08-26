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
		this._constructedTimestamp = (new Date()).getTime();
	}
```

Listener Proxy to be used across Services and StatefulControllers

```javascript
	get LISTENERS () {
		if (this._isEmpty(this._LISTENERS)) {
			this._LISTENERS = [];
		}
		return this._LISTENERS;
	}
	set LISTENERS (o) {
		let _o = o;
		if (!Array.isArray(o)) {
			_o = [o];
		}
		for (let [i, l] of _o.entries()) {
			this._LISTENERS.push(l.name.id, {
				ctx: l.ctx,
				name: l.name.fn,
				createdAt: l.name.ts,
				el: l.el || null
			})
		}
	}
	static get LISTENERS () {
		return this._LISTENERS || [];
	}
	static set LISTENERS (transientMap) {
		this._LISTENERS = transientMap;
	}
```

Little Helper Function for nice debugging and code assumptions
```javascript
	_noop () {
		;
	}
	get _random () {
		if (this._isEmpty(this.__random)) {
			this.__random = (Math.random() / this._constructedTimestamp).toString(36).slice(-7);
		}
		return this.__random;
	}
	_validate (fn) {
		return new Promise((resolve, reject) => {
			try {
				resolve(fn());
			} catch (e) {
				console.log(e);
				reject(e);
			}
		});
	}
	_isEmpty (tested) {
		return (typeof tested === "undefined" || tested === null);
	}
	_isFunction (foo) {
		return (typeof foo === "function");
	}
	_isPromise (foo) {
		return !this._isEmpty(foo) && this._isFunction(foo.then);
	}
	_isFalsy (foo) {
		return (this._isEmpty(foo) || foo instanceof Error);
	}
	_closurize (fn, ctx, ...args) {
		return new Promise((resolve, reject) => {
			this._validate(fn.bind(ctx, ...args))
				.then((...args) => {
					if (this._isPromise(args[0])) {
						retVal
							.then(resolve.bind(ctx))
							.catch(reject.bind(ctx));
					} else {
						if (args.length > 1 || args[0] && !(args[0] instanceof Error)) {
							resolve.call(ctx, ...args);
						} else {
							reject.call(ctx, ...args || null);
						}
					}
				});
		});
	}
	get _name () {
		return `${this.constructor.name}::${this._constructedTimestamp}::${this._random}`;
	}
	_parseName (name) {
		let _name = name.split("::");
		return {
			fn: _name[0],
			ts: _name[1],
			id: _name[2]
		}
	}
	get _parsedName () {
		return this._parsedName(this._name);
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
				if(injecteeStr.charAt(0) !== "-") {
					_injectees.push(injecteeStr);
				} else {
					let j = this.$inject.indexOf(injecteeStr.slice(1));
					if (!!~j) {
						this._$inject.splice(j, 1);
					}
				}
			}
		}
		this._$inject = this.$inject.concat(_injectees);
	}
```
Setter for the ng-registration of a service or controller
```javascript
	static set $register (descriptor) {
		for (let [module, klass] of Harmony.iterate(descriptor)) {
			angular.module(module)[klass.type](klass.name, this);
		}
	}
```
Mixin foo to populate the prototype-chain with mixed in foos, first-come ->> immediate prototype, last ->> deeply nested
```javascript
	static mixin (...mixins) {
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
	constructor (...args) {
		super(...args);
		for (let [key, fn] of this.iterate(this.constructor.prototype)) {
			if (typeof fn === "function" &&
				key[0] === "$") {
				this.$scope[key.slice(1)] = this.$scope[key] = (...args) => {
					return fn.apply(this, args);
				};
			}
		}
	}
	static set $register(descriptor) {
		for (let [module, klass] of Harmony.iterate(descriptor)) {
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
		for (let [module, klass] of Harmony.iterate(descriptor)) {
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

*0.4.4*: Enhancing mixing in with constructor-mixin-support ... mixin-constructors get called in Harmony-super-constructor

*0.4.5*: Practical difficulties with mixing constructors, getting rid of it again
