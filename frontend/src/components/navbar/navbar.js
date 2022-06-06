import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAction } from "../../redux/actions/users/userActions";


import "./navbar.css";

export default function Navbar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logoutAction());
    navigate("/login");
  };




  const profile = () => {
    navigate("/profile");
  };


     //  fetching user
     const userLogin = useSelector((store) => store.userLogin);
     const user = userLogin.userInfo;
  // if Admin goes to Amdmin page else to user home
  const home = ()=>{
    if (user) {
      if (user.isAdmin === true ) {
        navigate("/Admin")
      } 
      else {
        navigate("/home")
      }
    }
  }



  return (
    <nav className="navbar">
      <span className="brand-navbar navbar-brand mb-0 h1">
        <img
          className="navbar-logo"
          src={require("../../assets/artifyLogo.png")}
          alt="Artify Logo"
        ></img>
        <span className="navbar-title">rtify Ads</span>
      </span>
      <a onClick ={home} className="path">
      Home
      </a>
      <Link onClick={profile} to="/Profile" className="path">
        Profile
      </Link>
      <Link onClick={logoutHandler} to="/login" className="path">
        Logout
      </Link>


    </nav>
  );
}
