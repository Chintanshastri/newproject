import { Page, Locator } from "@playwright/test";

export class LoginPage {
usrname: Locator;

constructor(public page: Page) {

    this.usrname = this.page.locator("//*[@id='username']");
}
}