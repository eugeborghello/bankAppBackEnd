          
const mongoose = require("mongoose");
const Users = mongoose.model("Users")
const Accounts = mongoose.model("Accounts")
const { generateAccount, generateCBU } = require('../../utils/accountGen');
const account = require("../models/account");
const mercadopago = require ('mercadopago');
mercadopago.configure({
    access_token: process.env.ENV_ACCESS_TOKEN
  });
exports.createAccount = async (req, res) => {
    const {id} = req.params
    
    const user = await Users.findById(id)
    if(user.accounts.length === 0) {
        console.log('no tiene cuentas')
    
        

    const pesosCVU = await generateCBU()
    const dolaresCVU = await generateCBU()
    const accountOne = await generateAccount(pesosCVU, 'Pesos',0, user._id)
    const accountTwo = await generateAccount(dolaresCVU, 'Dolares',0, user._id);
    await accountOne.save();
    await accountTwo.save();
    user.accounts.push(accountOne, accountTwo);
    await user.save()
    console.log(user.accounts)
    

    res.status(200).json({ 'CuentaEnPesos': accountOne, 'CuentaEnDolares': accountTwo })
    }else{
    res.status(400).json({message: 'la cuenta ya existe'})

    }
} 

        