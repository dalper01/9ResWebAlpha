//  Authentication Controller


AuthenticationModule.controller('AuthenticationController', ['$scope', '$http', 'GooglePlus', 'Facebook', 'Authentication', function ($scope, $http, GooglePlus, Facebook, Authentication) {

    //Authentication.init(1);
    $scope.showLogin = false;
    $scope.showRegister = false;
    //$scope.UserData = {
    //    FullName: '',
    //    Picture: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg'
    //};

    $scope.LoggedIn = Authentication.GetLoggedInStatus();
    $scope.UserData = Authentication.GetUserData();
    $scope.Register = { };
    $scope.Login = { };

    if ($scope.LoggedIn) {
        Authentication.HTTPGetUserData();
        //console.log('logged in');
    }

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
    
    // Set Client Status to User Logged In
    $scope.SetUserLoggedIn = function () {
        console.log('logging in');
        $scope.LoggedIn = true;
    }

    // Set Client Status to User Logged Out
    $scope.SetUserLoggedOut = function () {
        $scope.LoggedIn = false;
    }

    // Set Client Status to User Logged Out
    $scope.SetUserData = function (data) {
        //$scope.UserData = data.UserInfo;
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


    // Send Login Credentials to Login API
    $scope.Login9Res = function () {
        //console.log('Login9Res');
        //console.log($scope.Login);

        var promise = Authentication.Login9Res($scope.Login.Email, $scope.Login.Password, $scope.Login.RememberMe);

        promise.success(function (data, status, headers, config) {
                //console.log('Success Handler');
                //console.log(data);
                //console.log(status);

                Authentication.SetUserData(data);
                //Authentication.SetUserLoggedIn();

                $scope.SetUserLoggedIn();
                $scope.CloseLogin();
                $scope.$digest();
                //$scope.SetUserData(data);
                //$scope.CloseLogin();
            }).
            error(function (data, status, headers, config) {
                console.log('Error Handler');
                console.log(data);
                console.log(status);
            });

    }

    // Send Register Credentials to Register API
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

    // Request Validation from Google API
    $scope.loginGooglePlus = function () {
        console.log('loginGooglePlus');

        var promise = Authentication.GPlogin();

        promise.then(function (data) {
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
        });

    }

    // Request Validation from Facebook API
    $scope.loginFacebook = function () {
        $scope.FBlogin();
        //$scope.showLogin = false;
    }

    // Request Validation from Twitter API
    $scope.loginTwitter = function () {
        //$scope.showLogin = false;
    }



    // Execute get Data if user Logged in
    //if ($scope.LoggedIn==true) {
    //    $scope.GetUserInfo();
    //}
    //console.log('logged in status:' + $scope.LoggedIn);



    // Request Validation from Google API
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

        var GooglePlusResult = { Issuer: "Google" };

        console.log('login');
        GooglePlus.login().then(function (authResult) {
            console.log('authResult');
            console.log(authResult);

            GooglePlusResult.AccessToken = authResult.access_token;
            GooglePlusResult.FullId = authResult.client_id;


            GooglePlus.getUser().then(function (user) {
                console.log('user');
                console.log(user);

                //GooglePlusResult.Issuer = "Google";
                GooglePlusResult.Id = user.id;

                GooglePlusResult.Email = user.email;
                GooglePlusResult.LastName = user.family_name;
                GooglePlusResult.FirstName = user.given_name;
                GooglePlusResult.FullName = user.name;
                GooglePlusResult.Gender = user.gender;
                GooglePlusResult.Link = user.link;
                GooglePlusResult.Picture = user.picture;

                console.log(GooglePlusResult);



                $http({
                    url: "/ExternalLogin",
                    method: "POST",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data: $.param(GooglePlusResult)
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




            });
        }, function (err) {
            console.log('err callback');
            console.log(err);
            GooglePlus.getUser().then(function (user) {
                console.log('user');
                console.log(GooglePlusResult);
            });
        }).finally(function (result) {
            console.log('final Data Result');
            //console.log(GooglePlusResult);


            //GooglePlus.getUser().then(function (user) {
            //    console.log('user');
            //    console.log(user);
            //});


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
        var FaceBookResult = { Issuer: "Facebook" };

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

        //    .then(function () {


        //});;


        console.log(FaceBookResult);
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





    };


}]);