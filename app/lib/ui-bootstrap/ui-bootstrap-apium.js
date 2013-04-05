angular.module("ui.bootstrap-apium", ["ui.bootstrap-apium.tpls", "ui.bootstrap-apium.apiumac"]);

angular.module("ui.bootstrap-apium.tpls", ["template/apiumac/apiumac-group.html","template/apiumac/apiumac.html"]);

angular.module('ui.bootstrap-apium.apiumac', ['ui.bootstrap-apium.collapse'])

    .constant('apiumacConfig', {
        closeOthers: true
    })

    .controller('apiumacController', ['$scope', '$attrs', 'apiumacConfig', function ($scope, $attrs, apiumacConfig) {

        // This array keeps track of the apiumac groups
        this.groups = [];

        // Ensure that all the groups in this apiumac are closed, unless close-others explicitly says not to
        this.closeOthers = function(openGroup) {
            var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : apiumacConfig.closeOthers;
            if ( closeOthers ) {
                angular.forEach(this.groups, function (group) {
                    if ( group !== openGroup ) {
                        group.isOpen = false;
                    }
                });
            }
        };

        this.setChoosenResult = function(value) {
            console.log(value);
        };

        // This is called from the apiumac-group directive to add itself to the apiumac
        this.addGroup = function(groupScope) {
            var that = this;
            this.groups.push(groupScope);

            groupScope.$on('$destroy', function (event) {
                that.removeGroup(groupScope);
            });
        };

        // This is called from the apiumac-group directive when to remove itself
        this.removeGroup = function(group) {
            var index = this.groups.indexOf(group);
            if ( index !== -1 ) {
                this.groups.splice(this.groups.indexOf(group), 1);
            }
        };

    }])

// The apiumac directive simply sets up the directive controller
// and adds an apiumac CSS class to itself element.
    .directive('apiumac', function () {
        return {
            restrict:'EA',
            controller:'apiumacController',
            transclude: true,
            replace: false,
            templateUrl: 'template/apiumac/apiumac.html'
        };
    })

// The apiumac-group directive indicates a block of html that will expand and collapse in an apiumac
    .directive('apiumacGroup', ['$parse', '$transition', '$timeout', function($parse, $transition, $timeout) {
        return {
            require:'^apiumac',         // We need this directive to be inside an apiumac
            restrict:'EA',
            transclude:true,              // It transcludes the contents of the directive into the template
            replace: true,                // The element containing the directive will be replaced with the template
            templateUrl:'template/apiumac/apiumac-group.html',
            scope:{ heading:'@' },        // Create an isolated scope and interpolate the heading attribute onto this scope
            controller: ['$scope', function($scope) {
                this.setHeading = function(element) {
                    this.heading = element;
                };
            }],
            link: function(scope, element, attrs, apiumacCtrl) {
                var getIsOpen, setIsOpen;

                apiumacCtrl.addGroup(scope);

                scope.isOpen = false;

                if ( attrs.isOpen ) {
                    getIsOpen = $parse(attrs.isOpen);
                    setIsOpen = getIsOpen.assign;

                    scope.$watch(
                        function watchIsOpen() { return getIsOpen(scope.$parent); },
                        function updateOpen(value) { scope.isOpen = value; }
                    );

                    scope.isOpen = getIsOpen ? getIsOpen(scope.$parent) : false;
                }

                scope.$watch('isOpen', function(value) {
                    if ( value ) {
                        apiumacCtrl.closeOthers(scope);
                        console.log(scope);
                        apiumacCtrl.setChoosenResult(value);
                    }
                    if ( setIsOpen ) {
                        setIsOpen(scope.$parent, value);
                    }
                });
            }
        };
    }])

