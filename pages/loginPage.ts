import {Locator, Page} from "@playwright/test";
import { baseConfig } from '../config/baseConfig';
import {BasePage} from "./basePage";

export  class LoginPage extends BasePage{
    emailLocator: Locator = this.page.getByTestId("email");
    passwordFieldLocator: Locator = this.page.getByTestId("password");
    submitButtonLocator: Locator = this.page.getByTestId("login-submit");

     async loginAs(username = baseConfig.USER_EMAIL, password = baseConfig.USER_PASSWORD): Promise<void> {
         await this.emailLocator.fill(username);
         await this.passwordFieldLocator.fill(password);
         await this.submitButtonLocator.click();
     }
 }