import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaShoppingBasket } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import LogoFooter from "../Images/logo.png";
import searchBooks from "../components/SearchBooks";
import { BooksContext } from "../contextApi/ContextApi";
import { variables } from "./Variables.js";

const NavBar = () => {
  const userRole = sessionStorage.getItem('role'); //  your role is stored in localStorage
  const [profile, setProfile] = useState([]);
  const [updatebook, setBook] = useState([]);
  const userid = sessionStorage.getItem('userid'); //  your token is stored 
  const { booksCart } = useContext(BooksContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(userRole);
    /* Get books data from API */
    axios
      .get(variables.USER_SERV_API + "GetProfile/"+userid)
      .then((res) => setProfile(res.data))
      .catch((error) => {
        console.log(error); // Log the error object to inspect its structure
        if (error.response) {
          if (error.response.status === 400) {
            toast.error("error", { position: toast.POSITION.TOP_CENTER });

          } else if (error.response.status === 404) {
            toast.error("error", { position: toast.POSITION.TOP_CENTER });

          } else {
            toast.error(` server or service is down!`, { position: toast.POSITION.TOP_CENTER });
          }
        } 
        else {
          toast.error(`server or service is down!`, { position: toast.POSITION.TOP_CENTER });
        }
      });
    console.log(profile)
  }, []);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout =() =>{
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('userid');
    window.location.href = "/";


  }
  return (
    <>
      <nav>
        <div className="container mx-auto py-6">
          <div className="flex items-center gap-6 w-full">
            <Link to="/Home" className="items-center gap-[20px] hidden lg:flex">
              {/* Logo image */}
              <img src={LogoFooter} alt="Logo" />
              {/* Logo Title */}
              <div>
                <h1 className="text-logo font-bold text-[30px]">Bookoe</h1>
                <p className="text-logo font-light text-[13px]">
                  Book Store Website
                </p>
              </div>
            </Link>
            {/* Navigation Links */}
            <div className="relative">
              <button
                className="flex items-center gap-1 font-semibold justify-center text-[18px] py-[8px] px-[18px] rounded-lg text-white bg-bgbtnHome"
                onClick={toggleMenu}
              >
                Menu
                <IoMdArrowDropdown className="mt-1" />
              </button>
            </div>


            {/* Search */}
            <div className="relative">
              <input
              onChange={(e) => searchBooks(e.target.value)}
                className="w-full lg:w-[350px] text-[14px] lg:text-[18px] ps-2 drop-shadow-2xl font-medium h-[40px] focus:outline-none"
                type="serach"
                placeholder="Find books here.."
              />
              <div className="absolute right-2 top-2 hidden lg:block">
                <CiSearch className="text-[22px] text-gray-400 font-bold" />
              </div>
            </div>


            
         {/*  Cart Icon with Count */}
         <Link to="/checkout" className="relative flex items-center gap-2">
              <FaShoppingBasket className="text-gray-400 text-lg" />
              <span className="w-5 h-5 bg-main text-white text-xs rounded-full flex justify-center items-center">
                {booksCart.length}
              </span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-2 border-main lg:border-[1px] border-solid rounded-lg lg:py-[8px] lg:px-[16px]"
            >
              <img class=" rounded-full"
                src={`data:image/png;base64,${(profile.profileimage)}`}
                alt={profile.fname}
                style={{ width: '100px', height: '100px' }} // Adjust width and height as needed

              />
              <span className="text-[18px] font-semibold text-main hidden lg:block">
                {profile.fname}
              </span>
              <IoMdArrowDropdown className="text-main font-semibold hidden lg:block" />
            </Link>
            <Link
              className="flex items-center gap-1 font-semibold justify-center text-lg py-2 px-4 rounded-lg text-white bg-bgbtnHome"
              onClick={logout}
              >
              <span className="text-lg font-semibold text-white hidden lg:block">
                Logout
              </span>
              <IoMdArrowDropdown className="text-main font-semibold hidden lg:block" />
            </Link>
          </div>
        </div>
        <div className="shadow-md transition-all duration-500 ease-in-out">
          {isOpen && (
            <>
              <div className="shadow-md transition-all duration-500 ease-in-out">
                <IoMdArrowDropdown className="mx-auto m-0 text-[#506E5C] text-[30px] transform rotate-180 absolute left-0 top-[78px] lg:left-[350px] lg:top-[100px]" />
                <div className="active-navbar flex flex-col gap-[40px] ps-4 lg:flex-row m-0 py-3 justify-center w-full bg-[#506E5C] border text-white border-gray-300 p-2 mt-1 rounded ">
                  <NavLink
                    to="/Home"
                    className="text-[18px] font-semibold opacity-[60%]"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/booksStroe"
                    className="text-[18px] font-semibold opacity-[60%]"
                  >
                    Books
                  </NavLink>
                  <NavLink
                    to="/borrowedBooks"
                    className="text-[18px] font-semibold opacity-[60%]"
                  >
                    BorrowedBooks
                  </NavLink>
                  <NavLink
                    to="/about"
                    className="text-[18px] font-semibold opacity-[60%]"
                  >
                    About
                  </NavLink>
                  {userRole === "admin" && <NavLink
                    to="/dashbord"
                    className="text-[18px] font-semibold opacity-[60%]"
                  >
                    DashBord
                  </NavLink>}

                  <NavLink
                    to="/contactUs"
                    className="text-[18px] font-semibold opacity-[60%]"
                  >
                    Contact Us
                  </NavLink>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
      <ToastContainer />

    </>
  );
};

export default NavBar;
