import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Security from "../contextApi/security.js";

import { variables } from "./Variables.js";
const ProfileDetails = () => {
  const userid = sessionStorage.getItem('userid');
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    profileimage: "",
  });
  const security = new Security();


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
        [e.target.name]: e.target.value
      });
    }
  };
  

  useEffect(() => {
    axios
      .get ( variables.USER_SERV_API + "GetProfile/"+userid)
      .then( (res) => {
        setProfile(res.data);
        setFormData({
          fname: res.data.fname,
          lname: res.data.lname,
          email:  (res.data.email),
          profileimage: res.data.profileimage,
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
        } 
        else {
          toast.error(`server or service is down!`, { position: toast.POSITION.TOP_CENTER });
        }
      });
  });


  const submitForm = (e) => {

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([name, value]) => {
      formDataToSend.append(name, value);
    });

    axios
      .put(variables.USER_SERV_API + "UpdateProfile/"+userid, formDataToSend)
      .then((response) => {
        console.log(response.data);
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
        <div className="container mx-auto py-[60px]">
          <div className="flex flex-col items-center">
            <form onSubmit={submitForm} className="mx-auto pt-16 max-w-xl sm:pt-20 w-full">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-semibold leading-6 text-accent-content"
                  >
                    First name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="fname"
                      id="fname"
                      value={formData.fname}
                      onChange={handleChange}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-semibold leading-6 text-accent-content"
                  >
                    Last name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="lname"
                      id="lname"
                      value={formData.lname}
                      onChange={handleChange}
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 relative">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold leading-6 text-accent-content"
                  >
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="relative">
                  <label
                    htmlFor="profileimage"
                    className="block text-sm font-semibold leading-6 text-accent-content"
                  >
                    Profile Image
                  </label>
                  <div className="mt-2.5">
                    <img
                      src={`data:image/png;base64,${formData.profileimage}`}
                      alt={formData.fname}
                      className="w-[100px] h-[100px] rounded-full"
                    />
                    <label htmlFor="profileimage" className="absolute left-0 bottom-0 rounded-b-3xl text-center text-[12px] text-black font-medium bg-slate-100 bg-opacity-[50%] w-full cursor-pointer">
                      Edit
                    </label>
                    <input
                      type="file"
                      name="profileimage"
                      id="profileimage"
                      placeholder="Change"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 flex items-center justify-around gap-[40px]">
              
                <button
                  type="submit"
                  className="block w-full rounded-md bg-bgbtn px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-bgbtnHome focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />

    </>
  );
};

export default ProfileDetails;
