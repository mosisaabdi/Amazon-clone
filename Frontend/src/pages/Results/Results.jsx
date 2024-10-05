/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import classes from "./Results.module.css";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import productUrl from "../../Api/endPoints";
import axios from "axios";
import ProductCard from "../../components/Product/ProductCard";
function Results() {
  const [result,setResults] = useState([]);
  const {categoryName} = useParams();
  console.log(categoryName);


useEffect(() => {
    
  axios.get( `${productUrl}/products/category/${categoryName}` )
  .then( 
    (res) => setResults(res.data)
  )
  .catch(
    err => console.log(err)
  )
}, [categoryName]);


//   console.log(result);
  return(
    <>
        <Layout>
            <h1 className="text-2xl p-4 font-mono font-semibold text-center">Results:</h1>
            <p className="text-xl p-4 text-center">Category / {categoryName}</p>
            <hr />
            <div className={classes.products_container}>
                {result?.map((product)=>(
                    <ProductCard key={product.id} product={product} renderBtn={true}/>
                ))}
            </div>
        </Layout>
    
    </>  );
}

export default Results;
