import {BaseFragment} from "../../baseFragment";
import {expect, Locator} from "@playwright/test";

export class CheckOutStep2Fragment  extends BaseFragment {
    readonly step2ProceedButtonLocator: Locator = this.page.getByTestId('proceed-2');
    readonly youAreSignedInText = this.page.locator('p.ng-star-inserted');

    async clickProceedToCheckout():Promise<void> {
        await this.step2ProceedButtonLocator.click();
    }

    async checkIfUserSignedIn(username:string):Promise<void> {
        await expect(this.youAreSignedInText).toHaveText(`Hello ${username}, you are already logged in. You can proceed to checkout.`);
    }
}