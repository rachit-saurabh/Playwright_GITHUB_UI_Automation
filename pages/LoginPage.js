const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {

  constructor(page) {
    super(page);

    this.usernameInput = page.locator('#login_field');
    this.passwordInput = page.locator('#password');
    this.signInButton = page.locator('input[type="submit"]');
  }

  async gotoLoginPage() {
    await this.navigate('/login'); //Base URL is defined in playwright.config.js, so it will navigate to baseURL + /login
  }

  async login(username, password) {
    await this.fill(this.usernameInput, username);
    // Mask password in report
  await this.passwordInput.fill('********');
  await this.passwordInput.evaluate((el, value) => {
  el.value = value;
}, password);
    await this.click(this.signInButton);
  }

}

module.exports = { LoginPage };