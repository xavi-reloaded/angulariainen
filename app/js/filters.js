'use strict';

/* Filters */

angular.module('app.filters', []).
    filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }]).
    filter('checkend', function() {
        return function(input) {
            return input.concat('');
        };
    });;


