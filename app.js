import mongoose from "mongoose"
import express from "express"
import { config } from "dotenv"
import routerLogin from './controllers/login.js'
import routerInputData from './controllers/dataInput.js'
import bcrypt from 'bcrypt'

config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set('views', './views')
app.set('view engine', 'ejs')
app.use('/public', express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/resourceTracking')
    .then(() => console.log('DATABASE CONNECTED'))
    .catch(error => console.error(error))

app.use(routerLogin)
app.use(routerInputData)

app.listen(process.env.PORT, () => {
    console.log(`STARTED SERVER ON PORT ${process.env.PORT}`)
})