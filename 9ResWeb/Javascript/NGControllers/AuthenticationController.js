//  Authentication Controller


AuthenticationModule.controller('AuthenticationController', ['$scope', '$http', 'GooglePlus', 'Facebook', 'Authentication', function ($scope, $http, GooglePlus, Facebook, Authentication) {


    // Initialize User Status and Data
    $scope.showLogin = false;
    $scope.showRegister = false;
    $scope.save = { showSaveResume: false };

    $scope.ProgressBar = false;

    $scope.LoggedIn = Authentication.GetLoggedInStatus();
    $scope.UserData = Authentication.GetUserData();
    $scope.Register = { };
    $scope.Login = {};

    $scope.ShowSaveResume = function () {
        $scope.$parent.showSaveResume = true;
    }


    $scope.HideSaveResume = function () {
        //alert(1);
        $scope.showSaveResume = false;
    }

    if ($scope.LoggedIn) {
        Authentication.HTTPGetUserData();
        //console.log('logged in');
    }


    // Define Controller Globals
    $scope.Logout = function () {
        $http.post("/Logout", {

        }).
        success(function (data, status, headers, config) {
            console.log('Success Logout');
            $scope.SetUserLoggedOut();

        }).
        error(function (data, status, headers, config) {
            console.log('Error Logout');
        });


    }

    // Check if User is logged in
    $scope.IsLoggedIn = function () {
        return Authentication.GetLoggedInStatus();
    }

    
    // Set Client Status to User Logged In
    $scope.SetUserLoggedIn = function () {
        console.log('logging in');
        Authentication.SetUserLoggedIn();
    }

    // Set Client Status to User Logged Out
    $scope.SetUserLoggedOut = function () {
        Authentication.SetUserLoggedOut();
    }

    // Set Client Status to User Logged Out
    $scope.SetUserData = function (data) {
        Authentication.SetUserData(data);
    }
    
    // Show Login Dialog
    $scope.OpenLogin = function () {
        $scope.showLogin = true;
        $scope.showRegister = false;
    }

    // Hide Login Dialog
    $scope.CloseLogin = function () {
        $scope.showLogin = false;
    }

    // Switch Dialog to Register Template
    $scope.SwitchRegister = function () {
        $scope.showRegister = true;
    }

    // Switch Dialog to Login Template
    $scope.SwitchLogin = function () {
        $scope.showRegister = false;
    }

    $scope.ShowProgress = function () {
        $scope.ProgressBar = true;
    }

    $scope.HideProgress = function () {
        $scope.ProgressBar = false;

        $scope.$apply(function () {
            $scope.ProgressBar = false;
        });
    }



    // Send Login Credentials to Login API
    $scope.Login9Res = function () {

        $scope.ShowProgress();
        //console.log('Login9Res');
        //console.log($scope.Login);

        var promise = Authentication.Login9Res($scope.Login.Email, $scope.Login.Password, $scope.Login.RememberMe);

        promise.success(function (data, status, headers, config) {
            //console.log('Success Handler'); console.log(data); console.log(status);

            //$scope.SetUserData(data);
            Authentication.SetUserData(data);

            $scope.SetUserLoggedIn();
            $scope.CloseLogin();
            if (!$scope.$$phase) {
                $scope.$digest(); // or $apply
            }

        }).
            error(function (data, status, headers, config) {
                console.log('Error Handler');
                console.log(data);
                console.log(status);
            })
        .finally(function () {
            $scope.HideProgress();
        });

    }

    // Send Register Credentials to Register API
    $scope.Register9Res = function () {
        $scope.ShowProgress();

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
                Authentication.SetUserData(data);

                $scope.SetUserLoggedIn();
                $scope.CloseLogin();
                if (!$scope.$$phase) {
                    $scope.$digest(); // or $apply
                }

            }).
            error(function (data, status, headers, config) {
                console.log(data);
                console.log(status);
            })
                .finally(function () {
                    $scope.HideProgress();
                });
    }

    // Request Validation from Google API
    $scope.loginGooglePlus = function () {
        console.log('loginGooglePlus');



        var promise = Authentication.GPlogin();

        promise.then(function (data) {
            $scope.ProgressBar = true;
            //console.log('Success Handler');
            //console.log(data);
            $scope.ProgressBar = true;
            var promise2 = Authentication.HTTPExternalLogin(data);

            promise2.then(function (data) {
                //console.log('promise2: data -' + data);
                $scope.SetUserLoggedIn();
                $scope.CloseLogin();

                if (!$scope.$$phase) {
                    $scope.$digest(); // or $apply
                }

            }, function (err) {
                console.log('err callback');
                console.log(err);
            }).finally(function (result) {
                console.log('final Data Result');
            });

        }, function (err) {
            console.log('err callback');
            console.log(err);
        }).finally(function (result) {
            //$scope.ProgressBar = false;
        });

    }

    // Request Validation from Facebook API
    $scope.loginFacebook = function () {
        var promise = Authentication.FBlogin();

        promise.then(function (data) {
            $scope.ProgressBar = true;
            //console.log('Success Handler');
            //console.log(data);

            var promise2 = Authentication.HTTPExternalLogin(data);

            promise2.then(function (data) {
                //console.log('promise2: data -' + data);
                $scope.SetUserLoggedIn();
                $scope.CloseLogin();

                if (!$scope.$$phase) {
                    $scope.$digest(); // or $apply
                }

            }, function (err) {
                console.log('err callback');
                console.log(err);
            }).finally(function (result) {
                console.log('final Data Result');
            });

        }, function (err) {
            console.log('err callback');
            console.log(err);
        }).finally(function (result) {
            console.log('final Data Result');
            $scope.ProgressBar = false;
        });

    }

    // Request Validation from Twitter API
    $scope.loginTwitter = function () {
        //$scope.showLogin = false;
    }



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
            return response.status;
        });
    };


    $scope.FBapi = function () {
        Facebook.api('/me', function (response) {
            $scope.user = response;
            console.log(response);

        });
    };

    $scope.FBlogin = function () {
        var FaceBookResult = { Issuer: "Facebook" };

        //FB.getLoginStatus(function (response) {
        //    $scope.loginStatus = response.status;
        //    console.log('starting status:' + $scope.loginStatus);
        //}, true);

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


        //if ($scope.loginStatus === 'connected')
        //    return;

        FB.login(function (response) {
            console.log(response);

            FaceBookResult.AccessToken = response.authResponse.accessToken;
            FaceBookResult.Id = response.authResponse.userID;

            if (response.authResponse) {
                console.log(response);

                FaceBookResult.grantedScopes = response.authResponse.grantedScopes;

                console.log('Granted!  Fetching your information.... ');
                FB.api('/me', function (response) {
                    console.log(response);

                    FaceBookResult.Email = response.email;
                    FaceBookResult.FirstName = response.first_name;
                    FaceBookResult.LastName = response.last_name;
                    FaceBookResult.FullName = response.name;

                    FaceBookResult.Link = response.link;
                    FaceBookResult.Gender = response.gender;


                    FaceBookResult.verified = response.verified;
                    //console.log(FaceBookResult);


                    FB.api(
                        "/me/picture",
                        {
                            "type": "square",  //  "small", "normal", "large",
                        },
                        function (response) {
                            if (response && !response.error) {
                                FaceBookResult.Picture = response.data.url;
                            }
                            else {
                                console.log('error');
                                console.log(response);
                            }


                            $http({
                                url: "/ExternalLogin",
                                method: "POST",
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                data: $.param(FaceBookResult)
                            }).success(function (data, status, headers, config) {

                                console.log('Google Login Succeeded');
                                console.log(data);
                                $scope.SetUserLoggedIn();
                                $scope.SetUserData(data);
                                $scope.CloseLogin();
                            }).error(function (data, status, headers, config) {
                                $scope.status = status;
                                console.log('Google Login Failed');
                            });

                        }
                    );


                    console.log('FaceBookResult');
                    console.log(FaceBookResult);


                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        },
        {
            scope: 'email',
            //scope: 'email,user_likes',
            //auth_type: 'reauthenticate',
            return_scopes: true
        });

        console.log(FaceBookResult);

        //Facebook.getLoginStatus(function (response) {
        //    console.log(response.status);
        //    $scope.loginStatus = response.status;;
        //});
    };



    // If Window Closes, remove Progress Bar
    //(function (wrapped) {

    //    window.open = function () {
    //        var win = wrapped.apply(this, arguments);
    //        var i = setInterval(function () {
    //            if (win.closed) {
    //                console.log('closed!');
    //                $scope.ProgressBar = false;
    //                setTimeout(function () {
    //                    $scope.$apply(function () {
    //                        $scope.ProgressBar = false;
    //                    });
    //                }, 1000);

    //                clearInterval(i);
    //            }
    //        }, 100);
    //    };

    //})(window.open);

}]);