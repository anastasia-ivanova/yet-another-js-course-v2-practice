import {Page} from "@playwright/test";

export  class HomePage{
    page: Page;
    productCardByName;
    productPriceByNumber;

    constructor(page: Page) {
        this.page = page;
        this.productCardByName =  'h5[data-test="product-name"]';
        this.productPriceByNumber = this.page.getByTestId('product-price');
    }

    async clickProductCardByName(productName: string){
        await this.page.locator(this.productCardByName, { hasText: productName }).click();
    }

    async clickProductCardByNumber(number: number){
        await this.page.locator(this.productCardByName).nth(number).click();
    }

    async getProductNameByNumber(number:number){
        return this.page.locator(this.productCardByName).nth(number).innerText();
    }

    async getProductPriceByNumber(number:number) {
        return this.productPriceByNumber.nth(number).innerText();
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