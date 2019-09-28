var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    //   answer = index 2
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    //   answer = index 2
    },
    {
        title: "",
        choices: [],
        answer: ""
    }
    ///etc.
  ];


  var questionCounter = 0;
  var selections = [];
  var quiz = $("#quiz");



  displayNext();


  $("#next-button").on("click", function(e) {
      e.preventDefault();
  })


  if(quiz.is(":animated")) {
      return false;
  }
  choose();



  if(isNaN(selections[questionCounter])) {
      alert("Please make a selection!");
  } else {
      questionCounter++;
      displayNext();
  }





  function createQuestionElement(index) {
      var questionElement = $("<div>", {
          id: "question"
      });

      var header = $("<h2>Question " + (index + 1) + ":</h2>");
      questionElement.append(header);

      var question = $("<p>").append(questions[index].question);questionElement.append(question);

      var radioButtons = createRadios(index);questionElement.append(radioButtons);

      return questionElement;
  }




  function createRadios(index) {
      var radioList = $("<ul>");
      var item;
      var input = "";
      for (var i = 0; i < questions[index].choices.length; i++) {
          item = $("<li>");
          input = "<input type = 'radio' name = 'answer' value =" + i + "/>";
          input += questions[index].choices[i];
          item.append(input);
          radioList.append(item);
      }
      return radioList;
  }





  function choose () {
      selections[questionCounter] = +$("input[name='answer']:checked").val();
  }



  function displayNext() {
      quiz.fadeOut(function() {
          $("#question").remove();

          if(questionCounter < questions.length) {
              var nextQuestion = createQuestionElement(questionCounter);
              quiz.append(nextQuestion).fadeIn();
              if (!(isNaN(selections[questionCounter]))) {
                  $("input[value=" + selections[questionCounter] + "]").prop("checked", true);
              }
          }
      })
  }




  function displayScore() {
      var score = $("<p>", {id: "question"});

      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
          if(selections[i] === questions[i].correctAnswer) {
              numCorrect++;
          }
      }

      score.append("You got " + numCorrect + "questions out of " + questions.length + " right!");
      return score;
  }