/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import classes from "./Cart.module.css";
import { Link } from "react-router-dom";
import Type from "../../Utility/action.type";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

function Cart() {
  const [{ basket, user },dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const increment = (item) => {
    dispatch({ type: Type.ADD_TO_BASKET, item });
  };

  const decrement = (id) => {
    dispatch({ type: Type.REMOVE_FROM_BASKET, id });
  };
  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2 className={classes.empty_msg}>Hello</h2>
          <h3 className={classes.empty_msg}>Your shopping basket </h3>
          <hr />
          {basket?.length == 0 ? (
            <h4>Opps ! Your Amazon Cart is empty.</h4>
          ) : (
            basket?.map((item, index) => {
              return(  <>
                <section className={classes.cart_product}>
                  <ProductCard
                    key={index}
                    product={item}
                    renderDescription={true}
                    renderAdd={false}
                    flex={true}
                  />

                  <div className={classes.btn_container}>
                    <button className={classes.btn} onClick={() => increment(item)}><IoIosArrowUp size={25}/></button>
                    <span>{item.amount}</span>
                    <button className={classes.btn} onClick={() => decrement(item.id)}><IoIosArrowDown size={25}/></button>
                  </div>
                </section>
              </>)
            
            })
          )}
        </div>


{/* Proceed to checkOut Section */}
        {basket?.length !== 0 && (
          <div className={`${classes.subtotal} `}>
            <div>
              <p>Subtotal ({basket.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox"  />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Proceed to checkout</Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
