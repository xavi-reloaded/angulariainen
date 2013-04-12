'use strict';


describe('TrainTron controller ::>', function(){

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
        $('#aula-trainning').remove();
        $('body').append('<div id="aula-trainning" class=""></div>');
        $('body').append('<ul id="timeline" style="top: -0%;"><li>weke</li><li>weka</li></ul>');
        $('body').append('<div class="sidebar"><a class="close-btn" href="" ng-click="switchSidebar();"></a><div class="tab-container"><tabs>' +
                            '<pane heading="A"></pane>' +
                            '<pane heading="B"></pane>' +
                            '<pane heading="C"></pane>' +
                          '</tabs></div></div>');
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

    it('inserAt new "show-progress" li element is inserted on the timeline element \<ul\> ', inject(function($controller) {
        ctrl = $controller('trainTron', {
            $scope: $scope
        });
        var ulElement = $('ul#timeline');
        $scope.insertAt(2, ulElement, childElement);
        $scope.insertAt(2, ulElement, childElement);
        expect(ulElement.children().size()).toBe(4);
    }));

    it('getTopValueForNextPosition on 2 elements', inject(function($controller) {ctrl = $controller('trainTron', { $scope: $scope});
        var dat = [
            {pos:1,expected: 100},
            {pos:2,expected: 100},
            {pos:3,expected: 100}
        ];

        for (var x=0; x<dat.length;x++) {
            var actual = $scope.getTopValueForNextPosition(dat[x].pos);
            expect(actual).toBe(dat[x].expected);
            console.log(dat[x]);
        }

    }));

    it('getTopValueForNextPosition back direction from second element', inject(function($controller) {ctrl = $controller('trainTron', { $scope: $scope});
        var dat = [
            {pos:1,expected: 0},
            {pos:2,expected: 0},
            {pos:3,expected: 100}
        ];

        for (var x=0; x<dat.length;x++) {
            var actual = $scope.getTopValueForBackPosition(dat[x].pos);
            expect(actual).toBe(dat[x].expected);
            console.log(dat[x]);
        }
    }));

    it('next from normal activity goes to the next and create a show-progression frame in the middle', inject(function($controller) {ctrl = $controller('trainTron', { $scope: $scope});

        var position= 1;
        $scope.next(position);
        var ulElement = $('ul#timeline');
        expect(3).toBe(ulElement.children().size());

    }));

    it('getInitialPositionInULelementFromTopValue ', inject(function($controller) {ctrl = $controller('trainTron', { $scope: $scope});

        var dat = [
            {v:0,expected: 0},
            {v:100,expected: 1},
            {v:300,expected: 3}
        ];

        for (var x=0; x<dat.length;x++) {
            var actual = $scope.getInitialPositionInULelementFromTopValue(dat[x].v);
            expect(actual).toBe(dat[x].expected);
            console.log(dat[x]);
        }
    }));

    it('nextElementIsTransition ', inject(function($controller) {ctrl = $controller('trainTron', { $scope: $scope});

        var dat = [
            {pos:1,expected: 0},
            {pos:2,expected: 0},
            {pos:3,expected: 0}
        ];

        for (var x=0; x<dat.length;x++) {
            var actual = $scope.nextElementIsTransition(dat[x].v);
            expect(actual).toBe(dat[x].expected);
            console.log(dat[x]);
        }
    }));

    it('switchSidebar with empty class', inject(function($controller) {ctrl = $controller('trainTron', { $scope: $scope});
        var mainDiv = $('#aula-trainning');
//        console.log(sidebar);
        expect(mainDiv.children().size()).toBe(0);
        $scope.switchSidebar();
        var expectedClass = 'fullscreen';
        expect(mainDiv.attr('class')).toBe(expectedClass);
        $scope.switchSidebar();
        expect(mainDiv.attr('class')).toBe('');
    }));

    it('switchSidebar with NON empty class', inject(function($controller) {ctrl = $controller('trainTron', { $scope: $scope});
        var mainDiv = $('#aula-trainning');
//        console.log(sidebar);
        expect(mainDiv.children().size()).toBe(0);
        mainDiv.attr('class',"someAnotherClass");
        $scope.switchSidebar();
        var expectedClass = 'someAnotherClass fullscreen';
        expect(mainDiv.attr('class')).toBe(expectedClass);
        $scope.switchSidebar();
        expect(mainDiv.attr('class')).toBe('someAnotherClass');
    }));






});
