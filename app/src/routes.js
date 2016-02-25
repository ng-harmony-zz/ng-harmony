import "todomvc-app-css/index.css!";
import "todomvc-common/base.css!";

import tpl from "src/views/todomvc.html!text";

var routes = {
    home: {
        controller: "Todo",
        template: tpl,
        resolve: {
            TodoStorage: ($q, $http, RemoteStorage, LocalStorage) => {
                return $q((resolve, reject) => {
                    $http.get("/api")
                        .then(() => {
                            resolve(RemoteStorage);
                        }, () => {
                            resolve(LocalStorage);
                        });
                }).then((service) => { return service; });
            }
        },
        url: ""
    },
    "home.active": {
        url: "active"
    },
    "home.completed": {
        url: "completed"
    }
};

export default routes;