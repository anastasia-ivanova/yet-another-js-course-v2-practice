import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/home-page/homePage';
import { SideBar } from '../pages/home-page/fragments/sideBar';
import { CheckoutPage } from '../pages/checkoutPage';

import { ProductPage } from '../pages/productPage';
import { LoginPage } from '../pages/loginPage';

type MyFixtures = {
  homePage: HomePage;
  sideBar: SideBar;
  checkoutPage: CheckoutPage;
  loginPage: LoginPage;
  productPage: ProductPage
  loggedInAppPage: LoginPage;
};

export const test = baseTest.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  sideBar: async ({ page }, use) => {
    const sideBar = new SideBar(page);
    await use(sideBar);
  },
  productPage: async({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage)
  },
  checkoutPage: async({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
  loggedInAppPage: async ({ page }, use) => {
    const loggedInAppPage = new LoginPage(page);
    await page.goto('/auth/login');
    await loggedInAppPage.loginWithUser();
    await use(loggedInAppPage)

  }

});