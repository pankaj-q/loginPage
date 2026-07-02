import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'


const createUser = async (req, res) => {
     const {name, email, password} = req.body;
     if(!name || !email || !password) {
        res.status(400).json({
            message: "Email and Password are required"
        })
     }
     const isExist = await User.findOne({email});
     if(isExist) {
        res.status(400).json({
            message: "User already exist please login not register"
        })
     }
     const hashPassword = await bcrypt.hash(password, 10);
     
    
     const user = await User.create({
        name, 
        email,
        password: hashPassword,
     })

     res.status(201).json({
        success: true,
        message: "User registerd successfully",
        data:  {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password
        }
  })
}

const loginUser = async(req,res) => {
     const {email, password} = req.body;
     if(!email || !password) {
        res.status(401).json({
         message: "Email and password required"
        })
     }

     const user = await User.findOne({email}).select("+password");
     if(!user) {
        res.status(400).json({
         message: "User is not registered yet please register"
        })
     }

     const isMatch = await bcrypt.compare(password,user.password)
     if(!isMatch) {
        res.status(401).json({
         message: "Invalid Password"
        })
     }

     res.status(200).json({
      message: "User logged In",
      success: true,
      _id: user._id
     })
}

export {
   createUser,
   loginUser

}