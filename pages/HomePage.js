const { BasePage } = require('./BasePage');

class HomePage extends BasePage {

  constructor(page) {
    super(page);
    this.createNewIcon = page.locator("//button[contains(@aria-labelledby,'global-create-menu-tooltip')]");
    this.menuOptions = page.locator("//*[contains(@aria-labelledby,'global-create-menu-tooltip')]//*[@role='menuitem']//*[contains(@class,'ActionList-ItemLabel')]");
    this.newIssueOption = page.locator("//*[@role='menuitem']//following::*[contains(text(),'New issue')]");

  }

  async clickOnCreateNewIcon() {
    await this.createNewIcon.waitFor({ state: 'visible' });
    await this.createNewIcon.click();
    const optionsCount = await this.menuOptions.count();
    const optionsText = [];
    for (let i = 0; i < optionsCount; i++) 
    {
      optionsText.push(await this.menuOptions.nth(i).textContent());
    }
    console.log('Options in Create New Dropdown:', optionsText);

    const expectedOptions = ['New issue','New repository','Import repository','New codespace','New gist','New organization','New project'];

    console.log('Expected Options:', expectedOptions);
    }

    async clickOnNewIssueOption() {
      await this.newIssueOption.waitFor({ state: 'visible' });
      await this.newIssueOption.click();
    }
}

module.exports = { HomePage };