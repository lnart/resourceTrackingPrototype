import mongoose from "mongoose";
import express, { request, response } from 'express';
import { config } from "dotenv";
import { Router } from "express";
import bcrypt from 'bcrypt';
import {User} from '../models/user.js'
config()

const router = Router()
router.use(express.json())
router.use(express.urlencoded({extendet: true}))
router.use('/public', express.static('public'))


router.get('/login', async(req, res) => {

    res.render('login')
})

router.get('/register', (req, res) => {

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

router.post('/login', async(req, res) => {
    const user = await User.findOne({email: req.body.email})
    const passwordFlag = await bcrypt.compare(req.body.password, user.password)
    try{
        if(passwordFlag){
            res.redirect('/')
        }else{
            res.redirect('/login')
        }
    }catch(error){
        res.redirect('login')
        console.error(error)
    }
})


export default router