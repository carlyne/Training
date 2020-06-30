class Tabs extends HTMLElement {
	connectedCallback() {
		this.setAttribute('role', 'tablist');
		const tabs = Array.from(this.children);

		tabs.forEach((tab, i) => {
			const id = tab.getAttribute('href').replace('#', '');
			const tabpanel = document.getElementById(id);

			tab.setAttribute('role', 'tab');
			tab.setAttribute('aria-selected', 'false');
			tab.setAttribute('tabindex', '-1');
			tab.setAttribute('aria-controls', id);
			tab.setAttribute('id', 'tab-' + id);

			tabpanel.setAttribute('role', 'tabpanel');
			tabpanel.setAttribute('aria-labelledby', 'tab-' + id);
			tabpanel.setAttribute('hidden', 'hidden');
			tabpanel.setAttribute('tabindex', '0');

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

			tab.addEventListener('click', e => {
				e.preventDefault();
				this.activate(tab);
			})
		});

		this.activate(tabs[0]);
	}

	/**
	 * Définir un onglet actif
	 * @param {HTMLElement} tab 
	 */
	activate(tab) {
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
	}
}

customElements.define('nav-tabs', Tabs);