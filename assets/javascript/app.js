let questionSets;
//we'll output a random question.
let currQues;
//we'll set an array of the possible OTHER answers
let quesChoice;
//insert the correct Answer somewhere (random) and saves the correct answer index
let corrAnsIndex;
init();
randomQuestionOutput();
roundSet();

function init(){
  questionSets = [
    {Ques: "What Pokemon League has Ash Ketchum, the one who's gonna be the very best, won?",
      CorrAns: "None, because he's a the very worst.",
      Other: ["Orange League.", "Sinoh League.", "Johto League."]
    },
    {Ques: "Which of these concepts has NOT been made into a Pokemon?",
      CorrAns: "A cheese wheel.",
      Other: ["Ice cream.", "Piles of garbage.", "A regular dog."]
    },
    {Ques: "Pokemon has aired since 1997; Ash has traveled across the world and had countless adventures since he was 10 years old. How old is he now?",
      CorrAns: "10.",
      Other: ["31.", "42.", "Eleventy-Six."]
    },
    {Ques: "Which of these Pokemon promotes childhood obesity?",
      CorrAns: "Snorlax.",
      Other: ["Pikachu.", "Cosmog.", "Klink."]
    }
  ];
}

function roundSet(){
  //set up timer display
  $("#timer").html("<h2>Time Remaining: 8 Seconds</h2>");
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

function loss(){
  console.log(currQues);
  $("#question").html("<h2>NOPE!</h2>");
  $("#answers").html("<h2>The correct answer was: "+currQues.CorrAns+"</h2>");
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
