import {Locator, Page} from "@playwright/test";

export  class ProductPage{
    page: Page;
    productNameLabel: Locator;
    unitPriceLocator: Locator;
    addToCartButtonLocator: Locator;
    addToFavButtonLocator: Locator;
    alertLocator: Locator;
    goToCartButtonLocator: Locator;


    constructor(page: Page) {
        this.page = page;
        this.productNameLabel = this.page.locator('[data-test="product-name"]');
        this.unitPriceLocator = this.page.locator('[data-test="unit-price"]');
        this.addToCartButtonLocator = this.page.locator('[data-test="add-to-cart"]');
        this.addToFavButtonLocator = this.page.locator('[data-test="add-to-favorites"]');
        this.alertLocator = this.page.getByRole('alert', { name: 'Product added to shopping cart.' });
        this.goToCartButtonLocator= this.page.getByTestId("nav-cart");

    }

    async clickAddToCart() {
        await this.addToCartButtonLocator.click();
    }

    async goToCart() {
        await this.goToCartButtonLocator.click();
    }
}

