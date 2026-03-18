import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Products } from "./components/Products";
import { ProductDetail } from "./components/ProductDetail";
import { Cart } from "./components/Cart";
import { Account } from "./components/Account";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Checkout } from "./components/Checkout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "products", Component: Products },
      { path: "products/:id", Component: ProductDetail },
      { path: "cart", Component: Cart },
      { path: "account", Component: Account },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
      { path: "checkout", Component: Checkout },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});