// Use apiumac-heading below an apiumac-group to provide a heading containing HTML
// <apiumac-group>
//   <apiumac-heading>Heading containing HTML - <img src="..."></apiumac-heading>
// </apiumac-group>
    .directive('apiumacHeading', function() {
        return {
            restrict: 'E',
            transclude: true,   // Grab the contents to be used as the heading
            template: '',       // In effect remove this element!
            replace: true,
            require: '^apiumacGroup',
            compile: function(element, attr, transclude) {
                return function link(scope, element, attr, apiumacGroupCtrl) {
                    // Pass the heading to the apiumac-group controller
                    // so that it can be transcluded into the right place in the template
                    // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
                    apiumacGroupCtrl.setHeading(transclude(scope, function() {}));
                };
            }
        };
    })

// Use in the apiumac-group template to indicate where you want the heading to be transcluded
// You must provide the property on the apiumac-group controller that will hold the transcluded element
// <div class="apiumac-group">
//   <div class="apiumac-heading" ><a ... apiumac-transclude="heading">...</a></div>
//   ...
// </div>
    .directive('apiumacTransclude', function() {
        return {
            require: '^apiumacGroup',
            link: function(scope, element, attr, controller) {
                scope.$watch(function() { return controller[attr.apiumacTransclude]; }, function(heading) {
                    if ( heading ) {
                        element.html('');
                        element.append(heading);
                    }
                });
            }
        };
    });

angular.module("template/apiumac/apiumac.html", []).run(["$templateCache", function($templateCache){
    $templateCache.put("template/apiumac/apiumac.html",
        "<div class=\"apiumac\" ng-transclude></div>");
}]);

angular.module("template/apiumac/apiumac-group.html", []).run(["$templateCache", function($templateCache){
    $templateCache.put("template/apiumac/apiumac-group.html",
        "<div class=\"apiumac-group\">" +
            "<div class=\"apiumac-heading\" ><a class=\"apiumac-toggle\" ng-click=\"isOpen = !isOpen\" apiumac-transclude=\"heading\">{{heading}}</a></div>" +
            "  <div class=\"apiumac-body\" collapse=\"!isOpen\">" +
            "    <div class=\"apiumac-inner\" ng-transclude></div>" +
            "  </div>" +
            "</div>");
}]);


angular.module('ui.bootstrap-apium.collapse',['ui.bootstrap-apium.transition'])

// The collapsible directive indicates a block of html that will expand and collapse
    .directive('collapse', ['$transition', function($transition) {
        // CSS transitions don't work with height: auto, so we have to manually change the height to a
        // specific value and then once the animation completes, we can reset the height to auto.
        // Unfortunately if you do this while the CSS transitions are specified (i.e. in the CSS class
        // "collapse") then you trigger a change to height 0 in between.
        // The fix is to remove the "collapse" CSS class while changing the height back to auto - phew!
        var fixUpHeight = function(scope, element, height) {
            // We remove the collapse CSS class to prevent a transition when we change to height: auto
            element.removeClass('collapse');
            element.css({ height: height });
            // It appears that  reading offsetWidth makes the browser realise that we have changed the
            // height already :-/
            var x = element[0].offsetWidth;
            element.addClass('collapse');
        };

        return {
            link: function(scope, element, attrs) {

                var isCollapsed;
                var initialAnimSkip = true;
                scope.$watch(function (){ return element[0].scrollHeight; }, function (value) {
                    //The listener is called when scollHeight changes
                    //It actually does on 2 scenarios:
                    // 1. Parent is set to display none
                    // 2. angular bindings inside are resolved
                    //When we have a change of scrollHeight we are setting again the correct height if the group is opened
                    if (element[0].scrollHeight !== 0) {
                        if (!isCollapsed) {
                            if (initialAnimSkip) {
                                fixUpHeight(scope, element, element[0].scrollHeight + 'px');
                            } else {
                                fixUpHeight(scope, element, 'auto');
                            }
                        }
                    }
                });

                scope.$watch(attrs.collapse, function(value) {
                    if (value) {
                        collapse();
                    } else {
                        expand();
                    }
                });


                var currentTransition;
                var doTransition = function(change) {
                    if ( currentTransition ) {
                        currentTransition.cancel();
                    }
                    currentTransition = $transition(element,change);
                    currentTransition.then(
                        function() { currentTransition = undefined; },
                        function() { currentTransition = undefined; }
                    );
                    return currentTransition;
                };

                var expand = function() {
                    if (initialAnimSkip) {
                        initialAnimSkip = false;
                        if ( !isCollapsed ) {
                            fixUpHeight(scope, element, 'auto');
                        }
                    } else {
                        doTransition({ height : element[0].scrollHeight + 'px' })
                            .then(function() {
                                // This check ensures that we don't accidentally update the height if the user has closed
                                // the group while the animation was still running
                                if ( !isCollapsed ) {
                                    fixUpHeight(scope, element, 'auto');
                                }
                            });
                    }
                    isCollapsed = false;
                };

                var collapse = function() {
                    isCollapsed = true;
                    if (initialAnimSkip) {
                        initialAnimSkip = false;
                        fixUpHeight(scope, element, 0);
                    } else {
                        fixUpHeight(scope, element, element[0].scrollHeight + 'px');
                        doTransition({'height':'0'});
                    }
                };
            }
        };
    }]);



