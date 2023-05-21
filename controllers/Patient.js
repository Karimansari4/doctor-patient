const Doctor = require('../models/Doctors')
const Patient = require('../models/Patients')
const Report = require('../models/Reports')

exports.registerPatient = async(req, res) => {
    const name = req.body.name
    const mobile = req.body.mobile
    
    try {
        if(!name){
            return res.status(400).json({msg: 'Please enter patient name?', success: false})
        }else if(!mobile){
            return res.status(400).json({msg: 'Please enter patient mobile number?', success: false})
        }else if(mobile.toString().length !== 10){
            return res.status(400).json({msg: 'Please enter valid mobile number?', success: false})
        }else{
            const checkPatient = await Patient.findOne({mobile: mobile})
            if(checkPatient){
                return res.status(200).json({msg: 'Patient already exist!', result: checkPatient, success: true})
            }else{
                const patient = new Patient({name: name, mobile: mobile})
                const result = await patient.save()
                if(result){
                    return res.status(200).json({msg: 'Patient register successfully.', success: true, result})
                }else{
                    return res.status(400).json({msg: 'Failed to register patient?', success: false})
                }
            }
        }
    } catch (error) {
        console.log("error on registerPatient: ", error);
        return res.status(500).json({err: error.message, error})
    }
}

exports.createReport = async(req, res) => {
    const id = req.params.id
    const drName = req.body.drName
    const status = req.body.status    
    
    try {
        if(!id){
            return res.status(404).json({msg: 'Patient not found?', success: false})
        }else if(!drName){
            return res.status(400).json({msg: 'Please enter dr name?', success: false})
        }else if(!status){
            return res.status(400).json({msg: 'Please enter status of patient?', success: false})
        }else{
            const checkDoctor = await Doctor.findOne({name: drName})
            if(checkDoctor){
                const checkPatient = await Patient.findById(id)
                if(checkPatient){
                    const createReport = new Report({drName: drName, patientId: id, status: status})
                    const result = await createReport.save()
                    if(result){
                        return res.status(200).json({msg: 'Report created successfully.', success: true, result})
                    }else{
                        return res.status(400).json({msg: 'Faile to create report?', success: false})
                    }
                }else{
                    return res.status(404).json({msg: 'Patient not found! Please register patient first?', success: false})
                }
            }else{
                return res.status(404).json({msg: 'Please doctor not found?', success: false})
            }
        }
    } catch (error) {
        console.log("error on registerPatient: ", error);
        return res.status(500).json({err: error.message, error})
    }
}

exports.findPatientById = async(req, res) => {
    const id = req.params.id

    try {
        if(!id){
            return res.status(400).json({msg: 'Please enter patient id?', success: false})
        }else{
            const result = await Report.find({patientId: id}).populate('patientId')
            if(result){
                return res.status(200).json({msg: 'Reports', success: true, result})
            }else{
                return res.status(404).json({msg: 'Report not found?' , success: false})
            }
        }
    } catch (error) {
        console.log("error on registerPatient: ", error);
        return res.status(500).json({err: error.message, error})
    }
}

exports.findReportByStatus = async(req, res) => {
    const status = req.params.status
    
    try {
        if(!status){
            return res.status(400).json({msg: 'Please enter status to search reports?', success: false})
        }else{
            const result = await Report.find({status: status}).populate("patientId")
            
            if(result){
                return res.status(200).json({msg: 'Report fond.', success: true, result})
            }else{
                return res.status(404).json({msg: 'No repont found?', success: false})
            }
        }
    } catch (error) {
        console.log("error on registerPatient: ", error);
        return res.status(500).json({err: error.message, error})
    }
}