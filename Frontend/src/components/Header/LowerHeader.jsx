/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { MdOutlineMenu } from "react-icons/md";
import classes from "./Header.module.css";
function LowerHeader() {
  return (
    <>
      <div className={classes.lower__container}>
        <div>
          <ul>
            <li>
              <MdOutlineMenu />
              <p>All</p>
            </li>
            <li>Today's Deals</li>
            <li>Customer Service</li>
            <li>Registry</li>
            <li>Gift Cards</li>
            <li>Sell</li>
          </ul>
        </div>
        <div>
            <h1>Shopping the Game Store</h1>
        </div>
      </div>
    </>
  );
}

export default LowerHeader;
