/*! angular-google-plus - v0.1.2 2014-11-05 */
/**
 * Options object available for module
 * options/services definition.
 * @type {Object}
 */
var options = {};

/**
 * googleplus module
 */
angular.module("googleplus", []).provider("GooglePlus", [function () {
    /**
     * clientId
     * @type {Number}
     */
    // localhost:44300
    options.clientId = '771894512430-87bjckbtnd5k14gj08ira8im6j60fdcn.apps.googleusercontent.com';
    // 9res.org
    //options.clientId = '228666439060-r3o1v00h533j1q21ir06sprthjj9k3oi.apps.googleusercontent.com';
    this.setClientId = function (a) {
        options.clientId = a;
        return this;
    };
    this.getClientId = function () {
        return options.clientId;
    };
    /**
     * apiKey
     * @type {String}
     */
    options.apiKey = 'AIzaSyAHUVC3i2tNcpRTkNIrA4FAPXvRf-9tbvo';
    this.setApiKey = function (a) {
        options.apiKey = a;
        return this;
    };
    this.getApiKey = function () {
        return options.apiKey;
    };
    /**
     * Scopes
     * @default 'https://www.googleapis.com/auth/plus.login'
     * @type {Boolean}
     */
    options.scopes = ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'];
    this.setScopes = function (a) {
        options.scopes = a;
        return this;
    };
    this.getScopes = function () {
        return options.scopes;
    };
    /**
     * Init Google Plus API
     */
    this.init = function (a) {
        angular.extend(options, a);
    };
    /**
     * This defines the Google Plus Service on run.
     */
    this.$get = ["$q", "$rootScope", "$timeout", function (a, b, c) {
        /**
       * Create a deferred instance to implement asynchronous calls
       * @type {Object}
       */
        var d = a.defer();
        /**
       * NgGooglePlus Class
       * @type {Class}
       */
        var e = function () { };
        e.prototype.login = function () {
            gapi.auth.authorize({
                client_id: options.clientId,
                //prompt: 'consent',
                immediate: false,
                scope: options.scopes
            }, this.handleAuthResult);
            return d.promise;
        };
        e.prototype.checkAuth = function () {
            gapi.auth.authorize({
                client_id: options.clientId,
                scope: options.scopes,
                immediate: true
            }, this.handleAuthResult);
        };
        e.prototype.handleClientLoad = function () {
            gapi.client.setApiKey(options.apiKey);
            gapi.auth.init(function () { });
            c(this.checkAuth, 1);
        };
        e.prototype.handleAuthResult = function (a) {
            if (a && !a.error) {
                d.resolve(a);
            } else {
                d.reject(a.error);
            }
            b.$apply();
        };
        e.prototype.getUser = function () {
            var c = a.defer();
            gapi.client.load("oauth2", "v2", function () {
                gapi.client.oauth2.userinfo.get().execute(function (a) {
                    c.resolve(a);
                    b.$apply();
                });
            });
            return c.promise;
        };
        e.prototype.getToken = function () {
            return gapi.auth.getToken();
        };
        e.prototype.setToken = function (a) {
            return gapi.auth.setToken(a);
        };
        return new e();
    }];
}]).run([function () {
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.async = true;
    a.src = "https://apis.google.com/js/client.js";
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b);
}]);