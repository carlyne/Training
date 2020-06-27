/**
 * Anime un titre mot par mot
 * @param {string} selector 
 */

function animateTitle(selector) {
	const title = document.querySelector(selector);

	if (title === null) {
		console.error('Impossible de trouver element' + selector);
		return;
	}

	spanify(title);

	// Animation mot par mot
	Array.from(title.querySelectorAll('span span').forEach((span, i) => {
		span.style.animationDelay = (i * .2) + 's';
	}))
}

/**
 * Entoure chaque mot d'une span (récursive)
 * @param {Node} element 
 */
function spanify(element) {
	const children = Array.from(element.childNodes);
	let elements = [];

	children.forEach(child => {
		if (child.nodeType === Node.TEXT_NODE) {
			const words = child.textContent.trim(' ').split(' ');
			const spans = words.map(wrapWord);

			elements = elements.concat(injectElementBetweenItems(spans, document.createTextNode(' ')));

		} else if (child.tagName === 'BR') {
			elements.push(child)
		} else {
			spanify(child);
			element.push(child);
		};
	})

	// Injection des éléments dans le titre
	element.innerHTML = '';
	elements.forEach(el => {
		element.appendChild(el);
	})
}

/**
 * Rajoute 2 <span> a un mot
 * @param {string} word 
 */
function wrapWord(word) {
	const span = document.createElement('span');
	const childSpan = document.createElement('span');

	span.appendChild(childSpan);
	childSpan.innerHTML = word;

	return span
}

/**
 * Injecter des éléments entre des noeuds
 * @param {Node[]} arr 
 * @param {Node} element
 * @return {Node[]} 
 */
function injectElementBetweenItems(arr, element) {
	return arr.map((item, i) => {
		if (i === arr.length - 1) {
			return [item]
		}
		return [item, element.cloneNode()]
	}).reduce((acc, pair) => {
		acc = acc.concat(pair);
		return acc
	}, [])
}

animateTitle('.title');
