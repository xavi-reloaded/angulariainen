'use strict';

/* Directives */


angular.module('app.directives', []).
    directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }]).

    directive('aulaActivity', function ($compile) {
        var videoTemplate = '<video id="{{params.src}}" class="video-js vjs-default-skin" controls preload="auto" width="100%" height="100%" poster="{{params.poster}}">' +
            '<source src="{{params.src}}" type={{params.type}}>' +
            '<p>Video Playback Not Supported</p>' +
            '</video>';
        var pageTemplate = '<div><h2>PAGE</h2></div>';
        var bookTemplate = '<div><h2>BOOK</h2></div>';
        var quizTemplate = '<div><h2>QUIZ</h2></div>';

        var sliceTemplate = '<carousel interval="myInterval">' +
                            '   <slide ng-repeat="slide in slides" active="slide.active">' +
                            '       <img ng-src="{{slide.image}}" style="margin:auto;">' +
                            '       <div class="carousel-caption"><h4>Slide {{$index}}</h4><p>{{slide.text}}</p></div>' +
                            '   </slide>' +
                            '</carousel>';

        var pdfTemplate =   '<div>' +
                            '<button id="prev" onclick="goPrevious()">Previous</button>' +
                            '<button id="next" onclick="goNext()">Next</button>' +
                            '&nbsp; &nbsp;' +
                            '<span>Page: <span id="page_num"></span> / <span id="page_count"></span></span>' +
                            '</div>' +

                            '<div>' +
                            '<canvas id="the-canvas" style="border:1px solid black"></canvas>' +
                            '</div>';

        var getTemplate = function(contentType) {
            console.log('contentType var inside getTemplate::' + contentType);
            var template = videoTemplate;
            switch(contentType) {
                case 'video': template = videoTemplate;break;
                case 'page':  template = pageTemplate;break;
                case 'book':  template = bookTemplate; break;
                case 'quiz':  template = quizTemplate;break;
                case 'slice': template = sliceTemplate; break;
                case 'pdf':   template = pdfTemplate; break;
            }
            return template;
        }

        var linker = function(scope, element, attrs) {
            console.log('scope::' + scope);
            console.log('element::' + element);
            console.log('attrs::' + attrs);
            element.html(getTemplate(scope.type));
            $compile(element.contents())(scope);
        }

        return {
            restrict: "E",
            rep1ace: true,
            link: linker,
            scope: {id: '=', type:'=', params:'='}
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
