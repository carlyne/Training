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

	const spans = spanify(title);

	// Animation mot par mot
	spans.forEach((span, i) => {
		span.children[0].style.animationDelay = (i * .2) + 's';
	})
}

/**
 * Entoure chaque mot d'une span (récursive)
 * @param {Node} element
 * @return {HTMLSpanElement[]} 
 */
function spanify(element) {
	const children = Array.from(element.childNodes);
	let spans = [];
	let elements = [];

	children.forEach(child => {
		if (child.nodeType === Node.TEXT_NODE) {
			const words = child.textContent.split(' ');
			const wordSpans = words.map(wrapWord);

			spans = spans.concat(wordSpans);

			elements = elements.concat(injectElementBetweenItems(wordSpans, document.createTextNode(' ')));

		} else if (child.tagName === 'BR') {
			elements.push(child)
		} else {
			spans = spans.concat(spanify(child));
			elements.push(child);
		};
	})

	// Injection des éléments dans le titre
	element.innerHTML = '';
	elements.forEach(el => {
		element.appendChild(el);
	})
	return spans;
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
