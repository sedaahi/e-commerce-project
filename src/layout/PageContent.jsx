import { Switch, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import TeamPage from "../pages/TeamPage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import ShoppingCartPage from "../pages/ShoppingCartPage";
export default function PageContent() {
  return (
    <main className="w-full overflow-x-hidden">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/about" component={AboutPage} />
        <Route
          path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
          component={ProductDetailPage}
        />
        <Route
          path="/shop/:gender?/:categoryName?/:categoryId?"
          component={ShopPage}
        />
        <Route path="/product-detail" component={ProductDetailPage} />
        <Route path="/team" component={TeamPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/cart" component={ShoppingCartPage} />
        
      </Switch>
    </main>
  );
}
