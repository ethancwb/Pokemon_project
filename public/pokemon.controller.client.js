(function () {
    angular
        .module('Pokemon-project')
        .controller('PPController', PPController)
        .controller('SearchPokemonController', SearchPokemonController)
        .controller('UserController', UserController);

    function UserController ($http, $routeParams, $location, $window, $scope) {
        var model = this;
        model.initProfile = initProfile;
        model.initUserPokemons = initUserPokemons;
        model.initUserBattleTeam = initUserBattleTeam;
        model.addNewPokemon = addNewPokemon;


        function initUserBattleTeam(userId) {
            var url = '/initUserBattleTeam';
            return $http.post(url, userId)
                .then(getUserBattleTeam, error)
                function getUserBattleTeam (response) {
                    model.battlePokemons = response.data[0];
                }
                function error (err) {
                return err;
                }

        }

        function initUserPokemons(userId) {
            var url = '/initUserPokemons';
            return $http.post(url, userId)
                .then(getUserPokemons, error)
                    function getUserPokemons (response) {
                        model.userPokemons = response.data[0];
                        initUserBattleTeam(userId);
                    }
                    function error (err) {
                        return err;
                    }
        }

        function initProfile() {
            var url = '/getUserById';
            model.uid = $routeParams.userId;
            var userId = {
                userId: model.uid
            };
            return $http.post(url, userId)
                .then(getUserById, error)
            function getUserById(response) {
                model.user = response.data[0][0];
                initUserPokemons(userId);
            }
            function error(err) {
                return err;
            }

        }
        initProfile();

        function addNewPokemon() {
            var url = '/generateAPokemon';
            var uid = $routeParams.userId;
            var newOwn = {
                pid: Math.floor((Math.random() * 721) + 1),
                uid: uid};
            return $http.post(url, newOwn)
                        .then(updateUserPokemon, error);
                        function updateUserPokemon(response) {
                            initProfile()
                        }
                        function error(err) {
                            return err;
                        }
        }

        model.removePokemon = function (id) {
            var url = '/deletePokemon/' + id
            var uid = $routeParams.userId;
            var userId = {
                userId: uid
            };
            return $http.delete(url)
                        .then(function (response) {
                            initUserPokemons(userId)
                        })
        }
    }

    function SearchPokemonController ($http, $routeParams, $location, $window, $scope) {
        var model = this;
        model.searchPokemonByType = searchPokemonByType;

        function searchPokemonByType () {
            var url = '/getPokemonByType';
            var type = $routeParams.type;
            var pokemon_type = {poke_type: type};
            return $http.post(url, pokemon_type)
                .then(renderList, error)
                function renderList (response) {
                    model.pokemons = response.data[0];
                }
                function error(err) {
                    return err;
                }
        }

        model.search = function (val) {
            if (val === '' || val === null || val === undefined) {
                model.error = "search field can not be empty!"
                return
            } else {
                $location.url('/searchResult/' + val)
            }
        }

        searchPokemonByType()
    }

    function PPController ($http, $routeParams, $location, $window, $scope) {
        var model = this;
        model.register = register;
        model.login = login;

        //
        // $.getJSON('http://pokeapi.co/api/v2/stat/1/', function(data) {
        //     console.log(data)
        // })

        // function searchPokemonByType () {
        //     var pokemon_type = $routeParams.type;
        //     console.log(pokemon_type);
        //     alert (
        //     connection.query("SELECT * FROM registered_users", function (err, result) {
        //         if (err) throw err;
        //         console.log(result);
        //     }));
        //
        // }

        function login(username, password) {
            var url = '/userLogin';
            var user ={
                username: username,
                password: password
            };
            return $http.post(url, user)
                .then(userLogin, error)
                function userLogin (response) {
                    $location.url("/user/" + response.data[0][0].user_id);
                }
                function error(err) {
                    model.error = err.data;
                }

        }

        function register (username, password, rePassword) {
            var url = '/registeration';
            var user = {
                uid: new Date().getUTCMilliseconds(),
                username: username,
                password: password
            };
            return $http.post(url, user)
                .then(regisration, error)
                function regisration (response) {
                    $location.url("/user/" + response.data[0][0].user_id);
                }
                function error(err) {
                    return err
                }

        }

        model.search = function (val) {
            if (val === '' || val === null || val === undefined) {
                model.error = "search field can not be empty!"
                return
            } else {
                $location.url('/searchResult/' + val)
            }
        }
    }
})();
