class BasePage {

  constructor(page) {
    this.page = page;
  }

  async navigate(path = 'https://github.com/login') {
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

}

module.exports = { BasePage };