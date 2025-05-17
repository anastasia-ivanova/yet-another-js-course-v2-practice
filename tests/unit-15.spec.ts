import { expect } from '@playwright/test';
import {baseConfig} from "../config/baseConfig";
import {test} from '../fixtures/loggedOutAllAppFixture';

test('Verify 20 mocked products on the page', async ({ page , app}) => {
    const mockedProducts: any[] = [];
    await page.route(baseConfig.API_URL + '/products*', async route => {
        const response = await route.fetch();
        const json  = await response.json();


        const baseProducts = json.data;

        for (let i = 0; i < 20; i++) {
            const product = { ...baseProducts[i % baseProducts.length] };
            product.name = `Mock Product ${i + 1}`;
            mockedProducts.push(product);
        }

        json.data = mockedProducts;
        await route.fulfill({response, json});
    });
    await app.homePage.goto();


    await expect(app.homePage.genericProductNameOnCard).toHaveCount(20);
    const uiProductNames  = await app.homePage.genericProductNameOnCard.allInnerTexts();

    const mockedNames = mockedProducts.map(p => p.name);
    expect(uiProductNames).toEqual(mockedNames);
});
