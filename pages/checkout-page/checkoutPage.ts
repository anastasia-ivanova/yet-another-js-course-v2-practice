import {expect, Locator} from "@playwright/test";
import {BasePage} from "../basePage";
import {SideBarFragment} from "../home-page/fragments/sideBarFragment";
import {CheckOutStep2Fragment} from "./fragments/checkOutStep2Fragment";
import {CheckOutStep3Fragment} from "./fragments/checkOutStep3Fragment";
import {CheckOutStep4Fragment} from "./fragments/checkOutStep4Fragment";

export enum PaymentMethods {
    BankTransfer = 'Bank Transfer',
    CashOnDelivery = 'Cash on Delivery',
    CreditCard = 'Credit Card',
    BuyNowPayLater = 'Buy Now Pay Later',
    GiftCard = 'Gift Card',
}


export  class CheckoutPage extends BasePage{
    productQuantityLocator: Locator = this.page.getByTestId('product-quantity');
    productTitleInCartLocator: Locator = this.page.getByTestId('product-title');
    productPriceInCartLocator: Locator  = this.page.getByTestId('product-price');
    proceedButtonLocator: Locator = this.page.getByTestId('proceed-1');


    step2Fragment = new CheckOutStep2Fragment(this.page);
    step3Fragment = new CheckOutStep3Fragment(this.page);
    step4Fragment = new CheckOutStep4Fragment(this.page);

    async clickProceedToCheckout():Promise<void>{
       await this.proceedButtonLocator.click();
    }

}