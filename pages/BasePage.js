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
  const formatted = new Date()
    .toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour12: false
    })
    .replace(/[/:, ]/g, '-');

  await this.page.screenshot({
    path: `test-results/${name}-${formatted}.png`,
    fullPage: true
  });
}

  async waitForVisible(locator) {
  await locator.waitFor({ state: 'visible' });
}

async waitForHidden(locator) {
  await locator.waitFor({ state: 'hidden' });
}

async waitForURL(url) {
  await this.page.waitForURL(url);
}

async waitForLoad() {
  await this.page.waitForLoadState('load');
}

async isVisible(locator) {
  return await locator.isVisible();
}

async isEnabled(locator) {
  return await locator.isEnabled();
}

async isChecked(locator) {
  return await locator.isChecked();
}

async doubleClick(locator) {
  await locator.dblclick();
}

async rightClick(locator) {
  await locator.click({ button: 'right' });
}

async hover(locator) {
  await locator.hover();
}

async pressKey(locator, key) {
  await locator.press(key);
}

async scrollIntoView(locator) {
  await locator.scrollIntoViewIfNeeded();
}

async scrollToBottom() {
  await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
}

}

module.exports = { BasePage };