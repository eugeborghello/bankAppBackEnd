const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const Accounts = new mongoose.Schema({
    cbu: {
        type: String,
        unique: true,
        required: true
    },
    currency:{
        type: String,
        enum: ['Pesos', 'Dolares'],
        required: true
    },
    balance:{
        type:Number,
        default:0
    },
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Transactions'
    }],
    cards: [{
        type: Schema.Types.ObjectId,
        ref: 'Cards'
    }],
    userId: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }]

    
})

module.exports = mongoose.model('Accounts', Accounts);