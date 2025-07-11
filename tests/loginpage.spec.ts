import test, { chromium, expect, Page } from '@playwright/test';
import { readUrlFromExcel } from '../utils/excelUtil';
import { readLocatorsFromExcel } from '../utils/readLocators';

const locators = readLocatorsFromExcel('test-data/locators.xlsx');
const url = readUrlFromExcel('test-data/data.xlsx');

let sharedPage: Page;

test.describe.serial('Makemytrip Flow (Persistent Context)', () => {
  test('Test_001: Launch browser and close popup', async () => {
    const userDataDir = './tmp-user-data'; // A temporary browser profile directory

    const context = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      viewport: { width: 1280, height: 800 },
      ignoreHTTPSErrors: true,
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
    });

    const pages = context.pages();
    sharedPage = pages.length ? pages[0] : await context.newPage();

    // Try navigating again with persistent context
    await sharedPage.goto(url, { waitUntil: 'load' });
    console.log('Opened URL with persistent context');
    await expect(sharedPage).toHaveURL(url);

    // Close popup
    const popupclose = getLocator(sharedPage, locators['popupclose']);
    await popupclose.click();
    console.log('Popup closed');

    await context.close();
  });
});

// Utility function for locator resolution
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
