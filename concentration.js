var cardArray = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
var cardValues = [];
var cardIDs = [];
var flippedCards = 0;
  
Array.prototype.shuffle = function()    //This function shuffles the cards
    {
    var i = this.length, j, temp;
    while(--i > 0)
        {
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
        }
    };

function createNewBoard()
    {
	flippedCards = 0;
	var output = '';
    cardArray.shuffle();        // This calls the shuffle function
	for(var i = 0; i < cardArray.length; i++)
        {
		output += '<div id="card_' + i + '" onclick="flipCard(this,\'' + cardArray[i] + '\')"></div>';
	    }
	document.getElementById('board').innerHTML = output;
    }

function flipCard(card, value)
    {
	if(card.innerHTML == "" && cardValues.length < 2)
        {
		card.style.background = '#F9B219';
		card.innerHTML = value;
		if(cardValues.length == 0)               // if it's the 1st card flipped
            {
			cardValues.push(value);
			cardIDs.push(card.id);
		    } 
        else if(cardValues.length == 1)          // if it's the 2nd card flipped
            {
			cardValues.push(value);
			cardIDs.push(card.id);
                
			if(cardValues[0] == cardValues[1])   // if the cards match
                {
				flippedCards += 2;
				cardValues = [];                // clear both arrays
            	cardIDs = [];
				
				if(flippedCards == cardArray.length)    // if all pairs are matched
                    {
					alert("Board cleared... generating new board");
					document.getElementById('memory_board').innerHTML = "";
					createNewBoard();
				    }
			     } 
            else                                // if the cards don't match
                {
				function flipBackOver()
                    {
				    var card_1 = document.getElementById(cardIDs[0]);
				    var card_2 = document.getElementById(cardIDs[1]);
                        
				    card_1.style.background = 'url(images/cwlogo110.jpg) no-repeat';
            	    card_1.innerHTML = "";
				    card_2.style.background = 'url(images/cwlogo110.jpg) no-repeat';
            	    card_2.innerHTML = "";
				    
				    cardValues = [];            // clear both arrays
            	    cardIDs = [];
				    }
				setTimeout(flipBackOver, 700);
			    }
		  }
	   }
    }