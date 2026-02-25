const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('GitHub Login Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(
      process.env.GITHUB_USERNAME,
      process.env.GITHUB_PASSWORD
    );
    await expect(page).toHaveURL(/github.com/);
  }); 

  //Test Case 1: Verify profile icon is visible after login
  //Test Case 2: Verify search bar is visible after login

  test('Verify profile icon is visible after login', async ({ page }) => {
    const profileIcon = page.getByTestId('github-avatar');
    await expect(profileIcon).toBeVisible();
  });

  test('Verify search bar is visible after login', async ({ page }) => {
    const searchBar = page.getByText('Type ');
    await expect(searchBar).toBeVisible();
  });

});

