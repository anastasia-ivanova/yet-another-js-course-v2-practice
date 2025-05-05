import {Locator, Page} from "@playwright/test";
import { baseConfig } from '../config/baseConfig';
import {BasePage} from "./basePage";
import {HeaderFragment} from "./home-page/fragments/headerFragment";

export  class LoginPage extends BasePage{
    emailLocator: Locator = this.page.getByTestId("email");
    passwordFieldLocator: Locator = this.page.getByTestId("password");
    submitButtonLocator: Locator = this.page.getByTestId("login-submit");
    headerFragment = new HeaderFragment(this.page);

     async loginAs(username = baseConfig.USER_EMAIL, password = baseConfig.USER_PASSWORD): Promise<void> {
         await this.emailLocator.fill(username);
         await this.passwordFieldLocator.fill(password);
         await this.submitButtonLocator.click();

         await this.headerFragment.signedInDropDown.waitFor();
     }
 }