import { test, expect } from '@playwright/test';
import {LoginPage} from "../pages/loginPage";
import {HomePage} from "../pages/home-page/homePage";
import {ProductPage} from "../pages/productPage";
import {CheckoutPage} from "../pages/checkoutPage";
import {baseConfig} from "../config/baseConfig";



test('Test 1: Verify login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/auth/login');
  await loginPage.login(baseConfig.USER_EMAIL, baseConfig.USER_PASSWORD);
  await expect(page).toHaveURL('/account');
  await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
  await expect(page.locator('[data-test="nav-menu"]')).toContainText(baseConfig.USER_NAME);
});

test('Test 2: Verify user can view product details', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  const productInTest = 'Combination Pliers';

  await page.goto('/');
  await homePage.clickProductCardByName(productInTest);
  await expect(page).toHaveURL(/^https:\/\/practicesoftwaretesting\.com\/product.*/);
  await expect(productPage.productNameLabel).toContainText(productInTest);
  await expect(productPage.unitPriceLocator).toContainText('14.15');
  await expect(productPage.addToCartButtonLocator).toBeVisible();
  await expect(productPage.addToFavButtonLocator).toBeVisible();
});

test('Test 3: Verify user can add product to cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const checkoutPage = new CheckoutPage(page);

  const testProduct = 'Slip Joint Pliers';


  await page.goto('/');
  //Click on the product "Slip Joint Pliers"
  await homePage.clickProductCardByName(testProduct)
  //Verify URL contains https://practicesoftwaretesting.com/product.
  await expect(page).toHaveURL(/^https:\/\/practicesoftwaretesting\.com\/product.*/);
  //Verify product name is "Slip Joint Pliers".
  await expect(productPage.productNameLabel).toContainText(testProduct);
  // Verify product price is 9.17.
  await expect(productPage.unitPriceLocator ).toContainText('9.17');
  //Click "Add to Cart" button.
  await productPage.clickAddToCart();
  //Verify alert message is visible
  await expect(productPage.alertLocator).toBeVisible();
  //Verify alert message text is "Product added to shopping cart".
  await expect(productPage.alertLocator).toHaveText('Product added to shopping cart.');
  //Verify alert disappears in 8 seconds.
  await expect(productPage.alertLocator).not.toBeVisible({ timeout: 8000 });
  //Verify cart icon in navigation shows quantity = 1.
  await expect(productPage.cartIconLocator).toContainText('1');
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

