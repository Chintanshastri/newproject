import { Page, Locator } from '@playwright/test';
import { readUrlFromExcel } from '../../utils/excelUtil';
import { readLocatorsFromExcel } from '../../utils/readLocators';
import { stat } from 'fs';


const locators = readLocatorsFromExcel('test-data/locators.xlsx');
const url = readUrlFromExcel('test-data/data.xlsx');

export class LoginPage {
  public page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

  }

  async login() {
    const username = getLocator(this.page, locators['username']);
    await username.fill("chintanshastri");
    console.log("enter username")
    await this.page.waitForTimeout(3000);
    const password = getLocator(this.page, locators['password']);
    await password.fill("Aa@12345678901");
    console.log("enter password")
    await this.page.waitForTimeout(3000);
    const Rbuttom = getLocator(this.page, locators['Rbuttom']);
    await Rbuttom.click();
    console.log("select button")
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
