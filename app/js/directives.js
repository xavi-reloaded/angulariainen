'use strict';

/* Directives */


angular.module('app.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

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
