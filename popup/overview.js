"use strict";

const reflinkContainer = document.querySelector('#popup-content-reflinks');
const supportlinkContainer = document.querySelector('#popup-content-supportlinks');

async function fetchMarahPopupLinks() {
	const response = await fetch("https://marah.discord-bot.com/browserplugin/api/fetchlinks/", {
		method: 'GET',
		headers: {
			'Accept': 'application/json'
		}
	});

	const jsonData = await response.json();
	const parser = new DOMParser();

	while (reflinkContainer.hasChildNodes()) {
		reflinkContainer.removeChild(reflinkContainer.firstChild);
	}
	Object.entries(jsonData.reflinks).forEach(([key, value]) => {
		const parsed = parser.parseFromString(`<a href="${key}" target="_blank" class="button">${value} <span class="button__horizontal"></span><span class="button__vertical"></span></a>`, `text/html`);
		const tags = parsed.getElementsByTagName(`a`);
		for (const tag of tags) {
			reflinkContainer.appendChild(tag);
		}
	});
	
	while (supportlinkContainer.hasChildNodes()) {
		supportlinkContainer.removeChild(supportlinkContainer.firstChild);
	}
	Object.entries(jsonData.supportlinks).forEach(([key, value]) => {
		const parsed = parser.parseFromString(`<p><a href="${key}" target="_blank">${value}</a></p>`, `text/html`);
		const tags = parsed.getElementsByTagName(`p`);
		for (const tag of tags) {
			supportlinkContainer.appendChild(tag);
		}
	});
}

fetchMarahPopupLinks();