import {Locator} from "@playwright/test";
import {BasePage} from "../basePage";
import {SideBarFragment} from "./fragments/sideBarFragment";
import {HeaderFragment} from "./fragments/headerFragment";

export  class HomePage extends BasePage{
    productCardByName:string = 'h5[data-test="product-name"]' ;
    productPriceLocator:Locator = this.page.getByTestId('product-price');

    sideBarFragment = new SideBarFragment(this.page);
    headerFragment = new HeaderFragment(this.page);

    async clickProductCardByName(productName: string){
        await this.page.locator(this.productCardByName, { hasText: productName }).click();
    }

    async clickProductCardByNumber(number: number): Promise<void>{
        await this.page.locator(this.productCardByName).nth(number).click();
    }

    async getProductNameByNumber(number:number): Promise<string>{
        return this.page.locator(this.productCardByName).nth(number).innerText();
    }

    async getProductPriceByNumber(number:number): Promise<string> {
        return  this.productPriceLocator.nth(number).innerText();
    }

    async getAllProductNames(): Promise<string[]> {
        return this.page.locator('h5[data-test="product-name"]' ).allTextContents();
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