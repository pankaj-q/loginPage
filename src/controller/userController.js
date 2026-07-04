import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'


const createUser = async (req, res) => {
     const {name, email, password} = req.body;
     if(!name || !email || !password) {
        return res.status(400).json({
            message: "Email and Password are required"
        })
     }
     const isExist = await User.findOne({email});
     if(isExist) {
        return res.status(400).json({
            message: "User already exist please login not register"
        })
     }
     const hashPassword = await bcrypt.hash(password, 10);
     
    
     const user = await User.create({
        name, 
        email,
        password: hashPassword,
     })

     return res.status(201).json({
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
// User login controller ->
const loginUser = async (req,res) => {

   //   console.log("user logged in ");
     try {
      const {email, password} = req.body;
      if(!email || !password) {
         return res.status(401).json({
          message: "Email and password required"
         })
      }
 
      const user = await User.findOne({email}).select("+password");
    
      if(!user) {
         return res.status(400).json({
          message: "User is not registered yet please register"
         })
      }
 
      
      const isMatch = await bcrypt.compare(password,user.password);
      // console.log("isMatch", isMatch)
      // console.log(user.password)

      // console.log("stored hash", user.password)
      // console.log("enterePassword", password)
      // console.log(password === "12345")
      // console.log(JSON.stringify(password))
      if(!isMatch) {
         return res.status(401).json({
          message: "Invalid Password"
         })
      }

      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
 
      return res.status(200).json({
       message: "User logged In",
       success: true,
       _id: user._id
      })
     } catch (error) {
      console.log(error)
     }
}


const deleteUser = async(req,res) => {
  try {
    const {id} = req.params;
    console.log("id", id);
    const user = await User.findById(id);
    if(!user) {
       return res.status(400).json({
          success: false,
          message: "user does not exist"
       })
    }
    await User.findByIdAndDelete(id);
 
    return res.status(200).json({
       message: "User deleted successfully",
       success: true,
    })

  } 
  catch (error) {
   console.error(error);
   return res.status(500).json({
      success: false,
      message: "interval server error"
   })
   
  }
}

export {
   createUser,
   loginUser,
   deleteUser,
}