angular.module("ui.bootstrap-apium", ["ui.bootstrap-apium.tpls", "ui.bootstrap-apium.apiumac","ui.bootstrap-apium.apiumslideviewer"]);

angular.module("ui.bootstrap-apium.tpls", ["template/apiumac/apiumac-group.html","template/apiumac/apiumac.html","template/apiumslideviewer/apiumslideviewer.html","template/apiumslideviewer/apiumslide.html"]);


/*
 *
 *    AngularJS Bootstrap Carousel
 *
 *      A pure AngularJS carousel.
 *
 *      For no interval set the interval to non-number, or milliseconds of desired interval
 *      Template: <carousel interval="none"><slide>{{anything}}</slide></carousel>
 *      To change the carousel's active slide set the active attribute to true
 *      Template: <carousel interval="none"><slide active="someModel">{{anything}}</slide></carousel>
 */
angular.module('ui.bootstrap-apium.apiumslideviewer', ['ui.bootstrap-apium.transition'])
    .controller('ApiumSlideViewerController', ['$scope', '$timeout', '$transition', '$q', function ($scope, $timeout, $transition, $q) {
        var self = this,
            slides = self.slides = [],
            currentIndex = -1,
            currentTimeout, isPlaying;
        self.currentSlide = null;

        /* direction: "prev" or "next" */
        self.select = function(nextSlide, direction) {
            var nextIndex = slides.indexOf(nextSlide);
            //Decide direction if it's not given
            if (direction === undefined) {
                direction = nextIndex > currentIndex ? "next" : "prev";
            }
            if (nextSlide && nextSlide !== self.currentSlide) {
                if ($scope.$currentTransition) {
                    $scope.$currentTransition.cancel();
                    //Timeout so ng-class in template has time to fix classes for finished slide
                    $timeout(goNext);
                } else {
                    goNext();
                }
            }
            function goNext() {
                //If we have a slide to transition from and we have a transition type and we're allowed, go
                if (self.currentSlide && angular.isString(direction) && !$scope.noTransition && nextSlide.$element) {
                    //We shouldn't do class manip in here, but it's the same weird thing bootstrap does. need to fix sometime
                    nextSlide.$element.addClass(direction);
                    nextSlide.$element[0].offsetWidth = nextSlide.$element[0].offsetWidth; //force reflow

                    //Set all other slides to stop doing their stuff for the new transition
                    angular.forEach(slides, function(slide) {
                        angular.extend(slide, {direction: '', entering: false, leaving: false, active: false});
                    });
                    angular.extend(nextSlide, {direction: direction, active: true, entering: true});
                    angular.extend(self.currentSlide||{}, {direction: direction, leaving: true});

                    $scope.$currentTransition = $transition(nextSlide.$element, {});
                    //We have to create new pointers inside a closure since next & current will change
                    (function(next,current) {
                        $scope.$currentTransition.then(
                            function(){ transitionDone(next, current); },
                            function(){ transitionDone(next, current); }
                        );
                    }(nextSlide, self.currentSlide));
                } else {
                    transitionDone(nextSlide, self.currentSlide);
                }
                self.currentSlide = nextSlide;
                currentIndex = nextIndex;
                //every time you change slides, reset the timer
                restartTimer();
            }
            function transitionDone(next, current) {
                angular.extend(next, {direction: '', active: true, leaving: false, entering: false});
                angular.extend(current||{}, {direction: '', active: false, leaving: false, entering: false});
                $scope.$currentTransition = null;
            }
        };

        /* Allow outside people to call indexOf on slides array */
        self.indexOfSlide = function(slide) {
            return slides.indexOf(slide);
        };

        $scope.next = function() {
            var newIndex = (currentIndex + 1) % slides.length;
            return self.select(slides[newIndex], 'next');
        };

        $scope.prev = function() {
            var newIndex = currentIndex - 1 < 0 ? slides.length - 1 : currentIndex - 1;
            return self.select(slides[newIndex], 'prev');
        };

        $scope.first = function() {
            var newIndex = 0;
            return self.select(slides[newIndex], 'prev');
        };

        $scope.last = function() {
            var newIndex = slides.length-1;
            return self.select(slides[newIndex], 'next');
        };

        $scope.select = function(slide) {
            self.select(slide);
        };

        $scope.isActive = function(slide) {
            return self.currentSlide === slide;
        };

        $scope.slides = function() {
            return slides;
        };

        $scope.$watch('interval', restartTimer);
        function restartTimer() {
            if (currentTimeout) {
                $timeout.cancel(currentTimeout);
            }
            function go() {
                if (isPlaying) {
                    $scope.next();
                    restartTimer();
                } else {
                    $scope.pause();
                }
            }
            var interval = +$scope.interval;
            if (!isNaN(interval) && interval>=0) {
                currentTimeout = $timeout(go, interval);
            }
        }

        $scope.togglePlay = function() {
            if (!isPlaying) {
                $scope.play();
            } else {
                $scope.pause();
            }
            $('#slideviewertoggleplay').toggleClass('icon-pause');
            $('#slideviewertoggleplay').toggleClass('icon-play');
        };

        $scope.pauseAction = function() {
            $scope.interval=0;
            $scope.pause();

        };
        $scope.play = function() {
            if (!isPlaying) {
                isPlaying = true;
                restartTimer();
            }
        };
        $scope.pause = function() {
            isPlaying = false;
            if (currentTimeout) {
                $timeout.cancel(currentTimeout);
            }
        };

        self.addSlide = function(slide, element) {
            slide.$element = element;
            slides.push(slide);
            //if this is the first slide or the slide is set to active, select it
            if(slides.length === 1 || slide.active) {
                self.select(slides[slides.length-1]);
                if (slides.length == 1) {
                    $scope.play();
                }
            } else {
                slide.active = false;
            }
        };

        self.removeSlide = function(slide) {
            //get the index of the slide inside the carousel
            var index = slides.indexOf(slide);
            slides.splice(index, 1);
            if (slides.length > 0 && slide.active) {
                if (index >= slides.length) {
                    self.select(slides[index-1]);
                } else {
                    self.select(slides[index]);
                }
            }
        };
    }])
    .directive('apiumSlideViewer', [function() {
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,
            controller: 'ApiumSlideViewerController',
            require: 'apiumSlideViewer',
            templateUrl: 'template/apiumslideviewer/apiumslideviewer.html',
            scope: {
                interval: '=',
                noTransition: '='
            }
        };
    }])
    .directive('apiumSlide', [function() {
        return {
            require: '^apiumSlideViewer',
            restrict: 'EA',
            transclude: true,
            replace: true,
            templateUrl: 'template/apiumslideviewer/apiumslide.html',
            scope: {
                active: '='
            },
            link: function (scope, element, attrs, carouselCtrl) {
                carouselCtrl.addSlide(scope, element);
                //when the scope is destroyed then remove the slide from the current slides array
                scope.$on('$destroy', function() {
                    carouselCtrl.removeSlide(scope);
                });

                scope.$watch('active', function(active) {
                    if (active) {
                        carouselCtrl.select(scope);
                    }
                });
            }
        };
    }]);






























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



