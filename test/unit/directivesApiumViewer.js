'use strict';

/* jasmine specs for directives go here */

describe('apium directives', function() {
    var $scope,ctrl;

    beforeEach(module('ui.bootstrap-apium'));

    describe('aula slide viewer', function() {

        it('should load the slide viewer directive', function() {
            module(function($provide) {
                //$provide.value('version', 'TEST_VER');
            });
            inject(function($compile, $rootScope) {
                var element = $compile('<slide-viewer></slide-viewer>')($rootScope);
                var expected = 'weke';
                expect(element.text()).toEqual(expected);
            });
        });
    });

});
