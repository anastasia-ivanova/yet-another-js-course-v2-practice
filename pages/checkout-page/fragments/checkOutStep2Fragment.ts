import {baseFragment} from "../../baseFragment";
import {Locator} from "@playwright/test";

export class CheckOutStep2Fragment  extends baseFragment {
    readonly step2proceedButtonLocator: Locator = this.page.getByTestId('proceed-2');
    readonly youaresignedIntext = this.page.locator('p.ng-star-inserted');

    async step2ClickProceedToCheckout():Promise<void> {
        await this.step2proceedButtonLocator.click();
    }

    async step2IsUserSignedIn(): Promise<boolean>{
        const text = await this.youaresignedIntext.innerText();
        return text.includes('you are already logged in.');
    }
}