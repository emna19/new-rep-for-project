const dotenv = require('dotenv')
const express = require('express')
const userRoutes = require('./src/routes/userRoutes')
const TransactionRoutes = require("./src/routes/transactionRoutes")
const AnnonceRoutes = require('./src/routes/annonceRoutes')
const AudienceRoutes = require('./src/routes/audienceRoutes')
const ImpressionRoutes = require('./src/routes/impressionRoutes')
// const mongoose = require('./src/db/mongoose')
const bodyParser = require("body-parser")
dotenv.config();
require('./src/db/mongoose')


const app = express()



app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

  ///testing backend and frontend connectivity
// app.get('/api', function (req, res) {
//   res.json({"users": ["userOne", "userTwo", "userThree", "userFour"] })
// })


//user api
app.use('/users', userRoutes)

//transaction api
app.use('/transactions', TransactionRoutes)


//annonce api
app.use('/annonces', AnnonceRoutes)


/// Audience API 
   
app.use('/audiences', AudienceRoutes)

  /// Impression API
app.use('/impressions', ImpressionRoutes)

app.listen(5000, () => console.log("Server started on port 5000"))