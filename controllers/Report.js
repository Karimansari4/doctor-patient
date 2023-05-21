const Report = require("../models/Reports")


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