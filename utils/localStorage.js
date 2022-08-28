export default class LocalStorage {
	static set(key, item) {
		localStorage.setItem(key, item);
	}

	static get(key) {
		return localStorage.getItem(key);
	}

	static write(key, item, ...rest) {
		this.set(key, JSON.stringify(item, ...rest));
	}

	static read(key) {
		return JSON.parse(this.get(key));
	}

	static entries() {
		return Object.entries(localStorage);
	}

	static remove(key) {
		localStorage.removeItem(key);
	}

	static clear() {
		localStorage.clear();
	}
}
