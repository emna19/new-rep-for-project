const expressAsyncHandler = require('express-async-handler');
const Annonce = require('../models/annonce');
const generateToken = require("../utils/generateToken");

const allAnnonces = async (req,res) => {
    try {
        await Annonce.find({})
        .then(result => {
                res.status(200).send(result);
        })
    }
    catch (err) {
        console.log(err)
        res.status(404).res(`annonces doesn't exist`)
    }
}

const annonceById = async(req,res) => {
    try {
        await Annonce.findById({_id:req.params.id}).
        then(result => {
          res.status(200).send(result);
        })
    }
    catch (err) {
        res.status(404).send(`annonce not found`, err);
    }
}

const createAnnonce = expressAsyncHandler(async(req,res) => {
    var annonce= req.body
    // const userId = req.user._id
  try {
      let new_annonce = new Annonce({
        name: annonce.name,
        startDate: annonce.startDate,
        endtDate: annonce.endtDate,
        sector: annonce.sector,
        budget: annonce.budget,
        audience: annonce.audience,
        clickUrl:annonce.clickUrl,
        sourceUrl:annonce.sourceUrl,
        type : annonce.type,
        isValid : annonce.isValid,
        User: annonce.User
        });
      await new_annonce.save();
      res.status(201).send('save effectué par succés!');
  }
  catch (err) {
      console.log(err);
      res.status(400).send("creation failed")
  }
})


// update Annonce 

const updateAnnonce = async (req, res) => {
    try{
        await Annonce.findByIdAndUpdate(req.params.id, req.body).
        then(
            res.json({...req.body})
          )
    }
    catch (err) {
        console.log(err);
        res.status(400).send("creation failed")
    }
}

// Delete Annonce 
const deleteAnnonce = async (req, res) => {
    try{
        await Annonce.findByIdAndDelete(req.params.id).
        then(
            res.send("annonce deleted")
          )
    }
    catch (err) {
        console.log(err);
        res.status(400).send("creation failed")
    }
}

const getAdvretisementsByUserId = async (req, res) => {
    try {
        await Annonce.find({"User": req.params.id})
        .then(result => {
            res.status(200).send(result);
        })
    }
    catch (err) {
        console.log(err)
        res.status(404).send(`annonce not found`, err);
    }
}

module.exports = {
    allAnnonces,
    annonceById,
    createAnnonce,
    updateAnnonce,
    deleteAnnonce,
    getAdvretisementsByUserId
}