'use strict';

/* Directives */


angular.module('app.directives', []).
    directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }]).
    directive('aulaTopic', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                isolatedNumber:'@n',
                isolatedTitle:'@t'
            },
            template: '' +
                '<li class="chapter">' +
                '<span class="percent chapter-number"><span>Section</span>{{isolatedNumber}}</span>' +
                '<div class="note"><span><b>{{isolatedTitle}}</b></span></div>' +
                '<div class="bottom"><a href="" class="next-lecture continue" ng-click="continue(1)">Continue</a></div>' +
                '</li>',
            //templateUrl: 'template.html',
            compile:function (element, attr, transclusionFunc) {
                return function (scope, iterStartElement, attr) {
                    var origElem = transclusionFunc(scope);
                    var content = origElem.text();
//                    scope.number = attr.n;
//                    scope.title = attr.t;
                    //scope.obj = my_custom_parsing(content);
                };
            }
        };
    }).

    directive('animate', function($defer) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs)
            {
                scope.$watch( 'shape', function(val) {
                    var changes = {
                        left : val.x + 'px',
                        top  : val.y + 'px',
                        backgroundColor : val.color
                    }

                    element.css( changes );
                }, true );
            }
        };
    }).

    directive('aulaactivity', function() {
        return {
            restrict: 'E',
            template: '<li class="chapter"><span class="percent chapter-number"><span>Section</span>{{topic.number}}</span><div class="note"><span><b>{{topic.title}}</b></span></div><div class="bottom"><a href="" class="next-lecture continue">Continue</a></div></li>',
            link: function(scope, element, attrs)
            {
                scope.$watch( 'shape', function(val) {
                    var changes = {
                        left : val.x + 'px',
                        top  : val.y + 'px',
                        backgroundColor : val.color
                    }

                    element.css( changes );
                }, true );
            }
        };
    }).
    directive('ball', function ($defer) {
        return {
            restrict:'E',
            link:function (scope, element, attrs) {
                element.addClass('circle');

                scope.$watch(attrs.x, function (x) {
                    element.css('left', x + 'px');
                });
                scope.$watch(attrs.y, function (y) {
                    element.css('top', y + 'px');
                });
                scope.$watch(attrs.color, function (color) {
                    element.css('backgroundColor', color);
                });
            }
        };
    });;


//angular.module('wijmo.directives', []).
//    directive('component', function() {
//    var link = function(scope, element, attrs) {
//        var render = function() {
//            var t = scope.questions[attrs.idx];
//            if (t.type == 'select') {
//                element.html('<select ng-options="c.name for c in colors"></select>');
//            }
//            else {
//                element.html('<input type="' + t.type + '" value="' + t.name + '">');
//            }
//        };
//        //key point here to watch for changes of the type property
//        scope.$watch('type', function(newValue, oldValue) {
//            render();
//        });
//
//        render();
//    };
//    return {
//        restrict : 'E',
//        link : link
//    }
//});
