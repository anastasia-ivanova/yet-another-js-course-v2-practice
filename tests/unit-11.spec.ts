import { expect } from '@playwright/test';
import {test} from '../fixtures/allAppFixture';
import { PowerTools, SortingOption } from '../pages/home-page/fragments/sideBarFragment';

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
    test(`Test  1 & 2: Verify user can perform sorting by name ${description}`, async ({ page, homePage }) => {
        await homePage.goto();

        await homePage.sideBarFragment.selectSortingOption(option);
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
    test(`Test 3 & 4: Verify user can perform sorting by price ${description}`, async ({  page, homePage }) => {
        await homePage.goto();

        await homePage.sideBarFragment.selectSortingOption(option);
        const actualResult = await homePage.getAllProductCleanPrices();
        const expectedResult = [... actualResult].sort(sortFn);

        expect(actualResult).toEqual(expectedResult);
    });
}

test('Test 5: Verify user can filter products by category', async ({ page, homePage }) => {
    const filter: PowerTools = PowerTools.Sander;

    await homePage.goto();
    await homePage.sideBarFragment.applyPowerToolsFilter(filter);
    const actualResult = await homePage.getAllProductNames();

    expect(actualResult.every(tool => tool.includes(filter))).toBe(true);
});