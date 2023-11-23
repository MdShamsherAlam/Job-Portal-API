

const errorMiddleware=(err,req,res,next)=>{
    console.log(err)
    res.status(500).send({message:"Something went on Server",status:false,err:err})
}

export default errorMiddleware