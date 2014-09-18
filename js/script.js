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

function Card(cardTitle, cost, points, power, cardType, cardText) {
	this.cardTitle = cardTitle;
	this.cost = cost;
	this.points = points;
	this.power = power;
	this.cardType = cardType;
	this.cardText = cardText;
	//this.toString = function(card){};

}


function Player(playerName, score, money) {
  this.playerName = playerName;
  this.score = score;
  this.money = money;
}

function Stack(){
	this.cards;
	this.hand;
	this.discardPile;
	this.createStack = function(cardArray){
		var cards = [];
		for (var i=0; i < cardArray.length; i++){
			card = new Card(cardArray[i][0], cardArray[i][1], cardArray[i][2], cardArray[i][3], cardArray[i][4], cardArray[i][5]);
			cards.push(card);
		}
	this.cards = cards;
	this.hand = [];
	this.discardPile = [];
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
	this.drawCard = function(card){
		this.hand.push(card);
	}
	this.addCard = function(card){
		this.cards.push(card);
	}
	this.discard = function(card){
		this.discardPile.push(card);
	}
	this.checkDiscardPile = function(){
		//TODO seriously how are we displayin' this shiz
	}
	this.deal = function(){
		if (this.cards.length > 0){
			return this.cards.shift();
		} else {
			return null;
			//shuffle deck and then draw?
		}
	}
}

function cardMultiplier(stack, card, num){
	for (i=0; i < num; i++){
		stack.addCard(card);
	}
}

//pasted
//function shufflePack(pack) {  
//  var i = pack.length, j, tempi, tempj;
//  if (i === 0) return false;
//  while (--i) {
//     j = Math.floor(Math.random() * (i + 1));
//     tempi = pack[i];
//     tempj = pack[j];
//     pack[i] = tempj;
//     pack[j] = tempi;
//   }
//  return pack;
//}





//	this.deal = function(numCards){
	//	for (var i=0; i < numCards; i++){
	//		if (this.cards.length > 0){
	//			return this.cards.shift();
	//		} else {
	//			return null;
	//			//shuffle deck and then draw?
	//		}
		//	}
//}