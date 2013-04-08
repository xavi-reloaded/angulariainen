'use strict';

/* jasmine specs for controllers go here */


describe('MyCtrl1', function(){
    var myCtrl1;

    beforeEach(function(){
        myCtrl1 = new MyCtrl1();
    });


    it('should ....', function() {
        //spec body
    });
});



describe('MyCtrl2 with var in scope', function(){
    var $scope, ctrl;

//you need to inject dependencies first
    beforeEach(inject(function($rootScope) {
        $scope = $rootScope.$new();
    }));

    it('Should initialize value to Loading', inject(function($controller) {
        ctrl = $controller('MyCtrl2', {
            $scope: $scope
        });
        expect($scope.var).toBe('I am just a jealous var');
    }));
});
