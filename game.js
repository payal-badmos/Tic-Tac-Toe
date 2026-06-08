let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGame = document.querySelector("#newGame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let playerturn = document.querySelector("#playerturn");
const strike = document.getElementById("strike");

let oScoreText = document.querySelector("#o-score");
let xScoreText = document.querySelector("#x-score");
let oScore = 0;
let xScore = 0;
let drawScore = 0;
let drawScoreText = document.querySelector("#draw-score");

let turnO = true;
let count = 0;
// const winPatterns = [
//   [0, 1, 2],
//   [0, 3, 6],
//   [0, 4, 8],
//   [1, 4, 7],
//   [2, 5, 8],
//   [2, 4, 6],
//   [3, 4, 5],
//   [6, 7, 8]
// ];
let resetScore = document.querySelector("#resetScore");
resetScore.addEventListener("click", () => {
  oScore = 0;
  xScore = 0;
  drawScore = 0;
  oScoreText.innerText = 0;
  xScoreText.innerText = 0;
  drawScore.innerText = 0;
});
const winPatterns = [
  { combo: [0, 1, 2], className: "strike-row-1" },
  { combo: [3, 4, 5], className: "strike-row-2" },
  { combo: [6, 7, 8], className: "strike-row-3" },
  { combo: [0, 3, 6], className: "strike-col-1" },
  { combo: [1, 4, 7], className: "strike-col-2" },
  { combo: [2, 5, 8], className: "strike-col-3" },
  { combo: [0, 4, 8], className: "strike-diag-1" },
  { combo: [2, 4, 6], className: "strike-diag-2" }
];
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
      playerturn.innerText = "Current Turn : Player X";
    } else {
      box.innerText = "X";
      turnO = true;
      playerturn.innerText = "Current Turn : Player O";

    }
    box.disabled = true;
    count++;
    let winner = checkwinner();
    if (count === 9 && !winner) {
      gamedraw();
    }
  });
});
const gamedraw = () => {
  drawScore++;
  drawScoreText.innerText = drawScore;

  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "#ffffff";
  }
};
// const showWinner = (winner) => {
//   msg.innerText = ` 🥳 Congratulations! , player ${winner} Wins!`;
//   msgContainer.classList.remove("hide");
//   disableBoxes();
// };
const showWinner = (winner) => {

  if (winner === "O") {
    oScore++;
    oScoreText.innerText = oScore;
  } else {
    xScore++;
    xScoreText.innerText = xScore;
  }

  msg.innerText = `🥳 Congratulations!  player ${winner} Wins!🥳`;

  msgContainer.classList.remove("hide");

  disableBoxes();
};

const checkwinner = () => {
  for (let pattern of winPatterns) {
    let position1val = boxes[pattern.combo[0]].innerText;
    let position2val = boxes[pattern.combo[1]].innerText;
    let position3val = boxes[pattern.combo[2]].innerText;
    if (position1val !== "" && position2val !== "" && position3val !== "") {

      if (position1val === position2val && position2val === position3val) {
        // Highlight winning boxes
        boxes[pattern.combo[0]].style.backgroundColor = "rgb(220, 107, 255)";
        boxes[pattern.combo[1]].style.backgroundColor = "rgb(220, 107, 255)";
        boxes[pattern.combo[2]].style.backgroundColor = "rgb(220, 107, 255)";
        strike.className = `strike-line ${pattern.className}`;
        setTimeout(() => {

          showWinner(position1val);
        }, 500);
        return true;
      }
    }
  }
};
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  strike.className = " strike-line";
};
newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);