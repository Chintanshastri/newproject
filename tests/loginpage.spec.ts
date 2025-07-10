import test, { test as base, expect, Page } from '@playwright/test';
import { readUrlFromExcel } from '../utils/excelUtil';
import { readLocatorsFromExcel } from '../utils/readLocators';


const locators = readLocatorsFromExcel('test-data/locators.xlsx');
const url = readUrlFromExcel('test-data/data.xlsx');

// Extend test to share page
let sharedPage: Page;

test.describe.serial('Makemytrip Flow', () => {
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    sharedPage = await context.newPage();
    await sharedPage.goto(url, { waitUntil: 'domcontentloaded' });
    console.log("Opened URL");
    await expect(sharedPage).toHaveURL(url);
  });

  // test.afterAll(async () => {
  //   await sharedPage.close();
  // });

  test('Test_001: Close popup', async () => {
    const popupclose = getLocator(sharedPage, locators['popupclose']);
    await popupclose.click();
    console.log('Popup closed');
   
  });

  test('Test_002: Click Hotels from list', async () => {
    const elements = getLocator(sharedPage, locators['optionslist']);
    const count = await elements.count();
    console.log('Total number of elements:', count);

    for (let i = 0; i < count; i++) {
      const text = await elements.nth(i).innerText();
      console.log(`Element ${i + 1}: ${text}`);
      if (text.trim() === 'Hotels') {
        await elements.nth(i).click();
        console.log(`Clicked on: ${text}`);
        break;
      }
    }
  });
//   test('Test_003: Enter place name', async ({ page }) => {
//   const checkindate = getLocator(page, locators['checkindate']); // assuming getLocator is a utility
//   await checkindate.click();

//   const today = new Date();
//   const formattedDate = today.toISOString().split('T')[0]; // e.g., '2025-07-09'

//   await checkindate.fill(formattedDate);
//   await expect(checkindate).toHaveValue(formattedDate);
// });
});

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


