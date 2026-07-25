import express from 'express'
import {createUser, loginUser,deleteUser, updateUser} from '../controller/userController.js'
import verifyJWT from '../Middleware/authMiddleware.js'


const router = express.Router();
router.post('/register', createUser)
router.post('/login', loginUser)
router.delete('/delete/:id', deleteUser)
router.put('/update/:id', updateUser)


 export default router;
 