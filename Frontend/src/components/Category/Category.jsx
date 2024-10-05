// eslint-disable-next-line no-unused-vars
import React from "react";
import { categoryInfos } from "./CategroyFullinfo";
import CategoryCard from "./CategoryCard";
import classes from "./Category.module.css";
function Category() {
  return (
    
      <section className={classes.category_container}>
        {categoryInfos.map((infos) => (
          <CategoryCard key={infos.imgLink} data={infos} />
        ))}
      </section>
  
  );
}

export default Category;
