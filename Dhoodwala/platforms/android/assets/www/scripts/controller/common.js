var tpapp = angular.module('tp-app', ['ngRoute']);

tpapp.config(function ($routeProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl: 'main.html',
            controller: 'mainController'
        })

        .when('/main', {
            templateUrl: 'main.html',
            controller: 'mainController'
        });
});
