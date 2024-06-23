// import the required libraries
const { Builder, By } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const proxyChain = require('proxy-chain');
const proxy = require('selenium-webdriver/proxy');
require('dotenv').config();

async function scraper() {

    // define your proxy details
    const proxyUsername = 'username';
    const proxyPassword = 'password';
    const ipHost = '167.99.174.59';
    const port = '80';
    const proxyUrl = `http://surya432-rotate:surya4321@p.webshare.io:80`;

    // anonymize proxyUrl
    const anonymizedProxy = await proxyChain.anonymizeProxy(proxyUrl);

    // parse anonymized proxy URL
    const parsedUrl = new URL(anonymizedProxy);

    // extract the host and port
    const proxyHost = parsedUrl.hostname;
    const proxyPort = parsedUrl.port;

    // construct the new proxy string
    const newProxyString = `${proxyHost}:${proxyPort}`;

    // set the browser options
    const options = new firefox.Options().addArguments('--headless');
    // options.setBinary('geckodriver.exe')
    // initialize the webdriver
    console.log(`das: ${process.env.SELENIUM_HUB_HOST}:${process.env.SELENIUM_HUB_PORT}`)
    const driver = new Builder()
        .forBrowser('firefox')
        .usingServer(`${process.env.SELENIUM_HUB_HOST}:${process.env.SELENIUM_HUB_PORT}`)
        // add the proxy to the webdriver
        .setProxy(proxy.manual({
            http: newProxyString,
            https: selectedProxy,

        }))
        // .setSe
        .setFirefoxOptions(options)
        .build();

    try {

        // navigate to target website
        await driver.get('https://httpbin.io/ip');

        await driver.sleep(8000);

        // get the page text content
        const pageText = await driver.findElement(By.css('body')).getText();
        console.log(pageText);
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await driver.quit();

        // clean up, forcibly close all pending connections
        await proxyChain.closeAnonymizedProxy(newProxyString, true);
    }
}

scraper();
