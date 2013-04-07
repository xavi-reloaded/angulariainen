'use strict';

/* jasmine specs for controllers go here */
var controller = require("../app/js/controllers.js");
//var inject = require("../app/lib/angular/angular.js");
var inject = require("./lib/angular/angular-mocks.js");
//var inject = require("./lib/angular/angular-scenario.js");

describe('controller', function(){
    var scope,timeout;

    var trainTron;

//    beforeEach(function(){
//        trainTron = controller.controllerTraintron(scope,timeout);
//    });


    it('should ....', function() {
        trainTron.should.equal(1);
    });

    it('should be available', inject(function($rootScope, $controller) {
        var scope = $rootScope.$new();
        var ctrl = $controller(MyController, {
            $scope: scope
        });
        expect(ctrl).to.not.be.undefined;
    }));
});

