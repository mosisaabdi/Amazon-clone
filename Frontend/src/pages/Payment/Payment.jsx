// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import Layout from "../../components/Layout/Layout";
import ProductCard from "../../components/Product/ProductCard";
import classes from "./Payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { ClipLoader } from "react-spinners";
import axiosinstance from "../../Api/axios";
import db from "../../Utility/firebase";
import  Type  from "../../Utility/action.type";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore"; // to Import Firestore functions
function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const [process, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const [error, setCardError] = useState(null);
  const handleChange = (e) => {
    setCardError(e.error ? e.error.message : null);
  };

  const totalPrice = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const navigate = useNavigate();
  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      //1. contact the backend to get the secret key

      setProcessing(true);
      const response = await axiosinstance({
        method: "POST",
        url: `/payments/create?total=${totalPrice * 100}`,
      });

      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      //2.client side confirmation
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      // 3.to store the order in the firestore database

      const userOrdersRef = doc(
        db,
        "users",
        user.uid,
        "orders",
        paymentIntent.id
      );
      await setDoc(userOrdersRef, {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      dispatch({
        type: Type.EMPTY_BASKET ,
      });

      setProcessing(false);
      // console.log(paymentIntent);
      navigate("/orders", { state: { msg: "you have a Placed new Order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };
  return (
    <Layout>
      {/* header */}
      <div className={classes.payment__header}>Checkout {total} items</div>
      {/* payment method */}
      <section className={classes.payment__container}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.Payment_Card_Container}>
          <h3>Payment Methods</h3>

          <div className={classes.Payment_Details}>
            <form action="" onSubmit={handlePayment}>
              {error && (
                <small style={{ color: "red", padding: "10px" }}>{error}</small>
              )}
              <CardElement onChange={handleChange} />
              {/* Price payment */}
              <div className={classes.Payment_price}>
                <div>
                  <span className={classes.flex}>
                    <b>Total Order</b> |<CurrencyFormat amount={totalPrice} />
                  </span>
                </div>
                <button type="submit">
                  {process ? (
                    <div className={classes.loading}>
                      <ClipLoader color="gray" size={12} />
                      <p>Please Wait ...</p>
                    </div>
                  ) : (
                    " Pay Now"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
