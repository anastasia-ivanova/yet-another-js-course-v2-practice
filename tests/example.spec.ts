import { expect } from '@playwright/test';
import { myLoggedInTest } from '../fixtures/loggedinFixture';
import {test} from '../fixtures/allAppFixture';
import { baseConfig } from '../config/baseConfig';



myLoggedInTest('Test 1: Verify login with valid credentials', async ({ loggedInPage }) => {

  await expect(loggedInPage).toHaveURL('/account');
  await expect(loggedInPage.getByTestId("page-title")).toContainText('My account');
  await expect(loggedInPage.getByTestId("nav-menu")).toContainText(baseConfig.USER_NAME);
});

test('Test 2: Verify user can view product details', async ({page, homePage, productPage }) => {
  const productInTest = 'Combination Pliers';

  await homePage.goto();
  await homePage.clickProductCardByName(productInTest);

  await expect(page).toHaveURL(/\/product.*/);

  expect(await productPage.getProductName()).toContain(productInTest);
  expect(await productPage.getProductPrice()).toContain('14.15');

  await expect(productPage.addToCartButtonLocator).toBeVisible();
  await expect(productPage.addToFavButtonLocator).toBeVisible();
});

test('Test 3: Verify user can add product to cart', async ({ page, homePage, productPage, checkoutPage }) => {
  const testProduct = 'Slip Joint Pliers';

  await page.goto('/');
  //Click on the product "Slip Joint Pliers"
  await homePage.clickProductCardByName(testProduct)
  //Verify URL contains https://practicesoftwaretesting.com/product.
  await expect(page).toHaveURL(/\/product.*/);
  //Verify product name is "Slip Joint Pliers".
  await expect(productPage.getProductName()).toContain(testProduct);
  // Verify product price is 9.17.
  await expect( productPage.getProductPrice()).toContain('9.17');
  //Click "Add to Cart" button.
  await productPage.clickAddToCart();
  //Verify alert message is visible
  await expect(productPage.alertLocator).toBeVisible();
  //Verify alert message text is "Product added to shopping cart".
  await expect(productPage.alertLocator).toHaveText('Product added to shopping cart.');
  //Verify alert disappears in 8 seconds.
  await expect(productPage.alertLocator).toBeHidden({ timeout: 8000 });
  //Verify cart icon in navigation shows quantity = 1.
  await expect(productPage.goToCartButtonLocator).toContainText('1');
  //Click on the cart icon in the navigation.
  await productPage.goToCart();
  //Verify URL is https://practicesoftwaretesting.com/checkout.
  await expect(page).toHaveURL(process.env.WEB_URL + '/checkout');
  await expect(checkoutPage.productQuantityLocator).toBeVisible();
  //Verify the number of products in the cart table equals 1.
  await expect(checkoutPage.productQuantityLocator).toHaveValue('1');
  //Verify product title in the cart is "Slip Joint Pliers".
  await expect(checkoutPage.productTitleInCartLocator).toContainText(testProduct);
  //Verify "Proceed to Checkout" button is visible.
  await expect(checkoutPage.proceedButtonLocator).toContainText('Proceed to checkout');
});

