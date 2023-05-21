const Doctor = require('../models/Doctors')
const validator = require('email-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const salt = process.env.SALT
const secret = process.env.SECRET

const createToken = (result) => {
    return jwt.sign({result}, secret, {expiresIn: '7d'})
}

exports.register = async(req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    try {
        if(!name){
            return res.status(400).json({msg: 'Please enter name?', success: false})
        }else if(!email){
            return res.status(400).json({msg: 'Please enter email?', success: false})
        }else if(!validator.validate(email)){
            return res.status(400).json({msg: 'Please enter valid email?', success: false})
        }else if(!password){
            return res.status(400).json({msg: 'Please enter password?', success: false})
        }else if(password.length < 5){
            return res.status(400).json({msg: 'Password should be more than 5 words?', success: false})
        }else{
            const checkDoctor = await Doctor.findOne({email: email})
            if(checkDoctor){
                return res.status(400).json({msg: 'You are already registerd! Please login?', success: false})
            }else{
                const hashedPass = await bcrypt.hash(password, parseInt(salt))
                const doctors = new Doctor({name: name, email: email, password: hashedPass})
                const result = await doctors.save()
                if(result){
                    const token = createToken({_id: result._id, name: result.name, email: result.email})
                    if(token){
                        return res.status(200).json({msg: 'Register successfully.', token, success: true, result: {_id: result._id, name: result.name, email: result.email}})
                    }else{
                        return res.status(400).json({msg: 'Opps! Something went wrong?', success: false})
                    }
                }else{
                    return res.status(400).json({msg: 'Failed to register?', success: false})
                }
            }
        }
    } catch (error) {
        console.log("error on register: ", error);
        return res.status(500).json({err: error.message, error})
    }
}

exports.logIn = async(req, res) => {
    const email = req.body.email
    const password = req.body.password

    try {
        if(!email){
            return res.status(400).json({msg: 'Please enter email?', success: false})
        }else if(!validator.validate(email)){
            return res.status(400).json({msg: 'Please enter valid email?', success: false})
        }else if(!password){
            return res.status(400).json({msg: 'Please enter password?', success: false})
        }else{
            const checkDoctor = await Doctor.findOne({email: email})
            if(checkDoctor){
                const matchedPass = await bcrypt.compare(password, checkDoctor.password)
                if(matchedPass){
                    const token = createToken({_id: checkDoctor._id, name: checkDoctor.name, email: checkDoctor.email})
                    if(token){
                        return res.status(200).json({msg: 'Login successfully.', token, success: true, result: {_id: checkDoctor._id, name: checkDoctor.name, email: checkDoctor.email}})
                    }else{
                        return res.status(400).json({msg: 'Opps! Something went wrong?', success: false})
                    }
                }else{
                    return res.status(404).json({msg: 'Email or Password are not mateched?', success: false})
                }
            }else{
                return res.status(404).json({msg: 'Data not found! Please register first?', success: false})
            }
        }
    } catch (error) {
        console.log("error on error: ", error);
        return res.status(500).json({err: error.message, error})
    }
}