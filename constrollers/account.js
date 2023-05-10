import express from "express";
const router = express.Router();
import Account from '../models/account.js';
import bcryptjs from 'bcryptjs'; //Password crypt
import Jwt  from "jsonwebtoken"; //Manage TOKENS
import mongoose from "mongoose";

router.post('/createAccount', async(req,res) => {
    const user = req.body.user
    const id =new mongoose.Types.ObjectId();

    Account.findOne({email: user.email})
    .then( async account => {
        if(account){
            return res.status(401).json({
                message: 'Account is not available'
            })
        } else {
            const hash = await bcryptjs.hash(user.password, 10); 
            const _account = new Account({
                _id: id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: hash,
                verficationCode: 1234,
                mobile: user.mobile  
            })
            _account.save()
            .then(accountCreaterd => {
                return res.status(200).json({
                    message: accountCreaterd
                })
            })
            .catch(error => { 
                return res.status(500).json({
                    message: error.message
                })
            })
        }
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})

router.post('/login', async(req,res) => {

})



export default router;