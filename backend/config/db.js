import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
const connectDB=()=>{mongoose.connect(`${process.env.MONGO_URL}/QuickDesk`)
.then(()=>{
    console.log("Database successfullly connected");
    
}).catch((err)=>{
    console.log("something went wrong",err);
    
})
}
export default connectDB;