import { words } from './words.js';

// Artık words dizisini kullanabilirsin
let SECRET_WORD = words[Math.floor(Math.random() * words.length)];

let attempts = 0;
let currentGuess = "";
const board = document.getElementById("game-board");

// 1. Board'u oluştur (6 satır, 5 sütun)
for (let i = 0; i < 30; i++) {
    let tile = document.createElement("div");
    tile.classList.add("tile");
    tile.setAttribute("id", "tile-" + i);
    board.appendChild(tile);
}

// 2. Klavye girişini dinle
document.addEventListener("keydown", (e) => {
    if (attempts >= 6) return;

    if (e.key === "Enter" && currentGuess.length === 5) {
        checkGuess();
    } else if (e.key === "Backspace") {
        currentGuess = currentGuess.slice(0, -1);
        updateBoard();
    } else if (currentGuess.length < 5 && /^[a-zA-Z]$/.test(e.key)) {
        currentGuess += e.key.toUpperCase();
        updateBoard();
    }
});

function updateBoard() {
    for (let i = 0; i < 5; i++) {
        let tile = document.getElementById("tile-" + (attempts * 5 + i));
        tile.innerText = currentGuess[i] || "";
    }
}

function checkGuess() {
    for (let i = 0; i < 5; i++) {
        let tile = document.getElementById("tile-" + (attempts * 5 + i));
        let letter = currentGuess[i];

        if (letter === SECRET_WORD[i]) {
            tile.classList.add("correct");
        } else if (SECRET_WORD.includes(letter)) {
            tile.classList.add("present");
        } else {
            tile.classList.add("absent");
        }
    }

    if (currentGuess === SECRET_WORD) {
        document.getElementById("message").innerText = "Tebrikler! 🎉";
    } else {
        attempts++;
        currentGuess = "";
        if (attempts === 6) document.getElementById("message").innerText = "Kaybettin! Kelime: " + SECRET_WORD;
    }
}