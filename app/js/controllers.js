'use strict';

/* Controllers */


function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];


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
