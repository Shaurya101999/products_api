const mongoose = require('mongoose');
// const dburl = (process.env.MONGODB_URI) || 'mongodb://localhost/ecommerce_development'
const dburl = 'mongodb://localhost/ecommerce_development'

mongoose.connect(dburl)

const db = mongoose.connection ;

db.on('error', console.error.bind(console, 'Error in connecting to db'));

db.once('open', function(){
    console.log('Connected to MongoDB')
});

module.exports = db ;