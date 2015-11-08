## Synopsis

Base Classes for all ng-harmony-modules. Ng-Harmony is a collection of modules that allow for unique Angular-Codestyle, eg. Classes in Angular 1

## Code Example

```javascript
import { Controller, Service } from "ng-harmony/ng-harmony";
import { SomeUtilityClass, OtherUtilityClass} from "my-org/my-repo";
```

We can mixin some of our own class-methods via mixin

```javascript
class ListController extends Controller.mixin(SomeUtilityClass, OtherUtilityClass) {
```

Be sure to call the super constructor before you do your important stuff. The super-constructor does initialization like creating the dependency injected accessors/member vars and bind $-prefixed methods to `this.$scope`.

```javascript
    constructor (...args) {
        super(...args);
        this.dataInterval = this.$interval(this.input, 1000);
    }
    input () {
        if (this.MyListService.status === true) {
            this.$interval.cancel(this.dataInverval);
            this.$scope.data = this.MyListService.data;
            this.digest();
        }
    }
```

If you want your method to be exposed in $scope, you need to prefix the method-name with `$`

```javascript
    $href (n) {
        this.$location.url(this.$scope.data[n].url);
    }
}
```

Dependency Injection works via a static setter ...
You can pass a single dependency as a string, or multiple as an Array of strings.

```javascript
ListController.$inject = ["$location", "$interval", "MyListService"];
```

We need to register our class with angular. The passing in of a type with extending Controller is unnecessary/optional, since controller is unambiguous. It's different with Services, since there is `angular.service`, `angular.factory` ...

```javascript
ListController.$register = {
    "myModule":  {
        type: "controller",
        name: "ListController"
    }
};
```

Now let's create our View/Template

```jade
ul
    li(ng-repeat="item in data")
        a(ng-click="href($index)") {{item.name}}
```

Now let's create a small service to serve the list-api-data to whichever controller needs it

```javascript
class MyListService extends Service {
    initialize () {
        this.apiUrl = "/api/listItems";
        this.fetch();
    }
    fetch () {
        $http.get(this.apiUrl).then(this.success, this.error);
    }
    success (response) {
        this.data = response.data || [];
        this.status = response.status;
    }
    error (response) {
        this.status = response.status;
    }
    get status () {
        if (this._status == "200") {
            return true;
        } else {
            return false;
        }
    }
    set status (status) {
        this._status = status;
    }
}
MyListService.$register = {
    "myModule": {
        type: "service",
        name: "MyListService"
    }
}
```

## Motivation

* I wanted to code OOP with Angular
* I wanted to be able to reuse my classes as in creating whole libs
* I wanted a place that might become a community project
* I didn't want to wait on Angular 2

## Installation

I recommend the usage of jspm.
This way, just base your project upon jspm and start using this lib as in the code example above.

```bash
jspm i github:ng-harmony/ng-harmony
```

## API Reference

`Harmony` (Root-Class)=
    `static $inject`: Dependency injection
    `static $register`: Register the class with a module
    `static iterate`: Iterate with for .. of over { objs }
    `static mixin`: mixin Utility classes
    `toString`: access the Class-Name inside an instance

`Controller`
    `digest`: manually trigger an angular digest-cycle

## Contributors

Drop me an email at johannes.neugschwentner at gmail dot com

## License

MIT
