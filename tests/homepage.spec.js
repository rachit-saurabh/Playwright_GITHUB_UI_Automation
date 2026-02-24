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

  test('Verify options available in create new dropdown', async ({ page }) => {
    await page.waitForTimeout(2000);
    await homePage.clickOnCreateNewIcon();
    await page.waitForTimeout(2000);
    await expect(homePage.optionsText).toEqual(homePage.expectedOptions);
  });

  test('Verify new issue modal opens when clicking on new issue option', async ({ page }) => {
    await page.waitForTimeout(2000);
    await homePage.clickOnCreateNewIcon();
    await homePage.clickOnNewIssueOption();
    await page.waitForTimeout(2000);
  });

});