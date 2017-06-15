(function () {
    angular
        .module('Pokemon-project', ['ngRoute'])
        .config(Config)

        function Config ($routeProvider) {
            $routeProvider
                    .when('/', {
                        templateUrl:'templates/homepage.html',
                        controller:'PPController',
                        controllerAs: 'model'
                    })
                    .when('/login', {
                        templateUrl:'templates/login.html',
                        controller:'PPController',
                        controllerAs: 'model'
                    })
                    .when('/:uid/profile', {
                        templateUrl:'templates/user_profile.html',
                        controller:'PPController',
                        controllerAs: 'model'
                    })
                    .when('/searchResult', {
                        templateUrl:'templates/list-view.html',
                        controller:'PPController',
                        controllerAs: 'model'
                    })
                    .when('/:uid/battle', {
                        templateUrl:'templates/battle.html',
                        controller:'BattleController',
                        controllerAs: 'model'
                    })
                    .when('/register', {
                        templateUrl:'templates/register.html',
                        controller:'PPController',
                        controllerAs: 'model'
                    })
        }
})()
