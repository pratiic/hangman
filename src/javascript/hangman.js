import { elements } from "./elements.js";

let words = [
	"irony",
	"horn",
	"report",
	"invasion",
	"licence",
	"economics",
	"buttocks",
	"restrain",
	"rational",
	"parallel",
	"embark",
	"permission",
	"jungle",
	"champion",
	"waist",
];

let selectedWordString;

let selectedWord;

let wordToBeGuessed;

let wrong = 0;

let enteredLetters = [];

export let loadWord = function () {
	selectedWordString = words[Math.floor(Math.random() * words.length)];

	selectedWord = Array.from(selectedWordString);

	wordToBeGuessed = document.querySelector(".word-to-be-guessed");

	selectedWord.forEach((letter) => {
		wordToBeGuessed.innerHTML += `<div class = "letter-container"><span class = "letter">${letter}</span><span class = "underline"></span></div>`;
	});
};

export let checkLetter = function (char) {
	if (enteredLetters.indexOf(char) !== -1) {
		console.log("pratiic");
		showAlert("you have already entered this letter");
	} else {
		enteredLetters.push(char);
		let wrongCount = 0;
		let correctCount = 0;
		let allLetters = Array.from(wordToBeGuessed.children);
		for (let i = 0; i < allLetters.length; i++) {
			if (allLetters[i].innerText.toLowerCase() === char) {
				//allLetters[i].children[0].style.opacity = 1;
				allLetters[i].children[0].classList.add("show");
			} else {
				wrongCount++;
			}
		}

		if (wrongCount === allLetters.length) {
			wrong++;

			elements.wrongLetters.innerHTML += `<span class = "wrong-letter">${char.toUpperCase()}</span>`;

			wrongLetter();
		}

		document.querySelectorAll(".letter").forEach((letter) => {
			if (letter.classList.contains("show")) {
				correctCount++;

				if (correctCount === selectedWordString.length) {
					showModal("win");
				}
			}
		});
	}
};

let wrongLetter = function () {
	if (wrong > 0) {
		document.querySelector(`#part-${wrong}`).style.visibility = "visible";
		if (wrong >= 6) {
			showModal("lose");
			wrong = false;
		}
	}
};

let showModal = function (message) {
	elements.modal.style.display = "block";

	if (message === "lose") {
		elements.result.innerText = "you lost";
		elements.correctWord.innerText = `the correct word was ${selectedWordString}`;
	} else {
		elements.result.innerText = "you won";
	}
};

let showAlert = function (message) {
	let alert = elements.alert;
	alert.classList.add("slide-up");
	alert.innerText = message;

	setTimeout(() => {
		alert.classList.remove("slide-up");
	}, 1000);
};
