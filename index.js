import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import action from './action.js';
import cors from 'cors';
import accountController from './constrollers/account.js';


const app =express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const port = process.env.PORT;

app.use('/api', action);
app.use('/api/account', accountController);


mongoose.connect(process.env.MOBGO_URL)
.then(results => {
    app.listen(port, ()=> {
        console.log(`Server is running via port ${port}`);
    })
})
.catch(error => {
    console.log(error.message);
})

