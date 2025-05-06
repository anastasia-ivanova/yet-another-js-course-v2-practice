import {BaseFragment} from "../../baseFragment";

export class HeaderFragment  extends BaseFragment {
    readonly signIn = this.page.getByTestId('nav-sign-in')
    readonly logo = this.page.locator('a[title="Practice Software Testing - Toolshop"]');
    readonly signedInDropDown = this.page.getByTestId('nav-menu');

    async selectSignInMenu(): Promise<void> {
        await this.signIn.click();
    }

    async clickMainLogo(): Promise<void> {
        await this.logo.click();
        await this.page.locator('p.lead').waitFor({ state: 'visible' });

    }
}