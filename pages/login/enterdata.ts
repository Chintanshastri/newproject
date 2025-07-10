import { Page, Locator } from '@playwright/test';
import locator from '../locator';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.usernameInput = page.locator(locator.usernameInput);
    this.passwordInput = page.locator(locator.passwordInput);
    this.loginButton = page.locator(locator.loginButton);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}