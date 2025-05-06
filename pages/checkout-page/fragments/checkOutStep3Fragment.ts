import {Locator} from "@playwright/test";
import {BaseFragment} from "../../baseFragment";


export class CheckOutStep3Fragment  extends BaseFragment {

    step3proceedButtonLocator: Locator = this.page.getByTestId('proceed-3');


    async clickProceedToCheckout(): Promise<void> {
        await this.step3proceedButtonLocator.click();
    }

    async enterBilling(state: string, postCode: string): Promise<void> {
        await this.page.getByTestId('state').fill(state);
        await this.page.getByTestId('postal_code').fill(postCode);
    }
}