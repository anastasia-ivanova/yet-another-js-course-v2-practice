import {Locator} from "@playwright/test";
import {baseFragment} from "../../baseFragment";


export class CheckOutStep3Fragment  extends baseFragment {

    step3proceedButtonLocator: Locator = this.page.getByTestId('proceed-3');


    async step3clickProceedToCheckout(): Promise<void> {
        await this.step3proceedButtonLocator.click();
    }

    async step3EnterBilling(state: string, postCode: string) {
        await this.page.getByTestId('state').fill(state);
        await this.page.getByTestId('postal_code').fill(postCode);
    }
}