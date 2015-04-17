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
static get $inject () {
return this._$inject || [];
}
static set $inject (injectees) {
this._$inject = this.$inject.concat(injectees);
}

static set $register (descriptor) {
for (let [module, klass] of this.iterate(descriptor)) {
angular.module(module)[klass.type](klass.name, this);
}
}
static iterate (o) {
return (function* (_o) {
for (let key of Object.keys(_o)) {
yield [key, _o[key]];
}
})(o);
}
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
toString () {
return this.name || super.toString().match(/function\s*(.*?)\(/)[1];
}
}

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

export class Srvc extends Harmony {
constructor(...args) { super(...args); }

static set $register(descriptor) {
descriptor.type = "service";
for (let [module, klass] of this.iterate(descriptor)) {
angular.module(module)[klass.type](klass.name, this);
}
}
}