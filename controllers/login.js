import mongoose from "mongoose";
import express, { application, request, response } from 'express';
import { config } from "dotenv";
import { Router } from "express";
import bcrypt from 'bcrypt';
import {User} from '../models/user.js'
import {initialize} from './passport-config.js'
import passport from 'passport'
import flash from 'express-flash'
import session from 'express-session'
config()

const router = Router()
router.use(express.json())
router.use(flash())
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

router.use(express.urlencoded({extendet: true}))
router.use('/public', express.static('public'))

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

function checkNotAuthenticated(req, res, next){
  if(req.isAuthenticated()){
     return res.redirect('/')
  }
  next()
}


router.get('/', checkAuthenticated, (req, res) => {
    const name = req.user.name
    res.render('index'), {
        name: name,
    };
  });
  
  

router.get('/login', checkNotAuthenticated, async(req, res) => {

    res.render('login')
})

router.get('/register', checkNotAuthenticated, async(req, res) => {

    res.render('register')
})

router.post('/register', async(req, res) => {
    //searches for existing user
    const salt = await bcrypt.genSalt()
    const existingUser = await User.findOne({name: req.body.firstName + ' ' + req.body.lastName})
    const existingEmail = await User.findOne({email: req.body.email})
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    console.log(hashedPassword)
    try{
        if(!existingUser && !existingEmail){
        const user = new User({
            name: req.body.firstName + ' ' + req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        
        })
        await user.save()
        res.redirect('/login')
    }
    } catch(error){
        console.error(error)
        res.redirect('/register')
    }
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

router.post('/logout', (req, res) => {
    req.logOut(function(error){
        if(error){
            console.error(error)
        }
    })
    res.redirect('/login')
})

export default router