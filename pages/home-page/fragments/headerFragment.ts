import {BaseFragment} from "../../baseFragment";
import {expect} from "@playwright/test";

export class HeaderFragment  extends BaseFragment {
    readonly signIn = this.page.getByTestId('nav-sign-in')
    readonly logo = this.page.locator('a[title="Practice Software Testing - Toolshop"]');
    readonly signedInDropDown = this.page.getByTestId("nav-menu");

    async selectSignInMenu(): Promise<void> {
        await this.signIn.click();
    }

}