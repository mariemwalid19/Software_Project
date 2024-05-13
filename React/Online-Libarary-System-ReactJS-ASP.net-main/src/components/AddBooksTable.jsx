import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { variables } from "./Variables.js";

import {
  TEModal,
  TEModalBody,
  TEModalContent,
  TEModalDialog,
  TEModalHeader
} from "tw-elements-react";

const AddBooksTable = () => {
  const [books, setBooks] = useState([]);
  const [updatebook, setBook] = useState("");
  const userid = sessionStorage.getItem('userid'); //  your token is stored in localStorage
  const [showModalLg, setShowModalLg] = useState(false);

  const [formData, setFormData] = useState({
    booktitle: "",
    author: "",
    racknumber: "",
    description: "",
    bookimage: "",
  });
  useEffect(() => {

    /* Get books data from API */
    if (userid) { // Check if userid exists
    axios
      .get(variables.BOOK_SERV_API + "GetAllAvailableBooks/"+userid)
      .then((res) => {
        setBooks(res.data);
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
        return;
      });
    }
  }, []);

  const getbook = (b) => {
    axios
      .get(variables. BOOK_SERV_API + "GetBookByISBN/" + b)
      .then((res) => {
        setBook(res.data);
        setFormData({
          booktitle: res.data.booktitle,
          author: res.data.author,
          racknumber: res.data.racknumber,
          description: res.data.description,
          bookbmage: res.data.bookimage
        });
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


  const deletebook = (b) => {
    axios
      .delete(variables.BOOK_SERV_API + "DeleteBook/" + b)
      .then((res) => setBook(res.data))
     
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

  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {

    if (e.target.type === "file") {

      const file = e.target.files[0];
      setFormData({
        ...formData,
        BookImage: file,
      });
    } else {

      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };



  const submitForm = (e) => {
    //e.preventDefault(); // Prevents default form submission behavior

    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([name, value]) => {
      formDataToSend.append(name, value);
    });

    // Send POST request with FormData object
    axios
      .put(variables.BOOK_SERV_API + "UpdateBook/" + e, formDataToSend)
      .then((response) => {
        setResponseMessage(response.data.message);
        setErrorMessage('');
      })
      .catch((error) => {
        console.log(error); // Log the error object to inspect its structure
        if (error.response) {
          if (error.response.status === 400) {
            toast.error('bad request', { position: toast.POSITION.TOP_CENTER });

          } else if (error.response.status === 404) {
            toast.error(error.response, { position: toast.POSITION.TOP_CENTER });

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
        <div className="container mx-auto py-[120px]">
         { books.length !=0 &&
          books.map((book) =>
            <table className="min-w-full divide-y divide-gray-200 my-5">
              <thead className="bg-white divide-gray-200">
                <tr className="text-black bg-white rounded-lg">
                  <th className="px-10 py-4 whitespace-nowrap"></th>
                  <th className="px-6 py-4 whitespace-nowrap">Image</th>
                  <th className="px-6 py-4 whitespace-nowrap">BookTitle</th>
                  <th className="px-6 py-4 whitespace-nowrap">RackNumber</th>
                  <th className="px-6 py-4 whitespace-nowrap">Author</th>
                  <th className="px-6 py-4 whitespace-nowrap">Description</th>
                </tr>
              </thead>
              <thead className="bg-white divide-gray-200">
                <tr className="text-black bg-white rounded-lg">
                  <td className="px-6 py-4 max-w-[200px] max-h-[100px]">
                    <div className="flex justify-center items-center gap-2">
                      <button className="bg-bgbtn text-white text-[12px] w-full h-[40px] rounded-lg hover:bg-opacity-[50%] transition-all duration-200"
                        onClick={() => { setShowModalLg(true); getbook(book.isbn) }}
                      >
                        Update

                      </button>
                      <button className="bg-red-600 text-white text-[12px] w-full h-[40px] rounded-lg hover:bg-opacity-[50%] transition-all duration-200"
                        onClick={() => deletebook(book.isbn)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-[200px] max-h-[100px] text-center whitespace-normal">
                    <img
                      src={`data:image/png;base64,${(book.bookimage)}`}
                      alt={book.booktitle}
                      className="max-w-full max-h-full"
                    />
                  </td>
                  <td className="px-6 py-4 max-w-[200px] max-h-[100px] text-center whitespace-normal">
                    <div className="max-w-full max-h-full overflow-hidden">
                      {book.booktitle}
                    </div>
                  </td><td className="px-6 py-4 max-w-[200px] max-h-[100px] text-center whitespace-normal">
                    <div className="max-w-full max-h-full overflow-hidden">
                      {book.racknumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-[200px] max-h-[100px] text-center whitespace-normal">
                    <div className="max-w-full max-h-full overflow-hidden">
                      {book.author}
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-[200px] max-h-[100px] text-center whitespace-normal">
                    <div className="max-w-full max-h-full overflow-hidden">
                      {book.description}
                    </div>
                  </td>
                </tr>
              </thead>

            </table>
          )}
          {/* <!--Large modal-->*/}
          <TEModal show={showModalLg} setShow={setShowModalLg}>
            <TEModalDialog size="lg">
              <TEModalContent className="px-[40px]">
                <TEModalHeader>
                  {/* <!--Modal title--> */}
                  <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                    update Book
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
                   onSubmit={ e=> submitForm(updatebook.isbn)}
                  >
                    <div className="mb-4">
                      <label
                        htmlFor="bookName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        BookTitle
                      </label>
                      <input
                        value={formData.booktitle}

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
                        author
                      </label>
                      <input
                        value={formData.author}
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
                        onChange={handleChange}
                        type="text"
                        id="RackNumber"
                        name="RackNumber"
                        value={formData.racknumber}

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
                        onChange={handleChange}
                        id="description"
                        name="description"
                        value={formData.description}
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

export default AddBooksTable;
