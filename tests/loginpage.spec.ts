
import test, { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login/enterdata';


let loginPage: LoginPage
let sharedPage: Page; // Declare sharedPage here

test.describe.serial('Ronspot login', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await loginPage.NavigationActivation();
    console.log("Opened URL");
  });

  test('Test_001: Close popup', async ({ page }) => {
    await loginPage.login();
    await loginPage.clickonaccount();
    await loginPage.verifytabtitle();
    await loginPage.multizonesettings();
  });

});



