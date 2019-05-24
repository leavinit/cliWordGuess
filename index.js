var Word = require("./word.js");
var inquirer = require("inquirer");
var randomWord = "apple";
var alreadyGuessed = "";
var wordToGuess = new Word(randomWord);
var remaining = 10;

var getGuess = function(){
    
    console.log(wordToGuess.hiddenForm);
    inquirer.prompt([
        {
            name: "playerGuess",
            message: "("+remaining+" guesses remaining.) Which letter do you guess?"
        }
    ]).then(
        function(answers){
            if (alreadyGuessed.includes(answers.playerGuess)){
                console.log(answers.playerGuess + " was already guessed. Try Again");
            }else{
                wordToGuess.makeGuess(answers.playerGuess);
                if(wordToGuess.wrongGuesses){
                    //All letters checked were wrong
                    console.log("Guessed Incorrectly");
                    remaining -= 1;
                }
                else{
                    console.log("Guessed Correctly!");
                }
                //keep tracked of letters guessed
                alreadyGuessed += answers.playerGuess;
                wordToGuess.showWord();
            }
            
            
            if(!wordToGuess.isDone() && (remaining > 0)){
                getGuess();
            }
            if(remaining == 0){
                console.log("("+remaining+" guesses remaining.) You lose!");
                console.log("Word to guess was "+ randomWord+".")
            }
        }
    );
}

getGuess();