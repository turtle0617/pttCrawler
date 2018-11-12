var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;

var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

var driver = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
  .build();


(async function name() {
  await driver.get('https://event.mi.com/tw/sales2018/super-sales-day/?utm_source=pc');
  await driver.findElement({ xpath: '//*[@id="sec_1"]/div/div/ul/li/ol/li[1]/a/span' }).click();
  await driver.findElement({ xpath: '//*[@id="username"]' }).sendKeys('qqaz50313@gmail.com');
  await driver.findElement({ xpath: '//*[@id="pwd"]' }).sendKeys('');
  // await driver.findElement({ xpath: '//*[@id="login-button"]' }).click();
  setTimeout(function () {
     driver.findElement({ xpath: '//*[@id="login-button"]' }).click();
     setTimeout(function () {
        driver.findElement({ xpath: '//*[@id="sec_1"]/div/div/ul/li/ol/li[1]/a/span' }).click();
     }, 1000);
  }, 5000);

})();
