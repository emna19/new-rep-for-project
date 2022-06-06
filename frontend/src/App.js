import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UpdateProfile from './components/updateProfile/updateProfile';
import SignUp from "./components/signUp/signUp"
import Login from "./components/login/Login";
import Error from "./components/ErrorPage/Error";
import Profile from './components/Profile/Profile';
import Home from './components/home/home'
import Navbar from './components/navbar/navbar'
import Audience from './components/audiences/Audience';
import CreateAnnonce from './components/annonce/Annonce';
import Admin from './components/Admin/Admin';
import Film from './components/film/film';



function App() {
  

  return (
    <Router>
      <Routes>
        <Route  exact path="/signup" element={  <SignUp/>} />
        <Route  exact path="/Admin" element={ <div> <Navbar /> <Admin/> </div> } />
        <Route  exact path="/film" element={ <div><Film/></div>} />
        <Route exact path="/" element={ <Login/>} />
        <Route  exact path="/login" element={ <Login/>} />
        <Route exact path="/Profile" element={ <div> <Navbar /><br/> <Profile/></div> }/>
        <Route  exact path="/update" element={  <div> <Navbar /><br/> <UpdateProfile/> </div>} />

        <Route  exact path="/home/audience/create" element={ <Audience/>} />
        <Route  exact path="/home/annonce/create" element={ <CreateAnnonce/>} />

        <Route  exact path="/home" element={ <div><Navbar /> <Home /></div>} />
        <Route exact path="*" element={<Error/>} />
       
      </Routes>
    </Router>
    
  )
}

export default App;



