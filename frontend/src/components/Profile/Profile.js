/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import { userProfileAction } from "../../redux/actions/users/userActions";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);

  let user = {};
  const userLogin = useSelector((store) => store.userLogin.userInfo);
  const updatedUser = useSelector((store) => store.updateProfile.user)

  if (useSelector((store) => store.updateProfile.success) === true && userLogin._id === updatedUser._id) {
    user = updatedUser ; 
  }else{
    user = userLogin ; 
  }
  // if (useSelector((store) => store.updateProfile.success) === true ) {
  //   console.log("i picked update "  );
  //    user = useSelector((store) => store.updateProfile.user);
  // } else {
  //   console.log("i picked login ");
  //   user = useSelector((store) => store.userLogin.userInfo);
  // }


  document.body.style = "background-color: white";
 if (user.isAdmin) 
 /// user is admin 
 return (
  <div className="profile">
    <div className="profile-picture-frame">
      <img
        className="profile-image"
        src={require("../../assets/avatar.png")}
        alt=""
      />
      <div className="profile-name-frame">
        <label className="profile-Name  profile-style ">{user.name}</label>
      </div>
    </div>
    <div className="profile-details-frame">
      <div className="profile-account-details"> Account Details </div>
      <div className="profile-account-email profile-style">
        Email : {user.email}
      </div>
      <div className="profile-account-phone profile-style ">
        phone : {user.phone}
      </div>
      <div className="profile-account-adress profile-style ">
        adress : {user.adress}
      </div>
      <div className="profile-account-postcode  profile-style">
        postcode: {user.codePostal}
      </div>
      <div className="profile-account-country profile-style ">
        country : {user.country}
      </div>
      <div className="profile-account-city profile-style ">
        city : {user.city}
      </div>
      <button className="profile-button" type="button">
        <Link to="/update" className="change-details">
          Change details
        </Link>
      </button>
    </div>
  </div>
);


 /// user is not admin 
  return (
    <div className="profile">
      <div className="profile-picture-frame">
        <img
          className="profile-image"
          src={require("../../assets/avatar.png")}
          alt=""
        />
        <div className="profile-name-frame">
          <label className="profile-Name  profile-style ">{user.name}</label>
        </div>
      </div>
      <div className="profile-details-frame">
        <div className="profile-account-details"> Account Details </div>
        <div className="profile-account-organisation profile-style">
          Organisation Name : {user.organisation}
        </div>
        <div className="profile-account-email profile-style">
          Email : {user.email}
        </div>
        <div className="profile-account-phone profile-style ">
          phone : {user.phone}
        </div>
        <div className="profile-account-taxID profile-style ">
          taxID : {user.taxID}
        </div>
        <div className="profile-account-adress profile-style ">
          adress : {user.adress}
        </div>
        <div className="profile-account-postcode  profile-style">
          postcode: {user.codePostal}
        </div>
        <div className="profile-account-country profile-style ">
          country : {user.country}
        </div>
        <div className="profile-account-city profile-style ">
          city : {user.city}
        </div>
        <button className="profile-button" type="button">
          <Link to="/update" className="change-details">
            Change details
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Profile;
