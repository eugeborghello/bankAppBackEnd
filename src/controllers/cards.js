const mongoose = require("mongoose");
const cards = require("../models/cards/cards");
const Users = mongoose.model("Users")
const Accounts = require("../models/account/index")
const Cards = require("../models/cards/cards")



exports.createCard = async (req, res) => {
        const { cardNumber, expire, account, securityCode, cardName, type } = req.body;
        try{
                const newCard = new Cards({
                        cardNumber,
                        expire,
                        account,
                        securityCode,
                        cardName,
                        type
                })
                newCard.save();
                const accountaux = await Accounts.findOne({cbu:account})
                if(account){
                        accountaux.cards.push(newCard)
                        accountaux.save();
                        res.status(201).json({status:'success',res:newCard})
                }else{
                        throw new Error('Something was wrong')
                }
        }catch(err){
                res.status(400).json({
                        status:'error',
                        message:err.message
                })
        }
        
}
exports.getCards = async (req, res) => {
        const { accountId } = req.body;
        try{
                const account = await Accounts.findById(accountId)
                if(account.cards.length == 0){
                        throw new Error('The Card is no associated')
                }else{
                        res.status(200).json({
                                status:'success',
                                resp:account.cards
                        })
                }
        }catch(error){
                res.status(400).json({
                        status:'error',
                        message:error.message
                })
        }
}
exports.validateCards = async (req, res) => {
        const { cbu,cardNumber,expire,securityCode} = req.body;
        try{
                const account = await Accounts.findOne({cbu:cbu})
                console.log(account)
                if(account.cards){
                        throw new Error('No Cards')
                }else{
                        const aux = acconut.cards.filter(card=>card.cardNumber==cardNumber);
                        if(aux.length==0){
                                throw new Error('Card is no asociated')
                        }else if(aux[0].expirationDate !== expire||aux[0].securityCode !== securityCode ){
                                throw new Error('check your data')
                        }else{
                                res.status(200).json({
                                        status:'success'
                                })
                        }

                }
        }catch(error){
                res.status(400).json({
                        status:'error',
                        message:error.message
                })
        }
}

