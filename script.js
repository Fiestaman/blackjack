// initialize player and dealer objects
let p = {
  balance: 100,
  bet: 1,
  maxBal: 100,
  hand: [],
  pS: 0,
};
let d = {
  hand: [],
  dS: 0,
};

// random card picker
function pickCard() {
  return Math.floor(Math.random() * 13) + 1;
}

// deal hand function
function dealHand() {
  for (i = 1; i <= 2; i++) {
    p.hand.push(pickCard());
    d.hand.push(pickCard());
  }
}

// compare hand values to determine winner
function scoreHand() {
  if (d.dS > 21) {
    console.log(`Dealer busted. You win.`);
  } else if (d.dS > p.pS) {
    console.log(`Dealer had ${d.dS} while you had ${p.pS}. You lose.`);
  } else if (p.pS > d.dS) {
    console.log(`You had ${p.pS} while dealer had ${d.dS}. You win!`);
  } else if (p.pS == d.dS) {
    console.log(`You push with the dealer. Bet refunded.`);
  }
}

// deal a card function
function dealCard(player) {
  player.hand.push(pickCard());
}

// increase bet function
function increase(amt = 1) {
  if (bet + amt > balance) {
    `You do not have enough funds to bet that much.`;
  }
  bet += amt;
}

// decrease bet function
function decrease(amt = 1) {
  if (bet + amt > balance) {
    `You do not have enough funds to bet that much.`;
  }
  bet -= amt;
}

// reset balance function
function reset() {
  p.balance = 100;
}

// losing parameter
if (p.balance <= 0) {
  console.log(`You're bankrupt. Your highest balance was: ${maxBal}`);
}

// player hit function
function hit() {
  dealCard(p);
}

// play round function
function playRound() {
  p.pS = 0;
  d.dS = 0;
  dealHand();
  for (let i = 0; i < p.hand.length; i++) {
    p.pS += p.hand[i] > 10 ? 10 : p.hand[i];
  }
  for (let i = 0; i < d.hand.length; i++) {
    d.dS += d.hand[i] > 10 ? 10 : d.hand[i];
  }
  // if clicked element is hit
  // hit()
  // else if clicked element is stand
  while (d.dS < 17) {
    dealCard(d);
    d.dS += d.hand[d.hand.length - 1];
  }

  scoreHand();
  console.log(p.hand, d.hand);
}

playRound();
