import { NotImplementedError } from "ng-harmony-log";

export let Harmony = class Harmony {
	constructor(...args) {
		for (let [i, injectee] of this.constructor.$inject.entries()) {
			this[injectee] = args[i];
		}
		this._constructedTimestamp = new Date().getTime();
	}

	get LISTENERS() {
		if (this._isEmpty(this._LISTENERS)) {
			this._LISTENERS = [];
		}
		return this._LISTENERS;
	}
	set LISTENERS(o) {
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
			});
		}
	}
	static get LISTENERS() {
		return this._LISTENERS || [];
	}
	static set LISTENERS(transientMap) {
		this._LISTENERS = transientMap;
	}

	_noop() {
		;
	}
	get _random() {
		if (this._isEmpty(this.__random)) {
			this.__random = (Math.random() / this._constructedTimestamp).toString(36).slice(-7);
		}
		return this.__random;
	}
	_validate(fn) {
		return new Promise((resolve, reject) => {
			try {
				resolve(fn());
			} catch (e) {
				console.log(e);
				reject(e);
			}
		});
	}
	_isEmpty(tested) {
		return typeof tested === "undefined" || tested === null;
	}
	_isFunction(foo) {
		return typeof foo === "function";
	}
	_isPromise(foo) {
		return !this._isEmpty(foo) && this._isFunction(foo.then);
	}
	_isFalsy(foo) {
		return this._isEmpty(foo) || foo instanceof Error;
	}
	_closurize(fn, ctx, ...args) {
		return new Promise((resolve, reject) => {
			this._validate(fn.bind(ctx, ...args)).then((...args) => {
				if (this._isPromise(args[0])) {
					retVal.then(resolve.bind(ctx)).catch(reject.bind(ctx));
				} else {
					if (args.length > 1 || args[0] && !(args[0] instanceof Error)) {
						resolve.call(ctx, ...args);
					} else {
						reject.call(ctx, ...(args || null));
					}
				}
			});
		});
	}
	get _name() {
		return `${ this.constructor.name }::${ this._constructedTimestamp }::${ this._random }`;
	}
	_parseName(name) {
		let _name = name.split("::");
		return {
			fn: _name[0],
			ts: _name[1],
			id: _name[2]
		};
	}
	get _parsedName() {
		return this._parsedName(this._name);
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
				if (injecteeStr.charAt(0) !== "-") {
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
	static set $register(descriptor) {
		for (let [module, klass] of Harmony.iterate(descriptor)) {
			angular.module(module)[klass.type](klass.name, this);
		}
	}
	static mixin(...mixins) {
		for (let [i, mixin] of mixins.entries()) {
			for (let [k, v] of Harmony.iterate(mixin)) {
				(this.prototype[k] === null || typeof this.prototype[k] === "undefined") && Object.defineProperty(this.prototype, k, {
					value: v,
					enumerable: true
				});
			}
		}
	}
	static implement(...interfaces) {
		for (let [i, Interface] of interfaces.entries()) {
			for (let [k, v] of Harmony.iterate(Interface)) {
				(this.prototype[k] === null || typeof this.prototype[k] === "undefined") && Object.defineProperty(this.prototype, k, {
					value: () => {
						throw new NotImplementedError(k);
					},
					enumerable: true
				});
			}
		}
	}

	toString() {
		return this.name || super.toString().match(/function\s*(.*?)\(/)[1];
	}
};
export let Controller = class Controller extends Harmony {
	constructor(...args) {
		super(...args);
		for (let [key, fn] of this.iterate(this.constructor.prototype)) {
			if (typeof fn === "function" && key[0] === "$") {
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
	digest() {
		try {
			this.$scope.$digest();
		} catch (ngEx) {
			"noop";
		}
	}
};
Controller.$inject = "$scope";
export let Service = class Service extends Harmony {
	static set $register(descriptor) {
		for (let [module, klass] of Harmony.iterate(descriptor)) {
			angular.module(module)[klass.type || "service"](klass.name, this);
		}
	}
};
Service.$inject = "$http";

//# sourceMappingURL=umd_module.js.map