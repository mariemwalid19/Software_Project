import axios from "axios";
import React, { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookImg from "../Images/icon-desc.png";
import { variables } from "../components/Variables.js";


const FormSignup = () => {
  const id = sessionStorage.getItem('userid');
  const [showAlert, setShowAlert] = useState(false);




  const [formData, setFormData] = useState({
    username: "",
    email: "",
    lname: "",
    fname: "",
    password: "",
    confirmpassword: "",
    profileimage: "",
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        profileimage: file,
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
    setShowAlert(true); // Show the Toast notification

    // Create a FormData object
    const formDataToSend = new FormData();

    // Append form fields and their values to the FormData object
    Object.entries(formData).forEach(([name, value]) => {
      formDataToSend.append(name, value);
    });

    // Send POST request with FormData object
    axios
      .post(variables.AUTH_SERV_API + "Register", formDataToSend)
      .then((response) => {
        toast.success(`Register Request Sent! `, { position: toast.POSITION.TOP_CENTER });

        setErrorMessage('');
      })
      .catch((error) => { console.log(error); // Log the error object to inspect its structure
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(error.response.data, { position: toast.POSITION.TOP_CENTER });

        } else if (error.response.status === 404) {
          toast.error(error.response.data, { position: toast.POSITION.TOP_CENTER });

        } else {
          toast.error(` server or service is down!`, { position: toast.POSITION.TOP_CENTER });
        }
      } 
      });

  };



  return (
    <>
      <div className="container mx-auto py-[40px]">
        <h1 className="text-[72px] font-black text-center text-secondary">
          Sign up for Libib!
        </h1>
        <p className="text-secondary text-[28px] font-light text-center my-[30px]">
          Your library catalog available anywhere, anytime.
        </p>
        <form
          onSubmit={submitForm}
          className="flex flex-col items-start justify-center w-[80%] mx-auto mt-[120px]"
        >
          <h1 className="text-[28px] my-[40px] font-black text-secondary">
            Account Info:
          </h1>
          {/* container  username */}
          <div className="flex flex-col w-full">
            <label
              className="text-[14px] text-secondary font-normal my-2"
              htmlFor="firstName"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="username"
              onChange={handleChange}
              value={formData.username}
              className="h-[40px] ps-5 border-[1px] border-main border-solid rounded focus:border-main focus:outline-none"
            />

          </div>
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            {/* container  firstname */}

            <div className="flex flex-col w-full">
              <label
                className="text-[14px] text-secondary font-normal my-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="first name"
                required
                onChange={handleChange}
                value={formData.fname}
                className="h-[40px] ps-5 border-[1px] border-main border-solid rounded focus:border-main focus:outline-none"
              />

            </div>
            {/* container  lastname */}

            <div className="flex flex-col w-full">
              <label
                className="text-[14px] text-secondary font-normal my-2"
                htmlFor="lasttName"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                name="lname"
                required
                placeholder="last name"
                onChange={handleChange}
                value={formData.lname}
                className="h-[40px] ps-5 border-[1px] border-main border-solid rounded focus:border-main focus:outline-none"
              />

            </div>
          </div>
          {/* container Password&&confirmPassword */}
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <div className="flex flex-col w-full">
              <label
                className="text-[14px] text-secondary font-normal my-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                required
                onChange={handleChange}
                value={formData.password}
                className="h-[40px] ps-5 border-[1px] border-main border-solid rounded focus:border-main focus:outline-none"
              />

            </div>
            {/* confirm password

            <div className="flex flex-col w-full">
              <label
                className="text-[14px] text-secondary font-normal my-2"
                htmlFor="password"
              >
                ConfirmPassword
              </label>
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                placeholder="password"
                required
                onChange={handleChange}
                value={formData.confirmpassword}
                className="h-[40px] ps-5 border-[1px] border-main border-solid rounded focus:border-main focus:outline-none"
              />

            </div> */}

          </div>

          {/* container email */}

          <div className="flex flex-col w-full">
            <label
              className="text-[14px] text-secondary font-normal my-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="email"
              required
              onChange={handleChange}
              value={formData.email}
              className="h-[40px] ps-5 border-[1px] border-main border-solid rounded focus:border-main focus:outline-none"
            />

          </div>

          {/* upload photo */}
          <div className="flex flex-col w-full">
            <label
              className="text-[14px] text-secondary font-normal my-2"
              htmlFor="image"
            >
              uploadphoto
            </label>
            <input
              type="file"
              id="profileimage"
              name="profileimage"
              required
              onChange={handleChange}

              className="h-[40px] ps-5 border-[1px] border-main border-solid rounded focus:border-main focus:outline-none"
            />
          </div>
          {/* submit button */}
          <button
            className="text-[19px] w-[50%] lg:w-[25%] text-white bg-bgbtn font-bold py-[9px] my-[15px] rounded-lg"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        {id && <div>{id}</div>}
        {errorMessage && <div> {errorMessage}</div>}

        {/* the desc end  here */}
        <div className="hidden lg:flex bg-main gap-4 justify-center items-center w-[80%] mx-auto mt-[50px] py-[30px] px-[10px] rounded-lg">
          <img src={BookImg} alt="BookImg" />
          <p className="w-[90%] text-[16px] text-white font-normal">
            For organizations and school districts that need a way to manage
            multiple accounts with a centralized dashboard, Libib has created a
            new product offering: Libib District.{" "}
            <a href="#" className="font-bold underline">
              Learn More
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />

    </>
  );
};

export default FormSignup;
