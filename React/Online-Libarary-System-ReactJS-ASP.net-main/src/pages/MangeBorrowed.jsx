import React from 'react';
import Footer from "../components/FooterForm";
import MangeBorrowedAdmin from '../components/MangeBorrowedAdmin';
import NavBar from "../components/NavBar";
import NavBreadcrumb from "../components/NavBreadcrumb";
const MangeBorrowed = () => {
    return (
        <>
            <NavBar />
            <NavBreadcrumb page="Mange Borrowed" />
            <MangeBorrowedAdmin />
            <Footer />
        </>
    )
}

export default MangeBorrowed