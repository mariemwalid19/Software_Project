import axios from "axios";
import React, { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BooksContext } from "../contextApi/ContextApi";
import { variables } from "./Variables.js";

const BooksGrid = () => {
  const { Books, addBooksCart, bookSearchResult, filterResult } = useContext(BooksContext);

  const [showAlert, setShowAlert] = useState(false);
  const role = sessionStorage.getItem('role');
  const userid = sessionStorage.getItem('userid');


  const handleBorrow = (isBorrowed, bookisbn) => {

    setShowAlert(true); // Show the Toast notification
    if (isBorrowed)
      toast.error(`Already borrowed `, { position: toast.POSITION.TOP_CENTER });
    else {
      axios
        .post(variables.REQUEST_SERV_API + "SendBorrowRequest/" + userid+"/"+bookisbn, null)
        .then((res) => {
          toast.success(`Borrow Request Sent `, { position: toast.POSITION.TOP_CENTER });

        })
        .catch((error) => {
          console.log(error); // Log the error object to inspect its structure
          if (error.response) {
            if (error.response.status === 400) {
              toast.error(error.response.data, { position: toast.POSITION.TOP_CENTER });

            } else if (error.response.status === 404) {
              toast.error(error.response.data, { position: toast.POSITION.TOP_CENTER });

            } else {
              toast.error(` server or service is down!`, { position: toast.POSITION.TOP_CENTER });
            }
          } else {
            toast.error(`server or service is down!`, { position: toast.POSITION.TOP_CENTER });
          }
        });


    }
  };
  return (
    <>

      <div className="flex flex-wrap justify-center">
        {bookSearchResult !== null ?

          (bookSearchResult.length !== 0 ?
            bookSearchResult.map((bbook) => <div
              key={bbook.booktitle}
              className="mt-7 relative w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 p-4 shadow-[0_4px_9px_-4px_#71887B] rounded-lg group"
            >
              <Link to={`/booksStroe/${bbook.booktitle}`} className="block">
                <img
                  className="mx-auto object-contain rounded-xl hover:opacity-75"
                  src={`data:image/png;base64,${(bbook.bookimage)}`}
                  alt={bbook.booktitle}
                />
                {/* Span to show on hover */}
                <span className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-20 opacity-0 hover:opacity-100 duration-200 transition-opacity"></span>
              </Link>
              <p className="flex items-center text-[14px] mt-3 font-medium gap-1">
                <FaStar className="text-[#FF7A00]" />
                {bbook.booktitle}
              </p>
              <p className="my-4 text-[16px] text-bgbtn font-bold">
                {bbook.booktitle}
              </p>
              <h1 className="text-[18px] font-bold">
                {bbook.description}...
              </h1>
              <p className="my-3 opacity-[60%] font-medium text-[16px]">
                {bbook.author}
              </p>

              {role !== "admin" &&
                <button
                  onClick={() => handleBorrow(bbook.isborrowed, bbook.isbn)}
                  className="absolute right-0 bottom-[110px] px-[9px] py-[9px]  rounded-[50%] text-white text-[18px] opacity-0 group-hover:opacity-100 
                duration-200 transition-all bg-bgbtnHome group-hover:right-[25px] group-hover:bottom-[110px]"
                >
                  {bbook.isborrowed && "Borrowed" || "Borrow"}
                </button>
              }

            </div>) : <div> there is no book found</div>) :
          (
            filterResult !== null ?
              (
                filterResult.length !== 0 ?
                filterResult.map((filterbook) => <div
                    key={filterbook.booktitle}
                    className="mt-7 relative w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 p-4 shadow-[0_4px_9px_-4px_#71887B] rounded-lg group"
                  >
                    <Link to={`/booksStroe/${filterbook.booktitle}`} className="block">
                      <img
                        className="mx-auto object-contain rounded-xl hover:opacity-75"
                        src={`data:image/png;base64,${(filterbook.bookimage)}`}
                        alt={filterbook.booktitle}
                      />
                      {/* Span to show on hover */}
                      <span className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-20 opacity-0 hover:opacity-100 duration-200 transition-opacity"></span>
                    </Link>
                    <p className="flex items-center text-[14px] mt-3 font-medium gap-1">
                      <FaStar className="text-[#FF7A00]" />
                      {filterbook.booktitle}
                    </p>
                    <p className="my-4 text-[16px] text-bgbtn font-bold">
                      {filterbook.booktitle}
                    </p>
                    <h1 className="text-[18px] font-bold">
                      {filterbook.description}...
                    </h1>
                    <p className="my-3 opacity-[60%] font-medium text-[16px]">
                      {filterbook.author}
                    </p>

                    {role !== "admin" &&
                      <button
                        onClick={() => handleBorrow(filterbook.isborrowed, filterbook.isbn)}
                        className="absolute right-0 bottom-[110px] px-[9px] py-[9px]  rounded-[50%] text-white text-[18px] opacity-0 group-hover:opacity-100 
                duration-200 transition-all bg-bgbtnHome group-hover:right-[25px] group-hover:bottom-[110px]"
                      >
                        {filterbook.isborrowed && "Borrowed" || "Borrow"}
                      </button>
                    }

                  </div>) : <div> there is no book found</div>
              ) :

              <div className="flex flex-wrap justify-center">

                {Books.map((book) => (
                  <div
                    key={book.booktitle}
                    className="mt-7 relative w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 p-4 shadow-[0_4px_9px_-4px_#71887B] rounded-lg group"
                  >
                    <Link to={`/booksStroe/${book.booktitle}`} className="block">
                      <img
                        className="mx-auto object-contain rounded-xl hover:opacity-75"
                        src={`data:image/png;base64,${(book.bookimage)}`}
                        alt={book.booktitle}
                      />
                      {/* Span to show on hover */}
                      <span className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-20 opacity-0 hover:opacity-100 duration-200 transition-opacity"></span>
                    </Link>
                    <p className="flex items-center text-[14px] mt-3 font-medium gap-1">
                      <FaStar className="text-[#FF7A00]" />
                      {book.booktitle}
                    </p>
                    <p className="my-4 text-[16px] text-bgbtn font-bold">
                      {book.booktitle}
                    </p>
                    <h1 className="text-[18px] font-bold">
                      {book.description}...
                    </h1>
                    <p className="my-3 opacity-[60%] font-medium text-[16px]">
                      {book.author}
                    </p>

                    {role !== "admin" &&
                      <button
                        onClick={() => handleBorrow(book.isborrowed, book.isbn)}
                        className="absolute right-0 bottom-[110px] px-[9px] py-[9px]  rounded-[50%] text-white text-[18px] opacity-0 group-hover:opacity-100 
                duration-200 transition-all bg-bgbtnHome group-hover:right-[25px] group-hover:bottom-[110px]"
                      >
                        {book.isborrowed && "Borrowed" || "Borrow"}
                      </button>
                    }

                  </div>
                ))}

              </div>
          )
        }

      </div>
      <ToastContainer />

    </>
  );
};

export default BooksGrid;
