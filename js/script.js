$(document).ready(function(){
  
var playerName;
//var currentPlayer;
//var currentColors;
window.noTail = '';
var topUpgrade;
var topHead;


//Library of Cards goes here
var cardLibrary = [
	['firstCardTitle',4,2,2, 'blue', 'body', 'functionName', '+2 power'],
	['thick thighs',2,1,2, 'green', 'body', 'functionName', '+2 power'], 
	['card number 3',2,2,4, 'green', 'tail', 'functionName', '+4 power'],
	['sticky sav',2,1,3, 'green', 'tail', 'functionName', '+3 power'],
	['sticky sav2',2,1,3, 'green', 'tail', 'functionName', '+3 power'],
	['sticky sav3',3,1,3, 'green', 'tail', 'functionName', '+3 power'],
	['thick thighs',2,1,2, 'green', 'body', 'functionName', '+2 power'], 
	['card number 3',2,2,4, 'green', 'tail', 'functionName', '+4 power'],
	['sticky sav',2,1,3, 'green', 'tail', 'functionName', '+3 power'],
	['sticky sav2',2,1,3, 'green', 'tail', 'functionName', '+3 power'],
	['sticky sav3',3,1,3, 'green', 'tail', 'functionName', '+3 power'],
	['thick thighs',2,1,2, 'green', 'body', 'functionName', '+2 power'], 
	['card number 3',2,2,4, 'green', 'tail', 'functionName', '+4 power'],
	['sticky sav',2,1,3, 'green', 'tail', 'functionName', '+3 power'],
	['sticky sav2',2,1,3, 'green', 'tail', 'functionName', '+3 power'],
	['sticky sav3',3,1,3, 'green', 'tail', 'functionName', '+3 power'],
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
	this.createNode = function(){



		//TO DO TO DO function from brainjar
	  var cardNode, frontNode, indexNode, spotNode, tempNode, textNode;
  	var indexStr, spotChar;

    // This is the main node, a DIV tag.

    cardNode = document.createElement("DIV");
    cardNode.className = "card";

    // Build the front of card.

    frontNode = document.createElement("DIV");
    frontNode.className = "front";
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
		$('#console').append('<p>added '+card.points+' to total, new score '+player.totalScore+' </p>');
	}
}

function cardMultiplier(stack, card, num){
	for (i=0; i < num; i++){
		stack.addCard(card);
	}
}

//
//GamePlay functions
//

//Player Turn
function playerTurn(playerName){
//set current player
var currentPlayer = playerName;

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

//UPGRADE
function playerUpgrade(playerName){
//tally colors into an object
var currentPlayer = playerName;

var currentColors = currentPlayer.scoreTurn();

//UPGRADE / evolve
//check if upgrade and head cards can be bought, start false
var headBuyable = false;
var upgradeBuyable = false;
//check head
if(currentColors.blue >= headCard.cost.blue){
  if(currentColors.red >= headCard.cost.red){
    if(currentColors.green >= headCard.cost.green){
        headBuyable = true;
    }
  }
} 
//check upgrade
if(currentColors.blue >= upgradeCard.cost.blue){
  if(currentColors.red >= upgradeCard.cost.red){
    if(currentColors.green >= upgradeCard.cost.green){
        upgradeBuyable = true;
    }
  }
} 
//if you can afford it, buy a card
if(upgradeBuyable == true && headBuyable == true){
  var choice = prompt('You can evolve! Type "1" to get the upgrade card '+upgradeCard.cardTitle+' or "2" to get the head card '+headCard.cardTitle);
  if(choice == 1){
    $('#console').append('<p>You bought '+upgradeCard.cardTitle+'</p>');
    currentPlayer.deck.addCard(upgradeCard, 'upgrades');
    return;
  } else if(choice == 2){
    $('#console').append('<p>You bought '+headCard.cardTitle+'</p>')
    currentPlayer.deck.addCard(headCard, 'heads');
    return;
  }else{
    $('#console').append('<p>What are you ... I dont even ...</p>')
  }
} else {
  if(headBuyable == true){
    $('#console').append('<p>You bought '+headCard.cardTitle+'</p>');
    //send card to stack.head
    currentPlayer.deck.addCard(headCard, 'heads');
    return;
  }
  if(upgradeBuyable == true){
    $('#console').append('<p>You bought '+upgradeCard.cardTitle+'</p>');
    //send card to stack.upgrades
    currentPlayer.deck.addCard(upgradeCard, 'upgrades');
    return;
  }
  $('#console').append('<p>nothing to evolve this round.</p>');
}
}

//RESET PLAYER / turn end function
function playerReset(playerName){

var currentPlayer = playerName;

//all cards in currentPlayer.played go to discards
for(i = currentPlayer.deck.played.length; i > 0; i--){
  currentPlayer.deck.addCard(currentPlayer.deck.deal('played'), 'discardPile');
}
$('#console').append('<p>Discard pile now contains '+currentPlayer.deck.discardPile.length+' cards</p>');

//reset player stats
currentPlayer.beastSize = 0;
currentPlayer.totalColor = [];
currentPlayer.totalPower = 0;

//reset tail status
window.noTail = '';

}

//CHECK FOR GAME END / Card Library Reset
function boardReset(){
	//check for game end
	var gameDecks = [cardLibraryDeck, mutationDeck, smallVictoryDeck, bigVictoryDeck, headDeck, upgradeDeck]
	//loop through decks array and check if any of empty
	for(i = 0; i < gameDecks.length; i++){
  		if (gameDecks[i].cards.length <= 0){
    	//if array is empty, go to game end function (scoring)
    	scoreGame();
    	return;
  		}
	}
	//replenish library
	//if cardlibrary isn't full, add cards until it is
	if (cardLibraryDeck.hand.length < 5){
  		for(i = cardLibraryDeck.hand.length; i < 5; i++){
    		var card = cardLibraryDeck.deal();
      		$('#console').append('<p>Library adds '+card.cardTitle+' for '+card.cost+' power.</p>');
      		cardLibraryDeck.addCard(card, 'hand');
  			}
		}
	}


//GAME END
function scoreGame(){
	//TODO 
	//easier to loop through all decks and add together
	//scoreDecks = ['cards', 'hand', 'discardPile', 'heads', 'upgrades']
  //loop through array above

  //score 'cards' deck
  for (i = 0; i < playerName.deck.cards.length; playerName.deck.cards.splice(0,1)){
      //score each card
      playerName.deck.scoreCard(playerName.deck.cards[i], playerName);
  }

  //score 'discardPile'
  for (j = 0; j < playerName.deck.discardPile.length; playerName.deck.discardPile.splice(0,1)){
      //score each card
      playerName.deck.scoreCard(playerName.deck.discardPile[j], playerName);
  }

  $('#console').append('<p>total score is '+playerName.totalScore+'.</p>');
}


//Card functions
//example
function tossTail(){
	//prompts user to keep or discard tail, then evalutes card as normal if kept
}



//
//UI FUNCTIONS
//

//UPDATE UI
function updateData(data, divID){
	//TODO 
	//this funciton is used by other functions to update ui to reflect latest data
}


//
//GAME SETUP START
//
//create card library deck
cardLibraryDeck = new Stack();
cardLibraryDeck.createStack(cardLibrary);
cardLibraryDeck.shuffle();

//create players
//TODO allow name input, allow multiple players
var playerName = new Player('playername');

//create player(s) starting hand(s) and shuffle
playerName.deck.createStack(starterDeck);
playerName.deck.shuffle();

//create card banks
//TODO base this on number of players

//16 mutation cards
var mutationDeck = new Stack();
mutationDeck.createStack(mutations);
cardMultiplier(mutationDeck, mutationDeck[0], 15);


//16 body cards
var basicDeck = new Stack();
basicDeck.createStack(basicBodies);
cardMultiplier(basicDeck, basicDeck[0], 15);


//16 small victory cards
var smallVictoryDeck = new Stack();
smallVictoryDeck.createStack(smallVictory);
cardMultiplier(smallVictoryDeck, smallVictoryDeck[0], 15);

//8 big victory cards
var bigVictoryDeck = new Stack();
bigVictoryDeck.createStack(bigVictory);
cardMultiplier(bigVictoryDeck, bigVictoryDeck[0], 7);

//upgrade & head cards
var upgradeDeck = new Stack();
upgradeDeck.createStack(upgrades);
upgradeDeck.shuffle();

var headDeck = new Stack();
headDeck.createStack(heads);
headDeck.shuffle();

//top card of each deck into buyable variable
var upgradeCard = upgradeDeck.deal();
$('#console').append('<p>upgrade card costs '+upgradeCard.cost.blue+' blue, '+upgradeCard.cost.red+' red, and '+upgradeCard.cost.green+' green.</p>');
var headCard = headDeck.deal();
$('#console').append('<p>head card costs '+headCard.cost.blue+' blue, '+headCard.cost.red+' red, and '+headCard.cost.green+' green.</p>');

//put 5 cards from library into hand (buyable)
for (i=0; i < 5; i++){
  var card = cardLibraryDeck.deal();

  $('#console').append('<p>Library adds '+card.cardTitle+' for '+card.cost+' power.</p>');
  cardLibraryDeck.addCard(card, 'hand');
}

//Player plays card and buys
playerTurn(playerName);
playerUpgrade(playerName);

//reset for next round
playerReset(playerName);
boardReset();

//test round 2
//Player plays card and buys
playerTurn(playerName);
playerUpgrade(playerName);

//reset for next round
playerReset(playerName);
boardReset();

//test round 3
//Player plays card and buys
playerTurn(playerName);
playerUpgrade(playerName);

//reset for next round
playerReset(playerName);
boardReset();

});


