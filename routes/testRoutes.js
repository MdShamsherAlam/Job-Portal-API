import express from 'express'
import { testPOstControllers } from '../controllers/testControllers.js';
import userAuth from '../middewares/isAuthMiddleware.js';
const router=express.Router();

router.post('/test-post',userAuth,testPOstControllers)

export default router;