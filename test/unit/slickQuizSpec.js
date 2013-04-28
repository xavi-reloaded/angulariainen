'use strict';

/* jasmine specs for services go here */

describe('lickSquizClass.js specs', function() {

    var sut;
    var element = "slickQuiz";
    var options = {
        checkAnswerText:  'Check My Answer!',
        nextQuestionText: 'Next',
        backButtonText: '',
        randomSort: false,
        randomSortQuestions: false,
        randomSortAnswers: false,
        preventUnanswered: true,
        completionResponseMessaging: false,
        disableResponseMessaging: false
    };
    var json = quizJSON;

    beforeEach(function(){

        $('body').append('' +
            '   <div id="slickQuiz" class="hero-unit">' +
            '       <h1 class="quizName"><!-- where the quiz name goes --></h1>' +
            '       <div class="quizArea">' +
            '           <div class="quizHeader">' +
            '               <a class="button startQuiz" href="#">Get Started!</a>' +
            '           </div>' +
            '       </div>' +
            '       <div class="quizResults">' +
            '           <h3 class="quizScore">You Scored: <span><!-- where the quiz score goes --></span></h3>' +
            '           <h3 class="quizLevel"><strong>Ranking:</strong> <span><!-- where the quiz ranking level goes --></span></h3>' +
            '           <div class="quizResultsCopy"></div>' +
            '       </div>' +
            '   </div>'
        );

        sut = new SlickQuizClass("slickQuiz", options,json);

    });


    describe('create class', function() {
        it('should return valid class instance',function(){
            expect(sut).not.toBe(null);
        });
    });

    describe('class quizz methods', function() {
        it('should return execute setupQuiz()',function(){
            expect(sut.setupQuiz()).toBe(true);
        });

        it('should return quizName setted value',function(){
            var ulElement = $('div');
            expect(ulElement.children('li').text()).toBe('');
        });

        it('should return quiz values',function(){
            expect(sut.getQuizValues()).toBe(json);
        });

        it('should return quiz questions of json that are five',function(){
            expect(sut.getQuizQuestions().length).toBe(5);
        });

        it('shuld  create tag ol.questions',function(){
            var ulElement = $('ol.questions');
            expect(ulElement.children().lenght).toBe(0);
        });

        it('shuld execute init method',function(){
            expect(sut.init()).toBe(true);
        });

        it('shuld check if jquery <SELECTOR> is properly created',function(){
            expect(sut.getQuizjquerySelector()).toBe(true);
        });


    });




});
