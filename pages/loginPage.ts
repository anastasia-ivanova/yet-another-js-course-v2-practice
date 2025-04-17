import {Locator, Page} from "@playwright/test";

export  class LoginPage{
    page: Page;
    emailLocator: Locator;
    passwordFieldLocator: Locator;
    submitButtonLocator: Locator;
    constructor(page: Page) {
        this.page = page;
        this.emailLocator = this.page.locator('[data-test="email"]');
        this.passwordFieldLocator = this.page.locator('[data-test="password"]');
        this.submitButtonLocator = this.page.locator('[data-test="login-submit"]');
    }

     async login(username: string, password: string): Promise<void> {
         await this.emailLocator.fill(username);
         await this.passwordFieldLocator.fill(password);
         await this.submitButtonLocator.click();
     }
 }