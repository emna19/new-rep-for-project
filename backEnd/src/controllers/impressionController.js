const Impression = require('../models/impression');

const allImpressions = async (req,res) => {
    try {
        await Impression.find({})
        .then(result => {
                res.status(200).send(result);
        })
    }
    catch (err) {
        console.log(err)
        res.status(404).send("Impressions not found")
    }
}

const impressionById = async(req,res) => {
    try {
        await Impression.findById({_id:req.params.id}).
        then(result => {
          res.status(200).send(result);
        })
    }
    catch (err) {
      console.log(err)
      res.status(404).send("Impression not found")
    }
}

const createImpression = async(req,res) => {
    var impression = req.body ;
    try {
        let new_impression = new Impression({
          
          date: impression.date,
          annonce : impression.annonce, 
          clientID : impression.clientID,
          country : impression.country,
          age : impression.age
          

        });
        await new_impression.save();
        res.status(201).send('the impression is created!');
    }
    catch (err) {
        console.log(`Something is wrong !!`,err);
        res.status(400).send('creation failed')
    }
}

const getImpressionsByAdvretisementId = async (req, res) => {
    try {
        await Impression.find({"annonce": req.params.id})
        .then(result => {
            res.status(200).send(result);
        })
    }
    catch (err) {
        console.log(err)
        res.status(404).send(`annonce not found`, err);
    }
}

const getImpressionsByAdvretisementsId = async (req, res) => {
    try {
        await Impression.find({"annonce": {$in:req.body.id}})
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
    allImpressions,
    impressionById,
    createImpression,
    getImpressionsByAdvretisementId,
    getImpressionsByAdvretisementsId
}