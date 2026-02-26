class BasePage {

//Other page classes like LoginPage, DashboardPage, etc., can extend this class and reuse common methods like:
//navigate
//click
//fill
//getText
//takeScreenshot
//So instead of repeating the same code in every page, you write it once here.

  constructor(page) {
    this.page = page;
  }

  //baseURL is defined in playwright.config.js, so you can just pass the path here and it will navigate to the full URL (baseURL + path)
  async navigate(path = '') {
    await this.page.goto(path);
  }

  async click(locator) {
    await locator.click();
  }

  async fill(locator, value) {
    await locator.fill(value);
  }

  async getText(locator) {
    return await locator.textContent();
  }

  async takeScreenshot(name) {
    await this.page.screenshot({
      path: `test-results/${name}-${Date.now()}.png`,fullPage: true});
  }

}

module.exports = { BasePage };