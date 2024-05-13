import React, { useEffect } from "react";
import Cart from "../components/Cart";
import CouponCode from "../components/CouponCode";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import NavBreadcrumb from "../components/NavBreadcrumb";
const CheckoutCart = () => {
  useEffect(() => {}, [Cart]);
  return (
    <>
      <NavBar />
      <NavBreadcrumb page="Checkout" title={false} />
      <Cart />
      <CouponCode />
      <Footer />
    </>
  );
};

export default CheckoutCart;
