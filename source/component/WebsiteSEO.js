const { By, Key, Actions } = require("selenium-webdriver");

class WebsiteSEO extends BrowserDriver {
	constructor(driver, url, keyword) {
		super(driver);
		this.url = url;
		this.keyword = keyword;
	}
	async run() {
		if (this.driver == null) {
			return;
		}
		try {
			await this.openGoogle();
			await this.sleep(2000, 3000);
			await this.checkUrlGoogle();
			await this.sleep(2000, 3000);
			await this.searchingKeyword();
			await this.sleep(2000, 5000);
			const getCurrentUrl = await this.driver.getCurrentUrl();
			if (!this.url.includes(getCurrentUrl)) {
				throw Error("Url Yang ditujuh Salah");
			}
			await this.searchDestinationUrl();
			await this.sleep(5000, 8000);
			await this.scrollUpDownSite();
			console.log(
				"Sukses Di kunjungi " + this.url,
				" Dengan Keyword " + this.keyword
			);
		} catch (error) {
			console.log("Error " + this.url, JSON.stringify(error));
		} finally {
			await this.driver.quit();
		}
	}
	async openGoogle() {
		await this.driver.get(this.url);
	}
	async checkUrlGoogle() {
		let acceptCokies = await this.driver.findElements(By.id("L2AGLb"));
		if (acceptCokies.length > 0) {
			await this.driver.findElement(By.id("L2AGLb")).click();
		}
		const getTitleGoogle = await this.driver.getTitle();
		if (getTitleGoogle != "Google") {
			return;
		}
	}
	async searchingKeyword() {
		await this.driver
			.findElement(By.name("q"))
			.sendKeys(this.keyword, Key.ENTER);
	}
	async searchDestinationUrl() {
		var scrollHeight = await this.driver.executeScript(
			"return document.documentElement.scrollHeight"
		);
		var scrollPosisi = 0,
			pagesearch = 1,
			notFound = true;
		while (pagesearch <= 10 || notFound) {
			await this.sleep(1000, 2000);
			if (scrollHeight == scrollPosisi) {
				var sd2 = await this.driver.findElements(
					By.xpath(`//a[contains(@href,'search?q=')]`)
				);
				var sd3 = await this.driver.findElements(
					By.xpath(`//a[contains(@id,'pnnext')]`)
				);
				var foundlink = await this.driver.findElements(
					By.xpath(`//a[contains(@href,'${this.url}')]`)
				);
				if (sd3.length > 0 && foundlink.length == 0) {
					pagesearch++;
					scrollPosisi = 0;
					await this.driver
						.findElement(By.xpath(`//a[contains(@id,'pnnext')]`))
						.click();
				} else if (sd2.length > 0 && foundlink.length == 0) {
					pagesearch++;
					scrollPosisi = 0;
					await this.driver
						.findElement(By.xpath(`//a[contains(@href,'search?q=')]`))
						.click();
				} else {
					notFound = false;
					await this.driver
						.findElement(By.xpath(`//a[contains(@href,'${this.url}')]`))
						.click();
				}
			} else {
				const actions = new Actions({ async: true });
				await actions.sendKeys(Key.SPACE).perform();
			}
		}
	}
	async scrollUpDownSite() {
		var scrollHeight = await this.driver.executeScript(
			"return document.documentElement.scrollHeight"
		);
		var scrollPosisi = 0;
		var timeMaxStay = 20000,
			timeStay = 0;
		while (timeStay <= timeMaxStay) {
			const timeWait = this.randomInterger(250, 500);
			await this.driver.sleep(timeWait);
			timeStay = timeStay + timeWait;
			if (scrollHeight == scrollPosisi) {
				const actions = new Actions({ async: true });
				await actions.sendKeys(Key.HOME).perform();
			} else {
				const actions = new Actions({ async: true });
				await actions.sendKeys(Key.SPACE).perform();
				var scrollTop = await this.driver.executeScript(
					"return document.documentElement.scrollTop"
				);
				scrollPosisi = scrollTop;
			}
		}
	}
}
