import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { variables } from "./Variables.js";

const AddBorrowedTable = () => {
  const [showAlert, setShowAlert] = useState(false);

  const [books, setBooks] = useState([]);
  const [updatebook, setBook] = useState([]);
  const userid = sessionStorage.getItem('userid'); //  your token is stored in localStorage
  const [showModalLg, setShowModalLg] = useState(false);
  const role = sessionStorage.getItem('role');
  const [formData, setFormData] = useState({
    booktitle: "",
    author: "",
    racknumber: "",
    description: "",
    bookimage: "",
  });
  useEffect(() => {
    /* Get books data from API */
    if (role === "admin") {
      axios
        .get(variables.BOOK_SERV_API + "GetAllBorrowedBooks")
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
        });
    }
    else {
      axios
        .get(variables.BOOK_SERV_API + "GetBorrowedBooks/"+userid)
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
        });

    }
  }, []);


  // const returnbook = (e) => {
  //   axios
  //     .post(variables.USER_SERV_API + "ReturnBook/" + e, null)
  //     .then((res) => {
  //       toast.success(`Returned! `, { position: toast.POSITION.TOP_CENTER });
  //     })
  //     .catch((error) => {
  //       console.log(error); // Log the error object to inspect its structure
  //       if (error.response) {
  //         if (error.response.status === 400) {
  //           toast.error(error.response.data, { position: toast.POSITION.TOP_CENTER });

  //         } else if (error.response.status === 404) {
  //           toast.error(error.response.data, { position: toast.POSITION.TOP_CENTER });

  //         } else {
  //           toast.error(` server or service is down!`, { position: toast.POSITION.TOP_CENTER });
  //         }
  //       } else {
  //         toast.error(`server or service is down!`, { position: toast.POSITION.TOP_CENTER });
  //       }
  //     });
  // }

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
        [e.target.name]: e.target.value
      });
    }
  };



  return (
    <>
      <div className="bg-[#E5EDE8]">
        <div className="container mx-auto py-[120px]">

          {books.map((book) =>
            <table className="min-w-full divide-y divide-gray-200 my-5">
              <thead className="bg-white divide-gray-200">
                <tr className="text-black bg-white rounded-lg">
              
                {role === "admin" &&  <th className="px-6 py-4 whitespace-nowrap">username</th>}
                {role !== "admin" &&  <th className="px-6 py-4 whitespace-nowrap">Image</th>}
                  <th className="px-6 py-4 whitespace-nowrap">BookTitle</th>
                  <th className="px-6 py-4 whitespace-nowrap">Author</th>
                  <th className="px-6 py-4 whitespace-nowrap">Description</th>
                </tr>
              </thead>
              <thead className="bg-white divide-gray-200">
            
                <tr className="text-black bg-white rounded-lg">
              
                {role !=="admin" &&
                  <td className="px-6 py-4 max-w-[200px] max-h-[100px] text-center whitespace-normal">
                    <img
                      src={`data:image/png;base64,${(book.bookimage)}`}
                      alt={book.booktitle}
                      className="max-w-full max-h-full"
                    />
                  </td>
                }
                {role ==="admin" &&
                <td className="px-6 py-4 max-w-[200px] max-h-[100px] text-center whitespace-normal">
                    <div className="max-w-full max-h-full overflow-hidden">
                      {book.username}
                    </div>
                  </td>
                }
                  <td className="px-6 py-4 max-w-[200px] max-h-[100px] text-center whitespace-normal">
                    <div className="max-w-full max-h-full overflow-hidden">
                      {book.booktitle}
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

        </div>

      </div>
      <ToastContainer />

    </>
  );
};

export default AddBorrowedTable;
