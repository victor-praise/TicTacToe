const gameBoard = document.querySelector("#gameboard");

const infoDisplay = document.querySelector("#info");

let go = "circle";

const startCells = [
    "","","",
    "","","",
    "","",""
]

infoDisplay.textContent = "Circle goes first";

function creatBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("square");
        gameBoard.append(cellElement);
        cellElement.id = index;
        // cellElement.textContent = cell;
        cellElement.addEventListener("click", addGo);
        // gameBoard.append(cellElement);
    });
}

addGo = (e) => {
    const goDisplay = document.createElement("div");
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    go = go === "circle" ? "cross" : "circle";
    infoDisplay.textContent = "It is now " + go + "'s turn";
    e.target.removeEventListener("click", addGo);
    checkScore();
}
function checkScore() {
    const allSquares = document.querySelectorAll(".square");
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    winningCombos.forEach(combo => {
        const circleWins = combo.every(index => allSquares[index].firstChild?.classList.contains("circle"));
        const crossWins = combo.every(index => allSquares[index].firstChild?.classList.contains("cross"));

        if (circleWins) {
            infoDisplay.textContent = "Circle wins!";
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
        } else if (crossWins) {
            infoDisplay.textContent = "Cross wins!";
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
        }
        else if ([...allSquares].every(square => square.firstChild)) {
            infoDisplay.textContent = "It's a draw!";
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
        }
    });
}

creatBoard();