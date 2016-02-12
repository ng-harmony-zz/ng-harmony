var routeConfig = {
    controller: "TodoCtrl",
    templateUrl: "app/templates/todomvc.html",
    resolve: {
        TodoStorage: ($http, LocalStorage, RemoteStorage) => {
            return $http.get("/api")
                .then(() => {
                    return RemoteStorage;
                }, () => {
                    return LocalStorage;
                });
        }
    }
};
export default routeConfig;
