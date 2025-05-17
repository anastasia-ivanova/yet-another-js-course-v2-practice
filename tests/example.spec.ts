import { expect} from '@playwright/test';
import { myLoggedInTest } from '../fixtures/loggedinFixture';
import { baseConfig } from '../config/baseConfig';
import {test} from "../fixtures/loggedOutAllAppFixture";



myLoggedInTest('Test 1: Verify login with valid credentials', async ({ app }) => {

  await app.page.goto('/account');
  await expect(app.accountPage.pageTitle).toContainText('My account');
  await expect(app.accountPage.headerFragment.signedInDropDown).toContainText(baseConfig.USER_NAME);
});

test('Test 2: Verify user can view product details', async ({app, page}) => {
  const productInTest = 'Combination Pliers';

  await app.homePage.goto();
  await app.homePage.clickProductCardByName(productInTest);

  await expect(page).toHaveURL(/\/product.*/);

  expect(await app.productPage.getProductName()).toContain(productInTest);
  expect(await app.productPage.getProductPrice()).toContain('14.15');

  await expect(app.productPage.addToCartButtonLocator).toBeVisible();
  await expect(app.productPage.addToFavButtonLocator).toBeVisible();
});

test('Test 3: Verify user can add product to cart', async ({ app, page}) => {
  const testProduct = 'Slip Joint Pliers';

  await app.homePage.goto();
  //Click on the product "Slip Joint Pliers"
  await app.homePage.clickProductCardByName(testProduct)
  //Verify URL contains https://practicesoftwaretesting.com/product.
  await expect(page).toHaveURL(/\/product.*/);
  //Verify product name is "Slip Joint Pliers".
  expect( await app.productPage.getProductName()).toContain(testProduct);
  // Verify product price is 9.17.
  expect(await app.productPage.getProductPrice()).toContain('9.17');
  //Click "Add to Cart" button.
  await app.productPage.clickAddToCart();
  //Verify alert message is visible
  await expect(app.productPage.alertLocator).toBeVisible();
  //Verify alert message text is "Product added to shopping cart".
  await expect(app.productPage.alertLocator).toHaveText('Product added to shopping cart.');
  //Verify alert disappears in 8 seconds.
  await expect(app.productPage.alertLocator).toBeHidden({ timeout: 8000 });
  //Verify cart icon in navigation shows quantity = 1.
  await expect(app.productPage.goToCartButtonLocator).toContainText('1');
  //Click on the cart icon in the navigation.
  await app.productPage.goToCart();
  //Verify URL is https://practicesoftwaretesting.com/checkout.
  await expect(page).toHaveURL(process.env.WEB_URL + '/checkout');
  await expect(app.checkoutPage.productQuantityLocator).toBeVisible();
  //Verify the number of products in the cart table equals 1.
  await expect(app.checkoutPage.productQuantityLocator).toHaveValue('1');
  //Verify product title in the cart is "Slip Joint Pliers".
  await expect(app.checkoutPage.productTitleInCartLocator).toContainText(testProduct);
  //Verify "Proceed to Checkout" button is visible.
  await expect(app.checkoutPage.proceedButtonLocator).toContainText('Proceed to checkout');
});

