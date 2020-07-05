class Tabs extends HTMLElement {
	connectedCallback() {
		this.setAttribute('role', 'tablist');
		const tabs = Array.from(this.children);
		const hash = window.location.hash.replace('#', '');
		let currentTab = tabs[0];

		tabs.forEach((tab, i) => {
			const id = tab.getAttribute('href').replace('#', '');
			const tabpanel = document.getElementById(id);
			
			// Vérifie si l'élément est l'élément à activer par défaut
			if (tab.getAttribute('aria-selected') === 'true' && hash === '') {
				currentTab = tab;
			}
			if(id === hash) {
				currentTab = tab;
			}

			// Ajout des attributs aria sur les onglets
			tab.setAttribute('role', 'tab');
			tab.setAttribute('aria-selected', 'false');
			tab.setAttribute('tabindex', '-1');
			tab.setAttribute('aria-controls', id);
			tab.setAttribute('id', 'tab-' + id);

			// Ajout des attributs aria sur la cible
			tabpanel.setAttribute('role', 'tabpanel');
			tabpanel.setAttribute('aria-labelledby', 'tab-' + id);
			tabpanel.setAttribute('hidden', 'hidden');
			tabpanel.setAttribute('tabindex', '0');

			// Navigation onglets au clavier
			tab.addEventListener('keyup', e => {
				let index = null;

				if (e.key === 'ArrowRight') {
					index = i === tabs.length - 1 ? 0 : i + 1;
				} else if (e.key === 'ArrowLeft') {
					index = i === 0 ? tabs.length - 1 : i - 1;
				} else if(e.key === 'Home') {
					index = 0;
				} else if (e.key === 'End') {
					index = tabs.length - 1;
				}

				if(index !== null) {
					this.activate(tabs[index]);
					tabs[index].focus();
				}
			})

			// Navigation onglet à la souris
			tab.addEventListener('click', e => {
				e.preventDefault();
				this.activate(tab);
			})
		});

		// Activation de l'onglet actif
		this.activate(currentTab, false);
	}

	/**
	 * Définir un onglet actif
	 * @param {HTMLElement} tab
	 * @param {boolean} changeHash 
	 */
	activate(tab, changeHash = true) {
		const currentTab = this.querySelector('[aria-selected="true"]');

		if (currentTab !== null) {
			const tabpanel = document.getElementById(currentTab.getAttribute('aria-controls'));

			currentTab.setAttribute('aria-selected', 'false')
			tab.setAttribute('tabindex', '-1');
			tabpanel.setAttribute('hidden', 'hidden');
		}

		const id = tab.getAttribute('aria-controls');
		const tabpanel = document.getElementById(id);

		tab.setAttribute('aria-selected', 'true');
		tab.setAttribute('tabindex', '0');
		tabpanel.removeAttribute('hidden');

		if (changeHash) {
			window.history.replaceState({}, '', '#' + id);
		}
	}
}

customElements.define('nav-tabs', Tabs);