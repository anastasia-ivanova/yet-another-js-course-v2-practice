import {BaseFragment} from "../../baseFragment";
import {Locator} from "@playwright/test";
import {PaymentMethods} from "../checkoutPage";

export class CheckOutStep4Fragment  extends BaseFragment {
    readonly step4PaymentDropdown: Locator = this.page.getByTestId('payment-method');
    readonly step4ccnfield: Locator = this.page.getByTestId('credit_card_number');
    readonly step4expDate: Locator = this.page.getByTestId('expiration_date');
    readonly step4cvv: Locator = this.page.getByTestId('cvv');
    readonly step4Name: Locator = this.page.getByTestId('card_holder_name');
    readonly step4ConfirmButton: Locator = this.page.getByTestId('finish');


    async selectPayment(paymentMethod: PaymentMethods):Promise<void> {
        await this.step4PaymentDropdown.selectOption(paymentMethod);
    }

    async enterCreditCardInfo(ccn: string, expDate: string, cvv: string, name: string):Promise<void> {
        await this.step4ccnfield.fill(ccn);
        await this.step4expDate.fill(expDate);
        await this.step4cvv.fill(cvv);
        await this.step4Name.fill(name);
        await this.step4ConfirmButton.click();
    }

    async returnStatusMessage():Promise<string>{
        return await this.page.getByTestId('payment-success-message').innerText();
    }
}
