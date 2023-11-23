import userModel from "../models/userModel.js"


export const userRegister=async(req,res,next)=>{

    try{
      const {name,email,password}=req.body
      
      if(!name){
        res.status(400).send({status:false,message:"Please provide name"})
      }
      if(!email){
        res.status(400).send({status:false,message:"Please provide email"})
      }
      if(!password){
        res.status(400).send({status:false,message:"Please provide password"})
      }


      const existingUser=await userModel.findOne({email})

      if(existingUser){
        return res.status(200).send({
            status:false,
            message:"Email already register ,try another email",
            
        })
       
      }
     
      const user=await userModel.create({name,email,password})
      const token=user.createJWT();
      res.status(200).send({
          status:true,
          message:"User Created Successfully",
          user:{
            email:user.email,
            name:user.name,
            lastName:user.lastName,
            location:user.location,

          },
          token
      })
    }
    catch(err){
       next(err)
    }
}


export const loginAdmin=async(req,res,next)=>{
   try{
        const{email,password}=req.body
        if(!email || !password){
          return  res.status(400).send({
                message:"Field should not be empty",
                status:false
            })
        }
        const user=await userModel.findOne({email}).select("+password")   
            if(!user){
               return res.status(400).send({
                    message:"Invalid Username and password",
                    status:false
                })
            }
            const isMatch=await user.comparePassword(password)

            if(!isMatch){
               return res.status(400).send({
                    message:"Invalid username and password"
                    ,status:false
                })
            }

             user.password=undefined;
            const token=user.createJWT()
            res.status(200).send({
                message:"Login Successfully",
                status:true,
                token,
                user
            })

   }catch(err){
    next(err)
   }
}