import {Locator} from "@playwright/test";
import {baseFragment} from "../../baseFragment";


export class CheckOutStep3Fragment  extends baseFragment {

    step3proceedButtonLocator: Locator = this.page.getByTestId('proceed-3');


    async step3clickProceedToCheckout(): Promise<void> {
        await this.step3proceedButtonLocator.click();
    }

    async step3EnterBilling(anyVal1: string, anyVal2: string) {
        await this.page.getByTestId('state').fill(anyVal1);
        await this.page.getByTestId('postal_code').fill(anyVal2);
    }
}