import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { variables } from "./Variables.js";

const MangeAccountAdmin = () => {
    
  const [requests, setRequests] = useState([]);
  const [updatebook, setBook] = useState([]);
  const userid = sessionStorage.getItem('userid'); //  your token is stored 
  const role = sessionStorage.getItem('role'); //  your token is stored 

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
    axios
      .get(variables.REQUEST_SERV_API + "GetAllRegisterRequests")
      .then((res) => setRequests(res.data))
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
          return;
        } 
        else {
          toast.error(`server or service is down!`, { position: toast.POSITION.TOP_CENTER });
        }
      });


  }, []);

  const reject =(b)=>{ 
    if (requests.length ===0) { window.location.reload() }

    
    axios
    .post(variables.REQUEST_SERV_API +"RejectUserRegisterRequest/"+b,null)
    .then((res) =>  toast.success("Rejected.", { position: toast.POSITION.TOP_CENTER }))
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
      } 
      else {
        toast.error(`server or service is down!`, { position: toast.POSITION.TOP_CENTER });
      }
    });

  }
  const accept = (b) => {
    if(!requests){window.location.reload()}
    axios
      .post(variables.REQUEST_SERV_API + "AcceptUserRegisterRequest/" + b,null)
      .then((res) =>  toast.success("Accepted.", { position: toast.POSITION.TOP_CENTER }))

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
        } 
        else {
          toast.error(`server or service is down!`, { position: toast.POSITION.TOP_CENTER });
        }
      });

  };
  

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
        [e.target.name]: e.target.value
      });
    }
  };
  
  
  
  const submitForm = (e) => {
    //e.preventDefault(); // Prevents default form submission behavior

    // Create a FormData object
    const formDataToSend = new FormData();

    // Append form fields and their values to the FormData object
    Object.entries(formData).forEach(([name, value]) => {
      formDataToSend.append(name, value);
    });

    // Send POST request with FormData object
    axios
      .put(variables.BOOK_SERV_API + "UpdateBook/"+e, formDataToSend)
      .then((response) => {
        setResponseMessage(response.data.message);
        setErrorMessage('');
      })
      .then((response) => {
        setResponseMessage(response.data.message);
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
        } 
        else {
          toast.error(`server or service is down!`, { position: toast.POSITION.TOP_CENTER });
        }
      });

  };
    return (
        <>
            <div className="bg-[#E5EDE8]">
                <div className="container mx-auto py-[120px]">
                {requests.map((request)=>
                    <table className="min-w-full divide-y divide-gray-200 my-5">
                        <thead className="bg-white divide-gray-200">
                            <tr className="text-black bg-white rounded-lg">
                                <th className="px-10 py-4 whitespace-nowrap"></th>
                                <th className="px-6 py-4 whitespace-nowrap">User Name</th>
                                <th className="px-6 py-4 whitespace-nowrap">Email</th>
                                <th className="px-6 py-4 whitespace-nowrap">FName</th>
                                <th className="px-6 py-4 whitespace-nowrap">LName</th>
 
                            </tr>
                        </thead>
                        <thead className="bg-white divide-gray-200">
                            <tr className="text-black bg-white rounded-lg">
                                <td>
                                    <div className="flex flex-col items-center gap-2">
                                        <button className="bg-bgbtn text-white text-[12px] w-full h-[40px] rounded-lg hover:bg-opacity-[50%] transition-all duration-200"
                                        onClick={()=> accept(request.username)}>
                                            Accept
                                        </button>
                                        <button className="bg-red-600 text-white text-[12px] w-full h-[40px] rounded-lg hover:bg-opacity-[50%] transition-all duration-200"
                                        onClick={()=> reject(request.username)}>
                                        
                                        Reject
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <h1>{request.username}</h1>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <h1>{request.email}</h1>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <h1>{request.fname}</h1>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center"><h1>{request.lname}</h1></td>
                                </tr>
                        </thead>
                    </table>
                )}
                </div>
            </div>
      <ToastContainer />

        </>
    )
}
export default MangeAccountAdmin;