let questionSets;
//we'll output a random question.
let currQues;
//we'll set an array of the possible OTHER answers
let quesChoice;
//insert the correct Answer somewhere (random) and saves the correct answer index
let corrAnsIndex;
let ansCorrect;
let ansIncorrect;
let noAns;
//interval storer
let countDown;
//timeoutStorer
let roundTime;
init();
//randomQuestionOutput();

function init(){
  questionSets = [
    {Ques: "What Pokemon League has Ash Ketchum, the one who's gonna be the very best, won?",
      CorrAns: "None, because he's the very worst.",
      Other: ["Orange League.", "Sinoh League.", "Johto League."],
      picSrc: "assets/images/ques1.jpg",
      comment: "Seriously, what an idiot."
    },
    {Ques: "Which of these concepts has NOT been made into a Pokemon?",
      CorrAns: "A cheese wheel.",
      Other: ["Ice cream.", "Piles of garbage.", "A regular dog."],
      picSrc: "assets/images/ques2.png",
      comment: "Seriously though, there is a pokemon that is literally just a Yorkshire Terrier."
    },
    {Ques: "Pokemon has aired since 1997; Ash has traveled across the world and had countless adventures since he was 10 years old. How old is he now?",
      CorrAns: "10.",
      Other: ["31.", "42.", "Eleventy-Six."],
      picSrc: "assets/images/ques3.jpg",
      comment: "I think Misty is 35 now."
    },
    {Ques: "Which of these Pokemon promotes childhood obesity?",
      CorrAns: "Snorlax.",
      Other: ["Pikachu.", "Cosmog.", "Klink."],
      picSrc: "assets/images/ques4.jpg",
      comment: "Diabetes incarnate."
    }
  ];
  ansCorrect = 0;
  ansIncorrect = 0;
  noAns = 0;
  //clear Page
  clearPage();
  //entry screen Here
  let startButton = $("<button>");
  startButton.addClass("startButton");
  startButton.html("<h2>Start</h2>");
  startButton.on("click",function(){
    $("#tryAgain").empty();
    randomQuestionOutput();
  });
  $("#tryAgain").append(startButton);
}

function roundSet(){
  clearPage();
  roundTime = setTimeout(function(){
      timeUp();
    },30000);
  //set up timer display
  let countdownTime = 30;
  //need this here so it starts at 30 seconds
  $("#timer").html("<h2>Time Remaining: "+countdownTime+" Seconds</h2>");
  countDown = setInterval(function(){
    if (countdownTime > 0){
      countdownTime--;
      $("#timer").html("<h2>Time Remaining: "+countdownTime+" Seconds</h2>");
    }
    else{
      $("#timer").html("");
    }
  },1000);
  //lets set up the question display, first set the question
  $("#question").html("<h2>"+currQues.Ques+"</h2");
  //we'll now set up the questions.
  for(let i = 0; i < quesChoice.length; i++){
    let ansButton = $("<button>");
    ansButton.addClass("ansButton");
    //button should display the choice.
    ansButton.html("<h2>"+quesChoice[i]+"<h2>");
    //if the index is the correct Answer Index
    if(i === corrAnsIndex){
      ansButton.on("click",function (){
        console.log("You got it!");
        win();
      });
    }
    else {
      ansButton.on("click", function(){
        console.log("You lost.");
        loss();
      })
    }
    $("#answers").append(ansButton);
  }
  console.log(currQues.Ques,quesChoice);
}

function win(){
  //increment correct answer
  ansCorrect++;
  nextQuestion();
  $("#answers").html("");
  $("#question").html("<h2 class='text-center'>Awwww YEEE!</h2>");
  $("#picture").html("<img src="+currQues.picSrc+" />");
  $("#gameMessage").html("<h2>"+currQues.comment+"</h2>");
}
function loss(){
  //increment wrong answer
  ansIncorrect++;
  nextQuestion();
  $("#question").html("<h2 class='text-center'>NOPE!</h2>");
  $("#answers").html("<h2 class='text-center'>The correct answer was: "+currQues.CorrAns+"</h2>");
  $("#picture").html("<img src="+currQues.picSrc+" />");
}
function timeUp(){
  //increment no answers
  noAns++;
  nextQuestion();
  $("#answers").html("<h2 class='text-center'>The correct answer was: "+currQues.CorrAns+"</h2>");
  $("#question").html("<h2 class='text-center'>Times Up!</h2>");
  $("#picture").html("<img src="+currQues.picSrc+" />");
  $("#gameMessage").html("<h2>"+currQues.comment+"</h2>");
}
//resets html page.
function clearPage(){
  //empties out html
  $("#question").html("");
  $("#timer").html("");
  $("#picture").html("");
  $("#question").html("");
  $("#answers").html("");
}

//will start a timeout that plays the next question after 5 seconds
function nextQuestion(){
  //we'll start by clearing all the previous timers
  clearInterval(countDown);
  clearTimeout(roundTime);
  $("#timer").empty();
  //I don't think this will bite me in the ass but we'll see.
  countdown = setTimeout(function(){
    //empty out prev picture and comments
    $("#picture").html("");
    $("#gameMessage").html("");
    //outputs a new question and resets round
    randomQuestionOutput();
  },5000);
}

function randomQuestionOutput(){
  //if there are still questions left
  if(questionSets.length != 0){
    currQues = questionSets.splice(Math.floor(Math.random()*questionSets.length),1)[0];
    //we'll set an array of the possible OTHER answers
    quesChoice = currQues.Other;
    //insert the correct Answer somewhere (random) and saves the correct answer index
    corrAnsIndex = Math.floor(Math.random()*quesChoice.length);
    quesChoice.splice(corrAnsIndex,0,currQues.CorrAns);
    //we'll set the next round
    roundSet();
  }
  else {
    clearInterval(countDown);
    //end screen
    $("#question").html("<h2 class='text-center'>Game Over!<h2>");
    $("#answers").html("<h2 class='text-center'Correct Answer: "+ansCorrect+
                        "<br>Incorrect Answer: "+ansIncorrect+
                        "<br>Unanswered: "+noAns+"</h2>");
    //we'll make a try again button too.
    let tryButton = $("<button>").html("<h2>Try again?</h2>");
    tryButton.on("click",function(){
      //deletes self and reinits the game.
      $("#tryAgain").empty();
      init();
      //for now we'll just set the game on loop, probably have to make a title screen
      // randomQuestionOutput();
    });
    $("#tryAgain").append(tryButton);
  }
}
