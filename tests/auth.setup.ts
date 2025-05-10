import {join} from "path";
import { test as setup } from '@playwright/test';
import {LoginPage} from "../pages/loginPage";

const authFile = join(process.cwd(), '/playwright/.auth', 'ui-user.json');

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.loginAs();

    await page.context().storageState({ path: authFile });
});