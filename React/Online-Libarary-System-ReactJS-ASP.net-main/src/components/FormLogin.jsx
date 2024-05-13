import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Images/logo.png";
import { variables } from "../components/Variables.js";
import { useToken } from './TokenContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormLogin = () => {
  const { role,userid, updateToken } = useToken();
  const [showAlert, setShowAlert] = useState(false);
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    const formDataToSend = new FormData();
    // Append form fields and their values to the FormData object
    Object.entries(formData).forEach(([name, value]) => {
      formDataToSend.append(name, value);
    });
    // Send POST request with FormData object
    axios
      .post(variables.AUTH_SERV_API + "Login", formDataToSend)
      .then((response) => {
        setResponseMessage(response.data);
        setErrorMessage('');
        const userid = response.data.userid; 
        const role = response.data.role; 
        const id= parseInt(userid);
        updateToken(role,id); //
        window.location.href = "/Home";
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            toast.error(error.response.data, { position: toast.POSITION.TOP_CENTER });

          } else if (error.response.status === 404) {
            toast.error(error.response.data, { position: toast.POSITION.TOP_CENTER });

          } else {
            toast.error(` server or service is down!`, { position: toast.POSITION.TOP_CENTER });
          }
        } else {
          console.log(error)
          toast.error(`server or service is down!`, { position: toast.POSITION.TOP_CENTER });
        }
      },[userid,role]);
    
  };



  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center my-[50px]">
        {/* Lgin Form */}
        <form
          onSubmit={submitForm}
          className="drop-shadow-2xl py-[20px] w-[50%]"
        >
          <div className="flex items-center gap-[20px]">
            <img src={Logo} alt="Logo" />
            <h1 className="text-[28px] font-light text-secondary">
              Login
            </h1>
          </div>
          <input
            onChange={handleChange}
            className="w-full h-[40px] my-[15px] ps-2 text-main text-[16px] font-normal border-[1px] border-main border-solid rounded focus:border-main focus:outline-none"
            type="text"
            required
            placeholder="username"
            name="username"
            id="username"
          />

          <input
            onChange={handleChange}
            className="w-full h-[40px] my-[15px] ps-2 text-main text-[16px] font-normal border-[1px] border-main border-solid rounded focus:border-main focus:outline-none"
            type="password"
            placeholder="password"
            name="password"
            id="password"
            required

          />
          <button
            className="w-full text-[24px] text-white bg-bgbtn font-bold py-[9px] my-[15px] rounded-lg"
            type="submit"
          >
            Sign In
          </button>
        </form>

        {errorMessage && <div> {errorMessage}</div>}
        {/* Sign Up  Button */}
        <div className="drop-shadow-2xl py-[20px]">
          <h1 className=" text-[18px] font-medium">
            Don't have an account?
            <Link to="/signup" className="text-main ms-2 opacity-[70%]">
              Sign Up!
            </Link>
          </h1>
        </div>
      </div>
      <ToastContainer />

    </>
  );
};

export default FormLogin;
