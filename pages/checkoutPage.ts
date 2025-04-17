import {Locator, Page} from "@playwright/test";

export  class CheckoutPage {
    page: Page;
    productQuantityLocator: Locator;
    productTitleInCartLocator: Locator;
    proceedButtonLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productQuantityLocator = this.page.locator('[data-test="product-quantity"]');
        this.productTitleInCartLocator = this.page.locator('[data-test="product-title"]');
        this.proceedButtonLocator = this.page.locator('[data-test="proceed-1"]');
    }


}