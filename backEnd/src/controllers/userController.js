const User = require("../models/user");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");

const allUsers = async (req, res) => {
  try {
    await User.find({}).then((result) => {
      res.status(200).send(result);
    });
  } catch (err) {
    console.log(err);
    res.status(404).send(`doesn't exist`);
  }
};

const userById = async (req, res) => {
  try {
    await User.findById({ _id: req.params.id }).then((result) => {
      res.status(200).send(result);
    });
  } catch (err) {
    console.log(err);
    res.status(404).send("Not Found");
  }
};

//adding login api find by email and password
const login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user)
      return res.json({
        ...user._doc,
        token: generateToken(user._id),
      });
    return res.status(404).send({ status: "error", user: false });
  } catch (err) {
    console.log(err);
    res.status(400).send(`couldn't login, Something is wrong`);
  }
};

//create user
const createUser = async (req, res) => {
  var user = req.body;
  try {
    let new_user = new User({
      id: user._id,
      name: user.name,
      organisation: user.organisation,
      email: user.email,
      password: user.password,
      adress: user.adress,
      phone: user.phone,
      country: user.country,
      city: user.city,
      codePostal: user.codePostal,
      isAdmin: user.isAdmin,
      taxID: user.taxID,
      photo: user.photo,
    });
    await new_user.save();
    res.status(201).json({
      name: new_user.name,
      organisation: new_user.organisation,
      email: new_user.email,
      password: new_user.password,
      adress: new_user.adress,
      phone: new_user.phone,
      country: new_user.country,
      city: new_user.city,
      codePostal: new_user.codePostal,
      isAdmin: new_user.isAdmin,
      taxID: new_user.taxID,
      photo: new_user.photo,
      // ...user._doc,
      token: generateToken(new_user._id),
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(`couldn't be created, Something is wrong`);
  }
};

// Profile
const profile = async (req, res) => {
  // find the logged in user
  const user = await User.findById(req.user._id);
  // console.log("USER IS HERE :" , user);
  try {
    if (user) {
      return res
        .status(200)
        .json({ user, token: generateToken(user._id) });
    }
    return res.status(404).send({ status: "error", user: false });
  } catch (err) {
    console.log(err);
  }
};

// update user profile
const updateProfile = async (req, res) => {
  //Find the login user by ID
  const user = await User.findById(req.user.id);
  console.log("USER update IS HERE :", user);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.organisation = req.body.organisation || user.organisation;
    user.adress = req.body.adress || user.adress;
    user.phone = req.body.phone || user.phone;
    user.country = req.body.country || user.country;
    user.city = req.body.city || user.city;
    user.codePostal = req.body.codePostal || user.codePostal;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    user.taxID = req.body.taxID || user.taxID;
    user.photo = req.body.photo || user.photo;

    if (req.body.password) {
      user.password = req.body.password || user.password;
    }

    const updatedUser = await user.save();

    res.json({
      ...updatedUser._doc,
      token: generateToken(updatedUser._id),
    });
  }
};

// updateUserByAdmin

const updateUserByAdmin = async (req, res) => {
  try{
      await User.findByIdAndUpdate(req.params.id, req.body).
      then(
          res.json({...req.body})
        )
  }
  catch (err) {
      console.log(err);
      res.status(400).send("update failed")
  }
}


// Delete Annonce 
const deleteUser = async (req, res) => {
  try{
      await User.findByIdAndDelete(req.params.id).
      then(
          res.send("User deleted")
        )
  }
  catch (err) {
      console.log(err);
      res.status(400).send("user Delete failed")
  }
}


module.exports = {
  allUsers,
  userById,
  createUser,
  login,
  profile,
  updateProfile,
  deleteUser,
  updateUserByAdmin,
};
