//we'll sort the questions with their answers in an array.
let questionSets = [
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

//we'll output a random question.
let currQues = randomQuestionOutput();
//we'll set an array of the possible OTHER answers
let quesChoice = currQues.Other;
//insert the correct Answer somewhere (random) and saves the correct answer index
let corrAnsIndex = Math.floor(Math.random()*quesChoice.length);
quesChoice.splice(corrAnsIndex,0,currQues.CorrAns);

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
    })
  }
  $("#answers").append(ansButton);
}

console.log(currQues.Ques,quesChoice);

function randomQuestionOutput(){
  if(questionSets.length != 0){
    return questionSets.splice(Math.floor(Math.random()*questionSets.length),1)[0];
  }
  else {
    return "";
  }
}
