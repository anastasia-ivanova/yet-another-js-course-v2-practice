import {test} from "@playwright/test";

import {baseConfig} from "../config/baseConfig";


export const myLoggedInTest = test.extend({
    loggedInPage: async ({ page }, use) => {
        await page.goto('/auth/login');
        await page.getByTestId('email').fill(baseConfig.USER_EMAIL);
        await page.getByTestId('password').fill(baseConfig.USER_PASSWORD);
        await page.getByTestId('login-submit').click();
        await use(page); 
    }
});



