var tpapp = angular.module('tp-app', ['ngAnimate', 'ngRoute', 'ngTouch']);

var schemas = {
    stores: [{
        name: 'milkconsumption',
        keyPath: 'key',
        indexes: [{ name: 'monthyear', type: 'INTEGER' }]
    }]
};

var db = new ydn.db.Storage('vocapp', schemas);

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
        })

        .when('/settings', {
            templateUrl: 'settings.html',
            controller: 'settingsController'
        })

        .when('/report', {
            templateUrl: 'report.html',
            controller: 'reportController'
        });
});

function getRegularQuantity() {
    var settings = JSON.parse(window.localStorage.getItem("mp_setting"));
    if (settings) {
        return settings.regular;
    }
    else {
        return 0;
    }
}

function getRate() {
    var settings = JSON.parse(window.localStorage.getItem("mp_setting"));
    if (settings) {
        return settings.rate;
    }
    else {
        return 0;
    }
}

function getCurrency() {
    var settings = JSON.parse(window.localStorage.getItem("mp_setting"));
    if (settings) {
        return settings.currency;
    }
    else {
        return 0;
    }
}
