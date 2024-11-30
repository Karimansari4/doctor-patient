const User = require("../models/User")



exports.register = async (req, res) => {
    console.log("=================================== register =======================================");
    console.log("req.body: ", req.body);


    const fname = req.body.name
    const mname = req.body.middleName
    const lname = req.body.lastName
    const mobile = req.body.contact
    const email = req.body.email
    const dob = req.body.dob
    const memborShip = req.body.membershipNo
    const gender = req.body.gender
    const tShirtSize = req.body.tShirtSize
    const sport = req.body.sports
    const category = req.body.category
    const bloodGroup = req.body.bloodGroup
    const illens = req.body.illness
    const idPick = req.body.idPicture
    const participantPic = req.body.participantPicture

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