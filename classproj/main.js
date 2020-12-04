'use strict'
// EVENT HANDLERS
var deal = document.getElementById('dealBtn')
var hit = document.getElementById('hitBtn')
var stand = document.getElementById('standBtn')
var reset = document.getElementById('resetBtn')
deal.addEventListener('click', playGame)
hit.addEventListener('click', goToHitMethod)
stand.addEventListener('click', userStands)
reset.addEventListener('click', resetGame)
var playerSum = document.getElementById('playersum')
var dealerSum = document.getElementById('dealersum')
var writeResult = document.getElementById('resultbox')
var playerCards = document.getElementById('playercards')
var dealerCards = document.getElementById('dealercards')
var noOfCardsPlayer = 0,
  noOfCardsDealer = 0,
  noOfWins = 0

// PROPERTIES OF DECK
function CardObject(cardNum, cardSuit) {
  this.cardNum = cardNum
  this.cardSuit = cardSuit
}
CardObject.prototype.getCardValue = function() {
  if (this.cardNum === 'J' || this.cardNum === 'Q' || this.cardNum === 'K') {
    return 10
  } else if (this.cardNum === 'A') {
    return 11
  } else {
    return this.cardNum
  }
}

// CONSTRUCTOR
function DeckObject() {
  this.iniDeck = []
  this.displayCards = function(cards) { 
   
    for (var i = 0; i < cards.length; i++) {
      var imgElement = document.createElement('img')
      imgElement.src = 'PNG/' + cards[i].cardNum + '' + cards[i].cardSuit + '.png'
      imgElement.style.height = '175px'
      imgElement.style.width = '120px'
        
      if (this === mainPlayer) {
        noOfCardsPlayer++
        playerCards.appendChild(imgElement)
      } else {
        noOfCardsDealer++
        dealerCards.appendChild(imgElement)
      }
    }
  }
  this.sumCards = function(cards) { // TALLIES VALUE OF CARDS
    var sum = 0,
      aces = 0
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].getCardValue() === 11) { // IF SCORE >21 CHECK FOR ACE, AND LOWER BY 10
        aces += 1
        sum = sum + cards[i].getCardValue()
      } else {
        sum = sum + cards[i].getCardValue()
      }
    }
    while (aces > 0 && sum > 21) {
      aces -= 1
      sum -= 10
    }
    return sum
  }
  this.hitCard = function(cards) {
    var soloCard = [] 
    var extraCard = cards.push(PlayingDeck.iniDeck.pop())
    soloCard.push(cards[extraCard - 1]) 
    this.displayCards(soloCard)
    if (this === mainPlayer) {
      checkIfBust()
    }
  }
}

//building our deck
var PlayingDeck = new DeckObject();
(function fillPlayingDeck() { // Filling the main deck with card objects
  var listCardNum = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']
  var listCardSuits = ['C', 'D', 'H', 'S']
  for (var i = 0; i < listCardNum.length; i++) {
    for (var j = 0; j < listCardSuits.length; j++) {
      PlayingDeck.iniDeck.push(new CardObject(listCardNum[i], listCardSuits[j])) // GIVES US 52 CARDS
    }
  }
  var len = PlayingDeck.iniDeck.length,
    randomNum, tempValue
	//this will shuffle the deck
  while (len) {
    randomNum = Math.floor(Math.random() * len--)
    tempValue = PlayingDeck.iniDeck[len]
    PlayingDeck.iniDeck[len] = PlayingDeck.iniDeck[randomNum]
    PlayingDeck.iniDeck[randomNum] = tempValue
  }
}())

//the dealer and the player
var mainPlayer = new DeckObject()

function player() {
  mainPlayer.iniDeck.push(PlayingDeck.iniDeck.pop(), PlayingDeck.iniDeck.pop())
  mainPlayer.displayCards(mainPlayer.iniDeck)
  playerSum.value = mainPlayer.sumCards(mainPlayer.iniDeck)
}

var mainDealer = new DeckObject()

function dealer() {
  mainDealer.iniDeck.push(PlayingDeck.iniDeck.pop(), PlayingDeck.iniDeck.pop())
  mainDealer.displayCards(mainDealer.iniDeck)
  dealerSum.value = mainDealer.sumCards(mainDealer.iniDeck)
}

// determines whether the player has busted
function checkIfBust() {
  var playerScore = mainPlayer.sumCards(mainPlayer.iniDeck)
  var dealerScore = mainDealer.sumCards(mainDealer.iniDeck)
  playerSum.value = playerScore
  dealerSum.value = dealerScore
  if (playerScore > 21) {
    writeResult.value = 'LOSER!!'
    disableHitStand()
  } else if (playerScore === 21) {
    writeResult.value = 'It\'s 21. You win !!'
    disableHitStand()
  }
}

// IF USER HITS
function goToHitMethod() {
  mainPlayer.hitCard(mainPlayer.iniDeck)
}

// IF USER STANDS
function userStands() {
  var playerScore = mainPlayer.sumCards(mainPlayer.iniDeck)
  var dealerScore = mainDealer.sumCards(mainDealer.iniDeck)
  playerSum.value = playerScore
  while (dealerScore < 17) {
    mainDealer.hitCard(mainDealer.iniDeck)
    dealerScore = mainDealer.sumCards(mainDealer.iniDeck)
    dealerSum.value = dealerScore
  }
  if (dealerScore > playerScore && dealerScore <= 21) {
    writeResult.value = 'Dealer won with ' + dealerScore
    disableHitStand()
  } else if (playerScore > dealerScore || dealerScore > 21) {
    if (playerScore === 21) {
      writeResult.value = 'You won with BLACKJACK !'
      disableHitStand()
    } else {
      writeResult.value = 'You won with ' + playerScore
      disableHitStand()
    }
  } else {
    writeResult.value = 'Both tied with ' + playerScore
    disableHitStand()
  }
}

// WHEN GAME IS OVER, DISABLE THE HIT AND STAND BUTTONS
function disableHitStand() {
  stand.disabled = true
  hit.disabled = true
}

// DEAL ENABLED
function playGame() {
  player()
  dealer()
  deal.disabled = true
  stand.disabled = false
  hit.disabled = false
}

// RESET THE GAME
function resetGame() {
  writeResult.value = ''
  dealerSum.value = ''
  playerSum.value = ''
  deal.disabled = false;
  (function removeImages() {
    var playerCardImages = playerCards.childNodes
    var dealerCardImages = dealerCards.childNodes
    for (var i = noOfCardsPlayer; i > 0; i--) {
      playerCardImages[i].parentNode.removeChild(playerCardImages[i])
    }
    for (var j = noOfCardsDealer; j > 0; j--) {
      dealerCardImages[j].parentNode.removeChild(dealerCardImages[j])
    }
  }())
  mainPlayer.iniDeck = []
  mainDealer.iniDeck = []
  noOfCardsDealer = 0
  noOfCardsPlayer = 0
}