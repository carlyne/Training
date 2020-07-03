const calculArea = {
    submitBtn: document.getElementById('submit-btn'),
    addBtn: document.getElementById('add-nb'),
    inputs: [...document.querySelectorAll('input[type="number"]')]
}

/**
 * Retourne la somme d'un tableau de nombres
 * @param {array} inputNbValues
 * @returns {array} 
 */
function sumNb(inputNbValues) {
    return inputNbValues.reduce((acc, current) => acc + current);
}

/**
 * Retourne un tableau de nombre en fonction d'un input donné
 * @param {array} inputList 
 */
function getNbValues(inputList) {
    return inputList.map(input => parseInt(input.value));
}

/**
 * Ajoute un nouveau noeud au document
 * @param {HTMLElement} input 
 */
function addInput(input) {
    const area = document.getElementById('calcul-area');
    const newInput = input.cloneNode();
    newInput.value = 0;

    const newSpan = document.createElement('span');
    newSpan.innerText = ' + ';
    
    area.append(newSpan, newInput);
    calculArea.inputs = [...document.querySelectorAll('input[type="number"]')];
}

/**
 * Affichage dans le HTML
 */
calculArea.addBtn.addEventListener('click', () => addInput(calculArea.inputs[0]));

calculArea.submitBtn.addEventListener('click', e => {
    e.preventDefault();
    const nbValues = getNbValues(calculArea.inputs);

    document.getElementById('result').innerText = sumNb(nbValues);
})