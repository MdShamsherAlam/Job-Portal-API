import User from "../models/userModel.js"

export const updateUser=async(req,res,next)=>{

    const {name,lastname,email,password,location}=req.body

    if(!name ||!email||!password){
        return res.status(400).send({message:"field should not be empty",status:false})
    }
    const user= await User.findOne({_id:req.user.userId})
    user.name=name,
    user.lastName=lastname,
    user.email=email,
    user.password=password,
    user.location=location

   await  user.save()
    const token=user.createJWT()

    res.status(200).send({
        message:"Updated Successfully",
        status:true,
        user,
        token

    })



}