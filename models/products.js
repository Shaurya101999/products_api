const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const productSchema = new mongoose.Schema({
    id : {
        type : Number
    },
    name:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }
})

// to make our custom id which starts from 1 increment automatically
productSchema.plugin(AutoIncrement, {id:'order_seq',inc_field: 'id'});
const Products = mongoose.model('Products', productSchema);
module.exports = Products ;