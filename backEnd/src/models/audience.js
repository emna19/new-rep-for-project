const mongoose = require('mongoose')

const audienceSchema = mongoose.Schema({
    name : {
        type: String , 
        required : true 
    },
    minAge : {
        type: Number , 
        required : false
    },
    maxAge : {
        type: Number , 
        required : false
    },
    countries : {
        type: [String] , 
        required : false
    },
    keywords : {
        type: [String] , 
        required : false
    },
    videoIDs : {
        type: [Number] , 
        required : true
    },
    User: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
        required:true 
    }
    
    //timestamp for updated at and created at
},{timestamps: true})

const Audience = mongoose.model('audience',audienceSchema)
module.exports = Audience