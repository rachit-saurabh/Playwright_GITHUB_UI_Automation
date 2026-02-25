const { BasePage } = require('./BasePage');
const repoData = require('../test-data/testDataRepo.json');
const { generateUniqueName } = require('../utils/testDataHelper');

class HomePage extends BasePage {

  constructor(page) {
    super(page);
    this.createNewIcon = page.locator("//button[contains(@aria-labelledby,'global-create-menu-tooltip')]");
    this.menuOptions = page.locator("//*[contains(@aria-labelledby,'global-create-menu-tooltip')]//*[@role='menuitem']//*[contains(@class,'ActionList-ItemLabel')]");
    this.newIssueOption = page.locator("//*[@role='menuitem']//following::*[contains(text(),'New issue')]");
    this.newRepositoryOption = page.locator("//*[@role='menuitem']//following::*[contains(text(),'New repository')]");
    this.blankIssueBtn = page.locator("(//a[contains(@class,'ActionList-ActionListContent')])[1]");
    this.newIssueTitle = page.getByPlaceholder('Title');
    this.newIssueDescription = page.getByPlaceholder('Type your description here…');
    this.createBtn = page.getByTestId('create-issue-button');
    this.issueName = page.getByTestId('issue-title');
    this.repoNameInputField = page.locator('#repository-name-input');
    this.repoDescriptionInputField = page.locator("//input[@name='Description']");
    this.createRepoBtn = page.locator("//span[text()='Create repository']");
    this.issuesIcon = page.locator("//a[@data-component='IconButton' and @href='/issues']");
    this.pullRequestIcon = page.locator("//a[@data-component='IconButton' and @href='/pulls']");
    this.newBtn = page.locator("(//span[@class='Button-label' and contains(text(),'New')])[1]");
    this.homePageHamburgerMenuIcon = page.locator("//button[@data-component='IconButton' and @aria-haspopup='dialog']");
    this.homeOptionHamburgerMenuOption = page.locator("//span[contains(@class,'ActionListSubContent')]//span[contains(text(),'Home')]"); 
    this.findRepositoryInputField = page.locator("#dashboard-repos-filter-left");
    this.avatarIcon = page.getByTestId('github-avatar');
    this.signOutBtn = page.locator("//span[contains(text(),'Sign out')]");
    this.signOutConfirmationBtn = page.getByLabel("Sign out of rachit-saurabh");

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
  await this.newIssueOption.click();
}

async clickOnBlankIssueBtn() {
  await this.blankIssueBtn.click();
}

async enterTitle(title) {
  await this.newIssueTitle.fill(title);
}

async enterDescription(description) {
  return this.newIssueDescription.fill(description);
}

async clickOnCreateBtn() {
  await this.createBtn.click();

}

async clickOnNewRepositoryOption() {
  await this.newRepositoryOption.click();

}

async enterRepositoryName(repoName) {
  await this.repoNameInputField.fill(repoName);
}

async enterRepositoryDescription(repoDescription) {
  await this.repoDescriptionInputField.scrollIntoViewIfNeeded();
  await this.repoDescriptionInputField.fill(repoDescription);

}

async clickOnCreateRepositoryBtn() {
  await this.createRepoBtn.scrollIntoViewIfNeeded();
  await this.createRepoBtn.click();

}

async clickOnIssuesIcon() {
  await this.issuesIcon.click();

}

async clickOnPullRequestIcon() {
  await this.pullRequestIcon.click();
}

async clickOnNewBtn() {
  await this.newBtn.click();
}

async clickOnHomePageHamburgerMenuIcon() {
  await this.homePageHamburgerMenuIcon.click();

}

async clickOnHomeOptionInHamburgerMenu() {
  await this.homeOptionHamburgerMenuOption.click();
}

async clickOnAvatarIcon() {
  await this.avatarIcon.click();
}

async clickOnSignOutBtn() {
  await this.signOutBtn.click();

}

async clickOnSignOutConfirmationBtn() {
  await this.signOutConfirmationBtn.click();
}

}
module.exports = { HomePage };