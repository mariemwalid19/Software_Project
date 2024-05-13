import axios from "axios";
import React, { useState } from "react";
import { TiPlus } from "react-icons/ti";
import { ToastContainer, toast } from 'react-toastify';

import {
  TEModal,
  TEModalBody,
  TEModalContent,
  TEModalDialog,
  TEModalHeader,
  TERipple,
} from "tw-elements-react";

import { variables } from "../components/Variables.js";

const BorrowedBooks = () => {
  const token = localStorage.getItem('token'); //  your token is stored in localStorage

  const [showModalLg, setShowModalLg] = useState(false);
  const [formData, setFormData] = useState({
    booktitle: "",
    author: "",
    racknumber: "",
    description: "",
    bookimage: "",
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        bookimage: file,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const submitForm = (e) => {
    e.preventDefault(); // Prevents default form submission behavior

    // Create a FormData object
    const formDataToSend = new FormData();

    // Append form fields and their values to the FormData object
    Object.entries(formData).forEach(([name, value]) => {
      formDataToSend.append(name, value);
    });

    // Send POST request with FormData object
    axios
      .post(variables.BOOK_SERV_API + "AddBook", formDataToSend)
      .then((response) => {
        setResponseMessage(response.data.message);
        setErrorMessage('');
      })
      .then((response) => {
        setResponseMessage(response.data.message);
        setErrorMessage('');
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

  };
  return (
    <>
      <div className="bg-[#E5EDE8]">
        <div className="pt-[50px]">
          {/* <!--Button trigger large modal-->*/}
          <div className="py-4">
            <div className="flex items-center flex-wrap w-full justify-around">
              <TERipple className="w-1/6" rippleColor="white">
                <button
                  type="button"
                  onClick={() => setShowModalLg(true)}
                  className="inline-block rounded-lg border-dashed border-bgbtn border-[2px] w-full py-[50px] text-sm font-medium uppercase leading-normal text-bgbtn transition duration-150 ease-in-out focus:outline-none focus:ring-0"
                >
                  <TiPlus className="text-[24px] mx-auto" />
                  <h1>Add</h1>
                </button>
              </TERipple>
              <div className="w-1/6">
                <button
                  type="button"
                  className="flex flex-col items-center rounded-lg border-dashed border-white border-[2px] bg-bgbtnHome bg-opacity-[50%] w-full py-[50px] text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out focus:outline-none focus:ring-0"
                >
                  <h1 className="text-[24px] font-bold">580</h1>
                  <p className="text-[16px] font-semibold">Books</p>
                </button>
              </div>
              <div className="w-1/6">
                <button
                  type="button"
                  className="flex flex-col items-center rounded-lg border-dashed bg-opacity-[50%] border-white border-[2px] bg-bgbtnHome w-full py-[50px] text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out focus:outline-none focus:ring-0"
                >
                  <h1 className="text-[24px] font-bold">22K</h1>
                  <p className="text-[16px] font-semibold">Readers</p>
                </button>
              </div>
              <div className="w-1/6">
                <button
                  type="button"
                  className="flex flex-col items-center rounded-lg w-full border-dashed bg-opacity-[50%] border-white border-[2px] bg-bgbtnHome py-[50px] text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out focus:outline-none focus:ring-0"
                >
                  <h1 className="text-[24px] font-bold">80%</h1>
                  <p className="text-[16px] font-semibold">Interested</p>
                </button>
              </div>
            </div>
          </div>
          {/* <!--Large modal-->*/}
          <TEModal show={showModalLg} setShow={setShowModalLg}>
            <TEModalDialog size="lg">
              <TEModalContent className="px-[40px]">
                <TEModalHeader>
                  {/* <!--Modal title--> */}
                  <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                    Add Book
                  </h5>
                  {/* <!--Close button--> */}
                  <button
                    type="button"
                    className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    onClick={() => setShowModalLg(false)}
                    aria-label="Close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </TEModalHeader>
                {/* <!--Modal body--> */}
                <TEModalBody>
                  <form
                    onSubmit={submitForm}
                  >
                    <div className="mb-4">
                      <label
                        htmlFor="bookName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        BookTitle
                      </label>
                      <input
                        required
                        onChange={handleChange}
                        type="text"
                        id="booktitle"
                        name="booktitle"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="author"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Author
                      </label>
                      <input
                        required
                        onChange={handleChange}
                        type="text"
                        id="author"
                        name="author"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="isbn"
                        className="block text-sm font-medium text-gray-700"
                      >
                        RackNumber
                      </label>
                      <input
                        required
                        onChange={handleChange}
                        type="text"
                        id="racknumber"
                        name="racknumber"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="bookData"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <textarea
                        required
                        onChange={handleChange}
                        id="description"
                        name="description"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="img"
                        className="block text-sm font-medium text-gray-700"
                      >
                        BookImage
                      </label>
                      <input
                        onChange={handleChange}
                        required
                        type="file"
                        id="bookimage"
                        name="bookimage"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-primary-500 text-white px-4 py-2 rounded-md"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                  {errorMessage && <div> {errorMessage}</div>}
                </TEModalBody>
              </TEModalContent>
            </TEModalDialog>
          </TEModal>
        </div>
      </div>
      <ToastContainer />

    </>
  );
};

export default BorrowedBooks;
