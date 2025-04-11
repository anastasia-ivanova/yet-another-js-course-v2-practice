import { test, expect } from '@playwright/test';

const productCardByName = 'h5[data-test="product-name"]';

test('Test 1: Verify login with valid credentials', async ({ page }) => {
  await page.goto('/auth/login');
  await page.locator('[data-test="email"]').fill( process.env.USER_EMAIL);
  await page.locator('[data-test="password"]').fill(process.env.USER_PASSWORD);
  await page.locator('[data-test="login-submit"]').click();
  await expect(page).toHaveURL('/account');
  await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
  await expect(page.locator('[data-test="nav-menu"]')).toContainText(process.env.USER_NAME);
});

test('Test 2: Verify user can view product details', async ({ page }) => {
  await page.goto('/');
  await page.locator(productCardByName, { hasText: 'Combination Pliers' }).click();
  await expect(page).toHaveURL(/^https:\/\/practicesoftwaretesting\.com\/product.*/);
  await expect(page.locator('[data-test="product-name"]')).toContainText('Combination Pliers');
  await expect(page.locator('[data-test="unit-price"]')).toContainText('14.15');
  await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  await expect(page.locator('[data-test="add-to-favorites"]')).toBeVisible();
});

test('Test 3: Verify user can add product to cart', async ({ page }) => {
  const alert = page.getByRole('alert', { name: 'Product added to shopping cart.' });
  const productQuantity = page.locator('[data-test="product-quantity"]');
  await page.goto('/');
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
  await expect(alert).toBeVisible();
  //Verify alert message text is "Product added to shopping cart".
  await expect(alert).toHaveText('Product added to shopping cart.');
  //Verify alert disappears in 8 seconds.
  await expect(alert).not.toBeVisible({ timeout: 8000 });
  //Verify cart icon in navigation shows quantity = 1.
  await expect(page.locator('[data-test="nav-cart"]')).toContainText('1');
  //Click on the cart icon in the navigation.
  await page.locator('[data-test="nav-cart"]').click();
  //Verify URL is https://practicesoftwaretesting.com/checkout.
  await expect(page).toHaveURL(process.env.WEB_URL + '/checkout');
  await expect(productQuantity).toBeVisible();
  //Verify the number of products in the cart table equals 1.
  await expect(productQuantity).toHaveValue('1');
  //Verify product title in the cart is "Slip Joint Pliers".
  await expect(page.locator('[data-test="product-title"]')).toContainText('Slip Joint Pliers');
  //Verify "Proceed to Checkout" button is visible.
  await expect(page.locator('[data-test="proceed-1"]')).toContainText('Proceed to checkout');
});