"use strict";

let targetNumber = generateRandomNumber();
let highScore = 0;

// Build click event to the bnt check button
document.querySelector(".check").addEventListener("click", () => {
    const guess = Number(document.querySelector(".guess").value);
    let score = Number(document.querySelector(".score").textContent);

    if (!guess) {
        modifyMessage("⛔ No number!");
    }

    // Match the target number
    if (guess === targetNumber) {
        modifyMessage("You won the game!");
        modifyNumber(targetNumber);

        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector(".number").style.width = "30rem";
        modifyHighScore(score);
    } else if (guess !== targetNumber) {
        if (score <= 0) {
            modifyMessage("You lost the game!");
        } else {
            guess > targetNumber
                ? modifyMessage("Too high!")
                : modifyMessage("Too low!");
            modifyScore(score - 1);
        }
    }
});

// Reset game
document.querySelector(".again").addEventListener("click", () => {
    modifyMessage("Start guessing...");
    modifyScore(20);
    modifyNumber("?");
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "15rem";

    targetNumber = generateRandomNumber();
});

// Modify message
const modifyMessage = (newMessage) => {
    document.querySelector(".message").textContent = newMessage;
};

// Modify number
const modifyNumber = (newNumber) => {
    document.querySelector(".number").textContent = newNumber;
};

// Modify score
const modifyScore = (score) => {
    document.querySelector(".score").textContent = score;
};

// Modify high score
const modifyHighScore = (score) => {
    if (score > highScore) {
        highScore = score;
        document.querySelector(".highscore").textContent = highScore;
    }
};

// Generate random number between 1 and 20
const generateRandomNumber = () => {
    return Math.trunc(Math.random() * 20) + 1;
};
