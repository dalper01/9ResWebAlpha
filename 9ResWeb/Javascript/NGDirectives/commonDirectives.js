
// commonModule for functionality needed everywhere
var commonModule = angular.module('commonDirectives', []);


// 9 res Header
// includes Nav
commonModule.directive('header9res', [function ($compile) {
    return {
        restrict: "E",
        //require: "CareerController",
        scope: {
            activetab: '=',
            updateFn: '&'
        },
        templateUrl: "/HTMLControls/header_9res.html"
    }


}]);



commonModule.directive('navResBuilder', [function ($compile) {
    return {
        restrict: "E",
        //require: "CareerController",
        scope: {
            activetab: '=',
            updateFn: '&'
        },
        templateUrl: "/HTMLControls/header_9res.html"
    }


}]);




commonModule.directive('header9resalt', [function($compile) {
    return {
        restrict: "E",
        //require: "CareerController",
        scope: {
            activetab: '=',
            updateFn: '&'
        },
        templateUrl: "/HTMLControls/header_9res_alt.html"
    }


}]);



commonModule.directive('statedropdown', [function($compile) {
    return {
        restrict: "E",
        require: "CareerController",
        scope: { passedmodel: '='},
        templateUrl: "/HTMLControls/stateDropDown.html"
    }


}]);


commonModule.directive('monthdropdown', [function() {
    return {
        restrict: "E",
        require: "CareerController",
        scope: { passedmodel: '='},
        templateUrl: "/HTMLControls/monthDropDown.html"
    }


}]);


commonModule.directive('yeardropdown', [function() {
    return {
        restrict: "E",
        require: "CareerController",
        scope: { passedmodel: '='},
        templateUrl: "/HTMLControls/yearDropDown.html"
    }


}]);


commonModule.directive('toggleclass', function(){
    return {
        scope: {
            class: "@",
            toggleclass: "@"

        },

        link: function(scope, element){

            element.bind('mouseenter', function(){
                element.removeClass(scope.class);
                element.addClass(scope.toggleclass);
            }).bind('mouseleave', function(){
                    element.removeClass(scope.toggleclass);
                    element.addClass(scope.class);
                })
        }
    }
})



//commonModule.directive('highlightclass', function () {
//    return {
//        scope: {
//            class: "@",
//            highlightclass: "@"

//        },

//        link: function (scope, element) {

//            element.bind('focus', function () {
//                element.removeClass(scope.class);
//                element.addClass(scope.highlightclass);
//            }).bind('blur', function () {
//                element.removeClass(scope.highlightclass);
//                element.addClass(scope.class);
//            })
//        }
//    }
//});


commonModule.directive('placeHolder', [function ($compile) {
    return {
        restrict: "EA",
        scope: {
            bind: "=",
            filler: "@"
        },
        templateUrl: "/HTMLControls/placeholder.html"
    }
}]);



commonModule.filter('tel', function () {
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };
});


commonModule.directive('slideable', function () {
    return {
        restrict:'C',
        compile: function (element, attr) {
            // wrap tag
            var contents = element.html();
            element.html('<div id="' + attr.id + '_wrap" style="border-top: solid 1px white; margin:0 !important; padding:0 !important" >' + contents + '</div>');

            return function postLink(scope, element, attrs) {
                attrs.duration = (!attrs.duration) ? '.5s' : attrs.duration;
                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                element.css({
                    'overflow': 'hidden',
                    'maxHeight': '0px',
                    'transitionProperty': 'max-height',
                    'transitionDuration': attrs.duration,
                    'transitionTimingFunction': attrs.easing
                });
            };
        }
    };
})

commonModule.directive('slideUp', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', function () {
                var target = document.querySelector(attrs.slideUp);
                target.style.maxHeight = '0px';
            });
        }
    }
});

commonModule.directive('slideDown', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', function () {
                var target = document.querySelector(attrs.slideDown);

                var content = target.querySelector(attrs.slideDown + '_wrap');
                var sbuffer = (!attrs.sbuffer) ? 20 : parseInt(attrs.sbuffer);
                attrs.duration = (!attrs.duration) ? '.5s' : attrs.duration;

                content.style.border = '1px solid rgba(0,0,0,0)';
                var y = content.clientHeight;
                target.style.maxHeight = (y + sbuffer) + 'px';
            });
        }
    }
});