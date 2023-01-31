import mongoose from "mongoose";
import express, { response } from 'express';
import { config } from "dotenv";
import { Router } from "express";

config()

const router = Router()
router.use(express.json())
router.use(express.urlencoded({extendet: true}))
router.use('/public', express.static('public'))


router.get('/login', async(req, res) => {

    res.render('login')
})


export default router