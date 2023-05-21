const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReportSchema = new Schema({
    drName: {
        type: String,
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient'
    },
    status: {
        type: String,
        enum: ["Negative", "Travelled-Quarantine", "Symptoms-Quarantine", "Positive-Admit"]
    }
}, {timestamps: true})

const Report = mongoose.model('report', ReportSchema)

module.exports = Report