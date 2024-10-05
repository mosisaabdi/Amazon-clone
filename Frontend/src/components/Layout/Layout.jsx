/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Header from "../Header/Header";
function Layout({ children }) {
  return(

    <div>
      <Header/>
      {children}
    </div>
  )
}

export default Layout;
