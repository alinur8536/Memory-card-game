// 4 pairs (8 cards) + 1 extra card = 9 total
const emojis = ["🍕","🍔","🍟","🍩"];
let cards = [...emojis, ...emojis, "⭐"].sort(() => Math.random() - 0.5);

let flipped = [];
let matched = [];
let moves = 0;

const board = document.getElementById("gameBoard");
const status = document.getElementById("status");
const winMsg = document.getElementById("winMsg");

// create 3x3 board
cards.forEach(emoji => {
  let card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="inner-card">
      <div class="front">?</div>
      <div class="back">${emoji}</div>
    </div>`;
  card.dataset.emoji = emoji;
  card.onclick = () => flip(card);
  board.appendChild(card);
});

function flip(card){
  if(flipped.length < 2 && !card.classList.contains("flipped") && !matched.includes(card)){
    card.classList.add("flipped");
    flipped.push(card);

    if(flipped.length === 2){
      moves++;
      status.innerText = `Moves: ${moves}`;
      setTimeout(check, 800);
    }
  }
}

function check(){
  if(flipped[0].dataset.emoji === flipped[1].dataset.emoji){
    matched.push(...flipped);
  } else {
    flipped.forEach(c => c.classList.remove("flipped"));
  }
  flipped = [];

  // total pairs = 4 only
  if(matched.length === 8){
    winMsg.innerText = `🎉 You Win in ${moves} moves!`;
  }
}
