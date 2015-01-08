$(document).ready(function(){
  
//var playerName;
window.noTail = '';
//var topUpgrade;
//var topHead;


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
	['starterBody',0,4,1, 'red', 'body', null, '+1 power'],
	['starterBody',0,4,1, 'blue', 'body', null,'+1 power'],
	['starterBody',0,4,1, 'blue', 'body', null,'+1 power'],
	['starterTail',0,2,2, 'blue', 'tail', null,'+2 power'],
	['starterTail',0,2,2, 'blue', 'tail', null,'+2 power']
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
      //if no color cards were played
    	 if(!result[colors[i]]){
          //set to zero
        	result[colors[i]] = 0;
    	 }
      //increment matching color counter
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
    return result; //has properties 'blue','red', and 'green'
  }
}

function Card(cardID, cardTitle, cost, points, power, color, cardType, cardFunction, cardText) {
	this.cardID = cardID;
  this.cardTitle = cardTitle;
	this.cost = cost;
	this.points = points;
	this.power = power;
	this.cardType = cardType;
	this.cardText = cardText;
	this.cardColor = color;
	this.cardFunction = cardFunction;
	this.createNode = function(card){
    //node variables
	  var cardNode, frontNode, topNode, bottomNode, costNode, artNode, titleNode, typeNode, textNode, colorNode, pointNode;
    var costStr, titleStr, typeStr, textStr, colorStr, pointStr;
    var tempNode;

    //This is the main node, a DIV tag.
    cardNode = document.createElement("DIV");
    cardNode.className = "card";
    cardNode.id = card.cardID;     //IMPORTANT create ID based on cardID

    //
    //Build the front of card.
    //
    frontNode = document.createElement("DIV");
    frontNode.className = "cardFront";

    //
    //Build top of card
    //
    topNode = document.createElement("DIV");
    topNode.className = "cardTop";
    //Build cost node
    costNode = document.createElement("DIV");
    costNode.className ="cardCost";
    costStr = document.createTextNode(card.cost);
    costNode.appendChild(costStr);
    topNode.appendChild(costNode);

    //Add top of card to front of card
    frontNode.appendChild(topNode);

    //
    //Build Art
    //
    //TODO add image variable to card model
    artNode = document.createElement("DIV");
    artNode.className = "cardArt";

    frontNode.appendChild(artNode);

    //
    //Build Bottom of Card
    //
    bottomNode = document.createElement("DIV");
    bottomNode.className = "cardBody";

    //text area has card title, type, text, and points / color
    //Build title node
    titleNode = document.createElement("SPAN");
    titleNode.className ="cardsTitle";
    titleStr = document.createTextNode(card.cardTitle);
    titleNode.appendChild(titleStr);    

    //Build type node
    typeNode = document.createElement("SPAN");
    typeNode.className ="cardsType";
    typeStr = document.createTextNode(card.cardType);
    typeNode.appendChild(typeStr);

    //Build text node
    textNode = document.createElement("DIV");
    textNode.className ="cardsText";
    textStr = document.createTextNode(card.cardText);
    textNode.appendChild(textStr);

    //append title, type, and text to card bottom
    bottomNode.appendChild(titleNode);
    bottomNode.appendChild(typeNode);
    bottomNode.appendChild(textNode);

    //Add Text area to front of card
    frontNode.appendChild(bottomNode);

    //Check for color & append if found
    if (this.cardColor != null){
      //Build color Node
      colorNode = document.createElement("DIV");
      colorNode.className ="cardsColor";
      colorStr = document.createTextNode(card.cardColor);
      colorNode.appendChild(colorStr);
      frontNode.appendChild(colorNode);
    }

    //Check for points & append if found
    if (this.points != null){
      //Build point Node
      pointNode = document.createElement("DIV");
      pointNode.className ="cardsPoints";
      pointStr = document.createTextNode(card.points);
      pointNode.appendChild(pointStr);
      frontNode.appendChild(pointNode);
    }

    //Add front node to the card node.
    cardNode.appendChild(frontNode);

    //TODO backside of card

    // Return the card node.
    return cardNode;
  }
}

