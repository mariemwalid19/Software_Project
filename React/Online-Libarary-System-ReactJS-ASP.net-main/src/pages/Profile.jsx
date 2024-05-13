import React from "react";
import Footer from "../components/FooterForm";
import NavBar from "../components/NavBar";
import NavBreadcrumb from "../components/NavBreadcrumb";
import ProfileDetails from "../components/ProfileDetails";
const Profile = () => {
  return (
    <>
      <NavBar />
      <NavBreadcrumb page="Profile" />
      <ProfileDetails />
      <Footer />
    </>
  );
};

export default Profile;
