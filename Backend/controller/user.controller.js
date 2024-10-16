import User from "../model/User.model.js";
import bcrypt from "bcryptjs"

export const signUp = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({message: "User Already Exist"})
        }

        const hashpassword= await bcrypt.hash(password,10)
        const createdUser = new User({
            fullname:fullname,
            email: email,
            password: hashpassword,
        })
        await createdUser.save()
        res.status(201).json({
            message: "User Created Successfully!",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
        }})
    } catch (error) {
        console.log("Error"+ error.message);
        res.status(500).json({message: "Internal server Error"})
    }
}
// login

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch =await bcrypt.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid Email or Password!" });
        } else {
            res.status(200).json({
                message: "Login Successfully", user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
 
            }})
        }
    } catch (error) {
        console.log("error" + error.message);
        res.status(500).json({ message: "Internal server Error" });
    }
}
