/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import  {Rating}  from "@mui/material";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import Type from '../../Utility/action.type'

function ProductCard({ product, flex, renderDescription ,renderBtn}) {
  // eslint-disable-next-line no-unused-vars
  const { image, title, id, rating, price, description } = product;
  // console.log(product);


  const [state,dispatch] = useContext(DataContext)
// console.log(state);
  const addToCart = ()=>{
          dispatch({
            type:Type.ADD_TO_BASKET,
            item:{
                image, title, id, rating, price, description
            }
          })
  }


  return (
    <>
      <div
        className={`${classes.card__container} ${
          flex ? classes.product__flexed : ""
        } space-y-4`}
      >
        <Link to={`/products/${id}`}>
          <img src={image} alt="" className={classes.img_container} />
        </Link>

        <div>
          <h3 className="text-lg font-sans font-semibold">{title}</h3>

          {renderDescription && (
            <div>
              <p className="text-sm  font-semibold w-3/4">{description}</p>
            </div>
          )}
          <div>
            <Rating color="red  " value={rating?.rate} precision={0.1} />
            {/* rating count */}
            <small>{rating?.count}</small>
          </div>
          <div className="mb-6">
            <CurrencyFormat amount={price} />
          </div>

          {renderBtn && <button className={`${classes.button} `} onClick={addToCart}>add to cart</button>}
        </div>
      </div>
    </>
  );
}

export default ProductCard;
