import React from "react";
import AboutContainer from "../components/AboutContainer";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import NavBreadcrumb from "../components/NavBreadcrumb";
const About = () => {
  return (
    <>
      <NavBar />
      <NavBreadcrumb page="About" />
      <AboutContainer />
      <Footer />
    </>
  );
};

export default About;
