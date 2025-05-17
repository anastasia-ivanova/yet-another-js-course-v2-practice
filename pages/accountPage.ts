import {Locator} from "@playwright/test";
import {BasePage} from "./basePage";
import {HeaderFragment} from "./home-page/fragments/headerFragment";


export  class AccountPage extends BasePage{
    readonly pageTitle: Locator = this.page.getByTestId('page-title');

    headerFragment = new HeaderFragment(this.page);

    async navigateTo(): Promise<void>{
        await this.page.goto('/account');
    }

    async getPageTitle(): Promise<string> {
        return this.pageTitle.innerText();
    }
}