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
        model.add2Team = add2Team;

        function initUserBattleTeam(userId) {
            var url = '/initUserBattleTeam';
            return $http.post(url, userId)
                .then(getUserBattleTeam, error);
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

        function add2Team(pokemonOwnsUserId, pokemonOwnsId) {
            var url = '/add2Team';
            var ownsId = {
                userId: pokemonOwnsUserId,
                ownsId: pokemonOwnsId
            };
            return $http.post(url, ownsId)
                    .then(updateUserPokemon, error);
                function updateUserPokemon(response) {
                    initProfile()
                }
                function error(err) {
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
                userTier: model.user.tier,
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

    function getBerries() {
    return $http.get('/searchBerry')
                .then(function (response) {
                    model.berries = response.data[0]
                })
    }

    function SearchPokemonController ($http, $routeParams, $location, $window, $scope) {
        var model = this;
        model.searchPokemonByType = searchPokemonByType;

        function getBerries() {
            return $http.get('/searchBerry')
                        .then(function (response) {
                            model.berries = response.data[0]
                        })
        }

        function searchPokemonByType () {
            var url = '/getPokemonByType';
            var type = $routeParams.type;
            var pokemon_type = {poke_type: type};
            return $http.post(url, pokemon_type)
                .then(renderList, error)
                function renderList (response) {
                    model.pokemons = response.data[0];
                    if (model.pokemons[0].poke_id === null) {
                        model.error = "Searched a wrong term"
                        model.pokemons = null
                        return
                    }
                }
                function error(err) {
                    return err;
                }
        }

        model.clickPanel = function (name) {
            $window.location.href = 'http://www.pokemon.com/us/pokedex/' + name
        }

        model.berryClickPanel = function (name) {
            $window.location.href = 'http://bulbapedia.bulbagarden.net/wiki/' + name
        }

        model.search = function (val) {
            if (val === '' || val === null || val === undefined) {
                model.error = "search field can not be empty!"
                return
            } else {
                if (val === 'berry') {
                    $location.url('/searchBerry')
                } else {
                    $location.url('/searchResult/' + val)
                }
            }
        }
        getBerries()
        searchPokemonByType()
    }

    function PPController ($http, $routeParams, $location, $window, $scope) {
        var model = this;
        model.register = register;
        model.login = login;

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
                    model.message = "Wrong username/password!";
                }
        }

        function register (username, password, rePassword) {
            var url = '/registeration';
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user)
                .then(regisration, error)
                function regisration (response) {
                    $location.url("/user/" + response.data[0][0].user_id);
                }
                function error(err) {
                    model.err = "wrong in registion"
                }

        }

        model.search = function (val) {
            if (val === '' || val === null || val === undefined) {
                model.error = "search field can not be empty!"
                return
            } else {
                if (val === 'berry') {
                    $location.url('/searchBerry')
                } else {
                    $location.url('/searchResult/' + val)
                }
            }
        }
    }
})();
