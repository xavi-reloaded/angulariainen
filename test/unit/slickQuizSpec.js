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

    });


    describe('create class', function() {
        it('should return valid class instance',function(){
            sut = new SlickQuizClass(element, options,quizJSON);
            expect(sut).not.toBe(null);
        });
    });

    describe('create class', function() {
        it('should return valid class instance',function(){
            sut = new SlickQuizClass(element, options,quizJSON);
            expect(sut).not.toBe(null);
        });
    });




});
