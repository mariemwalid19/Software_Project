import React from "react";
import ContactUsContainer from "../components/ContactUsContainer";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import NavBreadcrumb from "../components/NavBreadcrumb";
const ContactUS = () => {
  return (
    <>
      <NavBar />
      <NavBreadcrumb page="Contact" />
      <ContactUsContainer />
      <Footer />
    </>
  );
};

export default ContactUS;
