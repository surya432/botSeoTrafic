const chromeWebDriver = require("selenium-webdriver/chrome"),
    proxy = require('selenium-webdriver/proxy'),
    firefox = require("selenium-webdriver/firefox");
const { By, until, Capabilities, Builder, Key, Browser } = require("selenium-webdriver");
const chromedriverPath = require("chromedriver").path
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const fs = require('fs');
const readline = require('readline');
const moment = require("moment/moment");
const { default: axios } = require("axios");
const { Platform } = require("selenium-webdriver/lib/capabilities");

function convert(file) {

    return new Promise((resolve, reject) => {

        const stream = fs.createReadStream(file);
        // Handle stream error (IE: file not found)
        stream.on('error', reject);

        const reader = readline.createInterface({
            input: stream
        });

        const array = [];

        reader.on('line', line => {
            array.push(line);
        });

        reader.on('close', () => resolve(array));
    });
}

class DriveOtomatis {
    constructor({ url, username, password }) {
        try {
            var chromeCapabilities = Capabilities.chrome();
            chromeCapabilities.setPageLoadStrategy("normal");
            chromeCapabilities.setAcceptInsecureCerts(true);
            if (url) {
                chromeCapabilities.setProxy(proxy.manual({ http: "http://" + url }))
            }
            var chromeOptions = new chromeWebDriver.Options();

            chromeOptions.detachDriver(true);
            // chromeOptions.setChromeBinaryPath('chromedriver.exe');
            chromeOptions.excludeSwitches(["enable-automation"]);
            chromeOptions.set("useAutomationExtension", false);
            chromeOptions.addArguments("start-maximized");
            chromeOptions.addArguments('autodetect=false');
            // const randomOS = [Platform.MAC, Platform.LINUX, Platform.WINDOWS];
            // chromeOptions.setPlatform(randomOS[Math.floor(Math.random() * randomOS.length)])
            // const deviceName = ['iPhone SE', 'iPhone XR', 'iPhone 12 Pro', 'iPhone X',    'PIXEL 5'];
            // var item = deviceName[Math.floor(Math.random() * deviceName.length)];

            // chromeOptions.setMobileEmulation({ deviceName: item })
            // chromeOptions.androidDeviceSerial("iPhone SE")
            // chromeOptions.addExtensions('ezyZip.crx')
            // if (profileChrome != "") {
            // let s = profileChrome.split("\\");
            // let profile_name = s[s.length - 1];
            // let profile_dir = profileChrome.replace("\\" + s[s.length - 1], "");
            // chromeOptions.addArguments(`user-data-dir=${profile_dir}`);
            // chromeOptions.addArguments(`profile-directory=${profile_name}`);


            // chromeOptions.addExtensions('load-extension=proxy.zip')
            // }
            // if (url) {
            //     chromeOptions.addArguments(`proxy-server=http://${url},https://${url}`);
            //     chromeOptions.addArguments(`username=${username}`)
            //     chromeOptions.addArguments(`password=${password}`)
            //     console.log('proxy', url)
            // }

            var firefoxOptions = new firefox.Options();
            firefoxOptions.addArguments("start-maximized")
            firefoxOptions.addArguments('--headless')
            firefoxOptions.setBinary("C:\\Program Files\\Mozilla Firefox\\firefox.exe")
            var driver = new Builder();
            driver.forBrowser(Browser.CHROME)
            driver.setChromeService(new chromeWebDriver.ServiceBuilder('chromedriver.exe'))
            driver.setChromeOptions(chromeOptions)
            driver.setFirefoxOptions(firefoxOptions)
            driver.setFirefoxService(new firefox.ServiceBuilder('geckodriver.exe'))
            // driver.withCapabilities(chromeCapabilities);
            console.log("dasda", JSON.stringify(driver))
            this.driver = driver.build();
        } catch (error) {
            console.log("constructor", error);
        }
    }
    async myIp() {
        if (this.driver == null) {
            return;
        }
        await this.driver.get('https://www.whatismybrowser.com/detect/what-is-my-user-agent/');
        await this.driver.sleep(getRndInteger(3000, 5000));
        await this.driver.get('https://whoer.net/');
        await this.driver.sleep(getRndInteger(3000, 5000));

    }
    async SeoDrive({ url, keyword }) {

        try {
            if (this.driver == null) {
                return;
            }
            await this.driver.manage().deleteAllCookies();
            // await this.driver.get("chrome://settings/clearBrowserData");
            // await this.driver.sleep(getRndInteger(1000, 3000));
            let clearBtn = await this.driver.findElements(By.xpath('//*[@id="clearBrowsingDataConfirm"]'));
            if (clearBtn.length > 0) {
                await this.driver.findElement(
                    By.xpath('//*[@id="clearBrowsingDataConfirm"]')
                ).click()
            }
            await this.driver.get("https://google.co.id");
            // L2AGLb
            let acceptCokies = await this.driver.findElements(
                By.id("L2AGLb")
            );
            if (acceptCokies.length > 0) {
                await this.driver.findElement(
                    By.id("L2AGLb")
                ).click()
            }
            const getTitleGoogle = await this.driver.getTitle();
            if (getTitleGoogle != "Google") {
                return
            }
            await this.driver.sleep(getRndInteger(1000, 3000));
            let dataAds = await this.driver.findElements(
                By.xpath("/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/input")
            );
            if (!dataAds) {

                return;
            }
            const urlVideo = url;
            await this.driver.findElement(By.xpath("/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/input")).sendKeys(keyword, Key.ENTER);
            this.driver.actions().move({ x: 200, y: 1500, duration: 1000 })
            await this.driver.sleep(getRndInteger(2000, 3000));

            let getSearchLink = await this.driver.findElements(
                By.xpath(`//a[contains(@href,'${urlVideo}')]`)
            );
            if (getSearchLink.length == 0) {
                await this.driver.get(url);
            } else {
                await this.driver.executeScript(`window.scrollTo(0,5000);`);
                await this.driver.sleep(getRndInteger(2000, 3000));
                await this.driver.executeScript(`window.scrollTo(0,-5000);`);
                await this.driver.findElement(By.xpath(`//a[contains(@href,'${urlVideo}')]`)).click();
            }
            await this.driver.sleep(getRndInteger(3000, 5000));
            const getCurrentUrl = await this.driver.getCurrentUrl();
            console.log("getCurrentUrl", getCurrentUrl)
            if (!urlVideo.includes(getCurrentUrl)) {
                return;
            }
            await this.driver.sleep(getRndInteger(3000, 9000));
            let scroll = 0;
            await this.driver.executeScript(`window.scrollTo(0,5000);`);
            const randomScrolldown = getRndInteger(2000, 5000);
            for (let index = 0; scroll <= randomScrolldown; index++) {
                scroll = scroll + getRndInteger(100, 500);
                console.log('scrolldown', scroll)
                await this.driver.executeScript(`window.scrollTo(0,${scroll});`);
                await this.driver.sleep(getRndInteger(2000, 5000));
            }
            const randomScroll = getRndInteger(100, 300)
            for (let index = 0; scroll >= randomScroll; index++) {
                scroll = scroll - getRndInteger(100, 300);
                console.log('scrollup', scroll)
                await this.driver.executeScript(`window.scrollTo(0,${scroll});`);
                await this.driver.sleep(getRndInteger(2000, 5000));
            }
            await this.driver.sleep(getRndInteger(13000, 60000));
        } catch (error) {

            console.log(error);
        }
    }
    async removeDrive() {
        if (this.driver == null) {
            return;
        }
        await this.driver.quit();
    }
}
const urlList = [
    { keyword: "digitopupstore.com", url: 'https://digitopupstore.com/' },
    { keyword: "afanlogamlestari", url: 'https://afanlogamlestari.co.id/' },
    { keyword: "tutorialkodingku.com", url: 'https://tutorialkodingku.com/' },
]
const run = async () => {
    // do {
    const url = urlList[Math.floor(Math.random() * urlList.length)]
    try {
        // const proxy = await getProxyFree();
        const Drive = new DriveOtomatis({ url: '', username: 'surya432', password: 'surya4321' });
        // const Drive = new DriveOtomatis({ url: proxy, username: 'surya123-1', password: 'surya432' });
        // await Drive.myIp();
        await Drive.SeoDrive(url)
        await Drive.removeDrive()
    } catch (error) {
        console.log(error);

    } finally {
        run()
    }
    // } while (true);
};
const getProxyFree = async () => {
    try {
        var time = moment()
        time.utc()
        const dateUtc = time.format("YYYY-MM-DD")
        const resp = await axios.get(`https://checkerproxy.net/api/archive/${dateUtc}`);
        var dataProxy = resp.data;
        const proxyIndo = dataProxy.filter(item => item.addr_geo_country == "Indonesia" && item.timeout < 10000)
        console.log(proxyIndo[0])
        return proxyIndo[0].addr;
    } catch (error) {
        return ""
    }
}
// run()
run();
