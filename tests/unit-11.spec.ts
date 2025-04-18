import { test, expect } from '@playwright/test';
import {LoginPage} from "../pages/loginPage";
import {HomePage} from "../pages/homePage";
import {ProductPage} from "../pages/productPage";
import {CheckoutPage} from "../pages/checkoutPage";
import {PowerTools, SideBar, SortingOption} from "../pages/sideBar";

const sortingCasesName = [
    {
        option: SortingOption.NameAsc,
        description: 'Name (A - Z)',
        sortFn: (a: string, b: string) => a.localeCompare(b),
    },
    {
        option: SortingOption.NameDesc,
        description: 'Name (Z - A)',
        sortFn: (a: string, b: string) => b.localeCompare(a),
    },
];


for (const { option, description, sortFn } of sortingCasesName) {
    test(`Test  1 & 2: Verify user can perform sorting by name ${description}`, async ({ page }) => {
        const homePage = new HomePage(page);
        const sideBar = new SideBar(page);
        await page.goto('/');

        await sideBar.selectSortingOption(option);
        await  page.waitForResponse(resp => resp.url().includes('/products?sort=name,') && resp.status() === 200 )
        //await page.waitForTimeout(5000)
        const actualResult = await homePage.getAllProductNames();
        const expectedResult = [... actualResult].sort(sortFn);

        expect(actualResult).toEqual(expectedResult);
    });
}

const sortingCasesPrice = [
    {
        option: SortingOption.PriceDesc,
        description: 'Price (High - Low)',
        sortFn: (a: number, b: number) => b - a,
    },
    {
        option: SortingOption.PriceAsc,
        description: 'Price (Low - High)',
        sortFn: (a: number, b: number) => a - b,
    },
];


for (const { option, description, sortFn } of sortingCasesPrice) {
    test(`Test 3 & 4: Verify user can perform sorting by price ${description}`, async ({ page }) => {
        const homePage = new HomePage(page);
        const sideBar = new SideBar(page);
        await page.goto('/');

        await sideBar.selectSortingOption(option);
        await  page.waitForResponse(resp => resp.url().includes('/products?sort=price') && resp.status() === 200 )
        //await page.waitForTimeout(5000)
        const actualResult = await homePage.getAllProductCleanPrices();
        const expectedResult = [... actualResult].sort(sortFn);

        expect(actualResult).toEqual(expectedResult);
    });
}

test('Test 5: Verify user can filter products by category', async ({ page }) => {
    const homePage = new HomePage(page);
    const sideBar = new SideBar(page);
    const filter = PowerTools.Sander;


    await page.goto('/');
    await sideBar.applyPowerToolsFilter(filter);
    await page.waitForTimeout(5000)
    const actualResult = await homePage.getAllProductNames();

    expect(actualResult.every(tool => tool.includes(filter))).toBe(true);
});