/**
 * Retourne la valeur de l'input sous forme de tableau
 * @param {string} inputId 
 * @returns {Array}
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
	getUserInput('entry');
})

