import React from "react";
import AddBorrowedTable from "../components/AddBorrowedTable";
import FooterForm from "../components/FooterForm";
import NavBar from "../components/NavBar";
import NavBreadcrumb from "../components/NavBreadcrumb";

const BorrowedBooks = () => {
    return (
        <>
            <NavBar />
            <NavBreadcrumb page="Borrowed Books" />
            <AddBorrowedTable />
            <FooterForm />
        </>
    );
};

export default BorrowedBooks;
