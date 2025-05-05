import { expect } from '@playwright/test';
import {test} from '../fixtures/allAppFixture';
import { PaymentMethods } from '../pages/checkout-page/checkoutPage';
import {creditCardInfo} from "../test-data/creditCardInfo";




test('Unit-13: Test 6: Verify purchasing item with fixtures', async ({ page, loggedInAppPage, homePage, productPage, checkoutPage}) => {
  const paymentMethod = PaymentMethods.CreditCard;

  await homePage.headerFragment.clickMainLogo();
  //save first card info
  const productInTest = {
    productName:  await homePage.getProductNameByNumber(0),
    productPrice: await homePage.getProductPriceByNumber(0)
  };

  await homePage.clickProductCardByNumber(0);

  productPage.alertLocator.waitFor({ state: 'hidden' });
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
  await checkoutPage.step2Fragment.step2CheckIfUserSignedIn();
  //click proceed
  await checkoutPage.step2Fragment.step2ClickProceedToCheckout();
  await checkoutPage.step3Fragment.step3EnterBilling('random', 'line');
  await checkoutPage.step3Fragment.step3clickProceedToCheckout();
  await checkoutPage.step4Fragment.step4SelectPayment(paymentMethod);
  await checkoutPage.step4Fragment.step4EnterCreditCardInfo(creditCardInfo.number, creditCardInfo.expDate, creditCardInfo.cvv, creditCardInfo.cardholderName);
  expect(await checkoutPage.step4Fragment.returnStatusMessage()).toContain('Payment was successful');

});