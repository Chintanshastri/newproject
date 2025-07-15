import { Page, Locator, expect } from '@playwright/test';
import { readUrlFromExcel } from '../../utils/excelUtil';
import { readLocatorsFromExcel } from '../../utils/readLocators';
import { readCredentialsFromExcel } from '../../utils/credentials';
import { stat } from 'fs';
import { verify } from 'crypto';

type credentials = {
  username: string;
  password: string;
};
const locators = readLocatorsFromExcel('test-data/locators.xlsx');
const url = readUrlFromExcel('test-data/data.xlsx');
//const credentials = readCredentialsFromExcel('test-data/credentials.xlsx');

export class LoginPage {
  public page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

  }


  async login() {
    //const credentials = readCredentialsFromExcel('test-data/credentials.xlsx');
    const credentials = readCredentialsFromExcel('test-data/credentials.xlsx');
    console.log(credentials.username);
    console.log(credentials.password);
    const username = getLocator(this.page, locators['username']);
    await username.fill(credentials.username);
    console.log("enter username")
    await this.page.waitForTimeout(3000);
    const Rbuttom = getLocator(this.page, locators['Rbuttom']);
    await Rbuttom.click();
    console.log("select button")
    const password = getLocator(this.page, locators['password']);
    await password.fill(credentials.password);
    console.log("enter password")
    await this.page.waitForTimeout(3000);

    const click = getLocator(this.page, locators['click']);
    await click.click();
    console.log("click button")
    await this.page.waitForTimeout(3000);
    const profileicon = getLocator(this.page, locators['profileicon']);
    await profileicon.waitFor({ state: 'visible' });

  }

  async NavigationActivation() {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async verify() {
     // Find the element and verify its text
        await this.page.locator("//span[normalize-space()='Account']").click();
        await this.page.locator("//a[normalize-space()='General settings']").click();
        const text = await this.page.locator("//h2[normalize-space()='General settings']").textContent();
        expect(text?.trim()).toBe('General settings');
        console.log("click line print", text);
        const label = this.page.locator("//div[@role='tabpanel']//p[1]");
        await expect(label).toContainText('Email Support email address');

  }

  async account(){

    const tabs = this.page.locator('//*[@id="pills-tab"]/*'); // Use actual class or attribute
    await this.page.waitForTimeout(5000);
    const expectedTabCount = 2;
    await expect(tabs).toHaveCount(expectedTabCount);
    const expectedTitles = ['App settings', 'Multi-zone settings'];
    for (let i = 0; i < expectedTitles.length; i++) {
      const actualTitle = await tabs.nth(i).innerText();

      if (actualTitle.trim() === expectedTitles[i]) {
        console.log(`✅ Tab ${i + 1} title matched: "${actualTitle}"`);
      } else {
        console.log(`❌ Tab ${i + 1} title mismatch: Expected "${expectedTitles[i]}", but got "${actualTitle}"`);
      }

      // Optional: still assert for failure if mismatch occurs
      await expect(tabs.nth(i)).toHaveText(expectedTitles[i]);
    }
  }
}

// Utility function to return locator based on type
function getLocator(page: Page, locatorData: any) {
  switch (locatorData.LocatorType.toLowerCase()) {
    case 'xpath':
      return page.locator(`xpath=${locatorData.LocatorValue}`);
    case 'css':
      return page.locator(locatorData.LocatorValue);
    case 'text':
      return page.getByText(locatorData.LocatorValue);
    default:
      throw new Error(`Unsupported locator type: ${locatorData.LocatorType}`);
  }
}
