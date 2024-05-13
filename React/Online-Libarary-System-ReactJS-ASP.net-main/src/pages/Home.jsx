import React from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import NavBar from "../components/NavBar";
import News from "../components/News";
import Personal from "../components/Personal";
import SectionFlashSale from "../components/SectionFlashSale";
import SectionTopBoock from "../components/SectionTopBoock";
import SectionTrending from "../components/SectionTrending";
import StoreFeatures from "../components/StoreFeatures";
const Home = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <StoreFeatures />
      <SectionTrending />
      <SectionTopBoock />
      <SectionFlashSale />
      <News />
      <Personal />
      <Footer />
    </>
  );
};

export default Home;
