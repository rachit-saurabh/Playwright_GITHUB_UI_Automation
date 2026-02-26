const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { LoginPage } = require('../pages/LoginPage');
const repoData = require('../test-data/testDataRepo.json');
const { generateUniqueName } = require('../utils/testDataHelper');

test.describe('GitHub Homepage Tests', () => {

  let homePage;

  // Login before each test in this block to ensure we are on the homepage for all tests
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

  //HomePage Test Cases:-
  //Test Case 1: Verify options available in create new dropdown
  //Test Case 2: Verify creating a new issue from create new dropdown
  //Test Case 3: Verify creating a new Repository from create new dropdown
  //Test Case 4: Verify Issues landing page from homepage
  //Test Case 5: Verify pull request landing page from homepage
  //Test Case 6: Verify creating a new Repository from New Button
  //Test Case 7: Verify Logout functionality from homepage

  test('Verify options available in create new dropdown', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.waitForTimeout(2000);
    await homePage.clickOnCreateNewIcon();
    await page.waitForTimeout(2000);
    await expect(homePage.optionsText).toEqual(homePage.expectedOptions);
    await loginPage.takeScreenshot('create-new-dropdown-options');
  });

  test('Verify creating a new issue', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.waitForTimeout(2000);
    await homePage.clickOnCreateNewIcon();
    await homePage.clickOnNewIssueOption();
    await page.waitForTimeout(2000);
    await homePage.clickOnBlankIssueBtn();
    const issueName1 = generateUniqueName(repoData.issueName);
    await homePage.enterTitle(issueName1);
    await homePage.enterDescription(repoData.issueDescription);
    await homePage.clickOnCreateBtn();
    await page.waitForTimeout(4000);
    await expect(homePage.issueName).toHaveText(issueName1);
    await loginPage.takeScreenshot('new-issue-created');
    await page.waitForTimeout(2000);
  });

  test('Verify creating a new Repository', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.waitForTimeout(2000);
    await homePage.clickOnCreateNewIcon();
    await homePage.clickOnNewRepositoryOption();
    await page.waitForTimeout(2000);
    const repoName1 = generateUniqueName(repoData.repoName);
    await homePage.enterRepositoryName(repoName1);
    await homePage.enterRepositoryDescription(repoData.repoDescription);
    await page.waitForTimeout(2000);
    await homePage.clickOnCreateRepositoryBtn();
    await page.waitForTimeout(4000);
    await expect(page).toHaveURL(new RegExp(`${repoName1}$`));
    await loginPage.takeScreenshot('new-repo-created');
  });

test('Verify Issues landing page', async ({ page }) => {
  const loginPage = new LoginPage(page);
    await page.waitForTimeout(2000);
    await homePage.clickOnIssuesIcon();
    await page.waitForTimeout(4000);
    await expect(page).toHaveURL(/.*\/issues\/assigned/);
    await loginPage.takeScreenshot('issues-landing-page');

});

test('Verify pull request landing page', async ({ page }) => {
  const loginPage = new LoginPage(page);
    await page.waitForTimeout(2000);
    await homePage.clickOnPullRequestIcon();
    await page.waitForTimeout(4000);
    await expect(page).toHaveURL(/.*\/pulls/);
    await loginPage.takeScreenshot('pull-request-landing-page');

});

test('Verify creating a new Repository from New Button', async ({ page }) => {
  const loginPage = new LoginPage(page);
    await homePage.clickOnNewBtn();
    await page.waitForTimeout(2000);
    const repoName1 = generateUniqueName(repoData.repoName);
    await homePage.enterRepositoryName(repoName1);
    await homePage.enterRepositoryDescription(repoData.repoDescription);
    await page.waitForTimeout(2000);
    await homePage.clickOnCreateRepositoryBtn();
    await page.waitForTimeout(4000);
    await expect(page).toHaveURL(new RegExp(`${repoName1}$`));
    await loginPage.takeScreenshot('new-repo-created-from-new-btn');

  });

  test('Verify Logout functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.waitForTimeout(2000);
    await homePage.clickOnAvatarIcon();
    await homePage.clickOnSignOutBtn();
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(/github.com\/logout/);
    await homePage.clickOnSignOutConfirmationBtn();
    await page.waitForTimeout(4000);
    await expect(page).toHaveURL(/github.com/);
    await loginPage.takeScreenshot('logout-success');
  });

});