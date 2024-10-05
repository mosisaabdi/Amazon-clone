// eslint-disable-next-line no-unused-vars
import React from "react";
// eslint-disable-next-line no-unused-vars
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Cart from "./pages/Cart/Cart";
import Payment from "./pages/Payment/Payment";
import Orders from "./pages/Orders/Orders";
import Results from "./pages/Results/Results";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Auth from "./pages/Auth/Auth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
const stripePromise = loadStripe(
  "pk_test_51Q2YEL05GlBTgZEf3hvjwr4SBx5MYZTzTuYk58O9H7V3v75skZkLd1ljL3qYRXB5GfvaYh9omRtpr8fqKSXXTafZ004DI5a1NG"
);
function Routering() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/payments"
        element={
          <ProtectedRoute
            msg={"you must be logged in to pay"}
            redirect={"/payments"}
          >
            ,
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </ProtectedRoute>
        }
      />
      <Route path="/category/:categoryName" element={<Results />} />
      <Route path="/products/:productid" element={<ProductDetail />} />
      <Route
        path="/orders"
        element={
          <ProtectedRoute
            msg={"you must be logged in to see the Order"}
            redirect={"/orders"}
          >
            ,
            <Elements stripe={stripePromise}>
              <Orders />
            </Elements>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Routering;
