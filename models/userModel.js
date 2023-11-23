import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name Is required'],
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email Is required'],
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, 'Password Is required'],
    minlength: [6, 'password is too Short'],
    select: true,
  },
  location: {
    type: String,
    default: 'India',
  },
  createdJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  }],
  
}, { timestamps: true });

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw err;
  }
};

// JWT token creation method
userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

const User = mongoose.model('User', userSchema);

export default User;


// import mongoose from 'mongoose'
// import validator from 'validator'
// import bcrypt from 'bcryptjs'
// import Jwt from 'jsonwebtoken'

// const userSchema=new mongoose.Schema({

//     name:{
//         type:String,
//         required:[true,'Name Is required']
//     },
//     lastName:{
//         type:String
//     },
//     email:{
//         type:String,
//         required:[true,'Email Is required'],
//         unique:true,
//         validate:validator.isEmail
        
//     },
//     password:{
//         type:String,
//         required:[true,'Password Is required'],
//         minlength:[6,'password is too Short'],
//         select:true
//     },
//     location:{
//         type:String,
//         default:'India'
//     }


// },{timestamps:true})
// //for hasing our password
// userSchema.pre("save",async function(){
//     const salt=await bcrypt.genSalt(10)
//     this.password=await bcrypt.hash(this.password,salt)
// })
// //jwttoken
// userSchema.methods.createJWT=function(){
//     return Jwt.sign({userId:this._id},process.env.JWT_SECRET,{
//         expiresIn:"1d"
//     }
// )}


// export default mongoose.model('User',userSchema)