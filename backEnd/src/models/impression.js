const mongoose = require ('mongoose')

const impressionSchema = mongoose.Schema({

    date:{
        type:Date,
        required :true
    },
    annonce:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Annonce'
    },
    clientID:{
        type:Number,
        required:false
    },
    country:{
        type:String,
        required :true
    },
    age:{
        type:Number,
        required :false
    },

},{timestamps: true})

const Impression = mongoose.model('impression',impressionSchema)
module.exports=Impression