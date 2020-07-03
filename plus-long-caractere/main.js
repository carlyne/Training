/**
 * Retourne les mots les plus longs d'une chaîne de caractère
 * @param {string} inputId
 * @returns {array}
 */
function longestWord(inputId) {
	const text = getUserInput(inputId);

	const sizeMax = Math.max(...text.map(word => word.length));
	return text.filter(item => item.length === sizeMax);
}

/**
 * Retourne la valeur de l'input sous forme de tableau
 * @param {string} inputId 
 * @returns {array}
 */
function getUserInput(inputId) {
	const userInput = document.getElementById(inputId);

	if (! userInput.value) {
		return 'votre texte est vide !'
	}

	return userInput.value.split(' ');
}

const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', e => {
	e.preventDefault();
	document.getElementById('longest-word').innerText = longestWord('entry');
})

