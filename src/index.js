import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "animate.css";
import AccountUserContext from "./Components/Context/AccountUser";
import { ToastContainer } from "react-toastify";
import CartUserContext from "./Components/Context/CartUser";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="590286605832-15pgs43gogub4ga0p82di8g1g4h3i0s9.apps.googleusercontent.com">
      <AccountUserContext>
        <CartUserContext>
          <App />
          <ToastContainer
            className={"top-20"}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            position="top-right"
          />
        </CartUserContext>
      </AccountUserContext>
    </GoogleOAuthProvider>
    ;
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
