import {Locator} from "@playwright/test";
import {BasePage} from "./basePage";

export  class ProductPage extends BasePage{

    productNameLabel: Locator = this.page.getByTestId("product-name");
    unitPriceLocator: Locator = this.page.getByTestId("unit-price");
    addToCartButtonLocator: Locator = this.page.getByTestId("add-to-cart");
    addToFavButtonLocator: Locator = this.page.getByTestId("add-to-favorites");
    alertLocator: Locator = this.page.getByRole('alert', { name: 'Product added to shopping cart.' });
    goToCartButtonLocator: Locator = this.page.getByTestId("nav-cart");


    async getProductName(): Promise<string>{
        return this.productNameLabel.innerText();
    }

    async getProductPrice(): Promise<string>{
        return this.unitPriceLocator.innerText();
    }

    async clickAddToCart() {
        await this.addToCartButtonLocator.click();
    }

    async goToCart() {
        await this.goToCartButtonLocator.click();
    }
}

