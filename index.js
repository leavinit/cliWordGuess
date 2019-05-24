var Word = require("./word.js");
var inquirer = require("inquirer");
var randomwords = ["apple","bread","sedan","javascript"]

var alreadyGuessed = "";
// var wordToGuess = new Word(randomWord);
var remaining = 10;
var storedWord;
var getGuess = function(wordInput){
    if(wordInput){
        var wordToGuess = wordInput;
        storedWord = wordToGuess;
    }
    else{
        var wordToGuess = storedWord;
        console.log("stored word")
    }
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
                getGuess(NULL);
            }
            if(remaining == 0){
                console.log("("+remaining+" guesses remaining.) You lose!");
                console.log("Word to guess was "+ randomWord+".")
            }
        }
    );
}
function generateWord(){
    var randomWord = randomwords[Math.floor(Math.random() * randomwords.length)];
    var wordToGuess = new Word(randomWord);
    randomwords = randomwords.filter(function(value, index, arr){

        return (value != randomWord);
        
    });
    console.log(wordToGuess.wordIn);
    return wordToGuess;
}
var playing = true;
while(playing){
    var wordToPlay = generateWord();
    console.log("-----------wordis: "+wordToPlay)
    if (wordToPlay){
        getGuess(wordToPlay);
    }
    else{
        console.log("Out of words, GAME OVER.")
        playing=false;
    }

}