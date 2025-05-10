import {LoginPage} from "./loginPage";
import {HomePage} from "./home-page/homePage";
import {ProductPage} from "./productPage";
import {CheckoutPage} from "./checkout-page/checkoutPage";
import {PageHolder} from "./pageHolder";


export class AppManager extends PageHolder {
    readonly loginPage: LoginPage = new LoginPage(this.page);
    readonly homePage: HomePage = new HomePage(this.page);
    readonly productPage: ProductPage = new ProductPage(this.page);
    readonly checkoutPage: CheckoutPage = new CheckoutPage(this.page);
}