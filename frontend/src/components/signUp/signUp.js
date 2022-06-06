import "./signUp.css";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import { createUserAction } from "../../redux/actions/users/userActions";
import { useNavigate } from "react-router-dom";


export default function SignUp() {
  //add background color to signup
  document.body.style = "background-color:  #114a71";

  ////////////// NEW with redux //////////////
  const [user, setUser] = useState({
    name: "",
    photo: "",
    email: "",
    password: "",
    organisation: "",
    phone: "",
    country: "",
    city: "",
    codePostal: "",
    taxID: "",
    adress: "",
  });

  //dispatching
  const dispatch = useDispatch();

    const navigate = useNavigate();



  // entering user data
  function handle(e) {
    const newUser = {...user};
    newUser[e.target.id] = e.target.value;
    setUser(newUser);

  }


  function formSubmitHandler(e) {
    e.preventDefault();
    //dispatch user create action
    dispatch(createUserAction(user)); 
     navigate('/login');
  }

  //change the background-color of each body in component
  document.body.style = "background-color: #114A71";

  return (
    <div className="signup-real">
      <div className="card text-center position-absolute top-50 start-50 translate-middle">
        <div className="card-body">
        <div className="artify-logo" >
          <img
            className="artify-logo"
            src={require("../../assets/artifyLogo.png")}
            alt="Artify Logo"
            height="80"
            width="90"
            loading="lazy"
            style={{marginTop: 0}}
          ></img></div>
          <h5 className="mb-2 card-title">Sign up to Artify Ads</h5>
          <form className="row g-2" onSubmit={formSubmitHandler}>
            <div className="input-elements row g-2">
              <div className="col-md-7">
                <input
                  type="text"
                  className="form-control"
                  onChange={handle}
                  id="name"
                  value={user.name}
                  placeholder="Name"
                  required
                />
              </div>
              <div className="col-md-5">
                <input
                  type="file"
                  className="form-control"
                  onChange={handle}
                  id="photo"
                  value={user.photo}
                  placeholder="Photo"
                  
                />
              </div>
            </div>
            <div className="input-elements row g-2">
              <div className="col">
                <div className="Email input-group has-validation">
                  <span className="input-group-text" id="inputGroupPrepend">
                    @
                  </span>
                  <input
                    type="email"
                    className="Email-text form-control"
                    onChange={handle}
                    id="email"
                    value={user.email}
                    placeholder="Email"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="input-elements row g-2">
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control"
                  onChange={handle}
                  id="organisation"
                  value={user.organisation}
                  placeholder="Organisation"
                  required
                />
              </div>
              <div className="col-md-7">
                <input
                  type="password"
                  className="form-control"
                  onChange={handle}
                  id="password"
                  value={user.password}
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <div className="input-elements row g-2">
              <div className="col-md-7">
                <input
                  type="number"
                  className="form-control"
                  onChange={handle}
                  id="phone"
                  value={user.phone}
                  placeholder="Phone"
                  required
                />
              </div>
              <div className="col-md-5">
                <input
                  type="number"
                  className="form-control"
                  onChange={handle}
                  id="taxID"
                  value={user.taxID}
                  placeholder="Tax ID"
                  required
                />
              </div>
            </div>
            <div className="input-elements row g-2">
              <div className="col-md-7">
                <input
                  type="text"
                  className="form-control"
                  onChange={handle}
                  id="adress"
                  value={user.adress}
                  placeholder="Adresse"
                  required
                />
              </div>
              <div className="col-md-5">
                <input
                  type="number"
                  className="form-control"
                  onChange={handle}
                  id="codePostal"
                  value={user.codePostal}
                  placeholder="Postcode"
                  required
                />
              </div>
            </div>
            <div className="input-elements row g-2">
              <div className="col-md-4 country-width">
                <input
                  type="text"
                  className="form-control"
                  onChange={handle}
                  id="country"
                  value={user.country}
                  placeholder="Country"
                  required
                />
              </div>
              {/* <div className="col-md-4">
                 <select
                  className="form-select"
                  id="validationCustom04"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    State
                  </option>
                  <option>...</option>
                </select> 
              </div> */}
              <div className="col-md-4 city-width">
                <input
                  type="text"
                  className="form-control"
                  onChange={handle}
                  id="city"
                  value={user.city}
                  placeholder="city"
                  required
                />
              </div>


              {/* <div className="col-md-4">
                <select
                  className="form-select"
                  onChange={handle}
                  id="city"
                  value={user.city}
                  placeholder=""
                  required
                >
                  <option value="" disabled>
                    City
                  </option>
                  <option>...</option>
                </select>
              </div> */}
            </div>
            <div className="row g-2">
              <div className="form-check col-auto">
                <input
                  className="checkbox form-check-input"
                  type="checkbox"
                  id="invalidCheck"
                  required
                />
                <label className="form-check-label" htmlFor="invalidCheck">
                  Agree to terms and conditions
                </label>
                <div className="invalid-feedback">
                  You must agree before submitting.
                </div>
              </div>
            </div>
            <div className="row g-2">
              <button className="col-md btn btn-primary" type="submit">
                SIGN UP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