function Stack(){
  //TODO implement tools to help troubleshoot stacks
  this.deckSize; //total of cards between all decks except heads/ upgrades
  this.deckReport = function(deck){
    //total # of cards in deck and titles of each card
    //$("#console").append("<p>"+card.cardTitle+" bought for "+card.cost+".</p>");
  }

	this.cards;
	this.hand = [];
	this.discardPile = [];
	this.played = [];
	this.upgrades = [];
	this.heads = [];
	this.createStack = function(cardArray){
		var cards = [];
		for (var i=0; i < cardArray.length; i++){
      //TODO - look for number of arguments in card object automatically - right now update next line whenever an argument is added
			card = new Card(cardIDENTIFIER, cardArray[i][0], cardArray[i][1], cardArray[i][2], cardArray[i][3], cardArray[i][4], cardArray[i][5],cardArray[i][6],cardArray[i][7],cardArray[i][8]);
			cards.push(card);
      //increment ID 
      cardIDENTIFIER++;
		}
	this.cards = cards;
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
  //TO DO RIGHT HERE

  this.buyCard = function(cardID, player){
    //iterate through library hand array backwards
    for(i=this.hand.length-1; i>=0; i--) {
      //find match
      if(this.hand[i].cardID == cardID){
        //if player can afford the card clicked
        if (this.hand[i].cost <= player.totalPower){
          //store card in local variable
          var card = this.hand[i];
          //subtract cost of card from player power & update UI
          player.totalPower -= card.cost;
          $('#power').html(player.totalPower);

          //remove card from array
          this.hand.splice(i,1);
          //remove card from UI
          $('#'+cardID+'.card').remove();
          //log card title and cost to console
          $("#console").append("<p>"+card.cardTitle+" bought for "+card.cost+". You have "+player.totalPower+" power left.</p>");
          //return
          return card;
        } else {
          $("#console").append("<p>You don't have enough power to do that.</p>");
        }
      } 
    }
  }
	//adds card to player's played array and tallies beastSize / color
	this.playCard = function(card, player){
		//play card
		this.played.push(card);

		//score card power 
		player.totalPower += card.power;
    //update UI
    $('#power').html(player.totalPower);

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

		//TODO remove logs
		//$('#console').append('<p>Played '+card.cardTitle+" with power: "+card.power+"and color: "+card.cardColor+".</p>");
	}
	//score cards
	this.scoreCard = function(card, player){
		player.totalScore += card.points;
		$('#console').append('<p>added '+card.points+' to total, new score '+player.totalScore+' </p>');
	}
}


//Multiply cards in deck
function cardMultiplier(stack, card, num){
	for (i=0; i < num; i++){
		stack.addCard(card);
	}
}


//
//GamePlay functions
//
//PLAYER TURN
function playerTurn(playerName){
//set current player
//var currentPlayer = playerName;

//PLAY CARDS
//while no tails are played, play cards
do {
  //if player has cards left in deck
  if (playerName.deck.cards.length > 0){
    //get a card
    var card = playerName.deck.deal();
    //deal from player cards(deck) to player's game board
    playerName.deck.playCard(card, playerName);
    //show card in UI
    $('#playerPlayed').append(card.createNode(card));
  //if player's deck is empty
  } else {
    //put discard into cards and then shuffle
    playerName.deck.cards = playerName.deck.discardPile.splice(0,playerName.deck.discardPile.length);
    playerName.deck.shuffle();
    $('#console').append('<p>Shuffling...</p>');
    //and then deal
    playerName.deck.playCard(playerName.deck.deal(), playerName);
  }
} while (window.noTail != 'tail');

//BUY CARDS
//check if player can buy
if (playerName.totalPower >= 2 ){
  //if so, prompt player to click cards & highlight
  $('#console').append('<p>Click the card(s) you want to buy.</p>');
  $('#libraryBuyable .card').addClass('highlight');

  //assign click event to library cards
  $('#libraryBuyable').on('click','.card', function(){
        //get card ID
        var cardID = this.id;
        //buy card from library and place in player discard
        playerName.deck.addCard(cardLibraryDeck.buyCard(cardID, playerName), 'discardPile');     
        //check player power and move to upgrade
        if (playerName.totalPower < 2){
            //if player can't buy then move to upgrade round
            playerUpgrade(playerName);
        }
    });
} else {
  //if player can't buy then move to upgrade round
  playerUpgrade(playerName);
}

//end player turn function
};



//UPGRADE - click events
//TODO these work directly on current player instead of passing a playerName like others - best way?
function buyUpgrade(){
  //add card to players upgrades
  currentPlayer.deck.addCard(upgradeCard, 'upgrades');

  //remove card in UI & add to players UI
  $('#upgradeHere .card').remove();
  $('#playedUpgrades').append(card.createNode(upgradeCard));

  //turn off click events & remove highlight
  $('#headHere, #upgradeHere').off();
  $('#headHere .card, #upgradeHere .card').removeClass('highlight');

  //flip next card in upgrade stack
  upgradeCard = upgradeDeck.deal();
  $('#upgradeHere').append(upgradeCard.createNode(upgradeCard));
}

function buyHead(){
  //add card to players heads
  currentPlayer.deck.addCard(headCard, 'heads');

  //remove card in UI & add to players UI (remove old Head from UI first)
  $('#headHere .card').remove();
  $('#playedHeads .card').remove();
  $('#playedHeads').append(card.createNode(headCard));

  //turn off click events & remove highlight
  $('#headHere, #upgradeHere').off();
  $('#headHere .card, #upgradeHere .card').removeClass('highlight');

  //flip next card in head stack
  headCard = headDeck.deal();
  $('#headHere').append(headCard.createNode(headCard));
}

//test - give player 4 of each color


//UPGRADE - MAIN FUNCTION
function playerUpgrade(playerName){
//First, turn off click event on libraryBuyable cards from previous buy action
$('#libraryBuyable').off();
$('#libraryBuyable .card').removeClass('highlight');

//set player - removed for global
//var currentPlayer = playerName;

//tally colors into an object
var currentColors = currentPlayer.scoreTurn();

//vars to check if upgrade and head cards can be bought, start false
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

//if you can afford both, choose a card
if(upgradeBuyable == true && headBuyable == true){

  //both cards become clickable & highlight
  $('#headHere .card').addClass('highlight');
  $('#headHere').on('click','.card', buyHead);
  $('#upgradeHere .card').addClass('highlight');
  $('#upgradeHere').on('click','.card', buyUpgrade);

  //TODO done button becomes available to end upgrade round

  //var choice = prompt('You can evolve! Type "1" to get the upgrade card '+upgradeCard.cardTitle+' or "2" to get the head card '+headCard.cardTitle);
  //if(choice == 1){
    //$('#console').append('<p>You bought '+upgradeCard.cardTitle+'</p>');
    //currentPlayer.deck.addCard(upgradeCard, 'upgrades');
    //return;
  //} else if(choice == 2){
    //$('#console').append('<p>You bought '+headCard.cardTitle+'</p>')
    //currentPlayer.deck.addCard(headCard, 'heads');
    //return;
  //}else{
    //$('#console').append('<p>What are you ... I dont even ...</p>')
  //}
} else {
  //If only head is buyable
  if(headBuyable == true){
    //head card clickable & highlight
    $('#headHere .card').addClass('highlight');
    $('#headHere').on('click','.card', buyHead);

    //$('#console').append('<p>You bought '+headCard.cardTitle+'</p>');
    return;
  }
  //if only upgrade is buyable
  if(upgradeBuyable == true){
    //upgrade card clickable and highlight
    $('#upgradeHere .card').addClass('highlight');
    $('#upgradeHere').on('click','.card', buyUpgrade);

    //$('#console').append('<p>You bought '+upgradeCard.cardTitle+'</p>');
    return;
  }
  //nothing buyable
  $('#console').append('<p>nothing to evolve this round.</p>');
}
//TODO trigger next stage
//end of upgrade function
}

//RESET PLAYER / turn end function
function playerReset(playerName){

//TODO get rid of this local variable we have global now
//var currentPlayer = playerName;

//all cards in currentPlayer.played go to discards
for(i = playerName.deck.played.length; i > 0; i--){
  var card = playerName.deck.deal('played');
  $('#playerPlayed #'+card.cardTitle).remove();
  playerName.deck.addCard(card, 'discardPile');
}
$('#console').append('<p>Discard pile now contains '+playerName.deck.discardPile.length+' cards</p>');

//reset player stats
playerName.beastSize = 0;
playerName.totalColor = [];
playerName.totalPower = 0;
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
        //create card in UI
        $('#libraryBuyable #'+i).append(card.createNode(card));
        //console
      	$('#console').append('<p>Library adds '+card.cardTitle+' for '+card.cost+' power.</p>');
      		cardLibraryDeck.addCard(card, 'hand');
  			}
		}
  //show button to start next turn
  $('#playerTurnBtn').show();
}


