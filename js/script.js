//Library of Cards goes here
var cardLibrary = [
	['firstCardTitle', 4, 2, 2, 'blue', 'body', 'functionName', '+2 power'],
	['thick thighs', 2, 1, 2, 'green', 'body', 'functionName', '+2 power'], 
	['card number 3', 5, 2, 4, 'green', 'tail', 'functionName', '+4 power'],
	['sticky sav', 3, 1, 3, 'green', 'tail', 'functionName', '+3 power'],
	['sticky sav2', 3, 1, 3, 'green', 'tail', 'functionName', '+3 power'],
	['sticky sav3', 3, 1, 3, 'green', 'tail', 'functionName', '+3 power']
]

var starterDeck = [
	['starterBody',0,0,1, null, 'body', null, '+1 power'],
	['starterBody',0,0,1, null, 'body', null,'+1 power'],
	['starterBody',0,0,1, null, 'body', null,'+1 power'],
	['starterTail',0,0,2, null, 'tail', null,'+2 power'],
	['starterTail',0,0,2, null, 'tail', null,'+2 power']
]

var mutations = [
	['mutation',0,-2,0, null, 'tail', null, '-2 points']
]

var smallVictory = [
	['tiny victory',2,1,0, null, 'body', null, '+1 points']
]

var bigVictory = [
	['big victory',7,5,0, 'tail', 'tossTail', '+5 points']
]

var upgrades = [
	['upgrade01',['red','green'],2,0, 'upgrade', 'functionName', '+2 points, whatever power functionName grants'],
	['upgrade02',['red','blue'],2,0, 'upgrade', 'functionName', '+2 points, whatever power functionName grants'],
	['upgrade03',['blue','green'],3,0, 'upgrade', 'functionName', '+3 points, whatever power functionName grants'],
	['upgrade04',['red','red'],3,0, 'upgrade', 'functionName', '+3 points, whatever power functionName grants'],
	['upgrade05',['blue','blue'],4,0, 'upgrade', 'functionName', '+4 points, whatever power functionName grants'],
	['upgrade06',['green','green'],4,0, 'upgrade', 'functionName', '+4 points, whatever power functionName grants']

]

var heads = [
	['head01',['red','red','green'],5,0, 'head', 'functionName', '+5 points, whatever power functionName grants'],
	['head02',['blue','red','green'],5,0, 'head', 'functionName', '+5 points, whatever power functionName grants'],
	['head03',['blue','blue','green'],5,0, 'head', 'functionName', '+5 points, whatever power functionName grants'],
	['head04',['red','red','red'],5,0, 'head', 'functionName', '+5 points, whatever power functionName grants'],
	['head05',['green','green','green'],5,0, 'head', 'functionName', '+5 points, whatever power functionName grants'],
	['head06',['blue','blue','blue'],5,0, 'head', 'functionName', '+5 points, whatever power functionName grants']
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
  	alert("You have " + this.totalPower + " and " + this.beastSize + " cards played");
  }
  //this.scoreTurn = function(){
  	//todo
  	//add to power score
  //}
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
	this.hand;
	this.discardPile;
	this.played;
	this.upgrades;
	this.heads; 
	this.createStack = function(cardArray){
		var cards = [];
		for (var i=0; i < cardArray.length; i++){
			card = new Card(cardArray[i][0], cardArray[i][1], cardArray[i][2], cardArray[i][3], cardArray[i][4], cardArray[i][5]);
			cards.push(card);
		}
	this.cards = cards;
	this.hand = [];
	this.discardPile = [];
	this.played = [];
	this.upgrades = [];
	this.heads = [];
	}
	//used for cardMultiplier function, not gameplay
	this.addCard = function(card){
		this.cards.push(card);
	}
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
	//takes cards from stack
	this.deal = function(){
		if (this.cards.length > 0){
			return this.cards.shift();
		} else {
			return null;
		}
	}
	//add cards to different stack arrays
	this.drawCard = function(card){
		this.hand.push(card);
	}
	this.discard = function(card){
		this.discardPile.push(card);
	}
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
	//get info 
	this.checkDiscardPile = function(){
		//TODO seriously how are we displayin' this shiz
	}
}

function cardMultiplier(stack, card, num){
	for (i=0; i < num; i++){
		stack.addCard(card);
	}
}

//Card functions
//example
function tossTail(){
	//prompts user to keep or discard tail, then evalutes card as normal if kept
}




