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
import {arrayDataSet, extractCounts, filterDataSet, gasPrice, splitDates} from '../helpers/filterDataSet.js'
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
    const gasDataSet = filterDataSet(userDataSet, 'gas')
    const sortDataSet = gasDataSet.sort((a, b) => a.date - b.date)
    let arrayDates = arrayDataSet(sortDataSet)
    let x_axis = splitDates(arrayDates)
    const counts = extractCounts(sortDataSet)
    const prices = gasPrice(counts)

    res.render('overviewGas', {
        x_axis: x_axis,
        gasCounts: counts,
        gasPrices: prices

    })
})

export default router