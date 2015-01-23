var AuthenticationModule = angular.module('AuthenticationModule', ['googleplus', 'facebook']);

//var LoggedInStatus = false;

AuthenticationModule.provider('Authentication', [function (GooglePlus, Facebook) {

    //#region Data
    // this.$inject = ['$http'];
    var initInjector = angular.injector(['ng']);
    var $http = initInjector.get('$http');
    var $q = initInjector.get('$q');
    //var GooglePlus = initInjector.invoke('GooglePlus');

    // Initialize Service Data
    var LoggedInStatus = false;
    var UserData = {};

    //#endregion



    // Public Authentication Methods

    // init: data.loggedIn (true | false)
    // intialize values (Config) from Razor Layout
    this.init = function (data) {
        LoggedInStatus = data.loggedIn;
        console.log('set loginstatus: ' + data.loggedIn + ' :: ' + LoggedInStatus);
    };


    // GetLoggedInStatus:
    // Returns Logged In Status
    var GetLoggedInStatus = function () {
        console.log('Get this.LoggedInStatus:' + this.LoggedInStatus);
        return LoggedInStatus;
    }

    // SetUserLoggedIn:
    // Returns Logged In Status
    var SetUserLoggedIn = function () {
        console.log('Logging User In');
        LoggedInStatus = true;
        //angular.copy(true, LoggedInStatus);

    }

    // SetUserLoggedOut:
    // Returns Logged In Status
    var SetUserLoggedOut = function () {
        console.log('Logging User Out');
        LoggedInStatus = false;
    }

    // GetUserData: data -- object containing user data
    // Sets User Data
    var SetUserData = function (data) {
        //UserData = data.UserInfo;
        console.log(data.UserInfo);
        angular.copy(data.UserInfo, UserData);
    }

    // GetUserData:
    // Returns User Data
    var GetUserData = function () {
        return UserData;
    }

    // HTTPGetUserData:
    // Requests Logged In User Data from Server End Point
    // Sets User Data with 
    var HTTPGetUserData = function () {

        var deferred = $q.defer();

        $http({
            url: "/GetUserInfo",
            method: "Get"
            //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            //data: $.param(GooglePlusResult)
        }).success(function (data, status, headers, config) {

            console.log('Get User Data Succeeded');
            console.log(data);

            SetUserData(data);
            SetUserLoggedIn();
            deferred.resolve(data)

        }).error(function (data, status, headers, config) {
            console.log('Get User Data (Service) Failed');
            deferred.reject('error');
        });
        console.log('');

        return deferred.promise;
    }


    var HTTPExternalLogin = function (loginData) {
        var deferred = $q.defer();


        $http({
            url: "/ExternalLogin",
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: $.param(loginData)
        }).success(function (data, status, headers, config) {

            console.log('External Authentication Service Login Succeeded');
            console.log(data);
            SetUserData(data);
            deferred.resolve(data);

            //$scope.SetUserLoggedIn();
            //$scope.SetUserData(data);
            //$scope.CloseLogin();
        }).error(function (data, status, headers, config) {
            deferred.reject('error');
            console.log('External Authentication Service Login Failed');
        });


        return deferred.promise;
    }


    var Login9Res = function (UserName, Password, RememberMe) {
        //console.log('Login9Res');
        //console.log($scope.Login);

        return $http.post("/Login", {
            UserName: UserName,
            Password: Password,
            RememberMe: RememberMe

        });

    }


    // Create Authentication Provider
    this.$get = ['$q', '$http', 'GooglePlus', 'Facebook', function ($q, $http, GooglePlus, Facebook) {

        var initInjector = angular.injector(['ng']);
        //var $http = initInjector.get('$http');
        //var $q = initInjector.get('$q');

        var init = function () {
            //alert('show loginstatus: ' + LoggedInStatus);
            if (LoggedInStatus) {
                LoggedIn = LoggedInStatus;
            }
        };

        var GPlogin = function () {

            var deferred = $q.defer();

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
                //console.log('authResult: ' + authResult);

                GooglePlusResult.AccessToken = authResult.access_token;
                GooglePlusResult.FullId = authResult.client_id;

                GooglePlus.getUser().then(function (user) {
                    //console.log('user: ' + user.email);
                    //console.log('user: ' + user.family_name);
                    //console.log('user: ' + user.given_name);
                    //console.log('user: ' + user.gender);

                    //GooglePlusResult.Issuer = "Google";
                    GooglePlusResult.Id = user.id;

                    GooglePlusResult.Email = user.email;
                    GooglePlusResult.LastName = user.family_name;
                    GooglePlusResult.FirstName = user.given_name;
                    GooglePlusResult.FullName = user.name;
                    GooglePlusResult.Gender = user.gender;
                    GooglePlusResult.Link = user.link;
                    GooglePlusResult.Picture = user.picture;

                    console.log('GooglePlusResult: ' + GooglePlusResult);

                    deferred.resolve(GooglePlusResult);

                });
            }, function (err) {
                console.log('err callback');
                console.log(err);
                deferred.reject('error');
                //GooglePlus.getUser().then(function (user) {
                //    console.log('user');
                //    console.log(GooglePlusResult);
                //});
            }).finally(function (result) {
                console.log('final Data Result');
            });

            return deferred.promise;
        };


        return {
            init: this.init,
            GetLoggedInStatus: GetLoggedInStatus,
            SetUserLoggedIn: SetUserLoggedIn,
            Login9Res: Login9Res,
            Logout: SetUserLoggedOut,
            GetUserData: GetUserData,
            SetUserData: SetUserData,
            HTTPGetUserData: HTTPGetUserData,
            HTTPExternalLogin: HTTPExternalLogin,
            GPlogin: GPlogin
        };

    }];


}]);

