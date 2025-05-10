
import {AppManager} from "../pages/app.manager";
import { test as base } from '@playwright/test';



interface AppFixtures{
    app: AppManager;
}

export const myLoggedInTest = base.extend<AppFixtures>({
    app: async ({page}, use) => {
        const app = new AppManager(page);
        await use(app);
    }


});



