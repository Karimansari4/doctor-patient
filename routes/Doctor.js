const express = require('express')
const { register, logIn } = require('../controllers/Doctor')
const docRouter = express.Router()

docRouter.post('/register', register)

docRouter.post('/login', logIn)

module.exports = docRouter