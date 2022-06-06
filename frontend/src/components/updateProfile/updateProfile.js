import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileAction } from "../../redux/actions/users/userActions";
import "./updateProfile.css";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  let user = {};

  const userLogin = useSelector((store) => store.userLogin.userInfo);
  const updatedUser = useSelector((store) => store.updateProfile.user)

  if (useSelector((store) => store.updateProfile.success) === true && userLogin._id === updatedUser._id) {
    user = updatedUser ; 
  }else{
    user = userLogin ; 
  }
  console.log(user);

  // if (useSelector((store) => store.updateProfile.success) === true) {
  //    // eslint-disable-next-line react-hooks/rules-of-hooks
  //    user = useSelector((store) => store.updateProfile.user);
  // } else {
  //    // eslint-disable-next-line react-hooks/rules-of-hooks
  //    user = useSelector((state) => state.userProfile.user);

  // }



  // get user from store
  // const user = useSelector((state) => state.userProfile.user);

  // update user
  const [name, setname] = useState(user.name);
  const [email, setemail] = useState(user.email);
  const [password, setpassword] = useState(user.password);
  const [organisation, setorganisation] = useState(user.organisation);
  const [phone, setphone] = useState(user.phone);
  const [country, setcountry] = useState(user.country);
  const [city, setcity] = useState(user.city);
  const [codePostal, setcodePostal] = useState(user.codePostal);
  const [taxID, settaxID] = useState(user.taxID);
  const [adress, setadress] = useState(user.adress);
  const [isAdmin] = useState(user.isAdmin);
  //  const [photo, setphoto] = useState(user.photo)

  //dispatch  update action
  const dispatch = useDispatch();

  //navigate to profile
  const navigate = useNavigate();

  //Submit handler
  const SubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProfileAction(
        name,
        email,
        password,
        organisation,
        phone,
        country,
        city,
        codePostal,
        taxID,
        adress,
      
        // photo
      )
    );

    console.log(setorganisation(e.target.value));
    ///navigate after updating the user
    navigate("/Profile");
  };

  if (isAdmin)
  /// user is admin 
  return (
    <form onSubmit={SubmitHandler}>
      <div className="update-profile">
        <div className="update-profile-picture-frame">
          <img
            className="update-profile-image"
            src={require("../../assets/avatar.png")}
            alt=""
          />
          <div className="update-profile-name-frame">
            <input
              className="update-profile-Name  update-profile-style"
              value={name}
              onChange={(e) => setname(e.target.value)}
              type="text"
              placeholder="Name"
            />
          </div>
        </div>
        <div className="update-profile-details-frame">
          <div className="update-profile-account-details">Account Details</div>
          <input
            className="update-profile-account-email  update-profile-style"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder=" Email "
          />

          <input
            className="update-profile-account-password  update-profile-style"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            placeholder=" Password "
          />

          <input
            className="update-profile-account-phone   update-profile-style"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            type="number"
            placeholder=" phone "
          />


          <input
            className="update-profile-account-adress update-profile-style"
            value={adress}
            onChange={(e) => setadress(e.target.value)}
            type="text"
            placeholder="adress"
          />

          <input
            className="update-profile-account-postcode update-profile-style"
            value={codePostal}
            onChange={(e) => setcodePostal(e.target.value)}
            type="number"
            placeholder="postcode"
          />

          <input
            className="update-profile-account-country update-profile-style"
            value={country}
            onChange={(e) => setcountry(e.target.value)}
            type="text"
            placeholder="country"
          />

          <input
            className="update-profile-account-city update-profile-style"
            value={city}
            onChange={(e) => setcity(e.target.value)}
            type="text"
            placeholder="city"
          />

          <button className="update-profile-button" type="submit">
            Save Changes
          </button>
          {/* <button className="return-to-profile-button" type="submit">
             <Link to="/Profile" className='save-changes' >
            Return to profile
            </Link> 
          </button> */}
        </div>
      </div>
    </form>
  );

  //// user is not admin
  return (
    <form onSubmit={SubmitHandler}>
      <div className="update-profile">
        <div className="update-profile-picture-frame">
          <img
            className="update-profile-image"
            src={require("../../assets/avatar.png")}
            alt=""
          />
          <div className="update-profile-name-frame">
            <input
              className="update-profile-Name  update-profile-style"
              value={name}
              onChange={(e) => setname(e.target.value)}
              type="text"
              placeholder="Name"
            />
          </div>
        </div>
        <div className="update-profile-details-frame">
          <div className="update-profile-account-details">Account Details</div>
          <input
            className="update-profile-account-organisation  update-profile-style"
            value={organisation}
            onChange={(e) => setorganisation(e.target.value)}
            type="text"
            placeholder="  Organisation Name"
          />
          <input
            className="update-profile-account-email  update-profile-style"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder=" Email "
          />

          <input
            className="update-profile-account-password  update-profile-style"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            placeholder=" Password "
          />

          <input
            className="update-profile-account-phone   update-profile-style"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            type="number"
            placeholder=" phone "
          />

          <input
            className="update-profile-account-taxID update-profile-style"
            value={taxID}
            onChange={(e) => settaxID(e.target.value)}
            type="Number"
            placeholder=" taxID "
          />

          <input
            className="update-profile-account-adress update-profile-style"
            value={adress}
            onChange={(e) => setadress(e.target.value)}
            type="text"
            placeholder="adress"
          />

          <input
            className="update-profile-account-postcode update-profile-style"
            value={codePostal}
            onChange={(e) => setcodePostal(e.target.value)}
            type="number"
            placeholder="postcode"
          />

          <input
            className="update-profile-account-country update-profile-style"
            value={country}
            onChange={(e) => setcountry(e.target.value)}
            type="text"
            placeholder="country"
          />

          <input
            className="update-profile-account-city update-profile-style"
            value={city}
            onChange={(e) => setcity(e.target.value)}
            type="text"
            placeholder="city"
          />

          <button className="update-profile-button" type="submit">
            Save Changes
          </button>
          {/* <button className="return-to-profile-button" type="submit">
             <Link to="/Profile" className='save-changes' >
            Return to profile
            </Link> 
          </button> */}
        </div>
      </div>
    </form>
  );
};

export default UpdateProfile;
