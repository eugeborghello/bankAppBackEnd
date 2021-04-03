const mongoose = require('mongoose');

const Cards = new mongoose.Schema({
    cardNumber:{
        type: String,
        required: "cardNumber is required",
    },
    expirationDate:{
        type: String,
    },
    securityCode:{
        type:Number,
    },
    bank:{
        type: String,
    },
    account:{
        type: String,
    },
    type:{
        type: String,
    },
    cardName:{
        type: String,
    }  
})

module.exports = mongoose.model('Cards', Cards);