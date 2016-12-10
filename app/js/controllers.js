'use strict';

angular.module('app.controllers',[])
    .controller('trainTron', function ($scope, $timeout,$compile,courseData,$routeParams) {

        var id = $routeParams.courseId;

        $scope.course={ratioCompleted:'1',courseTitle:'Curso flipante de javascript'};
        $scope.activities=[];

        courseData.get({courseId:id},function(res){
            $scope.course = res.course;
            $scope.activities= res.activities;
            $scope.notes = res.notes;
        });

        $scope.screenOnFront = 0;

        $scope.getTopValueForNextPosition = function(initialPosition){
            var lastPosition = $('ul#timeline').children().size();
            if (initialPosition>=lastPosition) return (lastPosition-1)*100;
            return (initialPosition) * 100;
        };
        $scope.getTopValueForBackPosition = function(initialPosition){
            var lastPosition = $('ul#timeline').children().size();
            if (initialPosition<=2) return 0;
            return (initialPosition-2) * 100;
        };
        $scope.nextElementIsTransition = function (positionInTimeline) {
            return 0;
        };

        $scope.showProgressElement = '' +
            '<li class="show-progress">' +
            '   <div class="hero-unit">' +
            '       <h1>' + $scope.course.courseTitle + '</h1>' +
            '       <p><span>Has completado <b class="completion-ratio">' + $scope.course.ratioCompleted + '%</b> de este curso</span></p>' +
            '​' +
            '   </div>' +
            '       <span class="container">' +
            '           <aula-progressbar scale="10" value="10"></aula-progressbar>' +
            '       </span>' +
            '</li>';

        $scope.next = function(){

            var showProgressElement = $compile($scope.showProgressElement)($scope);

            console.log('before compilation:'+showProgressElement.html());


            var positionInTimeline = $scope.getInitialPositionInULelementFromTopValue($scope.screenOnFront);
            $scope.insertAt(positionInTimeline+1, $('ul#timeline'), '<li class="show-progress">' + showProgressElement.html() + '</li>');
            $scope.screenOnFront = $scope.getTopValueForNextPosition(positionInTimeline+1);

            $timeout(function() {
                $scope.screenOnFront = $scope.getTopValueForNextPosition(positionInTimeline+2);
            }, 2000);
        };
        $scope.getInitialPositionInULelementFromTopValue = function(topValue){
            return topValue/100;
        }
        $scope.back = function(activityId){
            console.log(activityId);
            if (activityId==1) {
                $('li.show-progress').remove();
                $scope.screenOnFront = 0;
            } else {
                $('ul#timeline').children('li').eq( ( activityId + (activityId-1) ) - 1).remove();
                $scope.screenOnFront = $scope.screenOnFront-200;
            }
        };

        $scope.continue = function(steps){
            $scope.screenOnFront = $scope.screenOnFront+100;

        };

        $scope.insertAt = function(index, parentElement, childElement) {
            var lastIndex = parentElement.children().size();
            if (index < 0) {
                index = Math.max(0, lastIndex + 1 + index)
            }
            parentElement.append(childElement)
            if (index < lastIndex) {
                parentElement.children().eq(index).before(parentElement.children().last())
            }
            return index;
        }

        $scope.switchSidebar = function(){
            $('#aula-trainning').toggleClass('fullscreen');
            $('#sideBarImage').toggleClass('icon-forward');
            $('#sideBarImage').toggleClass('icon-backward');
        }
        $scope.markAsCompleted = function(activityId){
            var activities = $scope.activities;
            for (var i = 0, ii = activities.length; i < ii; i++) {
                if (activityId == activities[i].id) {
                    activities[i].completed=!activities[i].completed
                }
            }
        }



    });


