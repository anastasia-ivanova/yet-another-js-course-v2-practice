import {Locator, Page} from "@playwright/test";
import { baseConfig } from '../config/baseConfig';

export  class LoginPage{
    page: Page;
    emailLocator: Locator;
    passwordFieldLocator: Locator;
    submitButtonLocator: Locator;
    constructor(page: Page) {
        this.page = page;
        this.emailLocator = this.page.getByTestId("email");
        this.passwordFieldLocator = this.page.getByTestId("password");
        this.submitButtonLocator = this.page.getByTestId("login-submit");
    }

     async login(username: string, password: string): Promise<void> {
         await this.emailLocator.fill(username);
         await this.passwordFieldLocator.fill(password);
         await this.submitButtonLocator.click();
     }

     async loginWithUser(): Promise<void>{
        await this.emailLocator.fill(baseConfig.USER_EMAIL);
        await this.passwordFieldLocator.fill(baseConfig.USER_PASSWORD);
        await this.submitButtonLocator.click();
     }
 }