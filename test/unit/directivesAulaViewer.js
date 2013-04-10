'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
    beforeEach(module('app.directives'));

    describe('aula activity viewer default', function() {

        it('should show video not supported message because default template is video', function() {
            module(function($provide) {
                //$provide.value('version', 'TEST_VER');
            });
            inject(function($compile, $rootScope) {
                var element = $compile('<aula-activity></aula-activity>')($rootScope);
                expect(element.text()).toEqual('Video Playback Not Supported');
            });
        });
    });

    describe('aula activity viewer :PAGE:', function() {

        it('should show video not supported message because default template is video', function() {
            module(function($provide) {
                $provide.value('type', 'page');
            });
            inject(function($compile, $rootScope) {
                var params = {url:"http://someurl.html"}
                var element = $compile('<aula-activity id="1" type="page" params="activity.params"></aula-activity>')($rootScope);
                expect(element.text()).toEqual('asdf');
            });
        });
    });
});
