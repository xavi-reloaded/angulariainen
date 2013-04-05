'use strict';

/* Services */

angular.module('app.services', ['ngResource']).
    factory('Phone', function($resource){
        return $resource('phones/:phoneId.json', {}, {
            query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
        });
    }).

    factory('notify', ['$window', function(win) {
        var msgs = [];
        return function(msg) {
            msgs.push(msg);
            if (msgs.length == 3) {
                win.alert(msgs.join("\n"));
                msgs = [];
            }
        };
    }]).

    factory('topicsService', function($resource){
        var serverUrl = 'http://localhost/apiumtech/wp-content/plugins/wordpress-aulaken/rest/topicsService.php?c=:courseId';
        return $resource(serverUrl, {courseId: '@id'}, {
            query: {method: 'GET', headers: [{'Content-Type': 'application/json'}, {'Accept': 'application/json'}], isArray:false},
            get: {method:'GET', headers: [{'Content-Type': 'application/json'}, {'Accept': 'application/json'}]},
            update: {method:'PUT', headers: [{'Content-Type': 'application/json'}, {'Accept': 'application/json'}]},
            create: {method:'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
            delete: {method:'DELETE', headers: [{'Content-Type': 'application/json'}, {'Accept': 'application/json'}]}
        });
    }).

    value('version', '0.1').
    value('author', 'xavi');
