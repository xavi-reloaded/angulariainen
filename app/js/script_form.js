

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

    $scope.cancel = function() {
        $scope.form = angular.copy(master);
    };

    $scope.save = function() {
        master = $scope.form;
        $scope.cancel();
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

    $scope.isCancelDisabled = function() {
        return angular.equals(master, $scope.form);
    };

    $scope.isSaveDisabled = function() {
        return $scope.myForm.$invalid || angular.equals(master, $scope.form);
    };

    $scope.cancel();
}

function UserPriorityForm($scope) {
    var master = {
        priorities:[
            {value:'Etology'}
        ]
    };

    $scope.cancel = function() {
        $scope.form = angular.copy(master);
    };

    $scope.save = function() {
        master = $scope.form;
        $scope.cancel();
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

    $scope.isCancelDisabled = function() {
        return angular.equals(master, $scope.form);
    };

    $scope.isSaveDisabled = function() {
        return $scope.myPriorityForm.$invalid || angular.equals(master, $scope.form);
    };

    $scope.cancel();
}

function UserIssuesForm($scope) {
    var master = {
        issues:[
            {value:'Some issue'}
        ]
    };

    $scope.cancel = function() {
        $scope.form = angular.copy(master);
    };

    $scope.save = function() {
        master = $scope.form;
        $scope.cancel();
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

    $scope.isCancelDisabled = function() {
        return angular.equals(master, $scope.form);
    };

    $scope.isSaveDisabled = function() {
        return $scope.myIssuesForm.$invalid || angular.equals(master, $scope.form);
    };

    $scope.cancel();
}

function UserTopicsForm($scope, $locale) {
    var master = {
        topics:[
            {value:'Some topic',val:50,min:0,max:100}
        ]
    };

    $scope.val = 50;
    $scope.min = 0;
    $scope.max = 100;


    $scope.wek = [
        {value:'Some topic in scope',val:50,min:0,max:100,id:1},
        {value:'Some 2',val:50,min:0,max:100,id:2}
    ];

    $scope.cancel = function() {
        $scope.form = angular.copy(master);

    };

    $scope.save = function() {
        master = $scope.form;
        $scope.cancel();
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

    $scope.isCancelDisabled = function() {
        return angular.equals(master, $scope.form);
    };

    $scope.isSaveDisabled = function() {
        return $scope.myTopicsForm.$invalid || angular.equals(master, $scope.form);
    };

    $scope.cancel();
}


