import { Strategy as LocalStrategy} from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';
import {User} from '../models/user.js';
import { request } from 'express';

export function initialize(passport, getUserByEmail, getUserByid){
    const authenticateUser = async(email, password, done) => {
        const user = await User.findOne({email: email})
        if(user == null){
            return done(null, false, {message: 'No user with that Email'})
        }
        try {
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            }else{
                return done(null, false, {message: 'Password is incorrect'})
            }
        } catch (error) {
            return done(error)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async(id, done) => {
        const user = await User.findOne({_id: id})
        done(null, user)
    })
}
