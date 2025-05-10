import { expect } from '@playwright/test';

import { PaymentMethods } from '../pages/checkout-page/checkoutPage';
import {creditCardInfo} from "../test-data/creditCardInfo";
import {baseConfig} from "../config/baseConfig";
import {myLoggedInTest} from "../fixtures/loggedinFixture";
import {join} from "path";

myLoggedInTest.setTimeout(70_000);


const authFile = join(process.cwd(), '/playwright/.auth', 'ui-user.json');
myLoggedInTest.use({storageState: authFile});

myLoggedInTest('Unit-13: Test 6: Verify purchasing item with fixtures',
    async ({ app, page}) => {
  const paymentMethod = PaymentMethods.CreditCard;

  await app.homePage.navigateTo();
  //save first card info
  const productInTest = {
    productName:  await app.homePage.getProductNameByNumber(0),
    productPrice: await app.homePage.getProductPriceByNumber(0)
  };

  await app.homePage.clickProductCardByNumber(0);

  await app.productPage.clickAddToCart();
  await app.productPage.goToCart();

  await expect(app.checkoutPage.productQuantityLocator).toBeVisible();
  //Verify the number of products in the cart table equals 1.
  await expect(app.checkoutPage.productQuantityLocator).toHaveValue('1');
  //Verify product title in the cart is "Slip Joint Pliers".
  await expect(app.checkoutPage.productTitleInCartLocator).toContainText(productInTest.productName);
  //Verify product price in the cart is correct
  await expect(app.checkoutPage.productPriceInCartLocator).toContainText(productInTest.productPrice);
  await app.checkoutPage.clickProceedToCheckout();
  //verify if user signed in
  await app.checkoutPage.step2Fragment.checkIfUserSignedIn(baseConfig.USER_NAME);
  //click proceed
  await app.checkoutPage.step2Fragment.clickProceedToCheckout();
  await app.checkoutPage.step3Fragment.enterBilling('random', 'line');
  await app.checkoutPage.step3Fragment.clickProceedToCheckout();
  await app.checkoutPage.step4Fragment.selectPayment(paymentMethod);
  await app.checkoutPage.step4Fragment.enterCreditCardInfo(creditCardInfo.number, creditCardInfo.expDate, creditCardInfo.cvv, creditCardInfo.cardholderName);
  expect(await app.checkoutPage.step4Fragment.returnStatusMessage()).toContain('Payment was successful');

});