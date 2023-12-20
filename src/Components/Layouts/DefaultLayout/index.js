import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function DefaultLayout({ children }) {
  return (
    <div>
      <Header></Header>
      <div className="mt-72">
        <div>{children}</div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default DefaultLayout;
