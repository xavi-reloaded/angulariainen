'use strict';

/* Controllers */

function trainTron($scope, $timeout)
{

    $scope.course = {
        courseId: '123456789',
        isInstructor: true,
        courseUrl: 'http://www.apiumtech.com/course/course-flipante',
        courseTitle: 'Curso Flipante de Taxidermia',
        userId: '123456789',
        uiMessages: 'bla bla bla',
        autoplay: '1',
        introCourse: {},
        ratioCompleted: '48',
        intro: {message:"Wellcome to the course flipante"},
        topics: [
            {"number": 1, "title": 'The first Section',"type":"select",
                "activities": [
                    {"number": 1, "title": 'Hola',"type":"video",params:{var:1}},
                    {"number": 2, "title": 'Caracola',"type":[]},
                    {"number": 3, "title": 'how',"type":[]},
                    {"number": 4, "title": 'are',"type":[]}
                ]
            }
        ]
    };

    $scope.activities= [
        {t:1,tt:'The first Section',    id:12345, number: 1, title: 'La primera actividad, un video de ejemplo',
            type:'video', params:{src:"http://video-js.zencoder.com/oceans-clip.mp4",type:'video/mp4',poster:"http://video-js.zencoder.com/oceans-clip.png"}},
        {t:1,tt:'',                     id:12345, number: 2, title: 'La segunda actividad con un PDF de ejemplo',
            type:'pdf', params:{ url : 'http://cdn.mozilla.net/pdfjs/tracemonkey.pdf'}},
        {t:1,tt:'',                     id:12345, number: 3, title: 'La segunda actividad',
            type:'page', params:{}},

        {t:1,tt:'',                     id:12345, number: 4, title: 'la tercera lectura',
            type:'book', params:{}},
        {t:2,tt:'The second Section',   id:12345, number: 5, title: 'la cuarta',
            type:'quiz', params:{}},
        {t:2,tt:'',                     id:12345, number: 6, title: 'Caracola is the good life',
            type:'slice', params:{}}
    ];

    var showProgressElement = '' +
        '<li class="show-progress">' +
        '   <span class="element completion-ratio">' + $scope.course.ratioCompleted + '%</span>' +
        '   <div class="note"> <span>You have completed <b class="completion-ratio">' + $scope.course.ratioCompleted + '%</b> of this course</span> </div>' +
        '</li>';

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

    $scope.next = function(){
        var positionInTimeline = $scope.getInitialPositionInULelementFromTopValue($scope.screenOnFront);
        $scope.insertAt(positionInTimeline+1, $('ul#timeline'), showProgressElement);
        $scope.screenOnFront = $scope.getTopValueForNextPosition(positionInTimeline+1);

        $timeout(function() {
            $scope.screenOnFront = $scope.getTopValueForNextPosition(positionInTimeline+2);
        }, 1000);
    };
    $scope.getInitialPositionInULelementFromTopValue = function(topValue){
        return topValue/100;
    }
    $scope.back = function(activityId){
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


}

// If we're running under Node,
if(typeof exports !== 'undefined') {
    exports.controllerTraintron = trainTron;
}















function questionsCitizenCtrl($scope) {
    $scope.questions = [
        {"name": "This is first question",
            "order": 0,"type":"text"},
        {"name": "That's the second question",
            "order": 1,"type":"text"},
        {"name": "A question number 3 here",
            "order": 2,"type":"text"},
        {"name": "City",
            "order": 3,"type":"select",
            "values": [
                "Madrid",
                "Barcelona",
                "Bilbao",
                "Valencia",
                "Pamplona"
            ]}
    ];

    $scope.orderProp = 'order';

    $scope.customHtml = function(v){
        return "weke";
    };
}



function UserForm($scope) {
    var master = {
        name: 'first name',
        familyName1: 'family name 1',
        familyName2: 'family name 2',
        nickname: 'nickname',
        genre: 'male',
        email: 'your@email.com',
        birthyear: 1980,


        address:{
            line1: '123 Main St.',
            city:'Anytown',
            state:'AA',
            country: "Spain",
            zip:'12345'
        },
        contacts:[
            {type:'phone', value:'1(234) 555-1212'}
        ],
        priorities:[
            {value:'Etology'}
        ],
        issues:[
            {value:'Some issue'}
        ],
        topics:[
            {value:'Civil rights',val:50,min:0,max:100},
            {value:'Political reform',val:50,min:0,max:100},
            {value:'Economy',val:50,min:0,max:100},
            {value:'Budget & Taxes',val:50,min:0,max:100},
            {value:'Employment / Labour',val:50,min:0,max:100},
            {value:'Education & Culture',val:50,min:0,max:100},
            {value:'Environment',val:50,min:0,max:100},
            {value:'Energy',val:50,min:0,max:100},
            {value:'Health care',val:50,min:0,max:100},
            {value:'Defense',val:50,min:0,max:100},
            {value:'Food',val:50,min:0,max:100},
            {value:'Inmigration',val:50,min:0,max:100},
            {value:'Foreign Policy',val:50,min:0,max:100},
            {value:'Security',val:50,min:0,max:100}
        ],
        sources:[
            {value:'NY Times',val:50,min:0,max:100},
            {value:'Politico',val:50,min:0,max:100},
            {value:'WSJ',val:50,min:0,max:100},
            {value:'WP',val:50,min:0,max:100},
            {value:'The New Yorker',val:50,min:0,max:100},
            {value:'The Economist',val:50,min:0,max:100},
            {value:'Selon',val:50,min:0,max:100},
            {value:'The Huffington Post',val:50,min:0,max:100},
            {value:'Al-Jazeera',val:50,min:0,max:100},
            {value:'CNN',val:50,min:0,max:100},
            {value:'Fox',val:50,min:0,max:100},
            {value:'The Guardian',val:50,min:0,max:100},
            {value:'The Times',val:50,min:0,max:100},
            {value:'Le Monde',val:50,min:0,max:100},
            {value:'El Pais',val:50,min:0,max:100},
            {value:'Le Figaro',val:50,min:0,max:100},
        ]
    };

    $scope.countries = ["Albania","Spain","United States"];
    $scope.languages = ["English","Spanish"];
    $scope.education = ["Bachelor","Licensed", "Master"];
    $scope.activity = ["ni-ni","geek","guru"];

    $scope.years = function(){
        var years = [];
        for (var x=1900;x<2013;x++) {
            years.push(x);
        }
        return years;
    }


    $scope.state = /^\w\w$/;
    $scope.zip = /^\d\d\d\d\d$/;
    $scope.nickname = /^\w+$/;


    $scope.val = 50;
    $scope.min = 0;
    $scope.max = 100;


    $scope.cancel = function() {
        $scope.form = angular.copy(master);
        $scope.step = 0;
    };

    $scope.save = function() {
        master = $scope.form;
        $scope.step++;
        $scope.form = angular.copy(master);

    };

    $scope.addContact = function() {
        $scope.form.contacts.push({type:'', value:''});
    };

    $scope.removeContact = function(contact) {
        var contacts = $scope.form.contacts;
        for (var i = 0, ii = contacts.length; i < ii; i++) {
            if (contact === contacts[i]) {
                contacts.splice(i, 1);
            }
        }
    };

    $scope.addPriority = function() {
        $scope.form.priorities.push({value:''});
    };

    $scope.removePriority  = function(priority) {
        var priorities = $scope.form.priorities;
        for (var i = 0, ii = priorities.length; i < ii; i++) {
            if (priority === priorities[i]) {
                priorities.splice(i, 1);
            }
        }
    };

    $scope.addIssue = function() {
        $scope.form.issues.push({value:''});
    };

    $scope.removeIssue  = function(issue) {
        var issues = $scope.form.issues;
        for (var i = 0, ii = issues.length; i < ii; i++) {
            if (issue === issues[i]) {
                issues.splice(i, 1);
            }
        }
    };

    $scope.addTopic = function() {
        $scope.form.topics.push({value:'topic',val:50,min:0,max:100});
    };

    $scope.removeTopic  = function(topic) {
        var topics = $scope.form.topics;
        for (var i = 0, ii = topics.length; i < ii; i++) {
            if (topic === topics[i]) {
                topics.splice(i, 1);
            }
        }
    };

    $scope.addSource = function() {
        $scope.form.sources.push({value:'',val:50,min:0,max:100});
    };

    $scope.removeSource  = function(source) {
        var sources = $scope.form.sources;
        for (var i = 0, ii = sources.length; i < ii; i++) {
            if (source === sources[i]) {
                sources.splice(i, 1);
            }
        }
    };

    $scope.isCancelDisabled = function() {
        return angular.equals(master, $scope.form);
    };

    $scope.isSaveDisabled = function() {
//        return $scope.myForm.$invalid || angular.equals(master, $scope.form);
        return false;
    };

    $scope.showPrioritiesForm = function() {
        return $scope.step>0;
    };
    $scope.showIssuesForm = function() {
        return $scope.step>1;
    };
    $scope.showTopicsForm = function() {
        return $scope.step>2;
    };
    $scope.showSourcesForm = function() {
        return $scope.step>3;
    };

    $scope.cancel();
}
