import React from "react";
import AddBooksTable from "../components/AddBooksTable";
import AddButtons from "../components/AddButtons";
import FooterForm from "../components/FooterForm";
import NavBar from "../components/NavBar";
import NavBreadcrumb from "../components/NavBreadcrumb";

const AddBooks = () => {
  return (
    <>
      <NavBar />
      <NavBreadcrumb page="Add Books" />
      <AddButtons />
      <AddBooksTable />
      <FooterForm />
    </>
  );
};

export default AddBooks;
