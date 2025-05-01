import {Page} from "@playwright/test";

export  class HomePage{
    page: Page;
    productCardByName;

    constructor(page: Page) {
        this.page = page;
        this.productCardByName =  'h5[data-test="product-name"]';
    }

    async clickProductCardByName(productName: string){
        await this.page.locator(this.productCardByName, { hasText: productName }).click();
    }

    async getAllProductNames(): Promise<string[]> {
        return await this.page.locator('h5[data-test="product-name"]' ).allTextContents();
    }

    async getAllProductCleanPrices(): Promise<number[]> {
        const cleanPrices: number[] = [];
        for (const price of await this.page.getByTestId('product-price').allTextContents()) {
            if (price) {
                const cleanPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
                            cleanPrices.push(cleanPrice);
            }
        }
        return cleanPrices;
    }


}