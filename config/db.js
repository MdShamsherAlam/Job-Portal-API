import mongoose from 'mongoose'
import colors from 'colors'

const connectDB=async ()=>{
   try{
    const con=await mongoose.connect(process.env.MONGO_URL)
    console.log(`Connected to MongoDB database ${mongoose.connection.host}`)

   }
   catch(err){
    console.log(`Mongoose Error${err}`)
   }


}
export default connectDB;