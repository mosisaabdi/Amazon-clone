/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useContext, useEffect, useState } from "react";
import "./App.css";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Routering from "./Router";
import {
  DataContext,
  DataProvider,
} from "./components/DataProvider/DataProvider";
import { auth } from "./Utility/firebase";
import Type from "./Utility/action.type";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);

        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      }
      else{
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routering />
      </BrowserRouter>
    </>
  );
}

export default App;
