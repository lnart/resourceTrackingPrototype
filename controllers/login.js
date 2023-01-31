import mongoose from "mongoose";
import express from 'express';
import { config } from "dotenv";
import { Router } from "express";

config()

const router = Router()
router.use(express.json())
router.use(express.urlencoded({extendet: true}))
router.use('/public', express.static('public'))
router.set('views', './views')
router.set('view engine', 'ejs')


