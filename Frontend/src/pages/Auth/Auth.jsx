/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import Layout from "../../components/Layout/Layout";
import classes from "./Auth.module.css";
import { auth } from "../../Utility/firebase";
import Type from "../../Utility/action.type";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider";
// import { useNavigation } from "react-router-dom";

import { ClipLoader } from "react-spinners";
function Auth() {
  // email
  const [email, setEmail] = useState("");
  // password
  const [password, setPassword] = useState("");
  console.log(password);
  // error
  const [error, setError] = useState("");

  //loading
  const [loading, setLoading] = useState({ signIn: false, signUp: false });
  //user
  const [{ user }, dispatch] = useContext(DataContext);

  // navigation
  const navigate = useNavigate();

  const location = useLocation();

  // console.log(user);
  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name === "signin") {
      setLoading({ ...loading, signIn: true });

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          // console.log(userCredential)

          // When the user signs in, we update the user state in the context API
          // with the user that was just signed in. This is done by dispatching
          // an action of type SET_USER with the new user as the payload.
          // This will cause the user state to be updated throughout the app.
          setLoading({ ...loading, signIn: false });

          navigate(location.state?.from?.redirect || "/");
        })
        .catch((error) => {
          // console.log(error);
          setError(error.message);
          setLoading({ ...loading, signUp: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          console.log(userCredential);
          dispatch({
            type: Type.SET_USER,
            user: userCredential.user,
          });
          setLoading({ ...loading, signUp: false });
              navigate(location?.state?.redirect || "/");
        })
        .catch((error) => {
          console.log(error);
          setLoading({ ...loading, signUp: false });
          setError(error.message);
        });
    }
  };

  return (
    <>
      <section className={classes.login}>
        {/* Logo */}
        <Link to={"/"}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1206px-Amazon_logo.svg.png"
            alt=""
          />
        </Link>

        {/* login */}

        <div className={classes.login_Container}>
          <h1>Sign In</h1>
          {location?.state?.msg && (
            <small
              style={{
                padding: "5px",
                textAlign: "center",
                color: "red",
                fontWeight: "bold",
              }}
            >
              {location?.state?.msg}
            </small>
          )}

          <form action="">
            {/* Email */}
            <div>
              <label htmlFor="email">Email:</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
              />
            </div>
            {/* password */}
            <div>
              <label htmlFor="password">Password:</label>

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
              />
            </div>
            {/* Sign In BTN */}
            <button
              type="submit"
              name="signin"
              onClick={authHandler}
              className={classes.SignIn_button}
            >
              {loading.signIn ? (
                <ClipLoader color="#fff" size={20} />
              ) : (
                "Sign In"
              )}
            </button>
            {/* Service agreement */}
            <p>
              By signing-in you agree to the{" "}
              <span style={{ fontWeight: "semibold", color: "black" }}>
                AMAZON FAKE CLONE
              </span>{" "}
              Conditions of Use & Sale. Please see our Privacy Notice, our
              Cookies Notice and our Interest-Based Ads Notice.
            </p>
            {/* Create new account Btn*/}
            <button
              type="submit"
              name="signup"
              onClick={authHandler}
              className={classes.SignUp_button}
            >
              {loading.signUp ? (
                <ClipLoader color="#fff" size={20} />
              ) : (
                "Create your Amazon account"
              )}
            </button>
            {/* Error */}
            {error && (
              <small style={{ paddingTop: "16px", color: "red" }}>
                {error}
              </small>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

export default Auth;
