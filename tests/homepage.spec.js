const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { LoginPage } = require('../pages/LoginPage');

test.describe('GitHub Homepage Tests', () => {

  let homePage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    homePage = new HomePage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(
      process.env.GITHUB_USERNAME,
      process.env.GITHUB_PASSWORD
    );

    await expect(page).toHaveURL(/github.com/);
  });

  //Test Case 1: Verify options available in create new dropdown
  //Test Case 2: Verify creating a new issue
  //Test Case 3: Verify creating a new Repository
  //Test Case 4: Verify Issues landing page
  //Test Case 5: Verify pull request landing page
  
  test('Verify options available in create new dropdown', async ({ page }) => {
    await page.waitForTimeout(2000);
    await homePage.clickOnCreateNewIcon();
    await page.waitForTimeout(2000);
    await expect(homePage.optionsText).toEqual(homePage.expectedOptions);
  });

  test('Verify creating a new issue', async ({ page }) => {
    await page.waitForTimeout(2000);
    await homePage.clickOnCreateNewIcon();
    await homePage.clickOnNewIssueOption();
    await page.waitForTimeout(2000);
    await homePage.clickOnBlankIssueBtn();
    await homePage.enterTitle('Test Issue Title');
    await homePage.enterDescription('Test Issue Description');
    await homePage.clickOnCreateBtn();
    await page.waitForTimeout(4000);
    await expect(homePage.issueName).toHaveText('Test Issue Title');
    await page.waitForTimeout(2000);
  });

  test('Verify creating a new Repository', async ({ page }) => {
    await page.waitForTimeout(2000);
    await homePage.clickOnCreateNewIcon();
    await homePage.clickOnNewRepositoryOption();
    await page.waitForTimeout(2000);
    await homePage.enterRepositoryName('Test Repository Name');
    await homePage.enterRepositoryDescription('Test Repository Description');
    await page.waitForTimeout(2000);
    await homePage.clickOnCreateRepositoryBtn();
    await page.waitForTimeout(4000);
     await expect(page).toHaveURL(/.*\/Test-Repository-Name$/);
  });

test('Verify Issues landing page', async ({ page }) => {
    await page.waitForTimeout(2000);
    await homePage.clickOnIssuesIcon();
    await page.waitForTimeout(4000);
    await expect(page).toHaveURL(/.*\/issues\/assigned/);

});

test.only('Verify pull request landing page', async ({ page }) => {
    await page.waitForTimeout(2000);
    await homePage.clickOnPullRequestIcon();
    await page.waitForTimeout(4000);
    await expect(page).toHaveURL(/.*\/pulls/);

});

});