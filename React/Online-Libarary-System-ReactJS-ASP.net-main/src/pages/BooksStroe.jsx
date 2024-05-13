import React from "react";
import Books from "../components/Books";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import NavBreadcrumb from "../components/NavBreadcrumb";
import News from "../components/News";
import StoreFeatures from "../components/StoreFeatures";
const BooksStroe = () => {
  return (
    <>
      <NavBar />
      <NavBreadcrumb page="Books" title={false} />
      <Books />
      <News />
      <StoreFeatures />
      <Footer />
    </>
  );
};

export default BooksStroe;
