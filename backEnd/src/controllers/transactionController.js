const Transaction = require("../models/transaction")

const allTransactions = async (req,res) => {
    try {
        await Transaction.find({})
        .then(result => {
                res.status(200).send(result);
        })
    }
    catch (err) {
        console.log(err)
        res.status(404).send(`doesn't exist`)
    }
}

const  transactionById = async(req,res) => {
    try {
        await Transaction.findById({_id:req.params.id}).
        then(result => {
          res.status(200).send(result);
        })
    }
    catch (err) {
      console.log(err);
        res.status(404).send(`doesn't exist`);
    }
}

const createTransaction = async(req,res) => {
    var transaction = req.body
    try {
        let new_transaction = new Transaction({
          date: transaction.date,
          User: transaction.User,
          annonce : transaction.annonce,
          amount : transaction.amount
          });
        await new_transaction.save();
        res.status(201).send('save effectué par succés!');
    }
    catch (err) {
        console.log(err);
        res.status(400).send(`couldn't be created`)
    }
}

module.exports = {
    allTransactions,
    transactionById,
    createTransaction
}