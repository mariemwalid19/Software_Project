import React from "react";
import AddBorrowedTable from "../components/AddBorrowedTable";
import ButtonsBorrowed from "../components/ButtonsBorrowed";
import FooterForm from "../components/FooterForm";
import NavBar from "../components/NavBar";
import NavBreadcrumb from "../components/NavBreadcrumb";
const Borrowed = () => {
  return (
    <>
      <NavBar />
      <NavBreadcrumb page="Borrowed" />
      <ButtonsBorrowed />
      <AddBorrowedTable />
      <FooterForm />
    </>
  );
};

export default Borrowed;
