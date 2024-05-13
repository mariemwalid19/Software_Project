import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BooksProvider from "./contextApi/ContextApi";
import About from "./pages/About";
import AddBooks from "./pages/AddBooks";
import BookDetails from "./pages/BookDetails";
import BooksStroe from "./pages/BooksStroe";
import Borrowed from "./pages/Borrowed";
import BorrowedBooks from "./pages/BorrowedBooks";
import CheckoutCart from "./pages/CheckoutCart";
import ContactUS from "./pages/ContactUS";
import Dashbord from "./pages/Dashbord";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MangeAccount from "./pages/MangeAccount";
import MangeBorrowed from "./pages/MangeBorrowed";
import PaymentPage from "./pages/PaymentPage";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <BooksProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/booksStroe" element={<BooksStroe />} />
            <Route path="/booksStroe/:bookTitle" element={<BookDetails />} />
            <Route path="/checkout" element={<CheckoutCart />} />
            <Route path="/checkout/payment" element={<PaymentPage />} />
            <Route path="/contactUs" element={<ContactUS />} />
            <Route path="/about" element={<About />} />
            <Route path="/addBooks" element={<AddBooks />} />
            <Route path="/borrowedBooks" element={<BorrowedBooks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/borrowed" element={<Borrowed />} />
            <Route path="/mange_account" element={<MangeAccount />} />
            <Route path="/mangeBorrowed" element={<MangeBorrowed />} />
            <Route path="/dashbord" element={<Dashbord />} />
          </Routes>
        </BooksProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
