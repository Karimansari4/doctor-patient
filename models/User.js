const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
    },
    mname: {
        type: String
    },
    lname: {
        type: String
    },
    mobile: {
        type: Number,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    memborShip: {
        type: String
    },
    gender: {
        type: String,
        // enum: ["Male", "Female", "Other"]
    },
    tShirtSize: {
        type: String
    },
    sport: {
        type: String
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "category"
    },
    bloodGroup: {
        type: String,
    },
    illens: {
        type: String
    },
    idPick: {
        type: String
    },
    participantPic: {
        type: String
    },
    guardianName: {
        type: String
    }

}, { timestamps: true })

const User = mongoose.model('User', UserSchema)
module.exports = User