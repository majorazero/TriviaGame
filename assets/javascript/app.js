///////////////////////////////////////////////////////
//Global Variables
///////////////////////////////////////////////////////
let questionSets;
let currQues;  //we'll output a random question.
let quesChoice; //we'll set an array of the possible OTHER answers
let corrAnsIndex;
let ansCorrect;
let ansIncorrect;
let noAns;
let countDown; //interval storer
let roundTime; //timeoutStorer
init();
///////////////////////////////////////////////////////
//Functions
///////////////////////////////////////////////////////
/**
* This functions both as an initilization point and reset button,
* it will reset question sets, the score, clear all previous html content
* and will basically set the entry page with a Start button.
*/
function init(){
  massHide();
  $("#title").hide();
  questionSets = [
    {Ques: "What Pokemon League has Ash Ketchum, the one who's gonna be the very best, won?",
      CorrAns: "None, because he's the very worst.",
      Other: ["Orange League.", "Sinoh League.", "Johto League."],
      picSrc: "assets/images/ques1.gif",
      comment: "Seriously, what an idiot."
    },
    {Ques: "Which of these concepts has NOT been made into a Pokemon?",
      CorrAns: "A cheese wheel.",
      Other: ["Ice cream.", "Piles of garbage.", "A regular dog."],
      picSrc: "assets/images/ques2.gif",
      comment: "Seriously though, there is a pokemon that is literally just a Yorkshire Terrier."
    },
    {Ques: "Pokemon has aired since 1997; Ash has traveled across the world and had countless adventures since he was 10 years old. How old is he now?",
      CorrAns: "10.",
      Other: ["31.", "42.", "Eleventy-Six."],
      picSrc: "assets/images/ques3.gif",
      comment: "I think Misty is 35 now."
    },
    {Ques: "Which of these Pokemon promotes childhood obesity?",
      CorrAns: "Snorlax.",
      Other: ["Pikachu.", "Cosmog.", "Klink."],
      picSrc: "assets/images/ques4.gif",
      comment: "Diabetes incarnate."
    }
  ];
  ansCorrect = 0;
  ansIncorrect = 0;
  noAns = 0;
  //clear Page
  clearPage();
  $("#picture").html("<img class='img-fluid' width='400px'height='auto' src='assets/images/title.gif' />")
  //entry screen Here
  let startButton = $("<button>");
  startButton.addClass("startButton");
  startButton.html("<h2>Start</h2>");
  startButton.on("click",function(){
    $("#tryAgain").empty();
    randomQuestionOutput();
  });
  $("#tryAgain").append(startButton);
  massFadeIn();
  $("#title").fadeIn();
}
/**
* This sets page per new question, will give each choice an appopriate
* button with their respective click functionalities
*/
function roundSet(){
  clearPage();
  //everything should be invisible
  massHide();
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
  //everything should fade back in.
  massFadeIn();
}
/**
* It's a mini reset function for between rounds, and then sets
* an invisible countdown to pump out the next question
*/
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
/**
* This will take out a random question object out of the array of questions
* if questions run out, it will run the game end screen.
*/
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
    $("#answers").html("<h2 class='text-center'>Correct Answer: "+ansCorrect+
                        "<br>Incorrect Answer: "+ansIncorrect+
                        "<br>Unanswered: "+noAns+"</h2>");
    //we'll make a try again button too.
    let tryButton = $("<button>").html("<h2>Try again?</h2>");
    //we'll play 3 end game images
    if(ansCorrect === 4){
      $("#picture").html("<img class='img-fluid' width='400px'height='auto'  src='assets/images/win2.gif' />");
      $("#gameMessage").html("<h2>You are a super star! Nerd.</h2>");
    }
    else if (ansCorrect === 0){
      $("#picture").html("<img class='img-fluid' width='400px'height='auto'  src='assets/images/win1.gif' />");
      $("#gameMessage").html("<h2>That was terrible.</h2>");
    }
    else{
      $("#picture").html("<img class='img-fluid' width='400px'height='auto'  src='assets/images/win3.gif' />");
      $("#gameMessage").html("<h2>So close... but no cigar.</h2>");
    }
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
/**
* This sets the screen for when you answer a question correctly
*/
function win(){
  massHide();
  //increment correct answer
  ansCorrect++;
  nextQuestion();
  $("#answers").html("");
  $("#question").html("<h2 class='text-center'>Awwww YEEE!</h2>");
  $("#picture").html("<img width='400px'height='auto' class='img-fluid' src="+currQues.picSrc+" />");
  $("#gameMessage").html("<h2>"+currQues.comment+"</h2>");
  massFadeIn();
}
/**
* This sets the screen for when you answer a question incorrectly
*/
function loss(){
  massHide();
  //increment wrong answer
  ansIncorrect++;
  nextQuestion();
  $("#question").html("<h2 class='text-center'>NOPE!</h2>");
  $("#answers").html("<h2 class='text-center'>The correct answer was: "+currQues.CorrAns+"</h2>");
  $("#picture").html("<img class='img-fluid'  width='400px'height='auto'src='assets/images/wrong.gif' />");
  $("#gameMessage").html("<h2>"+currQues.comment+"</h2>");
  massFadeIn();
}
/**
* This sets the screen for when you didn't answer the question in time
*/
function timeUp(){
  massHide();
  //increment no answers
  noAns++;
  nextQuestion();
  $("#answers").html("<h2 class='text-center'>The correct answer was: "+currQues.CorrAns+"</h2>");
  $("#question").html("<h2 class='text-center'>Times Up!</h2>");
  $("#picture").html("<img class='img-fluid'  width='400px'height='auto' src='assets/images/timeup.gif' />");
  $("#gameMessage").html("<h2>"+currQues.comment+"</h2>");
  massFadeIn();
}
/**
* This will clear the page.
*/
function clearPage(){
  $("#question, #timer, #picture, #question, #answers, #gameMessage, #tryAgain").html("");
}
/**
* This will fade all the content in.
*/
function massFadeIn(){
  $("#question, #timer, #picture, #question, #answers, #gameMessage, #tryAgain").fadeIn();
}
/**
* This will set all the display in the objects to none. It's needed for the fade in to work properly.
*/
function massHide(){
  $("#question, #timer, #picture, #question, #answers, #gameMessage, #tryAgain").hide();
}
