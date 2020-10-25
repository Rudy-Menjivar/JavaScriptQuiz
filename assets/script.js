
// Array of questions with choices and correct answers
var questions = [
    {
        currentQuestion: 'What is not true about the Constant JavaScript statement?',
        answerChoices: {
            a: 'Const behave much like let variables',
            b: 'Const variables must be assigned a value whe they are declared',
            c: 'Constants values cannot include a function expression',
            d: 'Constant objects can change, but you cannot reassign a constant object',
        },
        answer: 'c'
    },
    {
        currentQuestion: 'What is true about JavaScript Loops?',
        answerChoices: {
            a: 'Loops can execute a block of code a limited number of times',
            b: 'for/in - loops through the properties of any object',
            c: 'for/if - loops through the values of iterable objects',
            d: 'do/while - also loops through a block of code while a specified condition is false',
        },
        answer: 'b'
    },
    {
        currentQuestion: 'Which of the following value returns 5?',
        answerChoices: {
            a: 'Math.floor(1.5);;',
            b: 'Math.ceil(4.4);',
            c: 'Math.sin(5 * Math.PI / 1);',
            d: 'Math.min(5, 25, 125, 625, -200);',
        },
        answer: 'b'
    },
    {
        currentQuestion: 'Which of the following is not true?',
        answerChoices: {
            a: 'Use if to specify a block of code to be executed, if a specified condition is true',
            b: 'Use switch to specify many alternative blocks of code to be executed',
            c: 'Use else if to specify a new condition to test, if the first condition is true',
            d: 'Use else to specify a block of code to be executed, if the same condition is false',
        },
        answer: 'c'
    },
    {
        currentQuestion: 'Which of the following is not true about JavaScript outputs?',
        answerChoices: {
            a: 'Writing into an HTML element, using innerHTML',
            b: 'Writing into the HTML output using the document.write()',
            c: 'The id attribute defines the HTML element',
            d: 'Using document.write() after the HTML document is loaded, will keep all existing HTML',
        },
        answer: 'd'
    },
]

// Global variables
var timeLeft = document.querySelector("#timeLeft");
