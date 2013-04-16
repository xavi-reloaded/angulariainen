'use strict';

/* jasmine specs for directives go here */

describe('apium directives', function() {
    var $scope,ctrl;

    beforeEach(module('app.directives'));

    describe('aula slide viewer', function() {

        it('should load the slide viewer directive', function() {
            module(function($provide) {
                //$provide.value('version', 'TEST_VER');
            });
            inject(function($compile, $rootScope) {
                var element = $compile('<aula-progress-bar></aula-progress-bar>')($rootScope);
                var expected = 'asdf';
                expect(element.text()).toEqual(expected);
            });
        });
    });

});
