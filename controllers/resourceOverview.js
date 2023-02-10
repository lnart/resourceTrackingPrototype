import mongoose from "mongoose";
import express, { application, request, response } from 'express';
import { config } from "dotenv";
import { Router } from "express";
import {User} from '../models/user.js'
import {initialize} from './passport-config.js'
import passport from 'passport'
import flash from 'express-flash'
import session from 'express-session'
import {ConsumptionData} from '../models/consumptionData.js'
import {extractCounts, filterByYear, filterDataSetByResource, returnMonthlyBill} from '../helpers/filterDataSet.js'
config()

const router = Router()

router.use(express.json())
router.use(express.urlencoded({extendet: true}))
router.use('/public', express.static('public'))

router.use(flash())
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

initialize(passport, email => {
    return User.findOne({email: email})
    id => User.findOne({_id: id})
})

router.use(passport.initialize())
router.use(passport.session())

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }

router.get('/overviewGas',checkAuthenticated ,async(req, res) => {
    const email = req.user.email
    const userDataSet = await ConsumptionData.find({email: email})
    const gasDataSet = filterDataSetByResource(userDataSet, 'gas')
    const sortedDataSet = filterByYear(gasDataSet)
    res.render('overviewGas', {
        sortedDataSet: sortedDataSet,
        extractCounts: extractCounts,
        returnMonthlyBill: returnMonthlyBill

    })
})

router.get('/overviewElectricity', checkAuthenticated,  async(req, res)=>{
    const userDataSet = await ConsumptionData.find({email: req.user.email})
    const electricityDataSet = filterDataSetByResource(userDataSet, 'electricity')
    const sortedDataSet = filterByYear(electricityDataSet)
    console.log(sortedDataSet)
    res.render('overviewGas', {
        sortedDataSet: sortedDataSet,
        extractCounts: extractCounts,
        returnMonthlyBill: returnMonthlyBill
    })
})


export default router