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
    await this.waitForVisible(this.createNewIcon);
    await this.click(this.createNewIcon);
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
  await this.click(this.newIssueOption);
}

async clickOnBlankIssueBtn() {
  await this.click(this.blankIssueBtn);
}

async enterTitle(title) {
  await this.fill(this.newIssueTitle, title);
}

async enterDescription(description) {
  return this.fill(this.newIssueDescription, description);
}

async clickOnCreateBtn() {
  await this.click(this.createBtn);

}

async clickOnNewRepositoryOption() {
  await this.click(this.newRepositoryOption);


}

async enterRepositoryName(repoName) {
  await this.fill(this.repoNameInputField, repoName);
}

async enterRepositoryDescription(repoDescription) {
  await this.scrollIntoView(this.repoDescriptionInputField);
  await this.fill(this.repoDescriptionInputField, repoDescription);

}

async clickOnCreateRepositoryBtn() {
  await this.scrollIntoView(this.createRepoBtn);
  await this.click(this.createRepoBtn);

}

async clickOnIssuesIcon() {
  await this.click(this.issuesIcon);

}

async clickOnPullRequestIcon() {
  await this.click(this.pullRequestIcon);
}

async clickOnNewBtn() {
  await this.click(this.newBtn);
}

async clickOnHomePageHamburgerMenuIcon() {
  await this.click(this.homePageHamburgerMenuIcon);

}

async clickOnHomeOptionInHamburgerMenu() {
  await this.click(this.homeOptionHamburgerMenuOption);
}

async clickOnAvatarIcon() {
  await this.click(this.avatarIcon);
}

async clickOnSignOutBtn() {
  await this.click(this.signOutBtn);

}

async clickOnSignOutConfirmationBtn() {
  await this.click(this.signOutConfirmationBtn);
}

}
module.exports = { HomePage };