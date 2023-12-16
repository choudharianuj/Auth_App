import { resolve } from 'path';
import User from '../models/user.js'
import bcryptjs from 'bcryptjs'
import { erroeHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req,res, next)=>{

    const {username, email, password} = req.body;
    const hashedpassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedpassword });
    try{
        
        await newUser.save()
        res.status(201).send({message: 'user created sucessfully'});

    } catch(err){
        next(err);
    }
}

export const signin = async (req,res, next)=>{

    const {email, password} = req.body;
    try{
        const validUser = await User.findOne({email});
        if(!validUser) return next(erroeHandler(401, 'User Not Found'));
        
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(erroeHandler(401, 'wrong credentials'));

        const token = jwt.sign({id: validUser._id}, 'sfgdssdfvstdfbsrtdbsrtdfbrtsfhb');
        const {password: hashedpassword, ...rest} =validUser._doc;
        const expiryDate = new Date(Date.now()+ 3600000 * 24);
        res.cookie('access_token', token,{httpOnly: true, expires : expiryDate}).status(200).json(rest);

    } catch(err){
        next(err);
    } 
}