angular.module("template/apiumslideviewer/apiumslideviewer.html", []).run(["$templateCache", function($templateCache){
    $templateCache.put("template/apiumslideviewer/apiumslideviewer.html",
        "<div ng-mouseenter=\"pause()\" ng-mouseleave=\"play()\" class=\"slide-viewer\">" +
            "    <ol class=\"slide-viewer-indicators\">" +
            "        <li ng-repeat=\"slide in slides()\" ng-class=\"{active: isActive(slide)}\" ng-click=\"select(slide)\"></li>" +
            "    </ol>" +
            "    <div class=\"slide-viewer-inner\" ng-transclude></div>" +
//            "    <a ng-click=\"prev()\" class=\"slide-viewer-control left\">&lsaquo;</a>" +
//            "    <a ng-click=\"next()\" class=\"slide-viewer-control right\">&rsaquo;</a>" +
            '       ' +
            '       <div class=\"slide-viewer-toolbar\">' +
            '           <div class="btn-group">' +
            '               <a ng-click="first()" class="btn btn-large btn-success"><i class="icon-fast-backward icon-white"></i></a>' +
            '               <a ng-click="prev()" class="btn btn-large btn-success"><i class="icon-backward icon-white"></i></a>' +
            '               <a ng-click="togglePlay()" class="btn btn-large btn-success"><i  class="icon-play icon-white" id="slideviewertoggleplay" ></i></a>' +
            '               <a ng-click="next()" class="btn btn-large btn-success"><i class="icon-forward icon-white"></i></a>' +
            '               <a ng-click="last()" class="btn btn-large btn-success"><i class="icon-fast-forward icon-white"></i></a>' +
            '           </div>' +
            '       </div>' +
            "</div>" +
            "" +
            "");
}]);

angular.module("template/apiumslideviewer/apiumslide.html", []).run(["$templateCache", function($templateCache){
    $templateCache.put("template/apiumslideviewer/apiumslide.html",
        "<div ng-class=\"{" +
            "    'active': leaving || (active && !entering)," +
            "    'prev': (next || active) && direction=='prev'," +
            "    'next': (next || active) && direction=='next'," +
            "    'right': direction=='prev'," +
            "    'left': direction=='next'" +
            "  }\" class=\"item\" ng-transclude></div>" +
            "");
}]);
