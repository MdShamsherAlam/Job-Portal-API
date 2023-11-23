 export const testPOstControllers=(req,res)=>{
  const {name}=req.body
  res.status(200).send(`your name is ${name}`)

}

// export default {testPOstControllers}