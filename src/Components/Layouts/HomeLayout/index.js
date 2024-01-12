import React, { useState } from "react";
import SideBar from "./SidebarLayout";
import BannerLayout from "./BannerLayout";
import LaptopCollections from "./LaptopOutstanding";
import MouseCollections from "./MouseOutstanding";
import KeyboardCollections from "./KeyboardOutstanding";
import ProductPortfolio from "./ProductPortfolio";
import TechnologyNews from "./TechnologyNews";
import DetailSideBar from "./SidebarLayout/DetailSideBar";

function HomeLayout() {
  const [sideBar, setSideBar] = useState("");

  return (
    <div className="mx-auto max-w-7xl lg:px-8 flex flex-col pt-2 ">
      <div className="xl:grid xl:grid-cols-12 gap-4 xl:px-0 xl:pr-2 px-2">
        <div className="col-span-2 xl:mb-0 mb-2">
          <SideBar setSideBar={setSideBar}></SideBar>
        </div>
        <div className="col-span-10">
          <BannerLayout></BannerLayout>
          {sideBar !== "" && (
            <DetailSideBar setSideBar={setSideBar} id={sideBar}></DetailSideBar>
          )}
        </div>
      </div>
      <LaptopCollections></LaptopCollections>
      <MouseCollections></MouseCollections>
      <KeyboardCollections></KeyboardCollections>
      <ProductPortfolio></ProductPortfolio>
      <TechnologyNews></TechnologyNews>
    </div>
  );
}

export default HomeLayout;
