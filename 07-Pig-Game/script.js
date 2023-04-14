"use strict";

const diceEle = document.querySelector(".dice");

// Current scores
const cur01Ele = document.querySelector("#current--0");
const cur02Ele = document.querySelector("#current--1");

// Players
const player0Ele = document.querySelector(".player--0");
const player1Ele = document.querySelector(".player--1");

// Buttons
const btnRoll = document.querySelector(".btn--roll");
const btnDice = document.querySelector(".btn--dice");
const btnHold = document.querySelector(".btn--hold");

// Reset all scores
const resetScores = () => {
    document.querySelectorAll(".score").forEach((score) => {
        score.textContent = 0;
    });

    document.querySelectorAll(".current-score").forEach((score) => {
        score.textContent = 0;
    });

    // document.querySelector(".dice").classList.add("hidden");
    modifyEleClass(diceEle, "hidden", "add");

    modifyEleClass(player0Ele, "player--winner", "remove");
    modifyEleClass(player1Ele, "player--winner", "remove");
    modifyEleClass(player0Ele, "player--active", "add");

    // Reset all the variables
    playing = true;
    score = [0, 0];
    curScore = 0;
    curActivePlayer = 0;
};

// Switch the active class attribute
const swtichActiveStyle = () => {
    modifySelectedClass(
        `.player--${curActivePlayer}`,
        "player--active",
        "remove"
    );
    curActivePlayer = (curActivePlayer + 1) % 2;
    modifySelectedClass(`.player--${curActivePlayer}`, "player--active", "add");
};

// Set specified element text content
const setTextContent = (selector, content) => {
    document.querySelector(selector).textContent = content;
};

// Copy the current score from the current score into the total score
const holdScore = () => {
    score[curActivePlayer] += curScore;
    setTextContent(`#score--${curActivePlayer}`, score[curActivePlayer]);
};

// Set the winer
const setWinner = () => {
    modifySelectedClass(`.player--${curActivePlayer}`, "player--winner", "add");
    modifySelectedClass(
        `.player--${curActivePlayer}`,
        "player--active",
        "remove"
    );
};

// Modify class list in specified element
const modifyEleClass = (element, classStr, instruction) => {
    if (instruction === "add") {
        element.classList.add(classStr);
    } else {
        element.classList.remove(classStr);
    }
};

// Modify class list via selector
const modifySelectedClass = (selector, classStr, instruction) => {
    const curEle = document.querySelector(selector);
    modifyEleClass(curEle, classStr, instruction);
};

// Initialize game
let curScore;
let curActivePlayer;
let score;
let playing;
resetScores();

// Reset game
document.querySelector(".btn--new").addEventListener("click", resetScores);

// Rolling
btnRoll.addEventListener("click", () => {
    if (playing) {
        const curNum = Math.trunc(Math.random() * 6) + 1;

        modifyEleClass(diceEle, "hidden", "remove");
        diceEle.src = `dice-${curNum}.png`;

        // Rolling number equals one, switch the active player
        if (curNum === 1) {
            curScore = 0;
            setTextContent(`#current--${curActivePlayer}`, curScore);

            // Switch the sytle
            swtichActiveStyle();
        } else {
            curScore += curNum;
            setTextContent(`#current--${curActivePlayer}`, curScore);
        }
    }
});

// Hold the current score
btnHold.addEventListener("click", () => {
    if (playing) {
        // Set the current score into the score--activePlayerNum
        holdScore();
        if (score[curActivePlayer] >= 20) {
            playing = false;
            setWinner();
        } else {
            // Reset the current score
            curScore = 0;
            setTextContent(`#current--${curActivePlayer}`, curScore);

            // Switch player
            swtichActiveStyle();
        }
    }
});
