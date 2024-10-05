/* eslint-disable no-unused-vars */
import React from "react";
import { FadeLoader } from "react-spinners";

function Loader() {
  return <div  style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}><FadeLoader color="#d4a21c" /></div>;
}

export default Loader;
