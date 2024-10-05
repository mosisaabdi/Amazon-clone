/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/Loader";
import productUrl from '../../Api/endPoints';
function ProductDetail() {
  const [productdetail, setProductDetail] = useState([]);
const {productid} = useParams();
const [isLoading, setIsLoading] = useState(false);
 useEffect(() => {
    setIsLoading(true)
    axios.get(`${productUrl}/products/${productid}`)
    .then((res)=>{
      setProductDetail(res.data);
      setIsLoading(false)
    }).catch((err)=>{
      console.log(err)
      setIsLoading(false)
    })
  }, [])

  return (
    <Layout>
      
      {isLoading?(<Loader/>):(<ProductCard 
      product={productdetail}
      flex={true}
      renderDescription={true}
      renderBtn={true}
       />)}
    </Layout>
  );
}

export default ProductDetail;
