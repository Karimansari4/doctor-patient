const User = require("../models/User")



exports.register = async (req, res) => {
    const fname = req.body.fname
    const mname = req.body.mname
    const lname = req.body.lname
    const mobile = req.body.mobile
    const email = req.body.email
    const dob = req.body.dob
    const memborShip = req.body.memborShip
    const gender = req.body.gender
    const tShirtSize = req.body.tShirtSize
    const sport = req.body.sport
    const category = req.body.category
    const bloodGroup = req.body.bloodGroup
    const illens = req.body.illens
    const idPick = req.body.idPick
    const participantPic = req.body.participant

    try {
        const checkUser = await User.findOne({ $or: [{ email: email, mobile: mobile }] })
        if (checkUser) {
            return res.status(400).json({ msg: 'User already exist! Please change mobile number or email id.', success: false })
        }
        const result = await User.create({ fname, mname, lname, mobile, email, dob, memborShip, gender, tShirtSize, sport, category, bloodGroup, illens, idPick, participantPic })
        if (result) {
            return res.status(200).json({ msg: 'User created successfully.', success: true, result: result })
        }
        return res.status(400).json({ msg: 'User creation failed!', success: false })
    } catch (error) {
        console.log("error on register", error);
        return res.status(500).json({ msg: error.message, success: false, error })
    }
}