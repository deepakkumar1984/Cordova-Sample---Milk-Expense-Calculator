tpapp.controller('reportController', function ($scope, $routeParams) {
    $scope.currentMonth = moment().format("MMYYYY");
    $scope.showMonth = moment().format("MMMM, YYYY");
    $scope.currency = getCurrency();
    $scope.totalconsumption = 0;
    $scope.totalamount = 0;
    $scope.data = [];
    if ($routeParams.d) {
        $scope.currentMonth = moment($routeParams.d).format("MMYYYY");
        $scope.showMonth = moment($routeParams.d).format("MMMM, YYYY");
    }

    $scope.load = function () {
        var t=0;
        var a=0;
        db.from("milkconsumption").where('monthyear', '=', moment().month() + moment().year()).list().done(function (result) {
            for (var i = 0; i < result.length; i++) {
                var d = {};
                
                d.consumption = result[i].consumption;
                d.date = moment(result[i].key).format("DD MMM, YYYY");
                d.total = $scope.currency + " " + (result[i].consumption * result[i].rate).toFixed(2);
                t += parseFloat(result[i].consumption);
                a += parseFloat(result[i].consumption * result[i].rate);
                $scope.data.push(d);
            }

            $scope.totalconsumption = t;
            $scope.totalamount = a.toFixed(2);
            $scope.$apply();
        });
    }

    $scope.load();

    $scope.swipeleft = function () {
        window.location.href = "#/report?d=" + currentDate.add(1, 'months').format("YYYY-MM-DD");
    }

    $scope.swiperight = function () {
        window.location.href = "#/report?d=" + currentDate.subtract(1, 'months').format("YYYY-MM-DD");
    }
});


