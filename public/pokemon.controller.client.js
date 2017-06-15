(function () {
    angular
        .module('Pokemon-project')
        .controller('PPController', PPController)

    function PPController ($http, $location, $window) {
        var model = this

        PkSpr.process_dom();

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
