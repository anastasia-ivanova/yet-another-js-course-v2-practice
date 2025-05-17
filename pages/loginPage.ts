import {expect, Locator} from "@playwright/test";
import { baseConfig } from '../config/baseConfig';
import {BasePage} from "./basePage";
import {HeaderFragment} from "./home-page/fragments/headerFragment";


export  class LoginPage extends BasePage{
    readonly emailInput: Locator = this.page.getByTestId('email');
    readonly passwordInput: Locator = this.page.getByTestId('password');
    readonly submitButton: Locator = this.page.getByTestId('login-submit');
    readonly headerFragment = new HeaderFragment(this.page);

    async navigateTo(): Promise<void>{
        await this.page.goto('/auth/login');
    }

     async loginAs(username: string = baseConfig.USER_EMAIL, password: string = baseConfig.USER_PASSWORD, nameOfAUser: string = baseConfig.USER_NAME): Promise<void> {
         await this.emailInput.fill(username);
         await this.passwordInput.fill(password);
         await this.submitButton.click();

         //new
         await this.page.locator('[data-test="page-title"]').waitFor({ state: 'visible' });


         await expect(this.headerFragment.signedInDropDown).toContainText(nameOfAUser);

     }
 }