'use strict';

/* jasmine specs for directives go here */

describe('apium directives', function() {
    var $scope,ctrl;

    beforeEach(module('app.directives'));

    describe('aula slide viewer', function() {

        it('aula progress bar directive', function() {
            module(function($provide) {
                //$provide.value('version', 'TEST_VER');
            });
            inject(function($compile, $rootScope) {
                var element = $compile('<aula-progressbar scale="15" value="7"></aula-progressbar>')($rootScope);
                var expected = '<div id="aulaProgressbar" style="width: 100%;" class="ng-scope"></div>';
//                expect(element.html()).toEqual(expected);
            });
        });
    });
});
