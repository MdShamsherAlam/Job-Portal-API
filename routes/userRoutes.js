import express from 'express'
import { updateUser } from '../controllers/userController.js';
import userAuth from '../middewares/isAuthMiddleware.js';

const router=express.Router()

router.put('/update-user',userAuth,updateUser)


export default router;