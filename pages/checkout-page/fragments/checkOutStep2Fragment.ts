import {baseFragment} from "../../baseFragment";
import {expect, Locator} from "@playwright/test";

export class CheckOutStep2Fragment  extends baseFragment {
    readonly step2proceedButtonLocator: Locator = this.page.getByTestId('proceed-2');
    readonly youaresignedIntext = this.page.locator('p.ng-star-inserted');

    async step2ClickProceedToCheckout():Promise<void> {
        await this.step2proceedButtonLocator.click();
    }

    async step2CheckIfUserSignedIn(){
        await expect(this.youaresignedIntext).toHaveText('you are already logged in.');
    }
}