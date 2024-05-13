import axios from "axios";
import React, { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BooksContext } from "../contextApi/ContextApi";
import { variables } from "./Variables.js";


const BooksList = () => {
  const { Books, addBooksCart, bookSearchResult, filterResult } = useContext(BooksContext);
  const [showAlert, setShowAlert] = useState(false);
  const role = sessionStorage.getItem('role');
  const userid = sessionStorage.getItem('userid');
  const handleBorrow = (isBorrowed, bookisbn) => {

    setShowAlert(true);
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
      <div className="flex flex-col items-start justify-center gap-[120px] py-[60px]">

        {bookSearchResult !== null ?

          (bookSearchResult.length !== 0 ? bookSearchResult.map((bbook) =>
            <div
              key={bbook.booktitle}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center justify-between gap-5">
                <Link
                  to={`/booksStroe/${bbook.booktitle}`}
                >
                  <div className="w-full relative">
                    <img
                      className=" object-contain rounded-xl h-[264px] w-[185px]"
                      src={`data:image/png;base64,${(bbook.bookimage)}`}
                      alt={bbook.booktitle}
                    />
                  </div>
                </Link>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="my-4 text-[14px] py-3 px-4 rounded-lg bg-bgbtnHome text-white font-bold">
                      {"category"}
                    </p>
                    <p className="my-4 text-[12px] py-3 px-4 rounded-lg bg-bgbtnHome text-white font-bold">
                      {"2020"}
                    </p>
                  </div>
                  <h1 className="text-[22px] font-semibold">
                    {bbook.booktitle > 30
                      ? bbook.booktitle.slice(0, 45) + "..."
                      : bbook.booktitle}
                  </h1>
                  <p className="flex items-center my-3 opacity-[60%] font-medium text-[16px]">
                    {bbook.author} .
                    <FaStar className="text-[#FF7A00]" />
                    {"contentVersion"}
                  </p>
                  <p className="w-[75%]">
                    {bbook.description &&
                      bbook.description > 120
                      ? bbook.description.slice(0, 120) + "..."
                      : bbook.description}
                  </p>
                </div>
              </div>
              <div>
                {role !== "admin" &&
                  <button
                    onClick={() => handleBorrow(bbook.isborrowed, bbook.isbn)}
                    className="cursor-pointer flex items-center justify-center w-[150px] h-[50px] rounded-lg gap-2 text-white bg-bgbtnHome text-[14px]"
                  >
                    {bbook.isborrowed && "Borrowed" || "Borrow"}
                  </button>
                }
              </div>
            </div>)
            : <div> there is no book found</div>) :
          (
            filterResult !== null ?
              (
                filterResult.length !== 0 ?
                filterResult.map((filterbook) =>
                    <div
                      key={filterbook.booktitle}
                      className="w-full flex items-center justify-between"
                    >
                      <div className="flex items-center justify-between gap-5">
                        <Link
                          to={`/booksStroe/${filterbook.booktitle}`}
                        >
                          <div className="w-full relative">
                            <img
                              className=" object-contain rounded-xl h-[264px] w-[185px]"
                              src={`data:image/png;base64,${(filterbook.bookimage)}`}
                              alt={filterbook.booktitle}
                            />
                          </div>
                        </Link>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="my-4 text-[14px] py-3 px-4 rounded-lg bg-bgbtnHome text-white font-bold">
                              {"category"}
                            </p>
                            <p className="my-4 text-[12px] py-3 px-4 rounded-lg bg-bgbtnHome text-white font-bold">
                              {"2020"}
                            </p>
                          </div>
                          <h1 className="text-[22px] font-semibold">
                            {filterbook.booktitle > 30
                              ? filterbook.booktitle.slice(0, 45) + "..."
                              : filterbook.booktitle}
                          </h1>
                          <p className="flex items-center my-3 opacity-[60%] font-medium text-[16px]">
                            {filterbook.author} .
                            <FaStar className="text-[#FF7A00]" />
                            {"contentVersion"}
                          </p>
                          <p className="w-[75%]">
                            {filterbook.description &&
                              filterbook.description > 120
                              ? filterbook.description.slice(0, 120) + "..."
                              : filterbook.description}
                          </p>
                        </div>
                      </div>
                      <div>
                        {role !== "admin" &&
                          <button
                            onClick={() => handleBorrow(filterbook.isborrowed, filterbook.isbn)}
                            className="cursor-pointer flex items-center justify-center w-[150px] h-[50px] rounded-lg gap-2 text-white bg-bgbtnHome text-[14px]"
                          >
                            {filterbook.isborrowed && "Borrowed" || "Borrow"}
                          </button>
                        }
                      </div>
                    </div>)
                  : <div> there is no book found</div>
              )
              :

              <div className="flex flex-col items-start justify-center gap-[120px] py-[60px]">
                {/* all books */}
                {Books.map((book) => (
                  <div
                    key={book.booktitle}
                    className="w-full flex items-center justify-between"
                  >
                    <div className="flex items-center justify-between gap-5">
                      <Link
                        to={`/booksStroe/${book.booktitle}`}
                      >
                        <div className="w-full relative">
                          <img
                            className=" object-contain rounded-xl h-[264px] w-[185px]"
                            src={`data:image/png;base64,${(book.bookimage)}`}
                            alt={book.booktitle}
                          />
                        </div>
                      </Link>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="my-4 text-[14px] py-3 px-4 rounded-lg bg-bgbtnHome text-white font-bold">
                            {"category"}
                          </p>
                          <p className="my-4 text-[12px] py-3 px-4 rounded-lg bg-bgbtnHome text-white font-bold">
                            {"2020"}
                          </p>
                        </div>
                        <h1 className="text-[22px] font-semibold">
                          {book.booktitle > 30
                            ? book.booktitle.slice(0, 45) + "..."
                            : book.booktitle}
                        </h1>
                        <p className="flex items-center my-3 opacity-[60%] font-medium text-[16px]">
                          {book.author} .
                          <FaStar className="text-[#FF7A00]" />
                          {"contentVersion"}
                        </p>
                        <p className="w-[75%]">
                          {book.description &&
                            book.description > 120
                            ? book.description.slice(0, 120) + "..."
                            : book.description}
                        </p>
                      </div>
                    </div>
                    <div>
                      {role !== "admin" &&
                        <button
                          onClick={() => handleBorrow(book.isborrowed, book.isbn)}
                          className="cursor-pointer flex items-center justify-center w-[150px] h-[50px] rounded-lg gap-2 text-white bg-bgbtnHome text-[14px]"
                        >
                          {book.isborrowed && "Borrowed" || "Borrow"}
                        </button>
                      }
                    </div>
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

export default BooksList;
