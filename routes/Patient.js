const express = require('express')
const { registerPatient, createReport, findPatientById, findReportByStatus } = require('../controllers/Patient')
const { verifyToken } = require('../middleware/Auth')
const patRouter = express.Router()

patRouter.post('/register', verifyToken, registerPatient)

patRouter.post('/:id/create-report', verifyToken, createReport)

patRouter.get('/:id/all-reports', findPatientById)

patRouter.get('/:status', findReportByStatus)

module.exports = patRouter