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

        var slideTemplate = '<apium-slide-viewer interval="params.interval">' +
                            '   <apium-slide ng-repeat="slide in params.slides" active="slide.active">' +
                            '       <img ng-src="{{slide.image}}" style="margin:auto;">' +
                            '       <div class="slide-viewer-caption"><h4>Slide {{$index+1}}</h4><p>{{slide.text}}</p></div>' +
                            '   </apium-slide>' +
                            '</apium-slide-viewer>';

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
            //console.log('contentType var inside getTemplate::' + contentType);
            var template = videoTemplate;
            switch(contentType) {
                case 'video': template = videoTemplate;break;
                case 'page':  template = pageTemplate;break;
                case 'book':  template = bookTemplate; break;
                case 'quiz':  template = quizTemplate;break;
                case 'slide': template = slideTemplate; break;
                case 'pdf':   template = pdfTemplate; break;
            }
            return template;
        }

        var linker = function(scope, element, attrs) {
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

    directive('aulaProgressbar', function () {

        return {
            restrict: 'E',
            transclude: true,
            scope: 'isolate',
            template: '<div>gonna parse this: {{orig}} <br/>... and get this: {{obj}}</div>',
            //templateUrl: 'template.html',
            compile:function (element, attr, transclusionFunc) {
                return function (scope, iterStartElement, attr) {
                    var origElem = transclusionFunc(scope);
                    var content = origElem.text();
                    scope.orig = content;
                    scope.obj = my_custom_parsing(content);
                };
            }
        };
    });