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
        this.productNameLabel = this.page.getByTestId("product-name");
        this.unitPriceLocator = this.page.getByTestId("unit-price");
        this.addToCartButtonLocator = this.page.getByTestId("add-to-cart");
        this.addToFavButtonLocator = this.page.getByTestId("add-to-favorites");
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

