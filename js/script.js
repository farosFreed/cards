//Library of Cards goes here
var cardLibrary = [
	['firstCardTitle', 4, 2, 2, 'body', '+2 power'],
	['2', 2, 1, 2, 'body', '+2 power'], 
	['3', 5, 2, 4, 'tail', '+4 power'],
	['4', 3, 1, 3, 'tail', '+3 power']
]

var starterDeck = [
	['starterBody',0,0,1, 'body', '+1 power'],
	['starterBody',0,0,1, 'body','+1 power'],
	['starterBody',0,0,1, 'body','+1 power'],
	['starterTail',0,0,2, 'tail','+2 power'],
	['starterTail',0,0,2, 'tail','+2 power']
]

var mutations = [
	['mutation',0,-2,0, 'tail','-2 points']
]

var smallVictory = [
	['tiny victory',2,1,0, 'body', '+1 points']
]

var bigVictory = [
	['big victory',7,5,0, 'tail', '+5 points']
]

var smallUpgrade = [
	//upgrades cards need color cost
]

var bigUpgrade = [
	//upgrades cards need color cost
]

//var emptyDeck = [] don't need this

function Player(playerName) {
  this.playerName = playerName;
  this.totalScore = 0;
  this.totalPower = 0;
  this.beastSize = 0;
  this.maxbeastSize = 8;
  this.deck = new Stack();
  this.scoreTurn = function(){
  	//gain mutations if necessary
  	if(this.beastSize > this.maxbeastSize ){

  	}
  	alert("You have " + this.totalPower + " and " + this.beastSize + " cards played");
  }
  //this.stack = new Stack();
  //this.scoreTurn = function(){
  	//todo
  	//add to power score
  //}
}

function Card(cardTitle, cost, points, power, cardType, cardText) {
	this.cardTitle = cardTitle;
	this.cost = cost;
	this.points = points;
	this.power = power;
	this.cardType = cardType;
	this.cardText = cardText;
	//this.toString = function(card){};
}

function Stack(){
	this.cards;
	this.hand;
	this.discardPile;
	this.played;
	this.other; //extra array for upgrade cards etc
	this.head; //TODO implement head scoring
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
	this.other = [];
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
			//shuffle deck and then draw?
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
		this.played.push(card);
		player.totalPower += card.power;
		player.beastSize ++;

		//end turn if tail
		if (card.cardType == 'tail'){
			window.noTail = 'tail';
		}
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

function buyCards(){

}




