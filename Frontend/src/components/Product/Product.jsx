/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from "../Loader/Loader";
function Product() {
  // eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState();
  const [isLoading,setLoading] = useState(false)

// eslint-disable-next-line no-unused-vars
const getProducts = async () =>{
 setLoading(true)
    try {
     let result = await axios
        .get("https://fakestoreapi.com/products")
        // .then((res) => setProducts(res.data))
        // .finally(() => setLoading(false))
        setProducts(result.data)
    } catch (error) {
      console.error(error)
    }
    finally{
      setLoading(false)
    }
}

  useEffect(() => {
   getProducts();
  }, []);
  return (
    <>

   { isLoading?(<Loader/>):(
    <section className={classes.products_container}>{
        products?.map((eachproduct) => (
          <ProductCard key={eachproduct.id} product={eachproduct} renderBtn={true} />
        ))
      }</section>
      
    )}
      
    </>
  );
}

export default Product;
