require('dotenv').config();
const { default: axios } = require("axios");
const { BrowserDriver } = require("./BrowserDriver");
const run = async () => {
    // do {
    try {
        const resp = await axios.get(`https://api.npoint.io/670f5527b2d722e4d2bf`);
        var urlList = resp.data;
        const url = urlList[Math.floor(Math.random() * urlList.length)];
        // const url = { keyword: "digitopupstore.com", url: 'https://digitopupstore.com/', type: "google" }
        // const proxy = await getProxyFree();
        // console.log("sta", JSON.stringify(url));
        const Drive = new BrowserDriver({
            url: "",
            username: "surya432",
            password: "surya4321",
        });
        // const Drive = new DriveOtomatis({ url: proxy, username: 'surya123-1', password: 'surya432' });
        // await Drive.myIp();
        if (url.type == "google") {
            await Drive.SeoWebsite(url);
        } else if (url.type == "backlink") {
            await Drive.SeoSosmed(url);
        } else if (url.type == "youtube") {
            await Drive.SeoYoutube(url);
        }
        await Drive.removeDrive();
    } catch (error) {
        console.error("error run ", error);
    } finally {
        // run()
    }
    // } while (true);
};
// run()
run();
