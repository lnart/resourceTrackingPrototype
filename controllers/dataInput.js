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


  router.get('/dataInput', checkAuthenticated,(req, res) => {
    const name = req.user.name
    res.render('dataInput')
})

router.post('/dataInput', checkAuthenticated, async(req, res) => {
    
    try {
        const data = new ConsumptionData({
            email: req.user.email,
            count: req.body.count,
            date: req.body.date,
            resource: req.body.resource
        })
        await data.save()
        res.redirect('/dataInput')
    } catch (error) {
        console.error(error)
        res.redirect('/dataInput')
    }
    
})


export default router