angular.module('ui.bootstrap-apium.transition', [])

/**
 * $transition service provides a consistent interface to trigger CSS 3 transitions and to be informed when they complete.
 * @param  {DOMElement} element  The DOMElement that will be animated.
 * @param  {string|object|function} trigger  The thing that will cause the transition to start:
 *   - As a string, it represents the css class to be added to the element.
 *   - As an object, it represents a hash of style attributes to be applied to the element.
 *   - As a function, it represents a function to be called that will cause the transition to occur.
 * @return {Promise}  A promise that is resolved when the transition finishes.
 */
    .factory('$transition', ['$q', '$timeout', '$rootScope', function($q, $timeout, $rootScope) {

        var $transition = function(element, trigger, options) {
            options = options || {};
            var deferred = $q.defer();
            var endEventName = $transition[options.animation ? "animationEndEventName" : "transitionEndEventName"];

            var transitionEndHandler = function(event) {
                $rootScope.$apply(function() {
                    element.unbind(endEventName, transitionEndHandler);
                    deferred.resolve(element);
                });
            };

            if (endEventName) {
                element.bind(endEventName, transitionEndHandler);
            }

            // Wrap in a timeout to allow the browser time to update the DOM before the transition is to occur
            $timeout(function() {
                if ( angular.isString(trigger) ) {
                    element.addClass(trigger);
                } else if ( angular.isFunction(trigger) ) {
                    trigger(element);
                } else if ( angular.isObject(trigger) ) {
                    element.css(trigger);
                }
                //If browser does not support transitions, instantly resolve
                if ( !endEventName ) {
                    deferred.resolve(element);
                }
            });

            // Add our custom cancel function to the promise that is returned
            // We can call this if we are about to run a new transition, which we know will prevent this transition from ending,
            // i.e. it will therefore never raise a transitionEnd event for that transition
            deferred.promise.cancel = function() {
                if ( endEventName ) {
                    element.unbind(endEventName, transitionEndHandler);
                }
                deferred.reject('Transition cancelled');
            };

            return deferred.promise;
        };

        // Work out the name of the transitionEnd event
        var transElement = document.createElement('trans');
        var transitionEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        };
        var animationEndEventNames = {
            'WebkitTransition': 'webkitAnimationEnd',
            'MozTransition': 'animationend',
            'OTransition': 'oAnimationEnd',
            'msTransition': 'MSAnimationEnd',
            'transition': 'animationend'
        };
        function findEndEventName(endEventNames) {
            for (var name in endEventNames){
                if (transElement.style[name] !== undefined) {
                    return endEventNames[name];
                }
            }
        }
        $transition.transitionEndEventName = findEndEventName(transitionEndEventNames);
        $transition.animationEndEventName = findEndEventName(animationEndEventNames);
        return $transition;
    }]);




