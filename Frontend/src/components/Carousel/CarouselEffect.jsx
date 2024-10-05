// eslint-disable-next-line no-unused-vars
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import {img} from "./images/data.js";
import classes from "./Carousel.module.css";
function CarouselEffect() {
  return (
    <>
      <div>
        <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        >
        
        {img.map((singleimage) => (
           <img key={singleimage} src={singleimage} />  
           ))}
        
        
        </Carousel>
          <div className={classes.hero_img}></div>
      </div>
    </>
  );
}

export default CarouselEffect;
