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
init();
randomQuestionOutput();
roundSet();

function init(){
  questionSets = [
    {Ques: "What Pokemon League has Ash Ketchum, the one who's gonna be the very best, won?",
      CorrAns: "None, because he's the very worst.",
      Other: ["Orange League.", "Sinoh League.", "Johto League."],
      picSrc: "assets/images/ques1.jpg"
    },
    {Ques: "Which of these concepts has NOT been made into a Pokemon?",
      CorrAns: "A cheese wheel.",
      Other: ["Ice cream.", "Piles of garbage.", "A regular dog."],
      picSrc: "assets/images/ques2.png"
    },
    {Ques: "Pokemon has aired since 1997; Ash has traveled across the world and had countless adventures since he was 10 years old. How old is he now?",
      CorrAns: "10.",
      Other: ["31.", "42.", "Eleventy-Six."],
      picSrc: "assets/images/ques3.jpg"
    },
    {Ques: "Which of these Pokemon promotes childhood obesity?",
      CorrAns: "Snorlax.",
      Other: ["Pikachu.", "Cosmog.", "Klink."],
      picSrc: "assets/images/ques4.jpg"
    }
  ];
}

function roundSet(){
  let roundTime = setTimeout(function(){
      timeUp();
    },30000);
  //set up timer display
  let countdownTime = 30;
  let countDown = setInterval(function(){
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
    var ansButton = $("<button>");
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
  $("#answers").html("");
  $("#question").html("<h2>Awwww YEEE!</h2>");
  $("#picture").html("<img src="+currQues.picSrc+" />");
}
function loss(){
  $("#question").html("<h2>NOPE!</h2>");
  $("#answers").html("<h2>The correct answer was: "+currQues.CorrAns+"</h2>");
  $("#picture").html("<img src="+currQues.picSrc+" />");
}
function timeUp(){
  $("#answers").html("");
  $("#question").html("<h2>Times Up!</h2>");
  $("#picture").html("<img src="+currQues.picSrc+" />");
}

function randomQuestionOutput(){
  if(questionSets.length != 0){
    currQues = questionSets.splice(Math.floor(Math.random()*questionSets.length),1)[0];
    //we'll set an array of the possible OTHER answers
    quesChoice = currQues.Other;
    //insert the correct Answer somewhere (random) and saves the correct answer index
    corrAnsIndex = Math.floor(Math.random()*quesChoice.length);
    quesChoice.splice(corrAnsIndex,0,currQues.CorrAns);
  }
}
