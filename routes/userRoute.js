import express from "express";
import { createNewUser, loginUser } from '../controller/userController.js'
const router = express.Router();

router.post('/create', createNewUser);
router.post('/login', loginUser);

export default router;