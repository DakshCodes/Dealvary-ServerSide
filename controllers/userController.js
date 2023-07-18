const {  errorhandler } = require('../middlewares/error')
const { User } = require('../models/user')
const { connectDB } = require('../configs/db')
const bcrypt = require("bcryptjs")
const { setCookie, genrateToken } = require("../middlewares/features")


module.exports.register = async (req, res, next) => {
    //data from frontend...
    const { name, email, password,avatar } = req.body;

    if (!name || !email || !password|| !avatar)
        return errorhandler(res, 400, "Please Enter  All Feiels");

    //Database Connect... 
    await connectDB();

    // // Find User User Is alreay or not..
    let user = await User.findOne({ email });

    if (user)
        return errorhandler(res, 400, "User Already Register");

    //Create User...
    const hashedPassword = await bcrypt.hash(password, 10)
    user = await User.create({
        name,
        email,
        password: hashedPassword,
        avatar
    });
    user.save();

    // set here cookie... for resgister
    const token = genrateToken(user._id)

    setCookie(res, token, true)
    res.status(201).json({
        succes: true,
        message: "Register Succesfully",
        user
    });

}

module.exports.login = async (req, res, next) => {
    //data from frontend...

    const { email, password } = req.body;

    if (!email || !password)
        return errorhandler(res, 400, "Please Enter  All Feiels");

    //Database Connect... 
    await connectDB();

    //login User...

    const user = await User.findOne({ email }).select("+password");

    if (!user)
        return errorhandler(res, 400, "Invalid Email or Password");

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch)
        return errorhandler(res, 400, "Invalid Email or Password");


    //  login cookie
    const token = genrateToken(user._id)


    cookieSetter(res, token, true)

    res.status(200).json({
        succes: true,
        message: `Welcome Back , ${user.name} `,
        user,
    });


}