const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const Transaction = new mongoose.Schema({
    fromAccount: [{
        type: Schema.Types.ObjectId,
        ref: 'Accounts'
    }],

    toAccount: [{
        type: Schema.Types.ObjectId,
        ref: 'Accounts'
    }],

    description: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        default: 0,
        required: true
    }
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Transactions', Transaction);