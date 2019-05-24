var Letter = function(letterName){
    this.name = letterName;
    this.guessed = false;
    //checks if letter should be hidden or shown
    this.getMe = function(){
        if(this.guessed){
            return " "+this.name+" ";
        }
        else{
            return " _ ";
        }
    }
    //function to update if a correct guess is made for this letter
    this.wrongGuess = false;
    this.guess = function(guessIn){
        if (!this.guessed && guessIn === this.name){
            this.guessed = true;
        }
    }

}

module.exports = Letter;