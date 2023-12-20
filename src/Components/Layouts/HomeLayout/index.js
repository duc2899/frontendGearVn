import React from "react";
import SideBar from "./SidebarLayout";
import BannerLayout from "./BannerLayout";
import LaptopCollections from "./LaptopOutstanding";
import MouseCollections from "./MouseOutstanding";
import KeyboardCollections from "./KeyboardOutstanding";
import ProductPortfolio from "./ProductPortfolio";
import TechnologyNews from "./TechnologyNews";
function HomeLayout() {
  return (
    <div className="mx-auto max-w-7xl lg:px-8 flex flex-col pt-2">
      <div className="flex gap-x-2 lg:flex-row flex-col p-3">
        <SideBar></SideBar>
        <BannerLayout></BannerLayout>
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
