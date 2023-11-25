import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController";


const user_router = Router();

user_router.post('/register', registerUser)
user_router.post('/login', loginUser)


export default user_router;