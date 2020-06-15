import { loadWord, checkLetter } from "./hangman.js";
import { elements } from "./elements.js";

loadWord();

document.body.addEventListener("keypress", (event) => {
	let key = event.key;
	if (key >= "a" && key <= "z") {
		checkLetter(key);
	}
});

elements.replayButton.addEventListener("click", () => {
	//closeModal();
	location.reload();
});
