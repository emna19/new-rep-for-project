const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, (err, done) => {
    if (err) console.log(err);
    if (done) console.log('base de données connecté avec succes !');
});