const { Capabilities, Builder, } = require("selenium-webdriver");
const { Platform, Browser } = require("selenium-webdriver/lib/capabilities");
const chromeWebDriver = require("selenium-webdriver/chrome"),
    proxy = require("selenium-webdriver/proxy"),
    firefox = require("selenium-webdriver/firefox"),
    edgeDriver = require("selenium-webdriver/edge");
const { SELENIUM_HUB_HOST, SELENIUM_HUB_PORT } = process.env

class BrowserConfig {
    async chromeOptions() {
        var chromeCapabilities = new Capabilities.chrome();
        chromeCapabilities.setPlatform(Platform.WINDOWS);
        chromeCapabilities.setPageLoadStrategy("normal");
        chromeCapabilities.setAcceptInsecureCerts(true);
        if (url) {
            chromeCapabilities.setProxy(proxy.manual({ http: url }));
        }
        var chromeOptions = new chromeWebDriver.Options();
        chromeOptions.merge(chromeCapabilities);
        chromeOptions.detachDriver(true);
        chromeOptions.excludeSwitches(["enable-automation", "enable-logging"]);
        chromeOptions.set("useAutomationExtension", false);
        chromeOptions.addArguments("start-maximized");
        chromeOptions.addArguments("autodetect=false");
        chromeOptions.addArguments("lang=id");
        chromeOptions.addArguments("log-level=3");
        chromeOptions.addArguments("disable-logging");
        return chromeOptions;
    }
    async firefoxOptions() {
        var firefoxCapability = new Capabilities();
        firefoxCapability.setAcceptInsecureCerts(true);
        var firefoxOptions = new firefox.Options(firefoxCapability);
        firefoxOptions.addArguments("start-maximized");
        return firefoxOptions
    }
    async edgeOptions() {
        var edgeOptions = new edgeDriver.Options();
        edgeOptions.detachDriver(true);
        edgeOptions.excludeSwitches(["enable-automation", "enable-logging"]);
        edgeOptions.set("useAutomationExtension", false);
        edgeOptions.addArguments("start-maximized");
        edgeOptions.setPlatform(Platform.WINDOWS);
        return edgeOptions;
    }
    async defaultConfig(proxyUrl = '') {
        const optionChrome = await this.chromeOptions()
        const optionFirefox = await this.firefoxOptions()
        const optionEdge = await this.edgeOptions();
        var urlServer = `${SELENIUM_HUB_HOST}:${SELENIUM_HUB_PORT}`;
        var driver = new Builder();
        driver.getChromeOptions(optionChrome);
        driver.getFirefoxOptions(optionFirefox);
        driver.setEdgeOptions(optionEdge)
        driver.usingServer(urlServer);
        if (proxyUrl) driver.usingWebDriverProxy(proxyUrl);
        return driver;
    }
}