//Library of Cards goes here
var cardLibrary = [
	['firstCardTitle',4,2,2, 'blue', 'body', 'functionName', '+2 power'],
	['thick thighs',2,1,2, 'green', 'body', 'functionName', '+2 power'], 
	['card number 3',2,2,4, 'green', 'tail', 'functionName', '+4 power'],
	['sticky sav',2,1,3, 'green', 'tail', 'functionName', '+3 power'],
	['sticky sav2',2,1,3, 'green', 'tail', 'functionName', '+3 power'],
	['sticky sav3',3,1,3, 'green', 'tail', 'functionName', '+3 power']
]

var starterDeck = [
	['starterBody',0,4,1, null, 'body', null, '+1 power'],
	['starterBody',0,4,1, null, 'body', null,'+1 power'],
	['starterBody',0,4,1, null, 'body', null,'+1 power'],
	['starterTail',0,2,2, null, 'tail', null,'+2 power'],
	['starterTail',0,2,2, null, 'tail', null,'+2 power']
]

var mutations = [
	['mutation',0,-2,0, null, 'tail', null, '-2 points']
]

var basicBodies = [
	['basic body',3,0,1,null, 'body', null, '+1']
]

var smallVictory = [
	['tiny victory',2,1,0, null, 'body', null, '+1 points']
]

var bigVictory = [
	['big victory',7,5,0, 'tail', 'tossTail', '+5 points']
]

var upgrades = [
	['upgrade01',{'red':1,'green':1,'blue':0},2,0, 'upgrade', 'functionName', '+2 points, whatever power functionName grants'],
	['upgrade02',{'red':1,'green':0,'blue':1},2,0, 'upgrade', 'functionName', '+2 points, whatever power functionName grants'],
	['upgrade03',{'red':0,'green':1,'blue':1},3,0, 'upgrade', 'functionName', '+3 points, whatever power functionName grants'],
	['upgrade04',{'red':2,'green':0,'blue':0},3,0, 'upgrade', 'functionName', '+3 points, whatever power functionName grants'],
	['upgrade05',{'red':0,'green':0,'blue':2},4,0, 'upgrade', 'functionName', '+4 points, whatever power functionName grants'],
	['upgrade06',{'red':0,'green':2,'blue':0},4,0, 'upgrade', 'functionName', '+4 points, whatever power functionName grants']

]

var heads = [
	['head01',{'red':2,'green':1,'blue':0},5,0, 'head', 'functionName', '+5 points, whatever power functionName grants'],
	['head02',{'red':1,'green':1,'blue':1},5,0, 'head', 'functionName', '+5 points, whatever power functionName grants'],
	['head03',{'red':0,'green':1,'blue':2},5,0, 'head', 'functionName', '+5 points, whatever power functionName grants'],
	['head04',{'red':3,'green':0,'blue':0},5,0, 'head', 'functionName', '+5 points, whatever power functionName grants'],
	['head05',{'red':0,'green':3,'blue':0},5,0, 'head', 'functionName', '+5 points, whatever power functionName grants'],
	['head06',{'red':0,'green':0,'blue':3},5,0, 'head', 'functionName', '+5 points, whatever power functionName grants']
]

function Player(playerName) {
  this.playerName = playerName;
  this.totalPower = 0;
  this.totalColor = [];
  this.beastSize = 0;
  this.maxbeastSize = 8;
  this.totalScore = 0;
  //every card player has is somewhere in deck 
  this.deck = new Stack();
  this.scoreTurn = function(){
  	//gain mutations if necessary
  	if(this.beastSize > this.maxbeastSize ){
  		this.deck.discard(mutations.deal());
  	}
  	//process color array
  	var colors = this.totalColor;
	var result = { };
	for(i = 0; i < colors.length; ++i) {
    	if(!result[colors[i]]){
        	result[colors[i]] = 0;
    	}
    	++result[colors[i]];
    }
    if(typeof result.blue === 'undefined'){
    	result.blue = 0;
    }
    if(typeof result.green === 'undefined'){
    	result.green = 0;
    }
    if(typeof result.red === 'undefined'){
    	result.red = 0;
    }


    //log
    $('#console').append('<p>You have '+this.totalPower+' power left over with '+this.beastSize+" cards played this turn.</p>");
    $('#console').append('<p>You have '+result.blue+' blue, '+result.red+' red, and '+result.green+' green.</p>');

    //return
    return result;
  }
}

function Card(cardTitle, cost, points, power, color, cardType, cardFunction, cardText) {
	this.cardTitle = cardTitle;
	this.cost = cost;
	this.points = points;
	this.power = power;
	this.cardType = cardType;
	this.cardText = cardText;
	this.cardColor = color;
	this.cardFunction = cardFunction;
	//this.toString = function(card){};
}

