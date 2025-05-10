import { test as base } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { baseConfig } from "../config/baseConfig";
import { AppManager } from "../pages/app.manager";

interface AppFixtures {
    app: AppManager;
    page: import('@playwright/test').Page; // Override default page
}

export const myLoggedInTest = base.extend<AppFixtures, { workerStorageState: string }>({
    storageState: ({ workerStorageState }, use) => use(workerStorageState),

    workerStorageState: [async ({ browser }, use) => {
        const id = myLoggedInTest.info().parallelIndex;
        const fileName = path.resolve(myLoggedInTest.info().project.outputDir, `.auth/${id}.json`);

        if (fs.existsSync(fileName)) {
            await use(fileName);
            return;
        }

        const page = await browser.newPage({ storageState: undefined });

        // Perform login
        await page.goto(baseConfig.WEB_URL + '/auth/login');

        await page.locator('[data-test="email"]').fill( baseConfig.USER_EMAIL);
        await page.locator('[data-test="password"]').fill(baseConfig.USER_PASSWORD);
        await page.locator('[data-test="login-submit"]').click();

        await page.locator('[data-test="page-title"]').waitFor({ state: 'visible' });

        await page.context().storageState({ path: fileName });
        await page.close();

        await use(fileName);
    }, { scope: 'worker' }],

    // Override context and page to apply the storageState
    page: async ({ browser, storageState }, use) => {
        const context = await browser.newContext({ storageState });
        const page = await context.newPage();
        await use(page);
        await context.close();
    },

    // Use the overridden page to create your AppManager
    app: async ({ page }, use) => {
        const app = new AppManager(page);
        await use(app);
    }
});
