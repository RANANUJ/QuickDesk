
import express from "express"
import {register,loginUser,logoutUser} from "../controller/userController.js"
// import multer from "multer"
const userRoute=express.Router()
userRoute.post("/register",register)
userRoute.post("/login",loginUser)
userRoute.post("/logout",logoutUser)
export default userRoute;
