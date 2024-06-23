require('dotenv').config();
const { default: axios } = require("axios");
const { BrowserDriver } = require("./BrowserDriver");
const run = async () => {
    var DriveBrowser = null;
    // do {
    try {
        const resp = await axios.get(`https://api.npoint.io/2d3d4d70b0f493e0d2ca`);
        var urlList = resp.data;
        const url = urlList[Math.floor(Math.random() * urlList.length)];
        // const url = { keyword: "digitopupstore.com", url: 'https://digitopupstore.com/', type: "direct" }
        // const proxy = await getProxyFree();
        // console.log("sta", JSON.stringify(url));
        // Drive = new DriveOtomatis({ url: proxy, username: 'surya123-1', password: 'surya432' });
        // await Drive.myIp();
        DriveBrowser = new BrowserDriver({
            url: url.proxy ?? "",
            username: url.proxyusername ?? "",
            password: url.proxypassword ?? "",
        });
        if (url.type == "google") {
            await DriveBrowser.SeoWebsite(url);
        }
        if (url.type == "direct") {
            await DriveBrowser.WebsiteDirect(url);
        }
        if (url.type == "backlink") {
            await DriveBrowser.SeoSosmed(url);
        }
        if (url.type == "youtube") {
            await DriveBrowser.SeoYoutube(url);
        }
        await DriveBrowser.removeDrive()
    } catch (error) {
        console.error("error run ", error);
    } finally {
        run()
    }
    // } while (true);
};
// run()
setTimeout(()=>run(),20000);