//GAME END
function scoreGame(){

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

//PLAYER TURN BUTTON
$('#playerTurnBtn').on('click', function(){
  //hide button
  $(this).hide();

  //TODO trigger playerTurn function
  //here
});



//
//GAME SETUP
//LETS DO THIS
//START
//

//Set counter variable for unique card IDs to 3 digits
var cardIDENTIFIER = 001;

//create card library deck
cardLibraryDeck = new Stack();
cardLibraryDeck.createStack(cardLibrary);
cardLibraryDeck.shuffle();

//create player named 'playername'
//TODO allow name input, allow multiple players
var firstPlayer = new Player('playername');
//create player starting deck(s) and shuffle
firstPlayer.deck.createStack(starterDeck);
firstPlayer.deck.shuffle();
//var secondPlayer = new Player('playername');

//create global currentplayer variable & set it to the first player
var currentPlayer = firstPlayer;

//create card banks
//TODO base this on number of players
//16 mutation cards
var mutationDeck = new Stack();
mutationDeck.createStack(mutations);
cardMultiplier(mutationDeck, mutationDeck[0], 15);
//show card in UI
$('#mutationsHere').append(mutationDeck.cards[0].createNode(mutationDeck.cards[0]));

//16 body cards
var basicDeck = new Stack();
basicDeck.createStack(basicBodies);
cardMultiplier(basicDeck, basicDeck[0], 15);
$('#basicBodiesHere').append(basicDeck.cards[0].createNode(basicDeck.cards[0]));

//16 small victory cards
var smallVictoryDeck = new Stack();
smallVictoryDeck.createStack(smallVictory);
cardMultiplier(smallVictoryDeck, smallVictoryDeck[0], 15);
$('#smallVictoryHere').append(smallVictoryDeck.cards[0].createNode(smallVictoryDeck.cards[0]));

//8 big victory cards
var bigVictoryDeck = new Stack();
bigVictoryDeck.createStack(bigVictory);
cardMultiplier(bigVictoryDeck, bigVictoryDeck[0], 7);
$('#bigVictoryHere').append(bigVictoryDeck.cards[0].createNode(bigVictoryDeck.cards[0]));

//upgrade & head cards
var upgradeDeck = new Stack();
upgradeDeck.createStack(upgrades);
upgradeDeck.shuffle();

var headDeck = new Stack();
headDeck.createStack(heads);
headDeck.shuffle();

//'flip' the top cards of upgrade and head decks (remove them from array and store in variable)
var upgradeCard = upgradeDeck.deal();
$('#upgradeHere').append(upgradeCard.createNode(upgradeCard));
var headCard = headDeck.deal();
$('#headHere').append(headCard.createNode(headCard));

//put 5 cards from library into buyable area (library's 'hand')
for (i=0; i < 5; i++){
  //get card from library deck
  var card = cardLibraryDeck.deal();

  //put card in deck
  cardLibraryDeck.addCard(card, 'hand');

  //create card in UI and announce
  $('#libraryBuyable').append(card.createNode(card));
  $('#console').append('<p>Library adds '+card.cardTitle+' for '+card.cost+' power.</p>');
}

//Player plays cards until a tail, buys, then triggers upgrade function
playerTurn(currentPlayer);

//TODO re-integrate these functions into program flow
//reset for next round
//playerReset(playerName);
//boardReset();

});


