'use strict';


describe('TrainTron controller', function(){

    var $scope, ctrl;
    var childElement = '' +
        '<li class="show-progress">' +
        '   <span class="element completion-ratio">50%</span>' +
        '   <div class="note"> <span>You have completed <b class="completion-ratio">50%</b> of this course</span> </div>' +
        '</li>';

    //you need to inject dependencies first
    beforeEach(inject(function($rootScope) {
        $scope = $rootScope.$new();
        $('ul#timeline').remove();
        $('body').append('<ul id="timeline" style="top: -0%;"><li>weke</li><li>weka</li></ul>');
    }));


    it('Should initialize value of courseId', inject(function($controller) {
        ctrl = $controller('trainTron', {
            $scope: $scope
        });
        expect($scope.course.courseId).toBe('123456789');
    }));

    it('Should initialize jquery timeline element version 1.8.2', inject(function($controller) {
        ctrl = $controller('trainTron', {
            $scope: $scope
        });
        $('body').append('<ul id="timeline" style="top: -0%;"><li>weke</li><li>weka</li></ul>');
        expect($('ul#timeline').jquery).toBe('1.8.2');
    }));


    it('inserAt courseUlElement inserts an element ', inject(function($controller) {
        ctrl = $controller('trainTron', {
            $scope: $scope
        });
        var ulElement = $('ul#timeline');
        expect(ulElement.children().size()).toBe(2);
        $scope.insertAt(2, ulElement, childElement);
        expect(ulElement.children().size()).toBe(3);

    }));

    it('inserAt no more than one "show-progress" li element is inserted on the timeline element \<ul\> ', inject(function($controller) {
        ctrl = $controller('trainTron', {
            $scope: $scope
        });
        var ulElement = $('ul#timeline');
        $scope.insertAt(2, ulElement, childElement);
        $scope.insertAt(2, ulElement, childElement);
        expect(ulElement.children().size()).toBe(3);



    }));



});
