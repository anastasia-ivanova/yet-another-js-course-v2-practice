import {test as setup} from '../fixtures/loggedOutAllAppFixture';
import path from "path";

const authFile = path.join(process.cwd(), '.auth', 'user.json');

setup('authenticate', async ({ app, page }) => {

    await app.loginPage.navigateTo();
    await app.loginPage.loginAs();
    await page.context().storageState({path: authFile});
});