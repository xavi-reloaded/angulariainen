'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
    var $scope,ctrl;

    beforeEach(module('app.directives'));

    describe('aula activity viewer default', function() {

        it('should show video not supported message because default template is video', function() {
            module(function($provide) {
                //$provide.value('version', 'TEST_VER');
            });
            inject(function($compile, $rootScope) {
                var element = $compile('<aula-activity></aula-activity>')($rootScope);
                var expected = 'Video Playback Not Supported';
                expect(element.text()).toEqual(expected);
            });
        });
    });

    describe('aula activity viewer :PAGE:', function() {

        it('should show page template html', function() {
            module(function($provide) {
                $provide.value('type', 'video');
            });

            inject(function($controller, $compile, $rootScope) {

                $scope = $rootScope.$new();
                ctrl = $controller('trainTron', {$scope: $scope });
                var activity = $scope.activities[2];

                expect(activity.type).toEqual('video');
                console.log('checking: '+activity.type);

                var element = $compile('<aula-activity id="activity.id" type="activity.type" params="activity.params"></aula-activity>')($scope);
                var expected = 'Video Playback Not Supported';
                expect(element.text()).toEqual(expected);
            });
        });
    });
});
