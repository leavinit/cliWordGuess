var Letter = require("./letter.js");

var Word = function(wordIn){
    
    this.wordIn = wordIn;
    this.hiddenForm = "" //useful later for comparing if the whole word is solved
    this.done = "false";
    this.wrongGuesses = 0; //will be checked to see if game is done
    this.rightGuess = false;
    temp = this.wordIn.split("");

    this.letters = [];
    //fill the letters array by splitting the input word
    for(var i = 0; i < temp.length; i++){
        this.letters.push(new Letter(temp[i]));
        this.hiddenForm += " _ ";
    }

    //function to scan through the letters individually, and build a string to display
    this.showWord = function(){
        let tempWord = "";
        // console.log ("HI" +this.letters);
        for(var i = 0; i<this.letters.length;i++){
            tempWord += this.letters[i].getMe();
        }            
        // console.log (tempWord);
        
    }

    //function to process guessing by calling each letter's guess function
    this.makeGuess = function(letterGuessed){

        var tempWord = "";
        for(var i = 0; i<this.letters.length;i++){
            temp = this.letters[i].guessed;

            this.letters[i].guess(letterGuessed);
            if (temp != this.letters[i].guessed){
                this.rightGuess = true;
                // console.log ("wordjs rightguess set to true")
            }
            tempWord += this.letters[i].getMe();
            
        }
        if(!this.rightGuess){
            this.wrongGuesses++;
            // console.log("word this.wrongGuesses "+this.wrongGuesses);
        }
        else{
            //guess was correct and needs to be reset;
            this.rightGuess = false;
            this.wrongGuesses = 0;
        }
        
        // console.log(tempWord);
        this.hiddenForm = tempWord;
        
    }
    this.isDone = function (){
        // console.log("hidden ="+this.hiddenForm);
        // console.log("orig ="+this.wordIn);
        if (this.hiddenForm.replace(/\s+/g, '')
        == this.wordIn){
            console.log(this.hiddenForm);
            console.log("you win!");
            
            this.Done = true;
        }
        return this.Done;
    }
    

}

module.exports = Word;