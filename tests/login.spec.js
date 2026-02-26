const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const repoData = require('../test-data/testDataRepo.json');
const { generateUniqueName } = require('../utils/testDataHelper');

test.describe('GitHub Login Tests', () => {

//Login before each test in this block to ensure we are on the homepage for all tests  
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(process.env.GITHUB_USERNAME,process.env.GITHUB_PASSWORD);
    await expect(page).toHaveURL(/github.com/);
    await loginPage.takeScreenshot('login-success');
  }); 

  //Test Case 1: Verify profile icon is visible after login
  //Test Case 2: Verify search bar is visible after login

  test('Verify profile icon is visible after login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const profileIcon = page.getByTestId('github-avatar');
    await expect(profileIcon).toBeVisible();
    await loginPage.takeScreenshot('profile-icon-visible');
  });

  test('Verify search bar is visible after login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const searchBar = page.getByText('Type ');
    await expect(searchBar).toBeVisible();
    await loginPage.takeScreenshot('search-bar-visible');
  });

});

