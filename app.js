const chromeWebDriver = require("selenium-webdriver/chrome"),
    proxy = require('selenium-webdriver/proxy'),
    firefox = require("selenium-webdriver/firefox"),
    edgeDriver = require("selenium-webdriver/edge");
const { By, until, Capabilities, Builder, Key, Browser, Actions } = require("selenium-webdriver");
var rimraf = require("rimraf");

const chromedriverPath = require("chromedriver").path
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const chromePaths = require('chrome-paths');

const fs = require('fs');
const readline = require('readline');
const moment = require("moment/moment");
const { default: axios } = require("axios");
const { Platform } = require("selenium-webdriver/lib/capabilities");
let watchingTimeLimit = 5 * 60 * 1000;

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
            console.log('chormepath', chromePaths.chrome)
            var chromeCapabilities = Capabilities.chrome();
            chromeCapabilities.setPageLoadStrategy("normal");
            chromeCapabilities.setAcceptInsecureCerts(true);
            if (url) {
                chromeCapabilities.setProxy(proxy.manual({ http: url }))
            }
            var chromeOptions = new chromeWebDriver.Options();
            chromeOptions.merge(chromeCapabilities)
            chromeOptions.detachDriver(true);
            // chromeOptions.setChromeBinaryPath('chromedriver.exe');
            // chromeOptions.setChromeBinaryPath(chromePaths.chrome);
            chromeOptions.excludeSwitches(["enable-automation", 'enable-logging']);
            chromeOptions.set("useAutomationExtension", false);
            chromeOptions.addArguments("start-maximized");
            chromeOptions.addArguments('autodetect=false');
            chromeOptions.addArguments('log-level=3');
            chromeOptions.addArguments('disable-logging');
            // chromeOptions.addArguments('profile-directory=Default');
            let x = "C:\\temp\\" + getRndInteger(2000, 13000);
            // chromeOptions.addArguments(`user-data-dir=${x}`);
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

            console.log('chromeOptuions', JSON.stringify(chromeOptions))
            var firefoxOptions = new firefox.Options();
            firefoxOptions.addArguments("start-maximized")
            // firefoxOptions.setBinary("C:\\Program Files\\Mozilla Firefox\\firefox.exe");
            // firefoxOptions.useGeckoDriver(true)
            var edgeOptions = new edgeDriver.Options();
            edgeOptions.detachDriver(true)
            edgeOptions.excludeSwitches(["enable-automation", 'enable-logging']);
            edgeOptions.set("useAutomationExtension", false);
            edgeOptions.addArguments("start-maximized");

            var driver = new Builder();
            const listBrowser = [
                Browser.EDGE,
                Browser.FIREFOX,
                Browser.CHROME,
                Browser.CHROME,
                Browser.CHROME,
                Browser.CHROME,
            ];
            const browserSelected = listBrowser[Math.floor(Math.random() * listBrowser.length)]
            driver.forBrowser(browserSelected)
            // driver.setChromeService(new chromeWebDriver.ServiceBuilder('chromedriver.exe'))
            driver.setChromeOptions(chromeOptions)
            driver.setEdgeOptions(edgeOptions)
            // driver.setFirefoxOptions(firefoxOptions)
            var urlServer = `${process.env.SELENIUM_HUB_HOST}:${process.env.SELENIUM_HUB_PORT}`;
            console.log('SELENIUM_HUB', urlServer)
            driver.usingServer(`${urlServer}`)
            // driver.setFirefoxService(new firefox.ServiceBuilder('geckodriver.exe'))
            console.log("dasda", JSON.stringify(driver))
            this.driver = driver.build();
            this.Qualityvideo144 = false;
            this.watchingTime = 0.
            this.userdir = x
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
    async SeoSosmed({ url, keyword }) {
        try {
            if (this.driver == null) {
                return;
            };
            await this.driver.get(keyword);
            await this.driver.sleep(getRndInteger(3000, 5000));
            const originalWindow = await this.driver.getWindowHandle();

            var das = await this.driver.findElements(By.xpath(`//a[contains(@href,'${url}')]`));
            if (das.length == 0) {
                console.log("link not found")
                return;
            }
            console.log("link found")
            await this.driver.findElement(By.xpath(`//a[contains(@href,'${url}')]`)).click();
            await this.driver.sleep(getRndInteger(3000, 5000));
            var tabs = await this.driver.getAllWindowHandles();
            var tabtujuan = ""
            if (tabs.length == 1) {
                return;
            } else {
                tabs.forEach(async handle => {
                    if (handle !== originalWindow) {
                        await this.driver.switchTo().window(handle);
                        const getCurrentUrl = await this.driver.getCurrentUrl();;
                        console.log('urlSekarang', getCurrentUrl)
                        if (getCurrentUrl.includes(url)) {
                            tabtujuan = handle;
                        } else {
                            await this.driver.close();
                        }
                    }
                });
            }
            if (tabtujuan != "") return;
            await this.driver.switchTo().window(tabtujuan);
            await this.driver.sleep(getRndInteger(13000, 60000));
        } catch (error) {
            console.log('SeoSosmed err', error)
            return
        }
    }
    async SeoWebsite({ url, keyword }) {
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
                By.name("q")
            );
            if (!dataAds) {
                return;
            }
            const urlVideo = url;
            await this.driver.findElement(By.name("q")).sendKeys(keyword, Key.ENTER);
            this.driver.actions().move({ x: 200, y: 1500, duration: 1000 })
            await this.driver.sleep(getRndInteger(2000, 3000));
            let getSearchLink = await this.driver.findElements(
                By.xpath(`//a[contains(@href,'${urlVideo}')]`)
            );
            if (getSearchLink.length == 0) {
                // await this.driver.get(url);
                var searching = true, pagesearch = 1;
                do {
                    await this.driver.executeScript(`window.scrollTo(0,5000);`);
                    await this.driver.sleep(getRndInteger(1000, 2000));
                    await this.driver.executeScript(`window.scrollTo(0,-5000);`);
                    await this.driver.findElement(By.xpath(`//a[contains(@id,'pnnext')]`)).click();
                    let getSearchLink1 = await this.driver.findElements(
                        By.xpath(`//a[contains(@href,'${urlVideo}')]`)
                    );
                    if (getSearchLink1.length > 0) {
                        searching = false
                        await this.driver.findElement(By.xpath(`//a[contains(@href,'${urlVideo}')]`)).click();
                    } else {
                        pagesearch = pagesearch + 1
                    }
                } while (searching || pagesearch <= 10);
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
            const randomScrolldown = getRndInteger(2000, 5000);
            for (let index = 0; scroll <= randomScrolldown; index++) {
                scroll = scroll + getRndInteger(100, 500);
                console.log('scrolldown', scroll)
                await this.driver.executeScript(`window.scrollTo(0,${scroll});`);
                await this.driver.sleep(getRndInteger(2000, 5000));
            }
            await this.driver.sleep(getRndInteger(10000, 30000));
            const randomScroll = getRndInteger(100, 300)
            for (let index = 0; scroll >= randomScroll; index++) {
                scroll = scroll - getRndInteger(100, 300);
                console.log('scrollup', scroll)
                await this.driver.executeScript(`window.scrollTo(0,${scroll});`);
                await this.driver.sleep(getRndInteger(2000, 5000));
            }
            await this.driver.sleep(getRndInteger(20000, 40000));
        } catch (error) {

            console.log(error);
        } 
    }
    async youtube_parser(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }
    async SeoYoutube({ url, keyword }) {
        try {
            if (this.driver == null) {
                return;
            };
            const videoId = await this.youtube_parser(url);
            await this.driver.get('https://youtube.com/');
            await this.driver.sleep(getRndInteger(3000, 5000));
            if (keyword == null) return;
            await this.driver.findElement(By.name("search_query")).click()
            await this.driver.sleep(getRndInteger(3000, 5000));
            await this.driver.findElement(By.name("search_query")).sendKeys(keyword)
            await this.driver.findElement(By.xpath("//button[@id='search-icon-legacy']/yt-icon")).click()
            await this.driver.sleep(getRndInteger(3000, 5000));
            let searchFound = await this.driver.wait(until.titleContains(keyword))
            if (!searchFound) return;
            let isFound = false;
            let ScrollSearch = 2000;
            for (let i = 0; true; i++) {
                let marchingVideo = await this.driver
                    .findElements(By.xpath(`//a[contains(@href,'${videoId}')]`))
                console.log('search marchingVideo ' + marchingVideo.length)
                if (marchingVideo.length !== 0) {
                    console.log('search found')
                    isFound = true;
                    break;
                }
                let no_result = await this.driver.findElements(
                    By.xpath(
                        `//*[@id="message"][@class="style-scope ytd-message-renderer"]`
                    )
                )
                // if (no_result) {
                //     break;
                // }
                console.log('search ' + i)
                await this.driver.executeScript(`window.scrollTo(0,${ScrollSearch} );`);
                ScrollSearch += 5000;
                await this.driver.sleep(getRndInteger(2000, 3000));
                if (i >= 10) break;
            }

            if (!isFound) {
                console.log('search notfound')
                return;
            }
            await this.driver.findElement(By.xpath(`//a[contains(@href,'${videoId}')]`)).click()
            await this.driver.sleep(getRndInteger(4000, 5000));
            const getCurrentUrl = await this.driver.getCurrentUrl();
            console.log("getCurrentUrl", getCurrentUrl)
            if (!getCurrentUrl.includes(videoId)) {
                return;
            }
            this.watchingTime = 0
            do {
                await this.checkAdsYoutube();
                const ads = await this.driver.findElements(
                    By.xpath("//div[contains(@class,'ytp-ad-player-overlay')]")
                );
                if (ads.length == 0) {
                    var waiting = getRndInteger(2000, 5000)
                    await this.driver.sleep(waiting);
                    await this.changeQuality();
                    this.watchingTime = this.watchingTime + waiting;
                }
                console.log('watchingTime ' + this.watchingTime + " dari " + watchingTimeLimit)
                console.log('watching ' + this.watchingTime >= watchingTimeLimit)
            } while (this.watchingTime <= watchingTimeLimit);
            return;
            // }
        } catch (error) {
            console.log(error);
            return
        }

    }
    async changeQuality() {
        try {
            if (this.Qualityvideo144 == true) {
                return
            }
            let videoQuality = await this.driver.findElements(By.css(`button.ytp-button.ytp-settings-button`));
            if (videoQuality.length > 0) {
                await this.driver.findElement(By.css(`button.ytp-button.ytp-settings-button`)).click();
                await this.driver.sleep(getRndInteger(1000, 2000));
                await this.driver.findElement(By.xpath(`//div[contains(text(),'Quality')]`)).click();
                await this.driver.sleep(getRndInteger(1000, 2000));
                const haveQuality144 = await this.driver.findElements(By.xpath(`//span[contains(text(),'144p')]`));
                const haveQuality360 = await this.driver.findElements(By.xpath(`//span[contains(text(),'360p')]`));
                if (haveQuality144.length > 0) {
                    await this.driver.findElement(By.xpath(`//span[contains(text(),'144p')]`)).click();
                    await this.driver.sleep(getRndInteger(1000, 2000));
                    this.Qualityvideo144 = true;
                } else if (haveQuality360.length > 0) {
                    await this.driver.findElement(By.xpath(`//span[contains(text(),'360p')]`)).click();
                    await this.driver.sleep(getRndInteger(1000, 2000));
                    this.Qualityvideo144 = true;
                }

            }
            console.log('quality video ', videoQuality.length)
        } catch (error) {
            console.log("changeQuality", error)
            return
        }
    }
    async checkAdsYoutube() {
        try {
            let msg = "Ads Not Found";
            let dataAds = await this.driver.findElements(
                By.xpath("//div[contains(@class,'ytp-ad-player-overlay')]")
            );
            if (dataAds.length > 0) {
                msg = "Ads Found";
                let btn_skip_ads = By.xpath(
                    '//span[@class="ytp-ad-skip-button-container"]["style=opacity:0.5;"]'
                );
                var das = await this.driver.wait(until.elementLocated(btn_skip_ads), 30000, "not found skip ads", 1000);
                if (das) {
                    let findBtnSkipAds = this.driver.findElement(btn_skip_ads);
                    let readyToSkip = await this.driver.wait(until.elementIsVisible(findBtnSkipAds), 30000);
                    if (readyToSkip) {
                        console.log("ads Click");
                        findBtnSkipAds.click();
                    } else {
                        return
                    }
                }
            }
        } catch (error) {
            console.log("checkAdsYoutube Err", error);
            return
        }
    }
    async removeDrive() {
        if (this.driver == null) {
            return;
        }
        await this.driver.quit();
        console.log('s', this.userdir)
        // rimraf.windowsSync(this.userdir);
    }
}
// const urlList = [
//     { keyword: "digitopupstore.com", url: 'https://digitopupstore.com/', type: "google" },
//     { keyword: "afanlogamlestari", url: 'https://afanlogamlestari.co.id/', type: "google" },
//     { keyword: "tutorialkodingku.com", url: 'https://tutorialkodingku.com', type: "google" },
//     { keyword: "Cara Membuat Aplikasi TrackingApps", url: 'https://www.youtube.com/watch?v=4W__cLYipXw', type: "youtube" },
//     { keyword: "surya heho Cara Membuat Aplikasi TrackingApps", url: 'https://www.youtube.com/watch?v=4W__cLYipXw', type: "youtube" },
//     { keyword: "digitop up", url: 'https://digitopupstore.com/', type: "google" },
//     { keyword: "Cara Membuat Aplikasi TrackingApps", url: 'https://www.youtube.com/watch?v=4qdloLwFTKI', type: "youtube" },
//     { keyword: "digitopupstore.com", url: 'https://digitopupstore.com/', type: "google" },
//     { keyword: "Cara Membuat Aplikasi TrackingApps suryaheho", url: 'https://www.youtube.com/watch?v=DKb284no7aE', type: "youtube" },
//     { keyword: "digitop up", url: 'https://digitopupstore.com/', type: "google" },
//     // { keyword: "https://www.instagram.com/digitopupstore/", url: 'digitopupstore.com', type: "backlink" },
//     // { keyword: "https://www.facebook.com/Digitopupstore/", url: 'digitopupstore.com', type: "backlink" },
// ]
const run = async () => {
    // do {
    try {
        const resp = await axios.get(`https://api.npoint.io/670f5527b2d722e4d2bf`);
        var urlList = resp.data;
        const url = urlList[Math.floor(Math.random() * urlList.length)]
        // const proxy = await getProxyFree();
        console.log('url', JSON.stringify(url))
        const Drive = new DriveOtomatis({ url: '', username: 'surya432', password: 'surya4321' });
        // const Drive = new DriveOtomatis({ url: proxy, username: 'surya123-1', password: 'surya432' });
        // await Drive.myIp();
        if (url.type == 'google') {
            await Drive.SeoWebsite(url);
        } else if (url.type == 'backlink') {
            await Drive.SeoSosmed(url);
        } else if (url.type == 'youtube') {
            await Drive.SeoYoutube(url);
        }
        await Drive.removeDrive();

    } catch (error) {
        console.log(error);
    } finally {
        if (process.env.PRODUCTION) {
            run()
        }
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
