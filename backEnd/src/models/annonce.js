const mongoose = require("mongoose");

const annonceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endtDate: {
        type: Date,
        required: true,
    },
    sector: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    audience: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Audience',
        required: true,
    },
    clickUrl:{
        type:String,
        required:true
    },
    sourceUrl:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    isValid:{
        type:Boolean,
        required:false
    },
    User: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
        required:true 
    }
},{timestamps: true});//timestamp for updated at and created at




const Annonce = mongoose.model("annonce", annonceSchema);
module.exports = Annonce;