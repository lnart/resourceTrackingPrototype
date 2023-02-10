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
import { returnReadableData } from "../helpers/filterDataSet.js";
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

let flag = false
let errorKind = 'unknown'

  router.get('/dataInput', checkAuthenticated,(req, res) => {
    const name = req.user.name
    let msgErr = 'Date is already in use'
    if(errorKind === 'no count'){
        msgErr = 'You have to type in your count!'
    }
    res.render('dataInput', {
        flag: flag,
        msgErr: msgErr
    })
})

router.post('/dataInput', checkAuthenticated, async(req, res) => {
    
    try {
        flag = false
        const data = new ConsumptionData({
            email: req.user.email,
            count: req.body.count,
            date: req.body.date,
            resource: req.body.resource
        })
        await data.save()
        res.redirect('/dataInput')
    } catch (error) {
        const strigyfiyied = JSON.stringify(error)
        flag = true
        if(error?.errors?.count?.message){
            errorKind = 'no count'
        }
        res.redirect('/dataInput')
    }
    
})

router.get('/deleteUser', checkAuthenticated, async(req, res) => {
    const allUsers = await User.find({email: req.user.email})


    res.render('dataDelete', {
        username: req.user.name,
        userEmail: req.user.email
    })
})


router.post('/deleteUser', checkAuthenticated, async(req, res) => {
    const allUsers = await User.find({email: req.user.email})
    await User.findOneAndDelete({email: req.user.email})
    res.redirect('/login')

})

router.get('/updateUser', checkAuthenticated, (req, res)=>{
    let name = req.user.name
    let email = req.user.email
    res.render('updateProfile', {
        name: name,
        email: email
    })
})

router.post('/updateProfile', async(req, res)=> {
    const newName = req.body.name
    const newEmail = req.body.email
    await User.findOneAndUpdate({email: req.user.email, email: newEmail})
    await User.findOneAndUpdate({email: req.user.email, name: newName})
    console.log(req.user.name)
    res.redirect('/')

})
// router.get('/datadelete', checkAuthenticated, async(req, res) => {
//     const email = req.user.email
//     let data = await ConsumptionData.find({email: email})
//     data = returnReadableData(data)
//     res.render('dataDelete',{
//         data: data
//     })
// })



export default router