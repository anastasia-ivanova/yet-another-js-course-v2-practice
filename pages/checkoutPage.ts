import {expect, Locator, Page} from "@playwright/test";

export enum PaymentMethods {
    BankTransfer = 'Bank Transfer',
    CashOnDelivery = 'Cash on Delivery',
    CreditCard = 'Credit Card',
    BuyNowPayLater = 'Buy Now Pay Later',
    GiftCard = 'Gift Card',
}


export  class CheckoutPage {
    page: Page;
    productQuantityLocator: Locator;
    productTitleInCartLocator: Locator;
    productPriceInCartLocator: Locator;
    proceedButtonLocator: Locator;
    step2proceedButtonLocator: Locator;
    step3proceedButtonLocator: Locator;
    step3PaymentDropdown: Locator;
    step4ccnfield: Locator;
    step4expDate: Locator;
    step4cvv: Locator;
    step4Name: Locator;
    step4ConfirmButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productQuantityLocator = this.page.getByTestId('product-quantity');
        this.productTitleInCartLocator = this.page.getByTestId('product-title');
        this.proceedButtonLocator = this.page.getByTestId('proceed-1');
        this.step2proceedButtonLocator = this.page.getByTestId('proceed-2');
        this.step3proceedButtonLocator = this.page.getByTestId('proceed-3');
        this.productPriceInCartLocator = this.page.getByTestId('product-price');
        this.step3PaymentDropdown = this.page.getByTestId('payment-method');
        this.step4ccnfield = this.page.getByTestId('credit_card_number');
        this.step4expDate = this.page.getByTestId('expiration_date');
        this.step4cvv = this.page.getByTestId('cvv');
        this.step4Name = this.page.getByTestId('card_holder_name');
        this.step4ConfirmButton = this.page.getByTestId('finish');
    }

    async expectOnCheckoutPage() {
        await expect(this.page).toHaveURL(/checkout/);
    }

    async clickProceedToCheckout():Promise<void>{
       await this.proceedButtonLocator.click();
       
    }

    async step2ClickProceedToCheckout():Promise<void>{
        await this.step2proceedButtonLocator.click();
        
     }

    async step3clickProceedToCheckout():Promise<void>{
        await this.step3proceedButtonLocator.click();
        
     }


    async step2IsUserSignedIn(): Promise<boolean>{ 
        const text = await this.page.locator('p.ng-star-inserted').innerText();
        return text.includes('you are already logged in.');
    }

    async step3EnterBilling(anyVal1:string, anyVal2:string){
        await this.page.getByTestId('state').fill(anyVal1);
        await this.page.getByTestId('postal_code').fill(anyVal2);
    }

    async step4SelectPayment(paymentMethod: PaymentMethods){
       await this.step3PaymentDropdown.selectOption(paymentMethod);
    }

    async step4EnterCreditCardInfo(ccn: string, expDate:string, cvv:string, name:string){
        await this.step4ccnfield.fill(ccn);
        await this.step4expDate.fill(expDate);
        await this.step4cvv.fill(cvv);
        await this.step4Name.fill(name);
        await this.step4ConfirmButton.click();
    }

    async returnStatusMessage(){
       return await this.page.getByTestId('payment-success-message').innerText();
    }


}