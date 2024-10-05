/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import classes from "./Category.module.css";
import { Link } from "react-router-dom";

function CategoryCard({ data }) {
  return (
    <div  className={classes.category}>
      <Link to={`/category/${data?.name}`} alt="">
        <span>
          <h2 className="text-xl font-mono font-semibold text-center">{data?.title}</h2>
        </span>
        <img src={data?.imgLink} alt="" />
        <p className="text-2xl font-mono font-semibold text-center">shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
