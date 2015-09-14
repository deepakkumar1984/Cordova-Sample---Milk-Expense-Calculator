tpapp.controller('profileController', function ($scope) {
    $scope.name = "";
    $scope.email = "";
    $scope.serviceProvider = "";
    $scope.serviceType = "";
    $scope.serviceTypeList = ['Packet', 'Bottle', 'Loose'];
    $scope.rate = 0;
    $scope.regularConsumption = 0;
    $scope.extraConsumption = 0;

    $scope.loadData = function () {

    }

    $scope.save = function (key) {

    }
});