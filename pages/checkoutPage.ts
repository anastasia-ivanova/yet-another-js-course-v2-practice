import {Locator, Page} from "@playwright/test";

export  class CheckoutPage {
    page: Page;
    productQuantityLocator: Locator;
    productTitleInCartLocator: Locator;
    proceedButtonLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productQuantityLocator = this.page.getByTestId('product-quantity');
        this.productTitleInCartLocator = this.page.getByTestId('product-title');
        this.proceedButtonLocator = this.page.getByTestId('proceed-1');
    }


}