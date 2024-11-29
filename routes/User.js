const express = require('express');
const { register } = require('../controllers/User');
const userRouter = express.Router();


userRouter.post('/add', register)

module.exports = userRouter