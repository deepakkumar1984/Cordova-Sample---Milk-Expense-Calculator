tpapp.controller('settingsController', function ($scope) {
    $scope.name = "";
    $scope.provider = "";
    $scope.delivery = 0;
    $scope.rate = 0;
    $scope.regular = 0;
    $scope.currency = "";
    

    if (window.localStorage.getItem("mp_setting") != null) {
        var settings = JSON.parse(window.localStorage.getItem("mp_setting"));
        $scope.name = settings.name;
        $scope.provider = settings.provider;
        $scope.delivery = settings.delivery;
        $scope.rate = settings.rate;
        $scope.regular = settings.regular;
        $scope.currency = settings.currency;
    }


    $scope.save = function () {
        var settingData = {};
        settingData.name = $scope.name;
        settingData.provider = $scope.provider;
        settingData.delivery = $scope.delivery;
        settingData.rate = $scope.rate;
        settingData.regular = $scope.regular;
        settingData.currency = $scope.currency;

        window.localStorage.setItem("mp_setting", JSON.stringify(settingData));
    }
});