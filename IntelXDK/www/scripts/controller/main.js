tpapp.controller('mainController', function ($scope, $routeParams) {
    $scope.currentdate = new Date();
    $scope.quantity = 0;
    $scope.currency = getCurrency();
    $scope.newquantity = 0;
    $scope.dayTotal = 0;
    $scope.weekTotal = 0;
    $scope.monthTotal = 0;
    $scope.monthlyQuantity = 0;
    $scope.yearlyQuantity = 0;
    $scope.trandate = Date.now();
    $scope.trandateFormat = new moment($scope.trandate).format("DD MMMM, YYYY");

    if ($routeParams.d) {
        $scope.trandate = new Date($routeParams.d);
        $scope.trandateFormat = new moment($scope.trandate).format("DD MMMM, YYYY");
    }

    if (window.localStorage.getItem("mp_setting") == null) {
        window.location.href = "#/settings";
    }

    $scope.loadData = function () {
        var pickerInstance = picker.pickadate("picker");
        
        if (pickerInstance != null) {
            if (pickerInstance.get("select") != null) {
                $scope.trandate = pickerInstance.get("select").pick;
            }
        }

        db.get("milkconsumption", new moment($scope.trandate).format("YYYY-MM-DD")).done(function (result) {
            if (result) {
                $scope.quantity = result.consumption;
                $scope.dayTotal = (result.consumption * result.rate).toFixed(2);
            }
            else {
                $scope.quantity = 0;
                $scope.dayTotal = (0).toFixed(2);
            }

            $scope.calctotals();
        });
    }

    $scope.calctotals = function () {
        $scope.weekTotal = 0;
        $scope.monthTotal = 0;
        var startWeekDate = moment($scope.trandate).startOf('week').subtract(1, 'h');
        var endWeekDate = moment($scope.trandate).endOf('week');
        db.from("milkconsumption").where('monthyear', '=', moment().month() + moment().year()).list().done(function (result) {
            for (var i = 0; i < result.length; i++) {
                if (moment(result[i].key).isBetween(startWeekDate, endWeekDate)) {
                    $scope.weekTotal += (result[i].consumption * result[i].rate);
                }

                $scope.monthTotal += (result[i].consumption * result[i].rate);
            }

            $scope.monthTotal = $scope.monthTotal.toFixed(2);
            $scope.weekTotal = $scope.weekTotal.toFixed(2);
            $scope.$apply();
        });
    }

    $scope.loadEditModal = function () {
        $scope.newquantity = $scope.quantity;
        $('#editModal').openModal();
    }

    $scope.addRegularMilk = function () {
        db.get("milkconsumption", moment($scope.trandate).format("YYYY-MM-DD")).done(function (result) {
            var regularQty = getRegularQuantity();

            if (result == null) {
                result = {};
                result.date = Date.now();
                result.key = moment($scope.trandate).format("YYYY-MM-DD");
                result.monthyear = moment($scope.trandate).month() + moment($scope.trandate).year();
                result.rate = getRate();
                result.consumption = 0;
            }

            result.consumption += regularQty;

            db.put("milkconsumption", result).done(function (data) {
                $scope.quantity = result.consumption;
                $scope.dayTotal = ($scope.quantity * result.rate).toFixed(2);
                $scope.newquantity = result.consumption;
                $scope.calctotals();
            });
        });
    }

    $scope.save = function () {
        db.get("milkconsumption", moment($scope.trandate).format("YYYY-MM-DD")).done(function (result) {
            var regularQty = $scope.newquantity;

            if (result == null) {
                result = {};
                result.date = Date.now();
                result.key = moment($scope.trandate).format("YYYY-MM-DD");
                result.monthyear = moment($scope.trandate).month() + moment($scope.trandate).year();
                result.rate = getRate();
            }

            result.consumption = regularQty;

            db.put("milkconsumption", result).done(function (data) {
                $scope.quantity = regularQty;
                $scope.dayTotal = ($scope.quantity * result.rate).toFixed(2);
                $scope.newquantity = result.consumption;
                $scope.calctotals();
            });
        });
    }

    $scope.emptyMilk = function () {
        db.get("milkconsumption", moment($scope.trandate).format("YYYY-MM-DD")).done(function (result) {
            if (result == null) {
                result = {};
                result.date = Date.now();
                result.key = moment($scope.trandate).format("YYYY-MM-DD");
                result.monthyear = moment($scope.trandate).month() + moment($scope.trandate).year();
                result.rate = getRate();
            }

            result.consumption = 0;

            db.put("milkconsumption", result).done(function (data) {
                $scope.quantity = 0;
                $scope.dayTotal = ($scope.quantity * result.rate).toFixed(2);
                $scope.newquantity = result.consumption;
                $scope.calctotals();
            });
        });
    }

    $scope.loadData();

    $scope.swipeleft = function () {
        window.location.href = "#/main?d=" + currentDate.add(1, 'days').format("YYYY-MM-DD");
    }

    $scope.swiperight = function () {
        window.location.href = "#/main?d=" + currentDate.subtract(1, 'days').format("YYYY-MM-DD");
    }
});