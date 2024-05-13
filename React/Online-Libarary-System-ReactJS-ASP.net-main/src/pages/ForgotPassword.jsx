import React from "react";
import Footer from "../components/FooterForm";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import NavLogin from "../components/NavLogin";
const ForgotPassword = () => {
  return (
    <>
      <NavLogin />
      <ForgotPasswordForm />
      <Footer />
    </>
  );
};

export default ForgotPassword;
