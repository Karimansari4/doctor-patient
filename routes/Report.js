const express = require('express')
const { findReportByStatus } = require('../controllers/Report')
const repRouter = express.Router()

repRouter.get('/:status', findReportByStatus)

module.exports = repRouter