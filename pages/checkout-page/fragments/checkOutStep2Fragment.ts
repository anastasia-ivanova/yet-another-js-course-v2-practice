import {BaseFragment} from "../../baseFragment";
import {expect, Locator} from "@playwright/test";

export class CheckOutStep2Fragment  extends BaseFragment {
    readonly step2ProceedButtonLocator: Locator = this.page.getByTestId('proceed-2');
    readonly youAreSignedIntext = this.page.locator('p.ng-star-inserted');

    async clickProceedToCheckout():Promise<void> {
        await this.step2proceedButtonLocator.click();
    }

    async checkIfUserSignedIn(){
        await expect(this.youaresignedIntext).toHaveText('you are already logged in.');
    }
}