'use strict';


describe('aulaProgressbarController controller ::>', function(){

    var $scope, $window, ctrl;

    //you need to inject dependencies first
    beforeEach(inject(function($rootScope) {
        $scope = $rootScope.$new();
    }));


    it('Check version on gaugevar', inject(function($controller) {
        ctrl = $controller('aulaProgressbarController', {
            $scope: $scope,
            $window: $window
        });
        expect($scope.gauge.version).toBe(0.1);
    }));



});
