//  Authentication Controller


AuthenticationModule.controller('AuthenticationController', ['$scope', '$http','GooglePlus', 'Facebook', function ($scope, $http, GooglePlus, Facebook) {


    $scope.showLogin = false;
    $scope.showRegister = false;

    $scope.Register = {};
    $scope.Login = {};


    // show Login Dialog
    $scope.OpenLogin = function () {
        $scope.showLogin = true;
        $scope.showRegister = false;
    }

    // close Login Dialog
    $scope.CloseLogin = function () {
        $scope.showLogin = false;
    }

    // switch to Register
    $scope.SwitchRegister = function () {
        $scope.showRegister = true;
    }

    // switch to Login
    $scope.SwitchLogin = function () {
        $scope.showRegister = false;
    }


    $scope.Login9Res = function () {
        console.log('Login9Res');

        console.log($scope.Login);

        //return;

        $http.post("/Login", {
            UserName: $scope.Login.Email,
            Password: $scope.Login.Password,
            RememberMe: $scope.Login.RememberMe

        }).
    success(function (data, status, headers, config) {
        console.log('Success Handler');
        console.log(data);
        console.log(status);
    }).
    error(function (data, status, headers, config) {
        console.log('Error Handler');
        console.log(data);
        console.log(status);
    });

    }

    $scope.Register9Res = function () {
        console.log('Register9Res');

        console.log($scope.Register);

        $http.post("/Register", {
            UserName: $scope.Register.UserName,
            Password: $scope.Register.Password,
            ConfirmPassword: $scope.Register.ConfirmPassword,
            RememberMe: $scope.Register.RememberMe

        }).
            success(function (data, status, headers, config) {
                console.log(data);
                console.log(status);
            }).
            error(function (data, status, headers, config) {
                console.log(data);
                console.log(status);
            });


    }


    $scope.loginGooglePlus = function () {
        GPlogin();
        //$scope.showLogin = false;
    }

    $scope.loginFacebook = function () {
        //$scope.showLogin = false;
    }

    $scope.loginTwitter = function () {
        //$scope.showLogin = false;
    }

    



    var GPlogin = function () {
        //console.log('checkAuth');
        //GooglePlus.checkAuth().then(function (authResult) {
        //    console.log('authResult');
        //    console.log(authResult);

        //    GooglePlus.getUser().then(function (user) {
        //        console.log('user');
        //        console.log(user);
        //    });
        //}, function (err) {
        //    console.log(err);
        //});

        console.log('login');
        GooglePlus.login().then(function (authResult) {
            console.log('authResult');
            console.log(authResult);

            GooglePlus.getUser().then(function (user) {
                console.log('user');
                console.log(user);
            });
        }, function (err) {
            console.log('err callback');
            console.log(err);
            GooglePlus.getUser().then(function (user) {
                console.log('user');
                console.log(user);
            });
        }).finally(function (result) {
            console.log('final check');

            GooglePlus.getUser().then(function (user) {
                console.log('user');
                console.log(user);
            });


        });
    };

    $scope.loginStatus = 'disconnected';
    $scope.facebookIsReady = false;
    $scope.user = null;

    Facebook.getLoginStatus(function (response) {
        if (response.status == 'connected') {
            userIsConnected = true;
        }
    });


    $scope.FBgetLoginStatus = function () {
        Facebook.getLoginStatus(function (response) {
            $scope.loginStatus = response.status;
            //if (response.status === 'connected') {
            //    $scope.loggedIn = true;
            //} else if (response.status === 'not_authorized') {
            //    // the user is logged in to Facebook, 
            //    // but has not authenticated your app
            //} else {
            //    // the user isn't logged in to Facebook.
            //}
        });
    };


    $scope.FBapi = function () {
        Facebook.api('/me', function (response) {
            $scope.user = response;
            console.log(response);

        });
    };

    $scope.FBlogin = function () {
        var AllUserData = {};

        FB.getLoginStatus(function (response) {
            $scope.loginStatus = response.status;
            console.log('starting status:' + $scope.loginStatus);
        }, true);

        // check status
        //Facebook.getLoginStatus(function (response) {
        //    //$scope.loginStatus = response.status;
        //    //if (response.status === 'connected') {
        //    //    $scope.loggedIn = true;
        //    //} else if (response.status === 'not_authorized') {
        //    //    // the user is logged in to Facebook, 
        //    //    // but has not authenticated your app
        //    //} else {
        //    //    // the user isn't logged in to Facebook.
        //    //}
        //    console.log(response.status);
        //});


        if ($scope.loginStatus === 'connected')
            return;

        FB.login(function (response) {
            console.log(response);

            AllUserData.accessToken = response.authResponse.accessToken;
            AllUserData.userID = response.authResponse.userID;

            if (response.authResponse) {
                console.log(response);

                AllUserData.grantedScopes = response.authResponse.grantedScopes;

                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function (response) {
                    console.log(response);

                    AllUserData.name = response.name;
                    AllUserData.email = response.email;
                    AllUserData.first_name = response.first_name;
                    AllUserData.last_name = response.last_name;
                    AllUserData.verified = response.verified;
                    console.log(AllUserData);

                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        },
        {
            scope: 'email,user_likes',
            //auth_type: 'reauthenticate',
            return_scopes: true
        });


        console.log(AllUserData);
        //console.log('Name: ' + response.name);
        //console.log('Email: ' + response.email);
        //console.log('status: ' + response.status);
        //console.log('User ID: ' + response.authResponse.userID);
        //console.log('Acess Token: ' + response.authResponse.accessToken);
        //console.log('User Date: ' + response.email + '.' + response.name + '.');
        //console.log('User Date: ' + response.email + '.' + response.name + '.');
        //console.log('User Date: ' + response.email + '.' + response.name + '.');



        Facebook.getLoginStatus(function (response) {
            console.log(response.status);
            $scope.loginStatus = response.status;;
        });

        //Facebook.getLoginStatus(function (response) {
        //    console.log(response.status);
        //    $scope.loginStatus = response.status;;

        //    if (response.status == 'connected') {
        //        console.log('9es Connected to FB');
        //        console.log(response.authResponse);
        //    }
        //    if (response.status == 'disconnected') {
        //        console.log('9es Connected to FB');
        //        Facebook.login(function (response) {
        //            $scope.loginStatus = response.status;
        //            return;
        //        });
        //$scope.loginStatus = response.status;

        //    }
        //});




    };


}]);