// eslint-disable-next-line no-unused-vars
import React from "react";
import CarouselEffect from "../../components/Carousel/CarouselEffect";
import Category from "../../components/Category/Category";
import Product from "../../components/Product/Product";
import Layout from "../../components/Layout/Layout";
function Landing() {
  return (
    <div>
      <Layout>
        <CarouselEffect />
        <Category />
        <Product />
      </Layout>
    </div>
  );
}

export default Landing;
