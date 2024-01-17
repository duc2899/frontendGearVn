import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "animate.css";
import AccountUserContext from "./Components/Context/AccountUser";
import { ToastContainer } from "react-toastify";
import CartUserContext from "./Components/Context/CartUser";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
