class BrowserDriver {
	constructor(driver) {
		this.driver = driver.build();
	}
	async disconnect() {
		if (!this.driver) {
			return;
		}
		await this.driver.quit();
	}
	async sleep(min, max) {
		await this.driver.sleep(this.randomInterger(min, max));
	}
	randomInterger(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}
