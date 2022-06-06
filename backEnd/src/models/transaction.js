const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    User: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    annonce:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Annonce' 
    },
    amount:{
        type: Number,
        required:true
    }
   
},{timestamps: true});//timestamp for updated at and created at

const Transaction = mongoose.model("transaction", transactionSchema);
module.exports = Transaction;