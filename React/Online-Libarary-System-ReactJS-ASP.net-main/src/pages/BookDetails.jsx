import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookDetail from "../components/BookDetail";
import BooksDisplayCol from "../components/BooksDisplayCol";
import CustomerReviews from "../components/CustomerReviews";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import NavBreadcrumb from "../components/NavBreadcrumb";
import TableDetail from "../components/TableDetail";
import { variables } from "../components/Variables.js";
const BookDetails = () => {
  const [bookDetails, setBookDetails] = useState({});
  const { booktitle } = useParams();
const userid = sessionStorage.getItem('userid');
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
        variables.BOOK_SERV_API+"getBookWithBookTitle/"+userid+"/"+booktitle
        );
        setBookDetails(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [bookDetails]);

  return (
    <>
      <NavBar />
      <NavBreadcrumb page="Books" title={true} titlePage={bookDetails.title} />
      <div className="bg-[#E5EDE8]">
        <BookDetail book={bookDetails} />
        <div className="container lg:mx-auto flex flex-col items-start lg:flex-row lg:gap-16 lg:w-full">
          <div className="w-full lg:w-[75%]">
            <TableDetail book={bookDetails} />
            <CustomerReviews />
          </div>
          <div className="w-full lg:w-[25%]">
            <BooksDisplayCol />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookDetails;