function Stack(){
	this.cards;
	this.hand = [];
	this.discardPile = [];
	this.played = [];
	this.upgrades = [];
	this.heads = [];
	this.createStack = function(cardArray){
		var cards = [];
		for (var i=0; i < cardArray.length; i++){
			card = new Card(cardArray[i][0], cardArray[i][1], cardArray[i][2], cardArray[i][3], cardArray[i][4], cardArray[i][5]);
			cards.push(card);
		}
	this.cards = cards;
	}
	//used for cardMultiplier function, not gameplay
	//this.addCard = function(card){
	//	this.cards.push(card);
	//}
	this.shuffle = function() {
		var cards = this.cards;
		var i = cards.length, j, tempi, tempj;
		if (i === 0) return false;
  		while (--i) {
     	j = Math.floor(Math.random() * (i + 1));
     	tempi = cards[i];
     	tempj = cards[j];
     	cards[i] = tempj;
     	cards[j] = tempi;
   		}
  	return cards;
	}
	//new addCard with deck argument
	this.addCard = function(card, deckName){
		switch(deckName) {
    		case 'cards':
        		this.cards.push(card);
        		break;
    		case 'discardPile':
        		this.discardPile.push(card);		
        		break;
        	case 'hand':
        		this.hand.push(card);
        		break;
        	case 'played':
        		this.played.push(card);
        		break;
        	case 'heads':
        		this.heads.push(card);
        		break;
        	case 'upgrades':
        		this.upgrades.push(card);
        		break;
    		default:
        		this.cards.push(card);
			} 
	}
	//takes cards from different stack arrays
	this.deal = function(deckName){
		switch(deckName){
			case 'cards':
				if (this.cards.length > 0){
					return this.cards.shift();
				} else {
					return null;
					alert('no card dealt'); //testing, remove later
				}
				break;
    		case 'discardPile':
				if (this.discardPile.length > 0){
					return this.discardPile.shift();
				} else {
					return null;
					alert('no card dealt'); //testing, remove later
				}
				break;
        	case 'hand':
        		if (this.hand.length > 0){
					return this.hand.shift();
				} else {
					return null;
					alert('no card dealt'); //testing, remove later
				}
				break;
        	case 'played':
        		if (this.played.length > 0){
					return this.played.shift();
				} else {
					return null;
					alert('no card dealt'); //testing, remove later
				}
        		break;
        	case 'heads':
        		if (this.heads.length > 0){
					return this.heads.shift();
				} else {
					return null;
					alert('no card dealt'); //testing, remove later
				}
        		break;
        	case 'upgrades':
        		if (this.upgrades.length > 0){
					return this.upgrades.shift();
				} else {
					return null;
					alert('no card dealt'); //testing, remove later
				}
        		break;
    		default:
        		if (this.cards.length > 0){
					return this.cards.shift();
				} else {
					return null;
					alert('no card dealt'); //testing, remove later
				}
        		break;
			}
	}
	//removes specific card from hand
	this.buyCard = function(cardIndex){
		var card = this.hand[cardIndex];

		//remove card
		this.hand.splice(cardIndex, 1);

		//log card title and cost to console
    	$("#console").append("<p>"+card.cardTitle+" bought for "+card.cost+".</p>");

		return card;
	}
	//adds card to player's played array and tallies beastSize
	this.playCard = function(card, player){
		//play card
		this.played.push(card);

		//score card power 
		player.totalPower += card.power;

		//score card color
		if (card.cardColor != null){
			player.totalColor.push(card.cardColor);
		}

		//increment beast size
		player.beastSize ++;

		//end turn if tail
		if (card.cardType == 'tail'){
			window.noTail = 'tail';
		}

		//log
		$('#console').append('<p>Played '+card.cardTitle+" with power: "+card.power+"and color: "+card.cardColor+".</p>");
	}
	//score cards
	this.scoreCard = function(card, player){
		player.totalScore += card.points;
		alert('added '+card.points+' to total, new score '+player.totalScore);
	}
}

function cardMultiplier(stack, card, num){
	for (i=0; i < num; i++){
		stack.addCard(card);
	}
}


//****START TURN******
function playerTurn(playerName){
//set current player (todo, make this random?)
var currentPlayer = playerName;

//PLAY
//play cards while no tails
do {
  if (currentPlayer.deck.cards.length > 0){
    //deal from player cards(deck) to player's game board
    currentPlayer.deck.playCard(currentPlayer.deck.deal(), currentPlayer);
  } else {
    //put discard into cards and then shuffle
    currentPlayer.deck.cards = currentPlayer.deck.discardPile.splice(0,currentPlayer.deck.discardPile.length);
    currentPlayer.deck.shuffle();
    $('#console').append('<p>Shuffling...</p>');
    //and then deal
    currentPlayer.deck.playCard(currentPlayer.deck.deal(), currentPlayer);
  }
} while (window.noTail != 'tail');

//BUY
//tell player totalPower from play round
$('#console').append('<p>You have '+currentPlayer.totalPower+' power to spend.</p>');
//player buys
while (currentPlayer.totalPower >= 2){
  //user selects cards
  var cardNum = prompt('select a card (#0-4)');
  var card = cardLibraryDeck.hand[cardNum];

  if (card.cost <= currentPlayer.totalPower){
  	//- cost of card from player's totalPower bank
    currentPlayer.totalPower -= card.cost;

  	//buy card from library and place in player discard
  	//BUGS
    currentPlayer.deck.addCard(cardLibraryDeck.buyCard(cardNum), 'discardPile');


    //tell player remaining power
    $('#console').append("<p>You have "+currentPlayer.totalPower+" left.</p>");

    //remove card from library - should be done as part of buy
    //cardLibraryDeck.hand.splice(cardNum, 1);
  } else {
    $("#console").append("<p>You don't have enough power to do that.</p>");
  }
}

}




//Card functions
//example
function tossTail(){
	//prompts user to keep or discard tail, then evalutes card as normal if kept
}




