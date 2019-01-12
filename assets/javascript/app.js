$(document).ready(function() {
	
//Global variables and question array
	var startScreen;
	var gameHTML;
	var correct = 0;
	var incorrect = 0;
	var unanswered = 0;
	var questionCounter = 0;
	var counter = 20;
	var clock;
	var selectedAnswer;
	var questionArray = [
		{ 	
			question: "How many pairs of blue jeans average American owns?",
			answers: [
				{text: "7", isCorrect: true},
				{text: "6", isCorrect: false},
				{text: "4", isCorrect: false}
			],
			image: "<img class='answerImage' src='./assets/images/bluejeans.jpg'>",
			correctText: "7",
		},
		{	
			question: "Which are the four major fashion capitals of the world?",
			answers: [
				{text: "Miami, New York, Milan, Paris", isCorrect: false},
				{text: "New York, London, Milan, and Paris", isCorrect: true},
				{text: "New York, London, Rome, and Paris", isCorrect: false},
			],
			image: "<img class='answerImage' src='./assets/images/fashion-capitals.jpg'>",
			correctText: "New York, London, Milan, and Paris",
		},
		{
			question: "The first fashion magazine was publiched 1586 in which country?",
			answers: [
				{text: "Italy", isCorrect: false},
				{text: "Germany", isCorrect: true},
				{text: "USA", isCorrect: false}
			],
			image: "<img class='answerImage' src='./assets/images/fashion-magazine.jpg'>",
			correctText: "Germany"
		},
		{ 
			question: "How much money on average American woman spends on clothes?",
			answers: [
				{text: "$50,000", isCorrect: false},
				{text: "$25,000", isCorrect: false},
				{text: "$125,000", isCorrect: true}
			],
			image: "<img class='answerImage' src='./assets/images/money.jpg'>",
			correctText: "$125,000",
		},
		{
			question: "Which is most used clothing material?",
			answers: [
                {text: "Linen", isCorrect: false},
				{text: "Cotton", isCorrect: true},
				{text: "Polyester", isCorrect: false}
			],
			image: "<img class='answerImage' src='./assets/images/cotton.jpg'>",
			correctText: "Cotton",
		},
		{
			question: "Which is the oldest fashion house still in existence?",
			answers: [
				{text: "Prada", isCorrect: false},
				{text: "Dior", isCorrect: false},
				{text: "Hermes", isCorrect: true},
			],
			image: "<img class='answerImage' src='./assets/images/hermes.jpg'>",
			correctText: "Hermes",
		},
		{ 
			question: "Which of the following designers is often credited with idea of the necessity of the little black dress?",
			answers: [
				{text: "Otto Lucas", isCorrect: false},
				{text: "Coco Chanel", isCorrect: true},
				{text: "Yves Saint Laurent", isCorrect: false},
			],
			image: "<img class='answerImage' src='./assets/images/chanel.jpg'>",
			correctText: "Coco Chanel",
		},
		{
			question: "Where was the first shopping mall for clothes built?",
			answers: [
				{text: "Rome", isCorrect: true},
				{text: "New York", isCorrect: false},
				{text: "Paris", isCorrect: false}
			],
			image: "<img class='answerImage' src='./assets/images/rome.jpg'>",
			correctText: "Rome",
		},
		{
			question: "Who created blue jeans?",
			answers: [
				{text: "Calvin Klein", isCorrect: false},
				{text: "Jean Levon", isCorrect: false},
				{text: "Levi Strauss", isCorrect: true},
			],
			image: "<img class='answerImage' src='./assets/images/levi.jpg'>",
			correctText: "Levi Strauss",
		},
		{
			question: "When was the miniskirt invented?",
			answers: [
			    {text: "1950", isCorrect: false},
			    {text: "1970", isCorrect: false},
			    {text: "1960", isCorrect: true}
			],
			image: "<img class='answerImage' src='./assets/images/miniskirt.jpg'>",
			correctText: "1960",
		}
	];
	
	//Generates trivia questions
	function generateHTML() {
		var timeRemainingText = "<h2>Time Remaining: <span id='timer'>20</span></h2>";
		var questionText = "<p>" + questionArray[questionCounter].question + "</p>";
		gameHTML = timeRemainingText + questionText;
		$(".mainArea").html(gameHTML);
		for (var i = 0; i < questionArray[questionCounter].answers.length; i++) {
			var answerButton = $("<button>");
			answerButton.addClass("answer btn btn-block");
			answerButton.attr("isCorrect", questionArray[questionCounter].answers[i].isCorrect);
			answerButton.html(questionArray[questionCounter].answers[i].text);
			$(".mainArea").append(answerButton);
		}
	}

	//Generates html if user choses correct answer
	function generateWin() {
		correct++;
		var correctAnswerText = "<h1 class='correctText'>CORRECT!</h>";
		var correctAnswerImage = questionArray[questionCounter].image;
		gameHTML = correctAnswerText + correctAnswerImage;
		$(".mainArea").html(gameHTML);
		setTimeout(nextQuestion, 4000);  
	}

	//generates html if user choses incorrect asnwer
	function generateLoss() {
		incorrect++;
		var wrongAnswerText = "<h1 class='wrongText'>INCORRECT</h1>";
		var wrongAnswerImage = "<img class='answerImage' src='./assets/images/wrong.jpg'>";
		var rightAnswer = "<p>The correct answer is: " + questionArray[questionCounter].correctText + "</p>";
		gameHTML = wrongAnswerText + rightAnswer + wrongAnswerImage;
		$(".mainArea").html(gameHTML);
		setTimeout(nextQuestion, 4000); 
	}

	//Generates html if time runs out
	function generateTimeOut() {
		unanswered++;
		var timeOutText = "<h1 class='timeOutText'>TIME'S UP!</h1>";
		gameHTML =  timeOutText;
		$(".mainArea").html(gameHTML);
		setTimeout(nextQuestion, 4000);  
	}

	//Timer 
	function timer() {
		clock = setInterval(twentySeconds, 1000);
		function twentySeconds() {
			if (counter === 0) {
				clearInterval(clock);
				generateTimeOut();
			} else if (counter > 0) {
				counter--;
			}
			$("#timer").html(counter);
		}
	}

	//Generates next question
	function nextQuestion() {
		if (questionCounter < questionArray.length - 1) {
			questionCounter++;
			generateHTML();
			counter = 20;
			timer();
		} else {
			results();
		}
	}

	//Generates final results
	function results() {
		var resultsText = "<h2>Here is your results!</h2>";
		var correctAnswers = "<p>Correct Answers: " + correct + "</p>";
		var wrongAnswers = "<p>Wrong Answers: " + incorrect + "</p>";
		var notAnswered = "<p>Unanswered: " + unanswered + "</p>";
		var playAgain = "<button class='resetButton btn btn-secondary' type='button'>PLAY AGAIN</button>";
		gameHTML = resultsText + correctAnswers + wrongAnswers + notAnswered + playAgain;
		$(".mainArea").html(gameHTML);
	}

	//Resets Trivia Quizz
	function resetGame() {
		questionCounter = 0;
		correct = 0;
		incorrect = 0;
		unanswered = 0;
		counter = 20;
		generateHTML();
		timer();
	}

	//Generates the start button and initial screen
	function initialScreen() {
		var initialText = "<h1>Test your passion for FASHION!</h1><br><p>There are 10 questions total and you will have 20 seconds to answer each one of the them. Good luck!</p>";
		var startButtonHTML = "<button class='startButton btn btn-secondary' type='button'>Start Quiz</button>";
		startScreen = initialText + startButtonHTML;
		$(".mainArea").html(startScreen);
	}

	//Function executed upon clicking of the start button
	$("body").on("click", ".startButton", function(){ 
		generateHTML();
		timer();
	});

	//Function executed upon clicking of an answer button
	$("body").on("click", ".answer", function(){
		selectedAnswer = $(this).attr("isCorrect");

		if (selectedAnswer === "true") { // evaluates if this is the correct answer
			clearInterval(clock);
		 	generateWin();
		} else { 	// then it's the wrong answer
			clearInterval(clock);
			generateLoss();
		}

	}); 

	//Function executed upon clicking of the "Play Again" button
	$("body").on("click", ".resetButton", function(){
		resetGame();
	}); 

	initialScreen();

});  

