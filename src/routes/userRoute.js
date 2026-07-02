import express from 'express'
import {createUser, loginUser} from '../controller/userController.js'
import verifyJWT from '../Middleware/authMiddleware.js'


const router = express.Router();
router.post('/register', createUser)
router.get('/login', loginUser)


 export default router;
