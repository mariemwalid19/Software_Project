import axios from "axios";
import React, { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BooksContext } from "../contextApi/ContextApi";
import { variables } from "./Variables.js";

const BookDetail = ({ book }) => {
  const { bookDetails ,addBooksCart} = useContext(BooksContext);

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
      <div className="lg:container ps-3 lg:ps-0 mx-auto py-[120px]">
        <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between">
          {/* Left side */}
          <div className="lg:w-[50%] w-full">
            <div className="flex items-center gap-5 text-[16px] text-[#4D4D4D]">
              <div className="flex items-center gap-6 border-solid border-[1px] border-[#FFD782] w-fit rounded-lg px-5 py-2">
                <div className="text-[#FF7A00] flex items-center gap-1">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <span className="text-[#FF7A00] text-[16px]">4.5</span>
              </div>
              <p>
                {book.booktitle}
              </p>
            </div>
            <h1 className="lg:text-[30px] text-[16px] text-black font-bold my-6">
              {book.booktitle}

            </h1>
            <p className="lg:text-[16px] text-[12px]">
              Family-owned businesses are among the most notable and numerous in the world. Some are global brands employing thousands –
              think Walmart, Ford and JCB – others are much smaller, more local enterprises run by their owners and staffed entirely by their family. But however big or small,
              running or working in a family business, and the bringing togethe...
            </p>

            {/* Price & Button Add to Card */}
            <div className="flex lg:flex-row flex-col lg:items-end items-start gap-4">
              <p className="flex items-center text-bgbtn lg:text-[45px] text-[28px] font-bold">
                4900EGP
              </p>
              <del className="text-[#636363] text-[16px]">5000EGP</del>
              <span className="text-white bg-[#FF7A00] px-4 py-2 rounded-lg text-[14px]">
                2%
              </span>
            </div>
          
            {role !== "admin" &&
              <button
                onClick={() => handleBorrow(book.isborrowed, book.isbn)}
                className="flex items-center justify-center gap-7 lg:text-[30px] text-[22px] text-white bg-bgbtn rounded-lg w-[50%] h-[60px] my-8"

              >
                {book.isborrowed && "Borrowed" || "Borrow"}
              </button>
            }
          </div>
          {/* Right Side */}
          <div className="lg:w-[50%] w-full p-7 flex flex-col justify-center">
            <img
              src={`data:image/png;base64,${(book.bookimage)}`}
              alt={book.booktitle}
              className="rounded-md w-full h-[575px] object-contain"
            />

          </div>
        </div>
      </div>
      <ToastContainer />

    </>
  );
};

export default BookDetail;
