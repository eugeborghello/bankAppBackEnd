const mongoose = require("mongoose");
const Users = mongoose.model("Users")
const Account = mongoose.model("Accounts")
const Transaction = require('../models/transaction/index')
const { generateTransaction } = require('../../utils/transactionGen')



exports.createTransaction = async (req, res) =>{
        const { from, to, amount, description } = req.body
        const fromAccount = await Account.findOne({cbu: from})
        const toAccount = await Account.findOne({cbu: to})
        console.log({fromAccount},{toAccount})
        const fromUser = fromAccount.userId[0].toString().trim()
        const toUser = toAccount.userId[0].toString().trim()

    console.log(fromAccount.currency)
    console.log(toAccount.currency)

    if (fromAccount.balance - parseFloat(amount) >= 0) {
        if (fromAccount.currency !== toAccount.currency) {
            res.status(400).send({ message: 'the accounts must be in the same currency' })
            return
        } else {
            fromAccount.balance = fromAccount.balance - parseFloat(amount);
            toAccount.balance += parseFloat(amount)
        }

        const transaction = await generateTransaction(
            fromAccount._id,
            toAccount._id,
            description,
            parseFloat(amount),
        );

        await transaction.save();

        fromAccount.transactions.push(transaction);
        toAccount.transactions.push(transaction);

        await fromAccount.save();
        await toAccount.save();
        const response = {
            _id: fromAccount._id,
            fromAccountBalance: fromAccount.balance,
            fromAccountcbu: fromAccount.cbu,
            fromUser,
            toAccountBlance: toAccount.balance,
            toAccountcbu: toAccount.cbu,
            toUser
        }
        console.log(response)
        res.status(200).json({ message: 'successful transfer ' })
    } else {
        res.status(400).json({ message: 'no se puede hacer porque no te alcanza pobre' })
    }
}

exports.getTransaction = async (req, res) => {
    const { cbu } = req.params
    const account = await Account.find({ cbu })
    let auxArray = [];
    let auxObj = {};

    const transactions = await Transaction.find({
        $or: [
            {fromAccount : account[0]._id},
            {toAccount: account[0]._id}
        ]
    }).populate('fromAccount').populate('toAccount')
   console.log(transactions[1].fromAccount[0].cbu)
    for (var i = 0; i < transactions.length; i++) { 
        // console.log(transactions[i].fromAccount[0].cbu)
        auxObj = {
            _id: transactions[i]._id,
            fromAccount: transactions[i].fromAccount[0].cbu,
            // toAccount: transactions[i].toAccount[0].cbu,
            amount: transactions[i].amount,
            date: transactions[i].createdAt,
            description: transactions[i].description,
         
        }
        auxArray.push(auxObj)
    }
    res.status(200).json({
        status:'success',
        resp:auxArray
    })
}
    

const numTransaction = async () => {

    var num = Math.floor(Math.random() * 999999).toString()

    const dato = await Transaction.findOne({
        where: { numTransaction: num }
    })

    if (!dato) {
        return num;
    } else {
        return numTransaction();
    }
}

exports.cashDeposit = async (req, res) => {
    const numTransac = await numTransaction();
    const { cbu, amount } = req.body
    const amountNumber = amount * 1;
    try {
        //validate card
        const account = await Account.findOne({ cbu: cbu })
        const transaction = await Transaction.create({
            fromAccount:account._id,
            numTransaction: numTransac,
            state: 'complete',
            amountNumber,
            description: 'deposit',
            movement_type: 'deposits',
            accountId: account._id
        })
        var oldBalance = account.balance
        account.balance = oldBalance + amountNumber;
        account.save();
        if (account && transaction) {
            console.log(account);
            res.status(200).json({ status: "success", operation: { transaction: transaction, newBalance: account.balance } })
        } else {
            throw new Error("Something was wrong")
        }

    } catch (err) {
        res.json({ status: "error", message: err.message })
    }

}
exports.cashExtraction = async (req, res) => {
    const numTransac = await numTransaction();
    const { cbu, amount } = req.body;
    const amountNumber = amount * 1;
    try {
        //validate card
        const account = await Account.findOne({ cbu: cbu })
        const transaction = await Transaction.create({
            numTransaction: numTransac,
            state: 'complete',
            amount,
            description: 'extraction',
            movement_type: 'extraction',
            accountId: account.id
        })

        var oldBalance = account.balance
        account.balance = oldBalance - amountNumber;
        account.save();
        if (account && transaction) {
            res.status(200).json({
                status: "error",
                operation: transaction,
                newBalance: account.balance
            });
        } else {
            throw new Error("Something was wrong")
        }

    } catch (err) {
        res.status(400).json({ status: "error", message: err.message });
    }
}
