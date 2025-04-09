import { test, expect } from '@playwright/test';

const productCardByName = 'h5[data-test="product-name"]';

test('Test 1: Verify login with valid credentials', async ({ page }) => {
  await page.goto(process.env.WEB_URL + '/auth/login');
  await page.locator('[data-test="email"]').fill( process.env.USER_EMAIL);
  await page.locator('[data-test="password"]').fill(process.env.USER_PASSWORD);
  await page.locator('[data-test="login-submit"]').click();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
  await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');
});

test('Test 2: Verify user can view product details', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.locator(productCardByName, { hasText: 'Combination Pliers' }).click();
  await expect(page).toHaveURL(/^https:\/\/practicesoftwaretesting\.com\/product.*/);
  await expect(page.locator('[data-test="product-title"]')).toContainText('Combination Pliers');
  await expect(page.locator('[data-test="unit-price"]')).toContainText('14.15');
  await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  await expect(page.locator('[data-test="add-to-favorites"]')).toBeVisible();
});

test('test', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  //Click on the product "Slip Joint Pliers"
  await page.locator(productCardByName, { hasText: 'Slip Joint Pliers' }).click();
  //Verify URL contains https://practicesoftwaretesting.com/product.
  await expect(page).toHaveURL(/^https:\/\/practicesoftwaretesting\.com\/product.*/);
  //Verify product name is "Slip Joint Pliers".
  await expect(page.locator('[data-test="product-name"]')).toContainText('Slip Joint Pliers');
  // Verify product price is 9.17.
  await expect(page.locator('[data-test="unit-price"]')).toContainText('9.17');
  //Click "Add to Cart" button.
  await page.locator('[data-test="add-to-cart"]').click();
  //Verify alert message is visible
  await expect(page.getByRole('alert', { name: 'Product added to shopping cart.' })).toBeVisible();
  //Verify alert message text is "Product added to shopping cart".
  await expect(page.getByRole('alert', { name: 'Product added to shopping cart.' })).toHaveText('Product added to shopping cart.');
  //Verify alert disappears in 8 seconds.
  await expect(page.getByRole('alert', { name: 'Product added to shopping cart.' })).not.toBeVisible({ timeout: 8000 });
  //Verify cart icon in navigation shows quantity = 1.
  await expect(page.locator('[data-test="nav-cart"]')).toContainText('1');
  //Click on the cart icon in the navigation.
  await page.locator('[data-test="nav-cart"]').click();
  //Verify URL is https://practicesoftwaretesting.com/checkout.
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/checkout');
  await expect(page.locator('[data-test="product-quantity"]')).toBeVisible();
  //Verify the number of products in the cart table equals 1.
  await expect(page.locator('[data-test="product-quantity"]')).toHaveValue('1');
  //Verify product title in the cart is "Slip Joint Pliers".
  await expect(page.locator('[data-test="product-title"]')).toContainText('Slip Joint Pliers');
  //Verify "Proceed to Checkout" button is visible.
  await expect(page.locator('[data-test="proceed-1"]')).toContainText('Proceed to checkout');
});