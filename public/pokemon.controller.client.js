(function () {
    angular
        .module('Pokemon-project')
        .controller('PPController', PPController)

    function PPController ($http, $location, $window) {
        var model = this

        PkSpr.process_dom();
        // 
        // $.getJSON('http://pokeapi.co/api/v2/stat/1/', function(data) {
        //     console.log(data)
        // })

        model.sendUsernamePassword = (function (username, password) {
            var url = '/'
            var user = {username: username,
                        password: password}
            return $http.post(url, user)
                        .then(login, error)
                        function login (accept) {
                            if (accept !== null) {
                                $window.location.href = '/database.html'
                            }
                        }
                        function error (err) {
                            model.message = "Wrong username & password"
                        }
        })

        model.disconnect = (function () {
            var url = '/database'
            return $http.get(url)
                        .then(logout)
                        function logout (out) {
                            $window.location.href = '/'
                        }
        })

    }
})()
