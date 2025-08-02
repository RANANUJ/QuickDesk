import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ success: false, message: "Missing Details" })
    }
    
    try {
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists' })
        }
        
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" })
        }

        const hashedPassword = await bcrypt.hash(password, 7)
        const user = new userModel({ 
            firstName, 
            lastName, 
            email, 
            password: hashedPassword 
        })
        await user.save()
        
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60
        })
        
        res.status(201).json({ 
            success: true, 
            message: "User registered successfully"
        })
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.staus(400).json({ success: false, message: "Email and password is required " })
    }
    try {

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "Invalid Email" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {

            return res.json({ success: false, message: "Invalid Password" })
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60
        })
        res.send({ success: true })
    } catch (err) {
        res.send({ success: false, message: err.message })
    }

}
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'prodution' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60
        })

        res.json({ success: true, message: "logout successfully" })
    }
    catch (err) {
        res.json({ success: false, message: err.message })
    }
}
