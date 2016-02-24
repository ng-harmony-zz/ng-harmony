import "todomvc-app-css/index.css!";
import "todomvc-common/base.css!";

import tpl from "src/views/todomvc.html!text";

var routes = {
    home: {
        controller: "Todo",
        template: tpl,
        resolve: {
            TodoStorage: ($http, RemoteStorage, LocalStorage) => {
                return $http.get("/api")
                    .then(() => {
                        return RemoteStorage;
                    }, () => {
                        return LocalStorage;
                    });
            }
        },
        url: "/"
    },
    default: "/"
};

export default routes;