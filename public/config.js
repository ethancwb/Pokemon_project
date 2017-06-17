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
                    .when('/user/:userId', {
                        templateUrl:'templates/user_profile.html',
                        controller:'UserController',
                        controllerAs: 'model'
                    })
                    .when('/searchResult/:type', {
                        templateUrl:'templates/list-view.html',
                        controller:'SearchPokemonController',
                        controllerAs: 'model'
                    })
                    .when('/:userId/battle', {
                        templateUrl:'templates/battle.html',
                        controller:'BattleController',
                        controllerAs: 'model'
                    })
                    .when('/register', {
                        templateUrl:'templates/register.html',
                        controller:'PPController',
                        controllerAs: 'model'
                    })
                    .when('/user/:userId/pokemons', {
                        templateUrl:'templates/user_pokemons.html',
                        controller:'UserController',
                        controllerAs: 'model'
                    })
        }
})()
