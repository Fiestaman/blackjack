// initialize player and dealer objects
let p = {
  name: "p",
  nick: "player",
  balance: 100,
  bet: 1,
  maxBal: 100,
  hand: [],
  splitHand: [],
  hS: 0,
  sHS: 0,
  handBet: 1,
  splitHB: 1,
};
let d = {
  name: "d",
  nick: "dealer",
  hand: [],
  hS: 0,
};
let highScore = 100;
let inRound = false;

// random card picker
function pickCard() {
  return Math.floor(Math.random() * 13) + 1;
}

// deal hand function
function dealHand() {
  dealCard(p);
  dealCard(d);
  dealCard(p);
}

// compare hand values to determine winner
function scoreHand() {
  // if (p.hS > 21) {
  //   console.log(`You busted. You lose.`);
  // } else
  if (d.hS > 21) {
    console.log(`Dealer busted. You win.`);
    p.balance = +p.balance + p.handBet * 2;
    balUp();
  } else if (d.hS > p.hS) {
    console.log(`Dealer had ${d.hS} while you had ${p.hS}. You lose.`);
  } else if (p.hS > d.hS) {
    console.log(`You had ${p.hS} while dealer had ${d.hS}. You win!`);
    p.balance = +p.balance + p.handBet * 4;
    balUp();
  } else if (p.hS == d.hS) {
    console.log(`You push with the dealer. Bet refunded.`);
    p.balance = +p.balance + p.handBet;
    balUp();
  }
  inRound = false;
  if (p.balance > highScore) {
    highScore = p.balance;
    scoreUp();
  }
  // losing parameter
  checkLoss();
  return;
}

// deal a card function
function dealCard(player) {
  player.hand.push(pickCard());
  player.hS +=
    player.hand[player.hand.length - 1] > 10
      ? 10
      : player.hand[player.hand.length - 1] == 1 && player.hS <= 10
      ? 11
      : player.hand[player.hand.length - 1];
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.setAttribute("id", `${player.name}Card${player.hand.length - 1}`);
  newCard.style.backgroundImage = displayCard(
    player.hand[player.hand.length - 1]
  );
  document.querySelector(`#${player.nick}Cards`).appendChild(newCard);
}

// reset balance function
function reset() {
  p.balance = 100;
  document.querySelector("#balance").innerHTML = 100;
}

// player hit function
function hit() {
  if (inRound) {
    if (p.hS > 21) {
      console.log(`You've already busted. Click stand to continue.`);
    } else {
      dealCard(p);
    }
    if (p.hS > 21) {
      console.log(`You busted.`);
      inRound = false;
      return;
    }
  }
}

// stand function
function stand() {
  if (inRound) {
    let child = document.querySelector("#dCard0");
    console.log(child);
    document.querySelector("#dealerCards").removeChild(child);
    dealerDeal();
    scoreHand();
  }
}

// split function
function split() {
  p.splitHand = [];
  p.sHS = 0;
  p.splitHand.push(p.hand.pop());
  p.splitHB = p.handBet;
}

// double down function
function double() {
  if (p.hand.length == 2) {
    p.bet *= 2;
    dealCard(p);
    stand();
  } else {
    console.log(`You can only double down after initial deal.`);
  }
}

// dealer deal own hand function
function dealerDeal() {
  while (d.hS < 17) {
    dealCard(d);
  }
}

// check loss function
function checkLoss() {
  if (p.balance <= 0) {
    console.log(`You're bankrupt. Your max balance was: ${p.maxBal}`);
    inRound = false;
    return true;
  }
}

// update GUI functions

// update balance function
function balUp() {
  document.querySelector("#balance").innerHTML = p.balance;
}

// update score function
function scoreUp() {
  document.querySelector("#highScore").innerHTML = highScore;
}

// update current bet function
function betUp() {
  document.querySelector("#currentBet").innerHTML = p.bet;
}

// change innerHTML to display correct card
function displayCard(card) {
  if (card == 13) {
    return "url(images/PLAYING_CARD_KING_OF_SPADES.svg)";
  } else if (card == 12) {
    return "url(images/PLAYING_CARD_QUEEN_OF_SPADES.svg)";
  } else if (card == 11) {
    return "url(images/PLAYING_CARD_JACK_OF_SPADES.svg)";
  } else if (card == 10) {
    return "url(images/PLAYING_CARD_TEN_OF_SPADES.svg)";
  } else if (card == 9) {
    return "url(images/PLAYING_CARD_NINE_OF_SPADES.svg)";
  } else if (card == 8) {
    return "url(images/PLAYING_CARD_EIGHT_OF_SPADES.svg)";
  } else if (card == 7) {
    return "url(images/PLAYING_CARD_SEVEN_OF_SPADES.svg)";
  } else if (card == 6) {
    return "url(images/PLAYING_CARD_SIX_OF_SPADES.svg)";
  } else if (card == 5) {
    return "url(images/PLAYING_CARD_FIVE_OF_SPADES.svg)";
  } else if (card == 4) {
    return "url(images/PLAYING_CARD_FOUR_OF_SPADES.svg)";
  } else if (card == 3) {
    return "url(images/PLAYING_CARD_THREE_OF_SPADES.svg)";
  } else if (card == 2) {
    return "url(images/PLAYING_CARD_TWO_OF_SPADES.svg)";
  } else if (card == 1) {
    return "url(images/PLAYING_CARD_ACE_OF_SPADES.svg)";
  }
}

// play round function
function playRound() {
  inRound = true;
  if (checkLoss()) return;
  p.hS = 0;
  d.hS = 0;
  p.handBet = p.bet;
  p.balance -= p.handBet;
  balUp();
  p.hand = [];
  d.hand = [];
  document.querySelector("#playerCards").innerHTML = "";
  document.querySelector("#dealerCards").innerHTML =
    '<div class="card" id="dCard0"></div>';
  dealHand();
  console.log(p.hand, d.hand);
}

// event handlers
document.querySelector("#set").addEventListener("click", function () {
  if (!inRound && document.querySelector("#betAmt").value <= p.balance) {
    p.bet = +document.querySelector("#betAmt").value;
    betUp();
    // console.log(p.bet, p.handBet);
  } else if (document.querySelector("#betAmt").value > p.balance) {
    console.log(`You do not have enough funds to bet that amount.`);
  }
});

document.querySelector("#deal").addEventListener("click", function () {
  if (!inRound) {
    p.handBet = p.bet;
    playRound();
  }
});

document.querySelector("#hit").addEventListener("click", hit);

document.querySelector("#stand").addEventListener("click", stand);

document.querySelector("#double").addEventListener("click", double);

document.querySelector("#reset").addEventListener("click", reset);

// playRound();
