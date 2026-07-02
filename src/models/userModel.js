import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
   name : {
    type: String,
    required: true,

   },
   email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  
   },

   password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
   }

},{timestamps: true})
  

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name : this.name
  }, 
      process.env.JWT_SECRET,
       {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
  }

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  );
}


const User  = mongoose.model('User', userSchema);
export default User;

