angular.module('DemoApp', ["ui.router"]).
        config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
                //
                // For any unmatched url, redirect to /state1
                $urlRouterProvider.otherwise("/car");

                $stateProvider
                        .state('car', {
                            title: "Home",
                            url: "/car",
                            templateUrl: "car.html",
                            controller: "carController"
                        })
                        .state('edit', {
                            title: "edit",
                            url: "/car/:id",
                            templateUrl: "edit-car.html",
                            controller: "editCarController"
                        });
            }]);


angular.module("DemoApp").controller('carController', ['$scope', '$stateParams', 'CarFactory', function ($scope, $stateParams, CarFactory) {
        $scope.cars = CarFactory.getCars();

        $scope.deleteCar = function (id) {
            CarFactory.deleteCar(id);
            $scope.cars = CarFactory.getCars();
        }
    }]);

angular.module("DemoApp").controller('editCarController', ['$scope', '$stateParams', 'CarFactory', function ($scope, $stateParams, CarFactory) {
        $scope.car = {};

        if ($stateParams.id === "") {
            $scope.car.id = 0;
        }
        else {
            $scope.car = CarFactory.getCars()[$stateParams.id - 1];
        }

        $scope.addCar = function () {
            CarFactory.addEditCar($scope.car);
            alert("created");
        }
    }]);