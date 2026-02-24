const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {

  constructor(page) {
    super(page);

    this.usernameInput = page.locator('#login_field');
    this.passwordInput = page.locator('#password');
    this.signInButton = page.locator('input[type="submit"]');
  }

  async gotoLoginPage() {
    await this.navigate('/login');
  }

  async login(username, password) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.signInButton);
  }

}

module.exports = { LoginPage };