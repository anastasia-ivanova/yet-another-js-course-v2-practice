import { expect } from '@playwright/test';
import {test} from '../fixtures/allAppFixture';
import { baseConfig } from '../config/baseConfig';
import { CheckoutPage, PaymentMethods } from '../pages/checkoutPage';



test('Test 1: Verify login with valid credentials', async ({ page, loggedInAppPage, homePage, productPage, checkoutPage}) => {
  const creditCardInfo = {
    number: '1111-1111-1111-1111',
    expDate: '08/2025',
    cvv: '111',
    cardholderName: 'test name',
  };

  const paymentMethod = PaymentMethods.CreditCard;

  await page.goto('/')
  const productInTest = {
    productName: await homePage.getProductNameByNumber(0),
    productPrice: await homePage.getProductPriceByNumber(0)
  };

  await homePage.clickProductCardByNumber(0);
  await productPage.clickAddToCart();
  await productPage.goToCart();

  await expect(checkoutPage.productQuantityLocator).toBeVisible();
  //Verify the number of products in the cart table equals 1.
  await expect(checkoutPage.productQuantityLocator).toHaveValue('1');
  //Verify product title in the cart is "Slip Joint Pliers".
  await expect(checkoutPage.productTitleInCartLocator).toContainText(productInTest.productName);
  //Verify product price in the cart is correct
  await expect(checkoutPage.productPriceInCartLocator).toContainText(productInTest.productPrice);
  await checkoutPage.clickProceedToCheckout();
  //verify if user signed in
  expect(await checkoutPage.step2IsUserSignedIn()).toBeTruthy();
  //click proceed
  await checkoutPage.step2ClickProceedToCheckout();
  await checkoutPage.step3EnterBilling('random', 'line');
  await checkoutPage.step3clickProceedToCheckout();
  await checkoutPage.step4SelectPayment(paymentMethod);
  await checkoutPage.step4EnterCreditCardInfo(creditCardInfo.number, creditCardInfo.expDate, creditCardInfo.cvv, creditCardInfo.cardholderName);
  expect(await checkoutPage.returnStatusMessage()).toContain('Payment was successful');

});