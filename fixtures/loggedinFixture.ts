import { test as base } from '@playwright/test';
import path from 'path';
import { AppManager } from "../pages/app.manager";


interface AppFixtures {
    app: AppManager;
}

const authFile = path.join(process.cwd(), '.auth', 'user.json');

export const myLoggedInTest  = base.extend<AppFixtures>({

    context: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: authFile,
        });
        await use(context);
        await context.close();
    },

    page: async ({ context }, use) => {
        const page = await context.newPage();
        await use(page);
        await page.close();
    },

    app: async ({ page }, use) => {
        const app = new AppManager(page);
        await use(app);
    },

});

