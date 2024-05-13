import React from "react";
import Footer from "../components/FooterForm";
import MangeAccountAdmin from "../components/MangeAccountAdmin";
import NavBar from "../components/NavBar";
import NavBreadcrumb from "../components/NavBreadcrumb";

const MangeAccount = () => {
    
    return (
        <>
        <NavBar />
        <NavBreadcrumb page="Mange Account" />
        <MangeAccountAdmin/>
        <Footer />
      </>
    );


    };

export default MangeAccount;
